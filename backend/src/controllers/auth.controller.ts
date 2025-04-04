import { NextFunction, Request, Response } from "express";
import passport from "passport";
import UserModel from "../models/User.model";
import { client } from "../bot";
import { Session, SessionData } from "express-session";

interface CustomSessionData extends SessionData {
  passport?: {
    user: string;
  };
}

interface CustomRequest extends Request {
  session: Session & CustomSessionData;
}

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
    res.redirect(`${process.env.FRONTEND_URL}/`);
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
  if (!req.session.passport?.user) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  res.json(req.user);
  return;
};

export const getAdminServers = async (
  req: CustomRequest,
  res: Response
): Promise<void> => {
  try {
    if (!req.session.passport?.user) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    const user = await UserModel.findById(req.session.passport.user);
    if (!user) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    const guilds = client.guilds.cache;

    const adminServers = [];

    for (const guild of guilds.values()) {
      // Fetch the member if not cached
      const member =
        guild.members.cache.get(user.discordId) ||
        (await guild.members.fetch(user.discordId));

      if (member) {
        // Check if any of the member's roles have "ADMINISTRATOR" permission
        const hasAdminPermission = member.roles.cache.some((role) =>
          role.permissions.has("Administrator")
        );

        if (hasAdminPermission || member.permissions.has("Administrator")) {
          console.log(`User ${user.discordId} is an admin in ${guild.name}`);
          adminServers.push({
            id: guild.id,
            name: guild.name,
            icon: guild.icon
              ? `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png`
              : null,
          });
        } else {
          console.log(
            `User ${user.discordId} is not an admin in ${guild.name}`
          );
        }
      } else {
        console.log(`User ${user.discordId} not found in guild ${guild.name}`);
      }
    }

    res.json(adminServers);
    return;
  } catch (error) {
    console.error("Error fetching admin servers:", error);
    res.status(500).json({ error: "Internal server error" });
    return;
  }
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
  // If there's no session or no user in the session, return an unauthorized error
  if (!req.session.passport?.user) {
    res.status(401).json({ message: "Not authenticated" });
    return;
  }

  try {
    console.log(req.session.passport.user);
    // Fetch the user from the database using the discordId stored in the session
    const user = await UserModel.findById(req.session.passport.user);

    if (!user) {
      res.status(401).json({ message: "User not found" });
      return;
    }

    // Return the user object
    res.json(user);
    return;
  } catch (error) {
    console.error("Error fetching user from database:", error);
    res.status(500).json({ error: "Internal server error" });
    return;
  }
};
