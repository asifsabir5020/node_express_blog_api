import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "book title is required"],
      minLength: 3,
    },
    author: {
      type: String,
      required: [true, "book author is required"],
    },
    description: {
      type: String,
    },
  },
  { timestamps: true }
);

export const Book = mongoose.model("Book", bookSchema);
