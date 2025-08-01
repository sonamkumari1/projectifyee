import express from "express";
import {
  addProject,
  deleteProject,
  getallProject,
  getProjectById,
  updateProject,
  getProjectByCategory,
  countProjectsBySeller,
} from "../controller/projectController.js";
import {
  authorizeRoles,
  isAuthenticated,
} from "../middleware/isAuthenticated.js";
import upload from "../utils/multer.js";

const router = express.Router();

router.post(
  "/projectadd",
  isAuthenticated,
  authorizeRoles("seller"),
  upload.fields([
    { name: "photo", maxCount: 1 },
    { name: "video", maxCount: 1 },
  ]),
  addProject
);

router.get("/", isAuthenticated, authorizeRoles("seller"), getallProject);
router.get("/:sellerId/count", countProjectsBySeller);
router.get("/:id", isAuthenticated, getProjectById);

router.put(
  "/update/:id",
  isAuthenticated,
  authorizeRoles("seller"),
  upload.fields([
    { name: "photo", maxCount: 1 },
    { name: "video", maxCount: 1 },
  ]),
  updateProject
);

router.delete(
  "/delete/:id",
  isAuthenticated,
  authorizeRoles("seller"),
  deleteProject
);
router.get(
  "/category/:category",
  isAuthenticated,
  getProjectByCategory
);

export default router;
