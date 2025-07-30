import express from "express";
import { addIdea, allIdea, deleteIdea, updateIdea } from "../controller/IdeaController.js";
import { isAuthenticated } from "../middleware/isAuthenticated.js";

const router = express.Router();

router.post("/add", isAuthenticated, addIdea);
router.get("/all", allIdea);
router.put("/update/:id", isAuthenticated, updateIdea);
router.delete("/delete/:id", isAuthenticated, deleteIdea);

export default router;
