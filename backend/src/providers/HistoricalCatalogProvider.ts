import type { HistoricalCatalog } from "../models/HistoricalCatalog.js";

export interface HistoricalCatalogProvider {
  getCatalog(): Promise<HistoricalCatalog>;
}
