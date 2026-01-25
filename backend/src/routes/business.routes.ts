import { Router } from "express";
import {
  createBusiness,
  getBusinesses,
  getBusinessByUsername,
} from "../controllers/business.controller";
import { protect } from "../middleware/auth.middleware";
import { requireRole } from "../middleware/role.middleware";

const router = Router();

/** Public */
router.get("/", getBusinesses);
router.get("/:username", getBusinessByUsername);

/** Seller */
router.post("/", protect, requireRole("seller"), createBusiness);

export default router;
