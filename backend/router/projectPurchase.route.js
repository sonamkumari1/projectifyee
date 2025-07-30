import express from "express";
import { createCheckoutSession, stripeWebhook } from "../controller/projectPurchaseController.js";
import { isAuthenticated } from "../middleware/isAuthenticated.js";

const router = express.Router();

router.post("/checkout/create-checkout-session", isAuthenticated, createCheckoutSession);
router.get("/webhook", isAuthenticated, stripeWebhook);

export default router;