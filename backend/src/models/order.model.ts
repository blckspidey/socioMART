import mongoose, { Schema, Document } from "mongoose";

export type OrderStatus =
  | "pending"
  | "confirmed"
  | "shipped"
  | "delivered"
  | "cancelled";

export interface IOrderItem {
  product: mongoose.Types.ObjectId;
  name: string;
  price: number;
  quantity: number;
}

export interface IOrder extends Document {
  customer: mongoose.Types.ObjectId;
  business: mongoose.Types.ObjectId;
  items: IOrderItem[];
  totalAmount: number;
  deliveryAddress: {
    house: string;
    landmark?: string;
    pincode: string;
    district: string;
    state: string;
  };
  status: OrderStatus;
  paymentMethod: "cod" | "online";
  isPaid: boolean;
}

//Order Schema
const orderSchema = new Schema<IOrder>(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    business: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Business",
      required: true,
      index: true,
    },

    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        name: String,
        price: Number,
        quantity: Number,
      },
    ],

    totalAmount: {
      type: Number,
      required: true,
    },

    deliveryAddress: {
      house: String,
      landmark: String,
      pincode: String,
      district: String,
      state: String,
    },

    status: {
      type: String,
      enum: ["pending", "confirmed", "shipped", "delivered", "cancelled"],
      default: "pending",
    },

    paymentMethod: {
      type: String,
      enum: ["cod", "online"],
      required: true,
    },

    isPaid: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const Order = mongoose.model<IOrder>("Order", orderSchema);

