import { Router } from "express";
import {
  createReview,
  getBusinessReviews,
} from "../controllers/productreview.controller";
import { protect } from "../middleware/auth.middleware";
import { requireRole } from "../middleware/role.middleware";

const router = Router();

// customer/seller (buyer) can review
router.post("/", protect, requireRole("customer", "seller"), createReview);

// public
router.get("/:businessId", getBusinessReviews);

export default router;
