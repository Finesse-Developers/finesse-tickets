import { RequestHandler, Router } from "express";
import {
  isAuthenticated,
  isUserAuthorizedForGuild,
} from "../middleware/auth.middleware";
import { createPanel, getPanels } from "../controllers/panel.controller";

const panelRoutes = Router();

panelRoutes.get(
  "/get-panels/:id",
  isAuthenticated as RequestHandler,
  isUserAuthorizedForGuild as RequestHandler,
  getPanels as RequestHandler
);
panelRoutes.post(
  "/create",
  isAuthenticated as RequestHandler,
  isUserAuthorizedForGuild as RequestHandler,
  createPanel as RequestHandler
);

export default panelRoutes;
