import { RequestHandler, Router } from "express";
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

router.get("/", discordAuthenticatePassport as RequestHandler);
router.get(
  "/discord/callback",
  discordAuthRedirect,
  authorizeUser as RequestHandler
);
// Get current user
router.get("/me", getCurrentUser as RequestHandler);
router.get("/check-session", checkSession as RequestHandler);
router.get("/dashboard", getAdminServers as RequestHandler);
router.post("/logout", logout);

export default router;
