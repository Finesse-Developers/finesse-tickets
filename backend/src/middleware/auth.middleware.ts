import { NextFunction, Response } from "express";
import { CustomRequest } from "../controllers/auth.controller";

export const isAuthenticated = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  if (req.session && req.user?.user) {
    return next();
  } else {
    return res.status(401).json({ message: "Unauthorized: Please log in." });
  }
};

export const isUserAuthorizedForGuild = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    console.log("Session guilds:", req.session.adminGuilds);

    const isAuthorized = req.session.adminGuilds?.some((gid) => gid === id);

    if (!isAuthorized) {
      console.log("User not authorized");
      return res
        .status(403)
        .json({ error: "User not authorized for this guild" });
    }

    return next();
  } catch (error) {
    console.error("Authorization middleware error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
