import type { HistoricalDevelopmentExperience } from "./HistoricalDevelopmentExperience.js";
import type { FidelityLevel } from "./WorkspaceSnapshot.js";

export interface WorkspaceSnapshotRecord {
  id: string;
  title: string;
  operatingSystemId: string;
  compilerId: string;
  languageId: string;
  ideId: string;
  validFrom: string;
  validTo: string;
  experience: HistoricalDevelopmentExperience;
  fidelity: FidelityLevel;
  evidenceIds: string[];
  transcriptPath: string;
}
