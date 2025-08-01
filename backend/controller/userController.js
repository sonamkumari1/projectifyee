import User from "../model/User.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";
import {
  deleteMediaFromCloudinary,
  uploadMedia,
} from "../utils/cloudinary.js";

// const JWT_SECRET = process.env.JWT_SECRET;

export const Register = async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newRegister = new User({
      name,
      email,
      password: hashedPassword,
      role: role || "user",
    });
    const data = await newRegister.save();
    res.status(201).json({ message: "user register successfully", data });
  } catch (error) {
    res.status(400).json({ error: "invalid data" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    const isMatched = await bcrypt.compare(password, user.password);

    if (!isMatched) {
      return res.status(400).json({ error: "Invalid Credential" });
    }

    generateToken(res, user);

    res.status(200).json({
      success: true,
      message: "Login successful",
      user,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
};

export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res
      .status(200)
      .json({
        success: true,
        message: "User profile fetched successfully",
        user,
      });
  } catch (error) {
    console.error("Error in getUserProfile:", error.message);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

export const updateUserProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const { name, experience, companyOrCollege } = req.body;
    let photoUrl = req.body.photoUrl;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const profilePic = req.file;

    if (profilePic) {
      if (user.photoUrl) {
        const publicId = user.photoUrl.split("/").pop().split(".")[0];
        await deleteMediaFromCloudinary(publicId);
      }

      const cloudResponse = await uploadMedia(profilePic.path);
      if (!cloudResponse?.secure_url) {
        return res.status(500).json({ success: false, message: "Image upload failed" });
      }
      photoUrl = cloudResponse.secure_url;
    }

    user.name = name || user.name;
    user.photoUrl = photoUrl || user.photoUrl;
    user.experience = experience || user.experience;
    user.companyOrCollege = companyOrCollege || user.companyOrCollege;

    const updatedUser = await user.save();

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: {
        ...updatedUser.toObject(),
        password: undefined,
      },
    });
  } catch (error) {
    console.error("Error updating profile:", error.message);
    return res.status(500).json({
      success: false,
      message: "Failed to update profile",
      error: error.message,
    });
  }
};




