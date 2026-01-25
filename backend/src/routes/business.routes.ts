import { Router } from "express";
import { createBusiness } from "../controllers/business.controller";
import { protect } from "../middleware/auth.middleware";
import { requireRole } from "../middleware/role.middleware";

const router = Router();

/**
 * Seller onboarding
 */
router.post("/", protect, requireRole("seller"), createBusiness);

export default router;
