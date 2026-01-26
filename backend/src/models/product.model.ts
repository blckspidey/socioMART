import mongoose, { Schema, Document } from "mongoose";

/**
 * Product Interface
 */
export interface IProduct extends Document {
  name: string;
  description?: string;
  price: number;
  images: string[];
  category: mongoose.Types.ObjectId; // seller-level category
  business: mongoose.Types.ObjectId; // owning business
  stock: number;
  isActive: boolean;
}

/**
 * Product Schema
 */
const productSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      maxlength: 500,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    images: {
      type: [String], // Cloudinary URLs
      required: true,
    },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },

    business: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Business",
      required: true,
      index: true, // fast queries per business
    },

    stock: {
      type: Number,
      default: 0,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

/**
 * Export
 */
export const Product = mongoose.model<IProduct>("Product", productSchema);

