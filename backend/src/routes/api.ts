import { Router } from "express";
import { EnvironmentController } from "../controllers/EnvironmentController.js";
import { StaticRuntimeProvider } from "../providers/StaticRuntimeProvider.js";
import { EnvironmentService } from "../services/EnvironmentService.js";

export const apiRouter = Router();
const controller = new EnvironmentController(new EnvironmentService(new StaticRuntimeProvider()));
apiRouter.get("/health", (_request, response) => response.json({ status: "ok" }));
apiRouter.get("/environments", controller.getByDate);
