import mongoose from "mongoose";

const userView = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["user", "admin", "seller"],
    required: true,
  },
   photoUrl: {
    type: String,
    default: "",
  },
  experience: {
    type: Number,
    default: "",
  },
  companyOrCollege: {
    type: String,
    default: "",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("User", userView);

export default User;
