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
export const createBusiness = async (
  req: Request & { user?: any },
  res: Response
) => {
  try {
    const data = createBusinessSchema.parse(req.body);

    const sellerId = req.user.userId;

    const existingBusiness = await Business.findOne({ owner: sellerId });
    if (existingBusiness) {
      return res.status(400).json({
        message: "Seller already has a business",
      });
    }

    const username = data.username.toLowerCase();

    const usernameTaken = await Business.findOne({ username });
    if (usernameTaken) {
      return res.status(400).json({
        message: "Business username already taken",
      });
    }

    const shareLink = `https://sociomart.com/${username}`;

    const business = await Business.create({
      ...data,
      username,
      shareLink,
      owner: sellerId,
    });

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

/**
 * Get businesses (public discovery)
 */
export const getBusinesses = async (req: Request, res: Response) => {
  const { city, category, pincode } = req.query;

  const filter: any = { isActive: true };

  if (city) filter.city = city.toString().toLowerCase();
  if (category) filter.category = category;
  if (pincode) filter.pincode = pincode;

  const businesses = await Business.find(filter).select(
    "name username shareLink category city area banner"
  );

  res.json(businesses);
};

/**
 * Get business profile by username
 */
export const getBusinessByUsername = async (req: Request, res: Response) => {
  const { username } = req.params;

  const business = await Business.findOne({
    username: (username as string).toLowerCase(),
    isActive: true,
  }).populate("owner", "name");

  if (!business) {
    return res.status(404).json({ message: "Business not found" });
  }

  res.json(business);
};
