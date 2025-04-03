import { Router } from "express";
import {
  authorizeUser,
  discordAuthenticatePassport,
  discordAuthRedirect,
  getCurrentUser,
} from "../controllers/auth.controller";

const router = Router();

router.get("/", discordAuthenticatePassport);
router.get("/discord/callback", discordAuthRedirect, authorizeUser);
// Get current user
router.get("/me", getCurrentUser);

export default router;
