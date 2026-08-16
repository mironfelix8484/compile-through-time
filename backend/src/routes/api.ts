import { Router } from "express";
import { CompilationController } from "../controllers/CompilationController.js";
import { EnvironmentController } from "../controllers/EnvironmentController.js";
import { FakeCompilationProvider } from "../providers/FakeCompilationProvider.js";
import { StaticHistoricalCatalogProvider } from "../providers/StaticHistoricalCatalogProvider.js";
import { CompilationService } from "../services/CompilationService.js";
import { EnvironmentService } from "../services/EnvironmentService.js";

export const apiRouter = Router();
const catalogProvider = new StaticHistoricalCatalogProvider();
const environmentController = new EnvironmentController(new EnvironmentService(catalogProvider));
const compilationController = new CompilationController(
  new CompilationService(new FakeCompilationProvider(catalogProvider)),
);
apiRouter.get("/health", (_request, response) => response.json({ status: "ok" }));
apiRouter.get("/environments", environmentController.getByDate);
apiRouter.post("/compilations", compilationController.create);
