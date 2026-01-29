import { Router } from "express";
import {
  createService,
  getServicesByBusiness,
} from "../controllers/service.controller";
import { protect } from "../middleware/auth.middleware";
import { requireRole } from "../middleware/role.middleware";

const router = Router();

// Seller
router.post("/", protect, requireRole("seller"), createService);

// Public
router.get("/:businessId", getServicesByBusiness);

export default router;
