import mongoose, { Schema, Document } from "mongoose";

export interface IServiceReview extends Document {
  service: mongoose.Types.ObjectId;
  business: mongoose.Types.ObjectId;
  booking: mongoose.Types.ObjectId;
  customer: mongoose.Types.ObjectId;
  rating: number;
  comment?: string;
}

const serviceReviewSchema = new Schema<IServiceReview>(
  {
    service: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
      required: true,
      index: true,
    },

    business: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Business",
      required: true,
    },

    booking: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
      required: true,
      unique: true, // ⭐ one review per booking
    },

    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: true,
    },

    comment: {
      type: String,
      maxlength: 500,
    },
  },
  { timestamps: true }
);

export const ServiceReview =
  mongoose.models.ServiceReview ||
  mongoose.model<IServiceReview>("ServiceReview", serviceReviewSchema);

