import { Request, Response } from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import User, { UserDocument } from "../models/User.model";

export const discordAuthenticatePassport = passport.authenticate("discord");

export const discordAuthRedirect = passport.authenticate("discord", {
  failureRedirect: "http://localhost:5173/",
  successRedirect: "http://localhost:5173/dashboard",
});

export const authorizeUser = async (req: Request, res: Response) => {
  if (!req.user) return res.redirect("/");
  if (!process.env.JWT_SECRET) throw new Error("missing .env variables");

  const user = req.user as UserDocument;
  const token = jwt.sign({ id: user.discordId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("token", token, { httpOnly: true, secure: false });
  res.redirect(`${process.env.FRONTEND_URL}/dashboard`);
};

export const getCurrentUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const token = req.cookies.token;
  if (!token) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
    const user = await User.findOne({ discordId: decoded.id });

    if (!user) {
      res.status(401).json({ error: "User not found" });
      return;
    }

    res.json(user);
    return;
  } catch (err) {
    res.status(401).json({ error: "Invalid token" });
    return;
  }
};
