import { getAuth } from "@clerk/express";
import type { Request, Response } from "express";
import type { AuthRequest } from "../middleware/auth";
import { User } from "../models/User";

export async function getMe(req: AuthRequest, res: Response) {
  try {
    const userId = req.userId;

    const user = await User.findById(userId);

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function authCallback(req: Request, res: Response) {
  try {
    const { userId: clerkId } = getAuth(req);
  } catch (error) {}
}
