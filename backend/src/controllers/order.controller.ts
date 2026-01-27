import { Request, Response } from "express";
import { Order } from "../models/order.model";
import { Product } from "../models/product.model";
import { Business } from "../models/business.model";
import { z } from "zod";

/**
 * Zod Schema
 */
const placeOrderSchema = z.object({
  businessId: z.string(),
  items: z.array(
    z.object({
      productId: z.string(),
      quantity: z.number().min(1),
    })
  ),
  deliveryAddress: z.object({
    house: z.string(),
    landmark: z.string().optional(),
    pincode: z.string(),
    district: z.string(),
    state: z.string(),
  }),
  paymentMethod: z.enum(["cod", "online"]),
});

/**
 * Place Order (customer)
 */
export const placeOrder = async (req: Request & { user?: any }, res: Response) => {
  try {
    const data = placeOrderSchema.parse(req.body);
    const buyerId = req.user.userId;

// If buyer is a seller, make sure they are not buying from their own business
const buyerBusiness = await Business.findOne({ owner: buyerId });

if (buyerBusiness && buyerBusiness._id.toString() === data.businessId) {
  return res.status(400).json({
    message: "You cannot order from your own business",
  });
}


    let total = 0;
    const orderItems = [];

    for (const item of data.items) {
      const product = await Product.findById(item.productId);
      if (!product || !product.isActive) {
        return res.status(400).json({ message: "Invalid product" });
      }

      if (product.stock < item.quantity) {
        return res
          .status(400)
          .json({ message: `${product.name} is out of stock` });
      }

      total += product.price * item.quantity;

      orderItems.push({
        product: product._id,
        name: product.name,
        price: product.price,
        quantity: item.quantity,
      });

      // reduce stock
      product.stock -= item.quantity;
      await product.save();
    }

    const order = await Order.create({
      customer: req.user.userId,
      business: data.businessId,
      items: orderItems,
      totalAmount: total,
      deliveryAddress: data.deliveryAddress,
      paymentMethod: data.paymentMethod,
      isPaid: data.paymentMethod === "cod",
    });

    res.status(201).json(order);
  } catch (err: any) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({ errors: err.issues });
    }

    res.status(500).json({ message: "Order failed" });
  }
};
