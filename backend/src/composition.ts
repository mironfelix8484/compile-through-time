import { FakeCompilationProvider } from "./providers/FakeCompilationProvider.js";
import { StaticHistoricalCatalogProvider } from "./providers/StaticHistoricalCatalogProvider.js";
import type { ResearchArtifactRepository } from "./research/ResearchArtifactRepository.js";
import { CompilationService } from "./services/CompilationService.js";
import { EnvironmentService } from "./services/EnvironmentService.js";

export function createBackendServices(artifacts: ResearchArtifactRepository) {
  const catalog = new StaticHistoricalCatalogProvider(artifacts);
  return {
    environments: new EnvironmentService(catalog),
    compilations: new CompilationService(new FakeCompilationProvider(catalog, artifacts)),
  };
}
