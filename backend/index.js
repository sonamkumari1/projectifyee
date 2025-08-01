import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userApi from "./router/user.router.js";
import projectRoutes from "./router/project.router.js";
import cookieParser from "cookie-parser";
import purchaseProjectRoute from "./router/projectPurchase.route.js";
import ideaRoute from "./router/idea.router.js";
import path from "path";

dotenv.config();


// Initialize app
const app = express();

const corsOptions = {
  origin: "https://projectifyee.onrender.com",
  credentials: true,
};
app.use(cors(corsOptions));

const _dirname = path.resolve();

app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static("uploads"));

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Routes
app.use("/api/auth", userApi);
app.use("/api/project", projectRoutes);
app.use("/api/purchase", purchaseProjectRoute);
app.use("/api/idea", ideaRoute);

app.use(express.static(path.join(_dirname, "/frontend/dist")));

app.get(/.*/, (req, res) => {
  res.sendFile(path.resolve(__dirname, "frontend", "index.html"));
});
// Server start
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
