import type { Request, Response } from "express";
import { EnvironmentService, InvalidDateError } from "../services/EnvironmentService.js";

export class EnvironmentController {
  constructor(private readonly service: EnvironmentService) {}
  getByDate = async (request: Request, response: Response): Promise<void> => {
    const date = request.query.date;
    if (typeof date !== "string") {
      response.status(400).json({ error: "date query parameter is required" });
      return;
    }
    try {
      response.json({ date, environments: await this.service.findAvailableOn(date) });
    } catch (error) {
      if (error instanceof InvalidDateError) {
        response.status(400).json({ error: error.message });
        return;
      }
      throw error;
    }
  };
}
