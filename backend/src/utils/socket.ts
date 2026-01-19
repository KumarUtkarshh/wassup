import { verifyToken } from "@clerk/express";
import { Server as HttpServer } from "http";
import { Server as SocketServer } from "socket.io";
import { Chat } from "../models/Chat.js";
import { Message } from "../models/Message.js";
import { User } from "../models/User.js";

export const onlineUsers: Map<string, string> = new Map();

export const initializeSocket = (httpServer: HttpServer) => {
  const allowedOrigins = [
    "http://localhost:3000",
    "http://localhost:8081",
    process.env.FRONTEND_URL,
  ].filter(Boolean) as string[];

  const io = new SocketServer(httpServer, {
    cors: {
      origin: allowedOrigins,
    },
  });

  //verfiy socket connection

  io.use(async (socket, next) => {
    const token = socket.handshake.auth.token; //this is send from client side

    if (!token) return next(new Error("Authentication error"));

    try {
      const session = await verifyToken(token, {
        secretKey: process.env.CLERK_SECRET_KEY!,
      });

      const clerkId = session.sub;

      const user = await User.findOne({ clerkId });
      if (!user) return next(new Error("User not found"));

      socket.data.userId = user._id.toString();
      next();
    } catch (error: unknown) {
      next(error instanceof Error ? error : new Error(String(error)));
    }
  });

  /* The `io.on("connection", (socket) => { })` code snippet is setting up an event listener for when a
 new socket connection is established with the Socket.IO server. When a client successfully connects
 to the server, this event is triggered. */
  io.on("connection", (socket) => {
    const userId = socket.data.userId;

    //send list of currently online users to newly connected client
    socket.emit("online-users", { userIds: Array.from(onlineUsers.keys()) });

    //store user in map
    onlineUsers.set(userId, socket.id);

    //notify others that this current user is online
    socket.broadcast.emit("user-online", { userId });

    socket.join(`user:${userId}`);

    socket.on("join-chat", (chatId: string) => {
      socket.join(`chat:${chatId}`);
    });

    socket.on("leave-chat", (chatId: string) => {
      socket.leave(`chat:${chatId}`);
    });

    //handle sending messages
    socket.on(
      "send-message",
      async (data: { chatId: string; text: string }) => {
        try {
          const { chatId, text } = data;

          if (!text || !text.trim()) {
            socket.emit("socket-error", {
              message: "Message text is required",
            });
            return;
          }

          const chat = await Chat.findOne({
            _id: chatId,
            participants: userId,
          });

          if (!chat) {
            socket.emit("socket-error", { message: "Chat not found" });
            return;
          }

          const message = await Message.create({
            chat: chatId,
            sender: userId,
            text,
          });

          chat.lastMessage = message._id;
          chat.lastMessageAt = new Date();

          await chat.save();

          await message.populate("sender", "name avatar");

          //emit to chat room for users inside the chat
          io.to(`chat:${chatId}`).emit("new-message", message);

          //also emit ot participants' personal rooms (for chat list view)
          for (const participantId of chat.participants) {
            io.to(`user:${participantId}`).emit("new-message", message);
          }
        } catch (error) {
          socket.emit("socket-error", { message: "Failed to send message" });
        }
      },
    );

    //TODO
    socket.on("typing", async (data) => {});

    socket.on("disconnect", () => {
      onlineUsers.delete(userId);

      //notify others
      socket.broadcast.emit("user-offline", { userId });
    });
  });

  return io;
};
