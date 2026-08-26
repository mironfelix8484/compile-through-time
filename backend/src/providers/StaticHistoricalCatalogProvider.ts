import type { HistoricalCatalog } from "../models/HistoricalCatalog.js";
import { ResearchArtifactRepository } from "../research/ResearchArtifactRepository.js";
import type { HistoricalCatalogProvider } from "./HistoricalCatalogProvider.js";

export class StaticHistoricalCatalogProvider implements HistoricalCatalogProvider {
  constructor(private readonly artifacts: ResearchArtifactRepository) {}

  async getCatalog(): Promise<HistoricalCatalog> {
    const [manifests, evidence] = await Promise.all([this.artifacts.getWorkspaceSnapshots(), this.artifacts.getEvidence()]);
    const evidenceIds = new Set(evidence.map(({ id }) => id));
    for (const snapshot of manifests) {
      for (const id of snapshot.evidenceIds) {
        if (!evidenceIds.has(id)) throw new Error(`Workspace snapshot '${snapshot.id}' references unknown evidence '${id}'`);
      }
    }

    return {
      operatingSystems: unique(manifests.map(({ operatingSystem }) => ({ id: operatingSystem.id, name: displayName(operatingSystem) }))),
      ides: unique(manifests.map(({ developmentEnvironment }) => ({ id: developmentEnvironment.id, name: displayName(developmentEnvironment) }))),
      compilers: unique(manifests.map(({ compilerOrBuildSystem }) => ({ id: compilerOrBuildSystem.id, name: displayName(compilerOrBuildSystem) }))),
      languages: unique(manifests.map(({ language }) => ({ id: language.id, name: language.name }))),
      runtimes: [],
      evidence,
      workspaceSnapshots: manifests.map((snapshot) => ({
        id: snapshot.id,
        title: snapshot.title,
        operatingSystemId: snapshot.operatingSystem.id,
        compilerId: snapshot.compilerOrBuildSystem.id,
        ideId: snapshot.developmentEnvironment.id,
        languageId: snapshot.language.id,
        validFrom: snapshot.validFrom,
        validTo: snapshot.validTo,
        fidelity: snapshot.fidelity,
        evidenceIds: snapshot.evidenceIds,
        transcriptPath: snapshot.transcriptPath,
        experience: snapshot.experience,
      })),
    };
  }
}

function displayName(product: { name: string; version?: string }): string {
  return product.version ? `${product.name} ${product.version}` : product.name;
}

function unique<T extends { id: string }>(items: T[]): T[] {
  return [...new Map(items.map((item) => [item.id, item])).values()];
}
