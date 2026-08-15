import request from "supertest";
import { describe, expect, it } from "vitest";
import { app } from "../src/app.js";

describe("API", () => {
  it("reports its health", async () => {
    const response = await request(app).get("/api/health");
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ status: "ok" });
  });
  it("returns environments for a valid date", async () => {
    const response = await request(app).get("/api/environments?date=2007-01-01");
    expect(response.status).toBe(200);
    expect(response.body.environments).toHaveLength(4);
  });
  it("returns 400 when the date is missing or invalid", async () => {
    expect((await request(app).get("/api/environments")).status).toBe(400);
    expect((await request(app).get("/api/environments?date=2007-13-01")).status).toBe(400);
  });
});
