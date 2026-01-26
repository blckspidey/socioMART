import { Router } from "express";
import {
  addProduct,
  getProductsByBusiness,
} from "../controllers/product.controller";
import { protect } from "../middleware/auth.middleware";
import { requireRole } from "../middleware/role.middleware";

const router = Router();

/** Public */
router.get("/:businessId", getProductsByBusiness);

/** Seller */
router.post("/", protect, requireRole("seller"), addProduct);

export default router;
