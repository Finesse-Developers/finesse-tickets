import { RequestHandler, Router } from "express";
import {
  fetchServer,
  getAdminServers,
  getChannelIds,
  getRolesAndCategories,
  updateServer,
} from "../controllers/dashboard.controller";
import {
  isAuthenticated,
  isUserAuthorizedForGuild,
} from "../middleware/auth.middleware";

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
  isUserAuthorizedForGuild as RequestHandler,
  updateServer as RequestHandler
);

router.get(
  "/get-channelIds/:id",
  isAuthenticated as RequestHandler,
  getChannelIds as RequestHandler
);

router.get(
  "/get-roles-categories/:id",
  isAuthenticated as RequestHandler,
  isUserAuthorizedForGuild as RequestHandler,
  getRolesAndCategories
);

export default router;
