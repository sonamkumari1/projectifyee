import express from "express";
import multer from "multer";
import { addProject, deleteProject, getallProject, getProjectById, updateProject, getProjectByCategory,  countProjectsBySeller } from "../controller/projectController.js";
import { authorizeRoles, isAuthenticated } from "../middleware/isAuthenticated.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); 
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

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

router.get("/",isAuthenticated, authorizeRoles("seller"), getallProject)
router.get("/:sellerId/count",  countProjectsBySeller);
router.get("/:id", isAuthenticated, authorizeRoles("seller"), getProjectById)

router.put("/update/:id", isAuthenticated,
   authorizeRoles("seller"),upload.fields([{name: "photo", maxCount:1}, {name: "video", maxCount: 1}]),
updateProject
)

router.delete("/delete/:id",isAuthenticated,
   authorizeRoles("seller"), deleteProject)
router.get("/category/:category",isAuthenticated,
   authorizeRoles("seller"), getProjectByCategory);



export default router;
