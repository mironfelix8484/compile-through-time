import type { HistoricalDevelopmentExperience } from "./HistoricalDevelopmentExperience.js";

export type FidelityLevel = "VERIFIED" | "RECONSTRUCTED" | "SIMULATED";
export interface VersionedProduct { id: string; name: string; version?: string }

export interface WorkspaceSnapshot {
  id: string;
  title: string;
  representativeDate: string;
  validFrom: string;
  validTo: string;
  operatingSystem: VersionedProduct & { edition: string; architecture: string; locale: string };
  desktopEnvironment: { name: string; version: string; theme: string; taskbar: string };
  wallpaper: { asset: string; placement: "cover"; fidelity: FidelityLevel; notes: string };
  developmentEnvironment: VersionedProduct;
  compilerOrBuildSystem: VersionedProduct;
  language: VersionedProduct;
  buildAction: { label: string; kind: "BUILD"; trigger: "MENU"; shortcut: string };
  runAction: { label: string; kind: "RUN"; trigger: "MENU"; shortcut: string };
  visualAtmosphere: { resolution: "640x200" | "640x400" | "1024x768"; colorDepth: "16-color" | "32-bit"; fontRendering: string };
  fidelity: FidelityLevel;
  evidenceIds: string[];
  transcriptPath: string;
  researchNotesPath: string;
  experience: HistoricalDevelopmentExperience;
}
