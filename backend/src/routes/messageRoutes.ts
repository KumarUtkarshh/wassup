import { Router } from "express";
import { getMessages } from "../controllers/messageController.js";
import { protectRoute } from "../middleware/auth.js";

const router = Router();

router.get("/chat/:chatId", protectRoute, getMessages);

export default router;
