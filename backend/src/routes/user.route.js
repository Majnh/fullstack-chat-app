import express from "express";
import { updateProfileImage } from "../controllers/user.controller.js";
import { loginRequiredMiddleware } from "../middleware/auth.middleware.js";
import { checkOnlineStatus } from "../controllers/auth.controller.js";

const router = express.Router();

// router.put("/update-profile", loginRequiredMiddleware, updateProfileImage);
// router.get("/check", loginRequiredMiddleware, checkOnlineStatus);

export default router;
