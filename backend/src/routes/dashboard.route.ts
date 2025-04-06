import { RequestHandler, Router } from "express";
import {
  fetchServer,
  getAdminServers,
} from "../controllers/dashboard.controller";
import { isAuthenticated } from "../middleware/auth.middleware";

const router = Router();

router.get(
  "/",
  isAuthenticated as RequestHandler,
  getAdminServers as RequestHandler
);
router.get(
  "/fetch-server/:id",
  isAuthenticated as RequestHandler,
  fetchServer as RequestHandler
);

export default router;
