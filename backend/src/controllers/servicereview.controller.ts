import { Request, Response } from "express";
import { Review } from "../models/servicereview.model";
import { Booking } from "../models/booking.model";
import { z } from "zod";

const createReviewSchema = z.object({
  bookingId: z.string(),
  rating: z.number().min(1).max(5),
  comment: z.string().optional(),
});

/**
 * Customer adds review
 */
export const addReview = async (
  req: Request & { user?: any },
  res: Response
) => {
  try {
    const data = createReviewSchema.parse(req.body);

    const booking = await Booking.findById(data.bookingId)
      .populate("service")
      .populate("business");

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // Must be same customer
    if (booking.customer.toString() !== req.user.userId) {
      return res.status(403).json({ message: "Not allowed" });
    }

    // Must be completed
    if (booking.status !== "completed") {
      return res
        .status(400)
        .json({ message: "Service not completed yet" });
    }

    const review = await Review.create({
      service: booking.service,
      business: booking.business,
      booking: booking._id,
      customer: req.user.userId,
      rating: data.rating,
      comment: data.comment,
    });

    res.status(201).json(review);
  } catch (err: any) {
    if (err.code === 11000) {
      return res.status(400).json({
        message: "Review already submitted for this booking",
      });
    }

    if (err instanceof z.ZodError) {
      return res.status(400).json({ errors: err.issues });
    }

    res.status(500).json({ message: "Review creation failed" });
  }
};

/**
 * Public: get reviews of a service
 */
export const getServiceReviews = async (req: Request, res: Response) => {
  const { serviceId } = req.params;

  const reviews = await Review.find({ service: serviceId })
    .populate("customer", "name")
    .sort({ createdAt: -1 });

  res.json(reviews);
};
