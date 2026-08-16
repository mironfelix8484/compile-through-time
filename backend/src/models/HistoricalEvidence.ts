export type EvidenceSourceType = "SCREENSHOT" | "VIDEO" | "MANUAL" | "OFFICIAL_DOCUMENTATION" | "VM_EXECUTION";
export type ConfidenceLevel = "HIGH" | "MEDIUM" | "LOW";

export interface HistoricalEvidence {
  id: string;
  sourceType: EvidenceSourceType;
  title: string;
  sourceUrl?: string;
  localPath?: string;
  publishedDate?: string;
  capturedDate: string;
  accessedDate?: string;
  pageOrTimestamp?: string;
  softwareVersions: string[];
  supports: string[];
  notes: string;
  confidenceLevel: ConfidenceLevel;
  sha256?: string;
  rights: { redistributable: boolean; license?: string; attribution?: string };
}
