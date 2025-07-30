import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from 'dotenv'
import userApi from "./router/user.router.js"
import projectRoutes from "./router/project.router.js"
import cookieParser from "cookie-parser";
import purchaseProjectRoute from "./router/projectPurchase.route.js";
import ideaRoute from './router/idea.router.js'

dotenv.config()
console.log("JWT_SECRET:", process.env.JWT_SECRET);

const app = express();


app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static("uploads"));



mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("mongodb connected"))
  .catch((err) => console.log(err));

  app.use('/api/auth', userApi)
  app.use("/api/project", projectRoutes);
  app.use("/api/purchase", purchaseProjectRoute);
  app.use("/api/idea", ideaRoute)


const PORT = 4000;

app.listen(PORT, () => {
  console.log(`Server Running ${PORT}`);
});
