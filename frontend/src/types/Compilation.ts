export interface CompilationResponse {
  compilationId: string;
  status: string;
  output: string;
  buildOutput: string;
  executionOutput: string;
  warnings: string[];
  errors: string[];
  phases: Array<{ id: string; label: string; status: "succeeded"; output: string }>;
  programOutput: string;
}
