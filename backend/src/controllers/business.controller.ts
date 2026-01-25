import { Request, Response } from "express";
import { Business } from "../models/business.model";
import { User } from "../models/user.model";
import { z } from "zod";

/**
 * Zod schema
 */
const createBusinessSchema = z.object({
  name: z.string().min(2),
  username: z.string().min(3),
  category: z.enum([
    "fashion",
    "food",
    "beauty",
    "electronics",
    "home",
    "fitness",
    "art",
    "services",
  ]),
  city: z.string(),
  area: z.string(),
  pincode: z.string().min(4),
  bio: z.string().max(300).optional(),
});

/**
 * Create Business (Seller only)
 */
export const createBusiness = async (req: Request & { user?: any }, res: Response) => {
  try {
    const data = createBusinessSchema.parse(req.body);

    // seller id from JWT
    const sellerId = req.user.userId;

    // check seller already has business
    const existingBusiness = await Business.findOne({ owner: sellerId });
    if (existingBusiness) {
      return res.status(400).json({
        message: "Seller already has a business",
      });
    }

    // username must be unique
    const usernameTaken = await Business.findOne({
      username: data.username.toLowerCase(),
    });

    if (usernameTaken) {
      return res.status(400).json({
        message: "Business username already taken",
      });
    }

    const business = await Business.create({
      ...data,
      username: data.username.toLowerCase(),
      owner: sellerId,
    });

    // attach business to user
    await User.findByIdAndUpdate(sellerId, {
      business: business._id,
    });

    res.status(201).json({
      message: "Business created successfully",
      business,
    });
  } catch (err: any) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({ errors: err.issues });
    }

    res.status(500).json({ message: "Business creation failed" });
  }
};
