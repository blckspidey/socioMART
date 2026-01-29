import { Request, Response } from "express";
import { Review } from "../models/productreview.model";
import { Order } from "../models/order.model";
import { Business } from "../models/business.model";
import { z } from "zod";

const createReviewSchema = z.object({
  orderId: z.string(),
  rating: z.number().min(1).max(5),
  comment: z.string().optional(),
});

export const createReview = async (
  req: Request & { user?: any },
  res: Response
) => {
  try {
    const { orderId, rating, comment } =
      createReviewSchema.parse(req.body);

    const userId = req.user.userId;

    // order must belong to user & be delivered
    const order = await Order.findOne({
      _id: orderId,
      customer: userId,
      status: "delivered",
    });

    if (!order) {
      return res.status(400).json({
        message: "You can only review delivered orders",
      });
    }

    // prevent self-review
    const business = await Business.findById(order.business);
    if (business?.owner.toString() === userId) {
      return res.status(400).json({
        message: "You cannot review your own business",
      });
    }

    const review = await Review.create({
      customer: userId,
      business: order.business,
      order: order._id,
      rating,
      comment,
    });

    res.status(201).json(review);
  } catch (err: any) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({ errors: err.issues });
    }
    res.status(500).json({ message: "Review creation failed" });
  }
};
export const getBusinessReviews = async (req: Request, res: Response) => {
  const { businessId } = req.params;

  const reviews = await Review.find({ business: businessId })
    .populate("customer", "name")
    .sort({ createdAt: -1 });

  res.json(reviews);
};
