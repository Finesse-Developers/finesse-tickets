import { Router } from "express";
import {
  authorizeUser,
  discordAuthenticatePassport,
  discordAuthRedirect,
  getAdminServers,
  getCurrentUser,
} from "../controllers/auth.controller";

const router = Router();

router.get("/", discordAuthenticatePassport);
router.get("/discord/callback", discordAuthRedirect, authorizeUser);
// Get current user
router.get("/me", getCurrentUser);
router.get("/dashboard", getAdminServers);

export default router;
