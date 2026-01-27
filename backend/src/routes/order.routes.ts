import { Router } from "express";
import { placeOrder } from "../controllers/order.controller";
import { protect } from "../middleware/auth.middleware";
import { requireRole } from "../middleware/role.middleware";

const router = Router();

router.post("/", protect, requireRole("customer","seller"), placeOrder);


export default router;
