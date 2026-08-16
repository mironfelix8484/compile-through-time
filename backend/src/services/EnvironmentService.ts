import type { DevelopmentEnvironment } from "../models/DevelopmentEnvironment.js";
import type { WorkspaceSnapshotRecord } from "../models/WorkspaceSnapshotRecord.js";
import type { HistoricalCatalog } from "../models/HistoricalCatalog.js";
import type { HistoricalCatalogProvider } from "../providers/HistoricalCatalogProvider.js";

export class InvalidDateError extends Error {
  constructor() { super("date must be a valid calendar date in YYYY-MM-DD format"); }
}

export class EnvironmentService {
  constructor(private readonly catalogProvider: HistoricalCatalogProvider) {}

  async findAvailableOn(date: string): Promise<DevelopmentEnvironment[]> {
    if (!isValidIsoDate(date)) throw new InvalidDateError();
    const catalog = await this.catalogProvider.getCatalog();
    return catalog.workspaceSnapshots
      .filter(({ validFrom, validTo }) => validFrom <= date && (!validTo || date <= validTo))
      .map((snapshot) => projectSnapshot(snapshot, catalog));
  }
}

function projectSnapshot(scenario: WorkspaceSnapshotRecord, catalog: HistoricalCatalog): DevelopmentEnvironment {
  const operatingSystem = required(catalog.operatingSystems, scenario.operatingSystemId, "operating system");
  const language = required(catalog.languages, scenario.languageId, "language");
  const ide = required(catalog.ides, scenario.ideId, "IDE");
  const toolchain = required(catalog.compilers, scenario.compilerId, "compiler");

  return {
    id: scenario.id,
    title: scenario.title,
    operatingSystem: operatingSystem.name,
    tool: { name: ide.name, type: "ide" },
    languages: [language.name],
    availableFrom: scenario.validFrom,
    compilerOrBuildSystem: toolchain.name,
    fidelity: scenario.fidelity,
    evidence: scenario.evidenceIds.map((id) => required(catalog.evidence, id, "evidence")),
    experience: scenario.experience,
    availableTo: scenario.validTo,
  };
}

function required<T extends { id: string }>(items: T[], id: string, kind: string): T {
  const item = items.find((candidate) => candidate.id === id);
  if (!item) throw new Error(`Catalog references unknown ${kind} '${id}'`);
  return item;
}

function isValidIsoDate(value: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const [year, month, day] = value.split("-").map(Number);
  const parsed = new Date(Date.UTC(year, month - 1, day));
  return parsed.getUTCFullYear() === year && parsed.getUTCMonth() === month - 1 && parsed.getUTCDate() === day;
}
