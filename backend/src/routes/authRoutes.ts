import { Router } from "express";
import { authCallback, getMe } from "../controllers/authController.js";
import { protectRoute } from "../middleware/auth.js";

const router = Router();

// /api/auth/me
router.get("/me", protectRoute, getMe);
router.get("/callback", authCallback);

export default router;
