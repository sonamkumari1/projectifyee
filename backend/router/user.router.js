import express from "express";
import {
  getUserProfile,
  login,
  Register,
  updateUserProfile,
} from "../controller/userController.js";
import { isAuthenticated } from "../middleware/isAuthenticated.js";
import upload from "../utils/multer.js";

const router = express.Router();

router.post("/register", Register);
router.post("/login", login);
router.get("/profile", isAuthenticated, getUserProfile);
router.put(
  "/update",
  isAuthenticated,
  upload.single("profilePic"),
  updateUserProfile
);
export default router;
