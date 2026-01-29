import mongoose, { Schema, Document } from "mongoose";

export interface IService extends Document {
  name: string;
  description?: string;
  price: number;
  duration: number; // in minutes
  images: string[];
  business: mongoose.Types.ObjectId;
  isActive: boolean;
}

const serviceSchema = new Schema<IService>(
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

    duration: {
      type: Number,
      required: true, // minutes
    },

    images: {
      type: [String],
      validate: {
        validator: (arr: string[]) => arr.length <= 5,
        message: "Maximum 5 images allowed",
      },
      default: [],
    },

    business: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Business",
      required: true,
      index: true,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export const Service = mongoose.model<IService>("Service", serviceSchema);
