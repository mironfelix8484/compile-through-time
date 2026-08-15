import type { Runtime } from "../models/Runtime.js";
import type { RuntimeProvider } from "../providers/RuntimeProvider.js";

export class InvalidDateError extends Error {
  constructor() {
    super("date must be a valid calendar date in YYYY-MM-DD format");
  }
}

export class EnvironmentService {
  constructor(private readonly runtimeProvider: RuntimeProvider) {}

  async findAvailableOn(date: string): Promise<Runtime[]> {
    if (!isValidIsoDate(date)) throw new InvalidDateError();
    return (await this.runtimeProvider.getRuntimes()).filter(
      ({ availableFrom, availableTo }) => availableFrom <= date && (!availableTo || date <= availableTo),
    );
  }
}

function isValidIsoDate(value: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const [year, month, day] = value.split("-").map(Number);
  const parsed = new Date(Date.UTC(year, month - 1, day));
  return parsed.getUTCFullYear() === year && parsed.getUTCMonth() === month - 1 && parsed.getUTCDate() === day;
}
