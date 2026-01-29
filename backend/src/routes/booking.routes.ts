import { Router } from "express";
import {
  createBooking,
  getSellerBookings,
  updateBookingStatus,
} from "../controllers/booking.controller";
import { protect } from "../middleware/auth.middleware";
import { requireRole } from "../middleware/role.middleware";
import { getAvailableSlots } from "../controllers/booking.controller";



const router = Router();
// Public
router.get("/slots", getAvailableSlots);
// Customer/Seller books service
router.post("/", protect, requireRole("customer", "seller"), createBooking);

// Seller dashboard
router.get("/seller", protect, requireRole("seller"), getSellerBookings);
router.put("/:bookingId/status", protect, requireRole("seller"), updateBookingStatus);

export default router;
