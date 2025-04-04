import { Router } from "express";
import {
  authorizeUser,
  checkSession,
  discordAuthenticatePassport,
  discordAuthRedirect,
  getAdminServers,
  getCurrentUser,
  logout,
} from "../controllers/auth.controller";

const router = Router();

router.get("/", discordAuthenticatePassport);
router.get("/discord/callback", discordAuthRedirect, authorizeUser);
// Get current user
router.get("/me", getCurrentUser);
router.get("/check-session", checkSession);
router.get("/dashboard", getAdminServers);
router.post("/logout", logout);

export default router;
