import type { Compilation } from "../models/Compilation.js";

export interface CompilationProvider {
  compile(environmentId: string): Promise<Compilation>;
}
