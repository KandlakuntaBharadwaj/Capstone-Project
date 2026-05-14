import { Schema, model, Types } from "mongoose";

const commentSchema = new Schema({
  user: {
    type: Types.ObjectId,
    ref: "user",
  },
  comment: String,
});

const articleSchema = new Schema(
  {
    author: {
      type: Types.ObjectId,
      ref: "user",
    },
    title: String,
    category: String,
    content: String,
    comments: [commentSchema],
    isArticleActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export const ArticleModel = model("article", articleSchema);