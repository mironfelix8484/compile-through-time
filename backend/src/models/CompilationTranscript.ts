export interface CompilationPhase {
  id: string;
  label: string;
  status: "succeeded" | "failed";
  output: string;
  evidenceIds?: string[];
}

export interface CompilationTranscript {
  status: "succeeded" | "failed";
  buildOutput: string;
  executionOutput: string;
  warnings: string[];
  errors: string[];
  phases: CompilationPhase[];
}
