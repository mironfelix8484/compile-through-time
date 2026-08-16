import { randomUUID } from "node:crypto";
import type { Compilation } from "../models/Compilation.js";
import { ResearchArtifactRepository } from "../research/ResearchArtifactRepository.js";
import type { CompilationProvider } from "./CompilationProvider.js";
import type { HistoricalCatalogProvider } from "./HistoricalCatalogProvider.js";

export class RuntimeNotFoundError extends Error {
  constructor(environmentId: string) { super(`environment '${environmentId}' was not found`); }
}

export class FakeCompilationProvider implements CompilationProvider {
  constructor(
    private readonly catalogProvider: HistoricalCatalogProvider,
    private readonly artifacts = new ResearchArtifactRepository(),
  ) {}

  async compile(environmentId: string): Promise<Compilation> {
    const catalog = await this.catalogProvider.getCatalog();
    const snapshot = catalog.workspaceSnapshots.find(({ id }) => id === environmentId);
    if (!snapshot) throw new RuntimeNotFoundError(environmentId);

    const transcript = await this.artifacts.getTranscript(snapshot.transcriptPath);
    return {
      compilationId: randomUUID(),
      ...transcript,
      output: transcript.buildOutput,
      programOutput: transcript.executionOutput,
    };
  }
}
