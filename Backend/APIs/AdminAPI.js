import exp from "express";
export const adminApp = exp.Router();

// Dummy route
adminApp.get("/test", (req, res) => {
  res.json({ message: "Admin working" });
});