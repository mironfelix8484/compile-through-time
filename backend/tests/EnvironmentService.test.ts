import { describe, expect, it } from "vitest";
import type { HistoricalCatalog } from "../src/models/HistoricalCatalog.js";
import type { HistoricalCatalogProvider } from "../src/providers/HistoricalCatalogProvider.js";
import { EnvironmentService, InvalidDateError } from "../src/services/EnvironmentService.js";

const catalog: HistoricalCatalog = {
  operatingSystems: [{ id: "example-os", name: "Example OS" }],
  compilers: [{ id: "example-compiler", name: "Example Compiler" }],
  runtimes: [],
  ides: [{ id: "example-ide", name: "Example IDE" }],
  languages: [{ id: "typescript", name: "TypeScript" }],
  evidence: [],
  workspaceSnapshots: [{
    id: "example",
    title: "Example historical scenario",
    operatingSystemId: "example-os",
    compilerId: "example-compiler",
    ideId: "example-ide",
    languageId: "typescript",
    validFrom: "2000-01-01",
    validTo: "2000-12-31",
    fidelity: "SIMULATED",
    evidenceIds: [],
    transcriptPath: "scenarios/example/transcript.json",
    experience: {
      source: { filename: "Program.cs", code: "" }, buildActionLabel: "Build Solution", programOutput: "Hello World",
      console: { title: "cmd.exe", presentation: "console-window" },
      visualStyle: { variant: "visual-studio-2005", chrome: "windows-xp", editorFont: "Courier New", colorScheme: "blue" },
    },
  }],
};
const service = new EnvironmentService({ getCatalog: async () => catalog } satisfies HistoricalCatalogProvider);

describe("EnvironmentService", () => {
  it("returns projected environments available on the requested date", async () => {
    await expect(service.findAvailableOn("2000-06-15")).resolves.toEqual([{
      id: "example",
      title: "Example historical scenario",
      operatingSystem: "Example OS",
      tool: { name: "Example IDE", type: "ide" },
      languages: ["TypeScript"],
      availableFrom: "2000-01-01",
      availableTo: "2000-12-31",
      compilerOrBuildSystem: "Example Compiler",
      fidelity: "SIMULATED",
      evidence: [],
      experience: catalog.workspaceSnapshots[0].experience,
    }]);
  });
  it("treats availability boundaries as inclusive", async () => {
    await expect(service.findAvailableOn("2000-01-01")).resolves.toHaveLength(1);
    await expect(service.findAvailableOn("2000-12-31")).resolves.toHaveLength(1);
  });
  it("rejects malformed and impossible dates", async () => {
    await expect(service.findAvailableOn("2000-02-30")).rejects.toBeInstanceOf(InvalidDateError);
    await expect(service.findAvailableOn("06/15/2000")).rejects.toBeInstanceOf(InvalidDateError);
  });
});
