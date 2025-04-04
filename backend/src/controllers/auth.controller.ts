import { NextFunction, Request, Response } from "express";
import passport from "passport";
import { UserDocument } from "../models/User.model";
import { client } from "../bot";

export const discordAuthenticatePassport = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.user) {
    // If user is already authenticated, redirect to the dashboard
    return res.redirect("/auth/dashboard");
  } else {
    passport.authenticate("discord")(req, res, next);
  }
};

export const discordAuthRedirect = passport.authenticate("discord", {
  // failureRedirect: "http://localhost:5173/",
  // successRedirect: "http://localhost:5173/dashboard",
  failureRedirect: "/",
  successRedirect: "/auth/dashboard",
});

export const authorizeUser = async (req: Request, res: Response) => {
  if (!req.user) {
    res.redirect("/");
    return;
  }

  // res.redirect(`${process.env.FRONTEND_URL}/dashboard`);
  res.redirect("/auth/dashboard");
};

export const getCurrentUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  if (!req.user) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  res.json(req.user);
  return;
};

export const getAdminServers = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    const user = req.user as UserDocument;
    const guilds = client.guilds.cache;

    console.log("Guilds available:", guilds);

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

    res.json({ adminServers });
    return;
  } catch (error) {
    console.error("Error fetching admin servers:", error);
    res.status(500).json({ error: "Internal server error" });
    return;
  }
};
