import exp from "express";
import { config } from "dotenv";
import { connect } from "mongoose";
import { userApp } from "./APIs/UserAPI.js";
import { authorApp } from "./APIs/AuthorAPI.js";
import { adminApp } from "./APIs/AdminAPI.js";
import { commonApp } from "./APIs/CommonAPI.js";
import cookieParser from "cookie-parser";
import cors from "cors";


config();

const app = exp();

// CORS
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);

// Middleware
app.use(cookieParser());
app.use(exp.json());

// Routes
app.use("/user-api", userApp);
app.use("/author-api", authorApp);
app.use("/admin-api", adminApp);
app.use("/auth", commonApp);

// DB connection
const connectDB = async () => {
  try {
    await connect(process.env.DB_URL);
    console.log("DB connected");

    const port = process.env.PORT || 4000;
    app.listen(port, () => console.log(`Server running on ${port}`));
  } catch (err) {
    console.log(err);
  }
};

connectDB();

// Invalid route
app.use((req, res) => {
  res.status(404).json({ message: `Invalid path ${req.url}` });
});

// Error handler
app.use((err, req, res, next) => {
  console.log(err);

  if (err.name === "ValidationError") {
    return res.status(400).json({ error: err.message });
  }

  if (err.code === 11000) {
    return res.status(409).json({ error: "Duplicate field value" });
  }
  res.cookie("token", token, {
  httpOnly: true,
  secure: false, // local development
  sameSite: "lax",
});

  res.status(500).json({ error: "Server error" });
});