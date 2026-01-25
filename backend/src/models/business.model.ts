import mongoose, { Schema, Document } from "mongoose";

export type BusinessCategory =
  | "fashion"
  | "food"
  | "beauty"
  | "electronics"
  | "home"
  | "fitness"
  | "art"
  | "services";

export interface IBusiness extends Document {
  name: string;
  username: string;
  bio?: string;
  banner?: string;
  category: BusinessCategory;
  city: string;
  area: string;
  pincode: string;
  owner: mongoose.Types.ObjectId;
  isActive: boolean;
}

const businessSchema = new Schema<IBusiness>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    bio: {
      type: String,
      maxlength: 300,
    },

    banner: {
      type: String,
    },

    category: {
      type: String,
      enum: [
        "fashion",
        "food",
        "beauty",
        "electronics",
        "home",
        "fitness",
        "art",
        "services",
      ],
      required: true,
    },

    city: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    area: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    pincode: {
      type: String,
      required: true,
      index: true, // fast location queries
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export const Business = mongoose.model<IBusiness>(
  "Business",
  businessSchema
);
