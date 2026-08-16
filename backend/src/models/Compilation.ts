import type { CompilationTranscript } from "./CompilationTranscript.js";

export interface Compilation extends CompilationTranscript {
  compilationId: string;
  /** @deprecated Use buildOutput. */
  output: string;
  /** @deprecated Use executionOutput. */
  programOutput: string;
}
