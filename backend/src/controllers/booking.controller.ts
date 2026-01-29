import { Request, Response } from "express";
import { Booking } from "../models/booking.model";
import { Service } from "../models/service.model";
import { z } from "zod";
import { Business } from "../models/business.model";
import { generateTimeSlots } from "../utils/timeSlots";

const createBookingSchema = z.object({
  serviceId: z.string(),
  date: z.string(),
  timeSlot: z.string(),
});

/**
 * Customer books a service
 */
export const createBooking = async (
  req: Request & { user?: any },
  res: Response
) => {
  try {
    const data = createBookingSchema.parse(req.body);

    const service = await Service.findById(data.serviceId);
    if (!service || !service.isActive) {
      return res.status(400).json({ message: "Invalid service" });
    }

    const booking = await Booking.create({
      service: service._id,
      business: service.business,
      customer: req.user.userId,
      date: data.date,
      timeSlot: data.timeSlot,
    });

    res.status(201).json(booking);
  } catch (err: any) {
    if (err.code === 11000) {
      return res.status(400).json({
        message: "This slot is already booked",
      });
    }
    res.status(500).json({ message: "Booking failed" });
  }
};


/**
 * Seller: Get all bookings for their business
 */
export const getSellerBookings = async (
  req: Request & { user?: any },
  res: Response
) => {
  const sellerId = req.user.userId;

  const business = await Business.findOne({ owner: sellerId });
  if (!business) {
    return res.status(400).json({ message: "Seller has no business" });
  }

  const bookings = await Booking.find({ business: business._id })
    .populate("service", "name price duration")
    .populate("customer", "name email")
    .sort({ date: 1 });

  res.json(bookings);
};
/**
 * Seller: Update booking status
 */
export const updateBookingStatus = async (
  req: Request & { user?: any },
  res: Response
) => {
  const { bookingId } = req.params;
  const { status } = req.body;

  const sellerId = req.user.userId;

  const business = await Business.findOne({ owner: sellerId });
  if (!business) {
    return res.status(400).json({ message: "Seller has no business" });
  }

  const booking = await Booking.findOne({
    _id: bookingId,
    business: business._id,
  });

  if (!booking) {
    return res.status(404).json({ message: "Booking not found" });
  }

  booking.status = status;
  await booking.save();

  res.json(booking);
};


/**
 * Public: Get available slots for a service on a date
 */
export const getAvailableSlots = async (req: Request, res: Response) => {
  const { serviceId, date } = req.query;

  if (!serviceId || !date) {
    return res.status(400).json({
      message: "serviceId and date are required",
    });
  }

  const service = await Service.findById(serviceId);
  if (!service) {
    return res.status(404).json({ message: "Service not found" });
  }

  // Phase 1: fixed business hours
  const ALL_SLOTS = generateTimeSlots(10, 20, service.duration);

  const bookings = await Booking.find({
    service: service._id,
    date,
  });

  const bookedSlots = bookings.map((b) => b.timeSlot);

  const availableSlots = ALL_SLOTS.filter(
    (slot) => !bookedSlots.includes(slot)
  );

  res.json({
    date,
    serviceId,
    availableSlots,
  });
};
