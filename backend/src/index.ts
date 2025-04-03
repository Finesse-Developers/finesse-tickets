import "dotenv/config";
import cors from "cors";
import express, { Request, Response } from "express";
import "./bot";
import cookieParser from "cookie-parser";
import passport from "./strategy/discordStrategy";
import mongoose from "mongoose";
import session from "express-session";

const PORT = process.env.PORT || 6969;
const sessionSecret = process.env.SESSION_SECRET;

if (!sessionSecret) throw new Error("missing .env variables");

import authRoutes from "./routes/auth.route";

const app = express();

// test push notif

app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use(
  session({
    secret: sessionSecret,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production", // use secure cookies for production
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

mongoose
  .connect(process.env.MONGO_URI!)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

app.use("/auth", authRoutes);
app.get("/", (_req: Request, res: Response) => {
  res.send(200);
  return;
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
