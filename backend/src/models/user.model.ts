import mongoose, { Schema, Document, CallbackWithoutResultAndOptionalError } from "mongoose";

import bcrypt from "bcrypt";

/**
 * Platform Roles
 * customer  -> buys, browses
 * seller    -> owns exactly one business
 * admin     -> platform control (no business)
 */
export type UserRole = "customer" | "seller" | "admin";

/**
 * TypeScript Interface
 */
export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  business: mongoose.Types.ObjectId | null;
  isActive: boolean;
  comparePassword(candidate: string): Promise<boolean>;
}

/**
 * Mongoose Schema
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
      select: false, // ⛔ never return password from DB
    },

    role: {
      type: String,
      enum: ["customer", "seller", "admin"],
      default: "customer",
    },

    // Only sellers will have a business
    business: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Business",
      default: null,
    },

    // Allows admin to disable users
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

/**
 * Hash password before saving
 */
userSchema.pre<IUser>("save", async function () {
  if (!this.isModified("password")) return;

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});


/**
 * Compare password for login
 */
userSchema.methods.comparePassword = async function (
  candidate: string
): Promise<boolean> {
  return await bcrypt.compare(candidate, this.password);
};

/**
 * Export model
 */
export const User = mongoose.model<IUser>("User", userSchema);
