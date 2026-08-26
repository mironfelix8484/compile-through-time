import { createBackendServices } from "./composition.js";
import { RuntimeNotFoundError } from "./providers/FakeCompilationProvider.js";
import { BundledResearchArtifactLoader } from "./research/BundledResearchArtifactLoader.js";
import { ResearchArtifactRepository } from "./research/ResearchArtifactRepository.js";
import { InvalidDateError } from "./services/EnvironmentService.js";

const artifacts = new ResearchArtifactRepository(new BundledResearchArtifactLoader());
const services = createBackendServices(artifacts);

export async function handleRequest(request: Request): Promise<Response> {
  const url = new URL(request.url);
  if (request.method === "GET" && url.pathname === "/api/health") return json({ status: "ok" });

  if (request.method === "GET" && url.pathname === "/api/environments") {
    const date = url.searchParams.get("date");
    if (date === null) return json({ error: "date query parameter is required" }, 400);
    try {
      return json({ date, environments: await services.environments.findAvailableOn(date) });
    } catch (error) {
      if (error instanceof InvalidDateError) return json({ error: error.message }, 400);
      throw error;
    }
  }

  if (request.method === "POST" && url.pathname === "/api/compilations") {
    let body: unknown;
    try { body = await request.json(); } catch { return json({ error: "environmentId is required" }, 400); }
    const environmentId = (body as { environmentId?: unknown } | null)?.environmentId;
    if (typeof environmentId !== "string" || environmentId.trim() === "") {
      return json({ error: "environmentId is required" }, 400);
    }
    try {
      return json(await services.compilations.compile(environmentId), 201);
    } catch (error) {
      if (error instanceof RuntimeNotFoundError) return json({ error: error.message }, 400);
      throw error;
    }
  }
  return json({ error: "Not Found" }, 404);
}

function json(value: unknown, status = 200): Response {
  return Response.json(value, { status });
}

export default { fetch: handleRequest };
