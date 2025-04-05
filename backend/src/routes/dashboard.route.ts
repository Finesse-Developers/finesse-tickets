import { RequestHandler, Router } from "express";
import { getAdminServers } from "../controllers/dashboard.controller";
import { isAuthenticated } from "../middleware/auth.middleware";

const router = Router();

router.get(
  "/",
  isAuthenticated as RequestHandler,
  getAdminServers as RequestHandler
);

export default router;
