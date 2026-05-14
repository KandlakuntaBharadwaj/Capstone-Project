import jwt from "jsonwebtoken";
import { config } from "dotenv";

config();

export const verifyToken = (...roles) => {
  return (req, res, next) => {
    try {
      const token = req.cookies.token;

      if (!token) {
        return res.status(401).json({ message: "Login required" });
      }

      const decoded = jwt.verify(token, process.env.SECRET_KEY);

      if (!roles.includes(decoded.role)) {
        return res.status(403).json({ message: "Unauthorized" });
      }

      req.user = decoded;
      next();
    } catch {
      res.status(401).json({ message: "Invalid token" });
    }
  };
};