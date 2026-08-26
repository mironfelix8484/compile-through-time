import { Router } from "express";
import { CompilationController } from "../controllers/CompilationController.js";
import { EnvironmentController } from "../controllers/EnvironmentController.js";
import type { ResearchArtifactRepository } from "../research/ResearchArtifactRepository.js";
import { createBackendServices } from "../composition.js";

export function createApiRouter(artifacts: ResearchArtifactRepository): Router {
  const apiRouter = Router();
  const services = createBackendServices(artifacts);
  const environmentController = new EnvironmentController(services.environments);
  const compilationController = new CompilationController(services.compilations);
  apiRouter.get("/health", (_request, response) => response.json({ status: "ok" }));
  apiRouter.get("/environments", environmentController.getByDate);
  apiRouter.post("/compilations", compilationController.create);
  return apiRouter;
}
