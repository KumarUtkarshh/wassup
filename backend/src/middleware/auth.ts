import { getAuth, requireAuth } from "@clerk/express";
import type { NextFunction, Request, Response } from "express";
import { User } from "../models/User";

export type AuthRequest = Request & {
  userId?: string;
};

/* This code snippet is defining a middleware function named `protectRoute` that is responsible for
protecting routes by ensuring that the user is authenticated and authorized to access the route.
Here's a breakdown of what the code is doing: */
export const protectRoute = [
  requireAuth(),
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const { userId: clerkId } = getAuth(req);

      //not necessary becuase we alredy checking using requireAuth
      // if (!clerkId) {
      //   return res.status(401).json({
      //     message: "Unauthorized - invalid token",
      //   });
      // }

      const user = await User.findOne({ clerkId });
      if (!user) return res.status(404).json({ message: "User not found" });

      req.userId = user._id.toString();

      next();
    } catch (error) {
      res.status(500);
      next(error);
    }
  },
];
