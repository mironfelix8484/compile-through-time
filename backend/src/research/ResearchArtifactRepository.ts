import { readFile } from "node:fs/promises";
import type { CompilationTranscript } from "../models/CompilationTranscript.js";
import type { HistoricalEvidence } from "../models/HistoricalEvidence.js";
import type { WorkspaceSnapshot } from "../models/WorkspaceSnapshot.js";

const workspaceManifests = [
  "scenarios/unix-v7-cc-c/scenario.yaml",
  "scenarios/ibm-pc-dos-basica/scenario.yaml",
  "scenarios/ms-dos-5-turbo-pascal/scenario.yaml",
  "scenarios/ubuntu-8-eclipse-java/scenario.yaml",
  "scenarios/ubuntu-14-netbeans-8-java/scenario.yaml",
  "scenarios/windows-95-vb4/scenario.yaml",
  "scenarios/windows-98-vcpp6-cpp/scenario.yaml",
  "scenarios/windows-xp-vs2005-csharp/scenario.yaml",
  "scenarios/windows-11-vscode-typescript/scenario.yaml",
];

export class ResearchArtifactRepository {
  async getWorkspaceSnapshots(): Promise<WorkspaceSnapshot[]> {
    return Promise.all(workspaceManifests.map((path) => readArtifact<WorkspaceSnapshot>(path)));
  }

  async getEvidence(): Promise<HistoricalEvidence[]> {
    const index = await readArtifact<{ evidenceIds: string[] }>("research/evidence/index.yaml");
    return Promise.all(index.evidenceIds.map((id) => readArtifact<HistoricalEvidence>(`research/evidence/${id}.yaml`)));
  }

  getTranscript(path: string): Promise<CompilationTranscript> {
    return readArtifact<CompilationTranscript>(path);
  }
}

async function readArtifact<T>(relativePath: string): Promise<T> {
  const repositoryRoot = new URL("../../../", import.meta.url);
  const contents = await readFile(new URL(relativePath, repositoryRoot), "utf8");
  return JSON.parse(contents) as T;
}
