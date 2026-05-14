import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    firstName: String,
    lastName: String,
    email: { type: String, unique: true },
    password: String,
    role: {
      type: String,
      enum: ["USER", "AUTHOR", "ADMIN"],
    },
    profileImageUrl: String,
    isUserActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export const UserModel = model("user", userSchema);