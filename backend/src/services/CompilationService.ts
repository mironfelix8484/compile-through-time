import type { Compilation } from "../models/Compilation.js";
import type { CompilationProvider } from "../providers/CompilationProvider.js";

export class CompilationService {
  constructor(private readonly compilationProvider: CompilationProvider) {}

  compile(environmentId: string): Promise<Compilation> {
    return this.compilationProvider.compile(environmentId);
  }
}
