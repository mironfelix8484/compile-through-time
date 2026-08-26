import express from "express";
import { ResearchArtifactRepository } from "./research/ResearchArtifactRepository.js";
import { NodeResearchArtifactLoader } from "./research/NodeResearchArtifactLoader.js";
import { createApiRouter } from "./routes/api.js";

export const app = express();
app.use(express.json());
app.use("/api", createApiRouter(new ResearchArtifactRepository(new NodeResearchArtifactLoader())));
