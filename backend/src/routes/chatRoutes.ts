import { Router } from "express";
import { getChats, getOrCreateChat } from "../controllers/chatController.js";
import { protectRoute } from "../middleware/auth.js";

const router = Router();

/* `router.use(protectRoute);` is using the `protectRoute` middleware function for all routes defined
after this line in the router. This means that the `protectRoute` middleware will be executed before
any subsequent route handlers are called, allowing you to protect those routes by adding
authentication or authorization logic in the `protectRoute` middleware. */
router.use(protectRoute);

router.get("/", getChats);
router.post("/with/:participantId", getOrCreateChat);

export default router;
