import mongoose, { Schema, Document } from "mongoose";

export interface ICategory extends Document {
  name: string;
  business: mongoose.Types.ObjectId;
}

const categorySchema = new Schema<ICategory>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    business: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Business",
      required: true,
      index: true,
    },
  },
  { timestamps: true }
);

export const Category = mongoose.model<ICategory>("Category", categorySchema);
