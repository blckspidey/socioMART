import { Router } from "express";
import {
  addReview,
  getServiceReviews,
} from "../controllers/servicereview.controller";
import { protect } from "../middleware/auth.middleware";
import { requireRole } from "../middleware/role.middleware";

const router = Router();

// Customer adds review
router.post("/", protect, requireRole("customer", "seller"), addReview);

// Public
router.get("/service/:serviceId", getServiceReviews);

export default router;
