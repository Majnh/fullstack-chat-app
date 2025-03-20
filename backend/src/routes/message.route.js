import express from "express";
import { loginRequiredMiddleware } from "../middleware/auth.middleware.js";
import {
  getMessages,
  getUsersForSidebar,
  sendMessage,
} from "../controllers/message.controller.js";

const router = express.Router();

router.get("/users", loginRequiredMiddleware, getUsersForSidebar);
router.get("/:id", loginRequiredMiddleware, getMessages);

router.post("/send/:id", loginRequiredMiddleware, sendMessage);

export default router;
