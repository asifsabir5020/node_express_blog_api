import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "post title is required"],
      maxlength: 100,
    },
    body: {
      type: String,
      required: [true, "post body is required"],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export const Post = mongoose.model('Post', postSchema);