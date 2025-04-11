import { RequestHandler, Router } from "express";
import {
  fetchServer,
  getAdminServers,
  getChannelIds,
  updateServer,
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
router.post(
  "/update-server/:id",
  isAuthenticated as RequestHandler,
  updateServer as RequestHandler
);
router.get(
  "/get-channelIds/:id",
  isAuthenticated as RequestHandler,
  getChannelIds as RequestHandler
);

export default router;
