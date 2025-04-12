import { RequestHandler, Router } from "express";
import { isAuthenticated } from "../middleware/auth.middleware";
import { createPanel, getPanels } from "../controllers/panel.controller";

const panelRoutes = Router();

panelRoutes.get(
  "/get-panels/:serverId",
  isAuthenticated as RequestHandler,
  getPanels as RequestHandler
);
panelRoutes.post(
  "/create",
  isAuthenticated as RequestHandler,
  createPanel as RequestHandler
);

export default panelRoutes;
