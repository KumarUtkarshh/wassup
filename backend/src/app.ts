import { clerkMiddleware } from "@clerk/express";
import express from "express";
import { errorHandler } from "./controllers/errorHandler.js";
import authRoutes from "./routes/authRoutes";
import chatRoutes from "./routes/chatRoutes";
import messageRoutes from "./routes/messageRoutes";
import userRoutes from "./routes/userRoutes";

const app = express();

/* `app.use(express.json());` is setting up middleware in the Express application to parse incoming
requests with JSON payloads. This middleware function parses incoming request bodies and makes the
parsed JSON data available on the `req.body` property of the request object. This allows the
application to easily work with JSON data sent in the request body. */
app.use(express.json());

/* The line `app.use(clerkMiddleware());` is setting up middleware in the Express application to
integrate Clerk authentication functionality. Clerk is a service that provides user authentication
and identity management features. */
app.use(clerkMiddleware());

app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    message: "Server is running",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/chats", chatRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

/* The line `app.use(errorHandler);` is setting up error handling middleware in the Express
application. This middleware function will be called for any errors that occur during the processing
of incoming requests. It is responsible for catching errors, handling them appropriately, and
sending a meaningful response back to the client. */
app.use(errorHandler);

export default app;
