import { Request, Response } from "express";
import { Product } from "../models/product.model";
import { Business } from "../models/business.model";
import { z } from "zod";

/**
 * Zod Schema
 */
const createProductSchema = z.object({
  name: z.string().min(2),
  description: z.string().optional(),
  price: z.number().positive(),
  images: z.array(z.string().url())
            .min(1, "At least 1 image required")
            .max(5, "Maximum 5 images allowed"),
  category: z.string(),
  stock: z.number().optional(),
});

/**
 * Add product (seller only)
 */
export const addProduct = async (req: Request & { user?: any }, res: Response) => {
  try {
    const data = createProductSchema.parse(req.body);
    console.log(data);

    const sellerId = req.user.userId;

    // get seller's business
    const business = await Business.findOne({ owner: sellerId });
    console.log(business);
    if (!business) {
      return res.status(400).json({ message: "Seller has no business" });
    }

    const product = await Product.create({
      ...data,
      business: business._id,
    });

    res.status(201).json(product);
  } catch (err: any) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({ errors: err.issues });

    }
    console.error(err);
    res.status(500).json({ message: "Product creation failed" });
  }
};

/**
 * Public: get products of a business
 */
export const getProductsByBusiness = async (req: Request, res: Response) => {
  const { businessId } = req.params;

  const products = await Product.find({
    business: businessId,
    isActive: true,
  });

  res.json(products);
};
