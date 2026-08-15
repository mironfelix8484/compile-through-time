import type { EnvironmentsResponse } from "../types/Environment";

export async function getEnvironments(date: string, signal?: AbortSignal): Promise<EnvironmentsResponse> {
  const response = await fetch(`/api/environments?date=${encodeURIComponent(date)}`, { signal });
  if (!response.ok) throw new Error("Unable to load development environments.");
  return response.json() as Promise<EnvironmentsResponse>;
}
