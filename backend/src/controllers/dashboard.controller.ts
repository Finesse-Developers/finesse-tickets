import { Response } from "express";
import UserModel from "../models/User.model";
import { client } from "../bot";
import { CustomRequest, UserGuildDataType } from "./auth.controller";

export const getAdminServers = async (
  req: CustomRequest,
  res: Response
): Promise<void> => {
  try {
    if (!req.user?.accessToken) {
      res.status(401).json({ error: "Unauthorized: No access token" });
      return;
    }

    const user = await UserModel.findById(req.user.user.id);
    if (!user) {
      res.status(401).json({ error: "Unauthorized: User not found" });
      return;
    }

    // 1. Fetch user's guilds from Discord API
    const response = await fetch("https://discord.com/api/users/@me/guilds", {
      headers: {
        Authorization: `Bearer ${req.user.accessToken}`,
      },
    });

    console.log(req.user.accessToken);

    if (!response.ok) {
      res
        .status(401)
        .json({ error: "Failed to fetch user guilds from Discord" });
      return;
    }

    const userGuildsData = (await response.json()) as UserGuildDataType[];

    // 2. Filter guilds where user is an admin or owner
    const adminGuilds = userGuildsData.filter((guild) => {
      const permissions = BigInt(guild.permissions);
      const hasAdminPermission = (permissions & BigInt(0x8)) === BigInt(0x8); // 0x8 = ADMINISTRATOR
      return guild.owner || hasAdminPermission;
    });

    // 3. Compare with bot's mutual guilds
    const botGuilds = client.guilds.cache;
    const mutualAdminGuilds = adminGuilds
      .filter((guild) => botGuilds.has(guild.id))
      .map((guild) => ({
        id: guild.id,
        name: guild.name,
        icon: guild.icon
          ? `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png`
          : null,
      }));

    console.log(`Admin servers for user ${user.discordId}:`, mutualAdminGuilds);

    res.json(mutualAdminGuilds);
  } catch (error) {
    console.error("Error fetching admin servers:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
