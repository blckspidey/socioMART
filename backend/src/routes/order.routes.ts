import { Router } from "express";
import {
  placeOrder,
  getSellerOrders,
  updateOrderStatus,
  getMyOrders,
  getOrderById,
} from "../controllers/order.controller";

import { protect } from "../middleware/auth.middleware";
import { requireRole } from "../middleware/role.middleware";

const router = Router();

// Place order (customer & seller)
router.post("/", protect, requireRole("customer", "seller"), placeOrder);

// Seller dashboard
router.get("/seller", protect, requireRole("seller"), getSellerOrders);
router.put("/:orderId/status", protect, requireRole("seller"), updateOrderStatus);

// Customer order tracking
router.get("/my", protect, requireRole("customer", "seller"), getMyOrders);
router.get("/:orderId", protect, requireRole("customer", "seller"), getOrderById);

export default router;
