import type { Request, Response } from "express";
import { RuntimeNotFoundError } from "../providers/FakeCompilationProvider.js";
import type { CompilationService } from "../services/CompilationService.js";

export class CompilationController {
  constructor(private readonly service: CompilationService) {}

  create = async (request: Request, response: Response): Promise<void> => {
    const environmentId = request.body?.environmentId;
    if (typeof environmentId !== "string" || environmentId.trim() === "") {
      response.status(400).json({ error: "environmentId is required" });
      return;
    }

    try {
      response.status(201).json(await this.service.compile(environmentId));
    } catch (error) {
      if (error instanceof RuntimeNotFoundError) {
        response.status(400).json({ error: error.message });
        return;
      }
      throw error;
    }
  };
}
