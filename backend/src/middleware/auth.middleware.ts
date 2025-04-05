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
