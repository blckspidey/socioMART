import { Request, Response } from "express";
import { Category } from "../models/category.model";
import { Business } from "../models/business.model";
import { z } from "zod";

const createCategorySchema = z.object({
  name: z.string().min(2),
});

export const createCategory = async (req: Request & { user?: any }, res: Response) => {
  try {
    const data = createCategorySchema.parse(req.body);

    const business = await Business.findOne({ owner: req.user.userId });
    if (!business) {
      return res.status(400).json({ message: "No business found" });
    }

    const existing = await Category.findOne({
      name: data.name,
      business: business._id,
    });

    if (existing) {
      return res.status(400).json({ message: "Category already exists" });
    }

    const category = await Category.create({
      name: data.name,
      business: business._id,
    });

    res.status(201).json(category);
  } catch (err) {
    res.status(500).json({ message: "Category creation failed" });
  }
};

export const getCategories = async (req: Request & { user?: any }, res: Response) => {
  const business = await Business.findOne({ owner: req.user.userId });

  const categories = await Category.find({ business: business?._id });

  res.json(categories);
};
