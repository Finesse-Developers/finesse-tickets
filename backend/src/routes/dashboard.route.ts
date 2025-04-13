import { RequestHandler, Router } from "express";
import {
  fetchServer,
  getAdminServers,
  getCategories,
  getChannelIds,
  getRoles,
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

router.get(
  "/get-categories/:id",
  isAuthenticated as RequestHandler,
  getCategories as RequestHandler
);

router.get("/get-roles/:id", isAuthenticated as RequestHandler, getRoles);

export default router;
