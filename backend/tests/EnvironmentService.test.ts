import { describe, expect, it } from "vitest";
import type { Runtime } from "../src/models/Runtime.js";
import type { RuntimeProvider } from "../src/providers/RuntimeProvider.js";
import { EnvironmentService, InvalidDateError } from "../src/services/EnvironmentService.js";

const item: Runtime = { id: "example", operatingSystem: "Example OS", tool: { name: "Example IDE", type: "ide" }, languages: ["TypeScript"], availableFrom: "2000-01-01", availableTo: "2000-12-31" };
const service = new EnvironmentService({ getRuntimes: async () => [item] } satisfies RuntimeProvider);

describe("EnvironmentService", () => {
  it("returns environments available on the requested date", async () => {
    await expect(service.findAvailableOn("2000-06-15")).resolves.toEqual([item]);
  });
  it("treats availability boundaries as inclusive", async () => {
    await expect(service.findAvailableOn("2000-01-01")).resolves.toEqual([item]);
    await expect(service.findAvailableOn("2000-12-31")).resolves.toEqual([item]);
  });
  it("rejects malformed and impossible dates", async () => {
    await expect(service.findAvailableOn("2000-02-30")).rejects.toBeInstanceOf(InvalidDateError);
    await expect(service.findAvailableOn("06/15/2000")).rejects.toBeInstanceOf(InvalidDateError);
  });
});
