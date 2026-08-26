import { readFile } from "node:fs/promises";
import type { ResearchArtifactLoader } from "./ResearchArtifactRepository.js";

export class NodeResearchArtifactLoader implements ResearchArtifactLoader {
  async read<T>(relativePath: string): Promise<T> {
    const repositoryRoot = new URL("../../../", import.meta.url);
    return JSON.parse(await readFile(new URL(relativePath, repositoryRoot), "utf8")) as T;
  }
}
