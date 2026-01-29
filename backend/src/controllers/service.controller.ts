import { Request, Response } from "express";
import { Service } from "../models/service.model";
import { Business } from "../models/business.model";
import { z } from "zod";

/**
 * Zod schema
 */
const createServiceSchema = z.object({
  name: z.string().min(2),
  description: z.string().optional(),
  price: z.number().positive(),
  duration: z.number().min(5),
  images: z.array(z.string()).max(5).optional(),
});

/**
 * Seller adds service
 */
export const createService = async (
  req: Request & { user?: any },
  res: Response
) => {
  try {
    const data = createServiceSchema.parse(req.body);
    const sellerId = req.user.userId;

    const business = await Business.findOne({ owner: sellerId });
    if (!business) {
      return res.status(400).json({ message: "Seller has no business" });
    }

    const service = await Service.create({
      ...data,
      business: business._id,
    });

    res.status(201).json(service);
  } catch (err: any) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({ errors: err.issues });
    }
    res.status(500).json({ message: "Service creation failed" });
  }
};

/**
 * Public: get services of a business
 */
export const getServicesByBusiness = async (req: Request, res: Response) => {
  const { businessId } = req.params;

  const services = await Service.find({
    business: businessId,
    isActive: true,
  });

  res.json(services);
};
