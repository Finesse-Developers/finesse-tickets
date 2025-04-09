import { NextFunction, Request, Response } from "express";
import passport from "passport";
import { UserDocument } from "../models/User.model";
import { Session, SessionData } from "express-session";

export interface CustomSessionData extends SessionData {
  passport?: {
    user: {
      id: string;
      accessToken: string;
    };
  };
}

export interface CustomRequest extends Request {
  session: Session & CustomSessionData;
  user?: {
    user: UserDocument;
    accessToken: string;
  };
}

export type UserGuildDataType = {
  id: string;
  name: string;
  icon: string | null;
  owner: boolean;
  permissions: string;
};

export const discordAuthenticatePassport = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  if (req.session.passport?.user) {
    // If user is already authenticated, redirect to the dashboard
    return res.redirect(`${process.env.FRONTEND_URL}/dashboard`);
  } else {
    passport.authenticate("discord")(req, res, next);
  }
};

export const discordAuthRedirect = passport.authenticate("discord", {
  failureRedirect: `${process.env.FRONTEND_URL}`,
  successRedirect: `${process.env.FRONTEND_URL}/dashboard`,
  // failureRedirect: "/",
  // successRedirect: "/auth/dashboard",
});

export const authorizeUser = async (req: CustomRequest, res: Response) => {
  if (!req.session.passport?.user) {
    res.redirect("/auth");
    return;
  }

  res.redirect(`${process.env.FRONTEND_URL}/dashboard`);
  // res.redirect("http://localhost:5173/dashboard");
  return;
};

export const getCurrentUser = async (
  req: CustomRequest,
  res: Response
): Promise<void> => {
  if (!req.user) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  // debugging purposes
  // res.json({
  //   user: req.user,
  //   accessToken: req.user.accessToken,
  //   reqSession: req.session,
  // });
  res.json(req.user.user);
  return;
};

export const logout = (req: Request, res: Response) => {
  req.session.destroy((err: Error | null) => {
    if (err) {
      return res.status(500).send("Error logging out");
    }
    res.clearCookie("connect.sid"); // Remove the session cookie
    res.status(200).send("Logged out");
    return;
  });
};

export const checkSession = async (req: CustomRequest, res: Response) => {
  if (!req.session.passport?.user) {
    res.status(401).json({ message: "Not authenticated" });
    return;
  }

  try {
    const user = req.session.passport.user;
    res.json({
      user,
      accessToken: req.session.passport.user.accessToken,
    });
  } catch (error) {
    console.error("Error checking session:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
