import type { Compiler } from "./Compiler.js";
import type { WorkspaceSnapshotRecord } from "./WorkspaceSnapshotRecord.js";
import type { IDE } from "./IDE.js";
import type { OperatingSystem } from "./OperatingSystem.js";
import type { ProgrammingLanguage } from "./ProgrammingLanguage.js";
import type { Runtime } from "./Runtime.js";
import type { HistoricalEvidence } from "./HistoricalEvidence.js";

export interface HistoricalCatalog {
  operatingSystems: OperatingSystem[];
  runtimes: Runtime[];
  compilers: Compiler[];
  ides: IDE[];
  languages: ProgrammingLanguage[];
  workspaceSnapshots: WorkspaceSnapshotRecord[];
  evidence: HistoricalEvidence[];
}
