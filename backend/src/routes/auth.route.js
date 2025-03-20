import express from "express";
import {
  login,
  logout,
  signup,
  checkOnlineStatus,
} from "../controllers/auth.controller.js";
import { loginRequiredMiddleware } from "../middleware/auth.middleware.js";
import { updateProfileImage } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

router.put("/update-profile", loginRequiredMiddleware, updateProfileImage);
router.get("/check", loginRequiredMiddleware, checkOnlineStatus);

export default router;
