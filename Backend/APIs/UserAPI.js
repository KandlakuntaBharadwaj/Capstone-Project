import exp from "express";
import { verifyToken } from "../middlewares/VerifyToken.js";
import { ArticleModel } from "../models/ArticleModel.js";

export const userApp = exp.Router();

// Get all active articles
userApp.get("/articles", verifyToken("USER"), async (req, res) => {
  const articles = await ArticleModel.find({ isArticleActive: true });
  res.json({ payload: articles });
});

// Add comment
userApp.put("/articles", verifyToken("USER"), async (req, res) => {
  const { articleId, comment } = req.body;

  const article = await ArticleModel.findOne({
    _id: articleId,
    isArticleActive: true,
  });

  if (!article) {
    return res.status(404).json({ message: "Article not found" });
  }

  article.comments.push({
    user: req.user.id,
    comment,
  });

  await article.save();

  res.json({ message: "Comment added", payload: article });
});