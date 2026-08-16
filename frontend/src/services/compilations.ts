import type { CompilationResponse } from "../types/Compilation";

export async function createCompilation(environmentId: string): Promise<CompilationResponse> {
  const response = await fetch("/api/compilations", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ environmentId }),
  });
  if (!response.ok) throw new Error("Unable to compile in the selected environment.");
  return response.json() as Promise<CompilationResponse>;
}
