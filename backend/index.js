// import express from "express";
// import cors from "cors";
// import mongoose from "mongoose";
// import dotenv from 'dotenv'
// import userApi from "./router/user.router.js"
// import projectRoutes from "./router/project.router.js"
// import cookieParser from "cookie-parser";
// import purchaseProjectRoute from "./router/projectPurchase.route.js";
// import ideaRoute from './router/idea.router.js'
// import path from 'path'

// dotenv.config()
// console.log("JWT_SECRET:", process.env.JWT_SECRET);

// const app = express();


// app.use(cors({
//   origin: "http://localhost:5173",
//   credentials: true,
// }));

// const _dirname=path.resolve();


// app.use(express.json());
// app.use(cookieParser());
// app.use("/uploads", express.static("uploads"));



// mongoose
//   .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }
//   )
//   .then(() => console.log("mongodb connected"))
//   .catch((err) => console.log(err));

//   app.use('/api/auth', userApi)
//   app.use("/api/project", projectRoutes);
//   app.use("/api/purchase", purchaseProjectRoute);
//   app.use("/api/idea", ideaRoute)

//   app.use(express.static(path.join(_dirname, "/frontend/dist")))

// app.get(/.*/, (req, res) => { res.sendFile(path.resolve(__dirname, "frontend", "index.html")); });

// const PORT = 4000;

// app.listen(PORT, () => {
//   console.log(`Server Running ${PORT}`);
// });
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userApi from "./router/user.router.js";
import projectRoutes from "./router/project.router.js";
import cookieParser from "cookie-parser";
import purchaseProjectRoute from "./router/projectPurchase.route.js";
import ideaRoute from "./router/idea.router.js";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

// Setup __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
dotenv.config();
console.log("JWT_SECRET:", process.env.JWT_SECRET);

// Initialize app
const app = express();

const corsOptions={
  origin:"https://projectifyee.onrender.com/",
  Credential:true
}
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static("uploads"));

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
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

// Serve frontend (Vite/React/others)
app.use(express.static(path.join(__dirname, "../frontend/dist")));

app.get(/.*/, (req, res) => { res.sendFile(path.resolve(__dirname, "frontend", "index.html")); });

// Server start
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
