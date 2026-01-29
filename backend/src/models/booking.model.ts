import mongoose, { Schema, Document } from "mongoose";

export type BookingStatus =
  | "pending"
  | "confirmed"
  | "cancelled"
  | "completed";

export interface IBooking extends Document {
  service: mongoose.Types.ObjectId;
  business: mongoose.Types.ObjectId;
  customer: mongoose.Types.ObjectId;
  date: string;       // YYYY-MM-DD
  timeSlot: string;   // "10:00 - 11:00"
  status: BookingStatus;
}

const bookingSchema = new Schema<IBooking>(
  {
    service: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
      required: true,
    },

    business: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Business",
      required: true,
      index: true,
    },

    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    date: {
      type: String,
      required: true,
    },

    timeSlot: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled", "completed"],
      default: "pending",
    },
  },
  { timestamps: true }
);

// Prevent double booking of same slot
bookingSchema.index(
  { service: 1, date: 1, timeSlot: 1 },
  { unique: true }
);

export const Booking = mongoose.model<IBooking>("Booking", bookingSchema);
