import exp from "express";
import { UserModel } from "../models/UserModel.js";
import { ArticleModel } from "../models/ArticleModel.js";
import { verifyToken } from "../middlewares/VerifyToken.js";

export const authorApp = exp.Router();

// Create article
authorApp.post("/article", verifyToken("AUTHOR"), async (req, res) => {
  try {
    const articleObj = req.body;
    const user = req.user;

    const author = await UserModel.findById(articleObj.author);

    if (!author) {
      return res.status(404).json({ message: "Invalid author" });
    }

    if (author.email !== user.email) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const articleDoc = new ArticleModel(articleObj);
    await articleDoc.save();

    res.status(201).json({ message: "Article created" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Read own articles
authorApp.get("/articles", verifyToken("AUTHOR"), async (req, res) => {
  const authorId = req.user.id;
  const articles = await ArticleModel.find({ author: authorId });

  res.json({ payload: articles });
});

// Update article
authorApp.put("/articles", verifyToken("AUTHOR"), async (req, res) => {
  const authorId = req.user.id;
  const { articleId, title, category, content } = req.body;

  const updated = await ArticleModel.findOneAndUpdate(
    { _id: articleId, author: authorId },
    { $set: { title, category, content } },
    { new: true }
  );

  if (!updated) {
    return res.status(403).json({ message: "Unauthorized" });
  }

  res.json({ message: "Updated", payload: updated });
});

// Soft delete
authorApp.patch("/articles", verifyToken("AUTHOR"), async (req, res) => {
  const authorId = req.user.id;
  const { articleId, isArticleActive } = req.body;

  const article = await ArticleModel.findOne({
    _id: articleId,
    author: authorId,
  });

  if (!article) {
    return res.status(404).json({ message: "Not found" });
  }

  article.isArticleActive = isArticleActive;
  await article.save();

  res.json({ message: "Status updated", payload: article });
});