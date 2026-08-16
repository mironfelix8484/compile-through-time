import type { HistoricalDevelopmentExperience } from "./HistoricalDevelopmentExperience.js";
import type { HistoricalEvidence } from "./HistoricalEvidence.js";
import type { FidelityLevel } from "./WorkspaceSnapshot.js";

export interface DevelopmentEnvironment {
  id: string;
  title: string;
  operatingSystem: string;
  tool: { name: string; type: "ide" | "compiler" };
  languages: string[];
  availableFrom: string;
  availableTo?: string;
  compilerOrBuildSystem: string;
  experience?: HistoricalDevelopmentExperience;
  fidelity: FidelityLevel;
  evidence: HistoricalEvidence[];
}
