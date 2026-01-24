import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcrypt";

/**
 * Platform Roles
 */
export type UserRole = "customer" | "seller" | "admin";

/**
 * Address Interface
 */
export interface IAddress {
  label: string; // Home, Office, Shop
  house: string;
  landmark?: string;
  pincode: string;
  district: string;
  state: string;
  isDefault: boolean;
}

/**
 * User Interface
 */
export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  business: mongoose.Types.ObjectId | null;
  isActive: boolean;
  addresses: IAddress[];
  comparePassword(candidate: string): Promise<boolean>;
}

/**
 * User Schema
 */
const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
      select: false,
    },

    role: {
      type: String,
      enum: ["customer", "seller", "admin"],
      default: "customer",
    },

    business: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Business",
      default: null,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    // Multiple delivery / pickup addresses
    addresses: [
      {
        label: { type: String, required: true },
        house: { type: String, required: true },
        landmark: { type: String },
        pincode: { type: String, required: true },
        district: { type: String, required: true },
        state: { type: String, required: true },
        isDefault: { type: Boolean, default: false },
      },
    ],
  },
  { timestamps: true }
);

/**
 * Password hashing
 */
userSchema.pre<IUser>("save", async function () {
  if (!this.isModified("password")) return;

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

/**
 * Compare password
 */
userSchema.methods.comparePassword = async function (
  candidate: string
): Promise<boolean> {
  return await bcrypt.compare(candidate, this.password);
};

/**
 * Export
 */
export const User = mongoose.model<IUser>("User", userSchema);
