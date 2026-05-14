import exp from "express";
import { UserModel } from "../models/UserModel.js";
import { hash, compare } from "bcryptjs";
import jwt from "jsonwebtoken";
import { verifyToken } from "../middlewares/VerifyToken.js";
import { config } from "dotenv";
import { upload } from "../config/multer.js";
import { uploadToCloudinary } from "../config/cloudinaryUpload.js";

config();
const { sign } = jwt;

export const commonApp = exp.Router();

// Register
commonApp.post("/users", upload.single("profileImageUrl"), async (req, res, next) => {
  try {
    const newUser = req.body;

    const allowedRoles = ["USER", "AUTHOR"];
    if (!allowedRoles.includes(newUser.role)) {
      return res.status(400).json({ message: "Invalid role" });
    }

    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer);
      newUser.profileImageUrl = result.secure_url;
    }

    newUser.password = await hash(newUser.password, 10);

    const userDoc = new UserModel(newUser);
    await userDoc.save();

    res.status(201).json({ message: "User created" });
  } catch (err) {
    next(err);
  }
});

// Login
commonApp.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await UserModel.findOne({ email });

  if (!user) {
    return res.status(400).json({ message: "Invalid email" });
  }

  const matched = await compare(password, user.password);

  if (!matched) {
    return res.status(400).json({ message: "Invalid password" });
  }

  const token = sign(
    {
      id: user._id,
      email: user.email,
      role: user.role,
    },
    process.env.SECRET_KEY,
    { expiresIn: "1h" }
  );

  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "lax",
  });

  const userObj = user.toObject();
  delete userObj.password;

  res.json({ payload: userObj });
});

// Logout
commonApp.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged out" });
});

// Check auth
commonApp.get(
  "/check-auth",
  verifyToken("USER", "AUTHOR", "ADMIN"),
  (req, res) => {
    res.json({ payload: req.user });
  }
);