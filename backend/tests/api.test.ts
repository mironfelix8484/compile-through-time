import request from "supertest";
import { describe, expect, it } from "vitest";
import { app } from "../src/app.js";

describe("API", () => {
  it("reports its health", async () => {
    expect((await request(app).get("/api/health")).body).toEqual({ status: "ok" });
  });

  it("publishes the 1979 UNIX cc C workspace snapshot", async () => {
    const response = await request(app).get("/api/environments?date=1979-06-01");
    expect(response.status).toBe(200);
    expect(response.body.environments).toHaveLength(1);
    expect(response.body.environments[0]).toMatchObject({
      id: "unix-v7-cc-c",
      operatingSystem: "UNIX Seventh Edition Version 7",
      tool: { name: "UNIX shell and vi Seventh Edition", type: "ide" },
      languages: ["C"],
      fidelity: "SIMULATED",
      experience: { buildActionLabel: "cc hello.c -o hello", visualStyle: { variant: "unix-v7-cc" } },
    });
    expect(response.body.environments[0].evidence.length).toBeGreaterThan(0);
  });

  it("publishes the 2026 Windows 11 VS Code TypeScript workspace snapshot", async () => {
    const response = await request(app).get("/api/environments?date=2026-08-01");
    expect(response.status).toBe(200);
    expect(response.body.environments).toHaveLength(1);
    expect(response.body.environments[0]).toMatchObject({
      id: "windows-11-vscode-typescript",
      operatingSystem: "Windows 11 25H2",
      tool: { name: "Visual Studio Code 1.131", type: "ide" },
      languages: ["TypeScript"],
      fidelity: "SIMULATED",
      experience: { buildActionLabel: "npx tsc", visualStyle: { variant: "vscode-2026" } },
    });
    expect(response.body.environments[0].evidence.length).toBeGreaterThan(0);
  });

  it("publishes the 2005 Windows XP workspace snapshot unchanged", async () => {
    const response = await request(app).get("/api/environments?date=2005-12-01");
    expect(response.status).toBe(200);
    expect(response.body.environments).toHaveLength(1);
    expect(response.body.environments[0]).toMatchObject({
      id: "windows-xp-vs-2005",
      operatingSystem: "Windows XP Service Pack 2",
      fidelity: "SIMULATED",
      experience: { buildActionLabel: "Build Solution", visualStyle: { variant: "visual-studio-2005" } },
    });
    expect(response.body.environments[0].evidence.length).toBeGreaterThan(0);
  });

  it("publishes the 1999 Windows 98 Visual C++ workspace snapshot", async () => {
    const response = await request(app).get("/api/environments?date=1999-12-01");
    expect(response.status).toBe(200);
    expect(response.body.environments).toHaveLength(1);
    expect(response.body.environments[0]).toMatchObject({
      id: "windows-98-vcpp-6",
      operatingSystem: "Windows 98 Second Edition",
      tool: { name: "Microsoft Visual C++ 6.0", type: "ide" },
      languages: ["C++"],
      fidelity: "SIMULATED",
      experience: { buildActionLabel: "Build HelloWorld.exe", visualStyle: { variant: "visual-cpp-6" } },
    });
    expect(response.body.environments[0].evidence.length).toBeGreaterThan(0);
  });

  it("publishes the 1991 MS-DOS Turbo Pascal workspace snapshot", async () => {
    const response = await request(app).get("/api/environments?date=1991-12-01");
    expect(response.status).toBe(200);
    expect(response.body.environments).toHaveLength(1);
    expect(response.body.environments[0]).toMatchObject({
      id: "ms-dos-5-turbo-pascal-6",
      operatingSystem: "MS-DOS 5.0",
      tool: { name: "Borland Turbo Pascal 6.0", type: "ide" },
      languages: ["Pascal"],
      fidelity: "SIMULATED",
      experience: { buildActionLabel: "Compile", visualStyle: { variant: "turbo-pascal-6" } },
    });
    expect(response.body.environments[0].evidence.length).toBeGreaterThan(0);
  });

  it("publishes the 1995 Windows 95 Visual Basic workspace snapshot", async () => {
    const response = await request(app).get("/api/environments?date=1995-12-01");
    expect(response.status).toBe(200);
    expect(response.body.environments).toHaveLength(1);
    expect(response.body.environments[0]).toMatchObject({
      id: "windows-95-visual-basic-4",
      operatingSystem: "Windows 95 4.00.950",
      tool: { name: "Microsoft Visual Basic 4.0 Professional Edition", type: "ide" },
      languages: ["Visual Basic"],
      fidelity: "SIMULATED",
      experience: { buildActionLabel: "Start", visualStyle: { variant: "visual-basic-4" } },
    });
    expect(response.body.environments[0].evidence.length).toBeGreaterThan(0);
  });

  it("publishes the 1983 IBM PC DOS BASICA workspace snapshot", async () => {
    const response = await request(app).get("/api/environments?date=1983-10-01");
    expect(response.status).toBe(200);
    expect(response.body.environments).toHaveLength(1);
    expect(response.body.environments[0]).toMatchObject({
      id: "ibm-pc-dos-2-basica",
      operatingSystem: "IBM PC DOS 2.10",
      tool: { name: "IBM Advanced BASIC A2.10", type: "ide" },
      languages: ["BASIC"],
      fidelity: "SIMULATED",
      experience: { buildActionLabel: "RUN", visualStyle: { variant: "ibm-basica" } },
    });
    expect(response.body.environments[0].evidence.length).toBeGreaterThan(0);
  });

  it("publishes the 2015 Ubuntu NetBeans Java workspace snapshot", async () => {
    const response = await request(app).get("/api/environments?date=2015-06-01");
    expect(response.status).toBe(200);
    expect(response.body.environments).toHaveLength(1);
    expect(response.body.environments[0]).toMatchObject({
      id: "ubuntu-14-netbeans-8-java",
      operatingSystem: "Ubuntu 14.04 LTS",
      tool: { name: "NetBeans IDE 8.0.2", type: "ide" },
      languages: ["Java"],
      fidelity: "SIMULATED",
      experience: { buildActionLabel: "Clean and Build Project", visualStyle: { variant: "netbeans-8" } },
    });
    expect(response.body.environments[0].evidence.length).toBeGreaterThan(0);
  });

  it("publishes the 2008 Ubuntu Eclipse Java workspace snapshot", async () => {
    const response = await request(app).get("/api/environments?date=2008-06-01");
    expect(response.status).toBe(200);
    expect(response.body.environments).toHaveLength(2);
    const eclipse = response.body.environments.find(({ id }: { id: string }) => id === "ubuntu-8-eclipse-java");
    expect(eclipse).toMatchObject({
      id: "ubuntu-8-eclipse-java",
      operatingSystem: "Ubuntu 8.04 LTS",
      tool: { name: "Eclipse SDK 3.3.2 Europa", type: "ide" },
      languages: ["Java"],
      fidelity: "SIMULATED",
      experience: { buildActionLabel: "Build Automatically", visualStyle: { variant: "eclipse-3" } },
    });
    expect(eclipse.evidence).toHaveLength(2);
  });

  it("keeps snapshot date matching inclusive", async () => {
    expect((await request(app).get("/api/environments?date=2005-11-07")).body.environments).toHaveLength(1);
    expect((await request(app).get("/api/environments?date=2010-04-12")).body.environments).toHaveLength(1);
  });

  it.each(["1982-06-01", "1990-06-01", "1998-06-01", "2016-06-01", "2025-06-01"])("returns no workspace for %s", async (date) => {
    expect((await request(app).get(`/api/environments?date=${date}`)).body.environments).toEqual([]);
  });

  it("returns 400 when the date is missing or invalid", async () => {
    expect((await request(app).get("/api/environments")).status).toBe(400);
    expect((await request(app).get("/api/environments?date=2007-13-01")).status).toBe(400);
  });

  it("returns progressive build phases with program output separate", async () => {
    const response = await request(app).post("/api/compilations").send({ environmentId: "windows-xp-vs-2005" });
    expect(response.status).toBe(201);
    expect(response.body).toMatchObject({ status: "succeeded", executionOutput: "Hello World", programOutput: "Hello World" });
    expect(response.body.phases.length).toBeGreaterThan(1);
    expect(response.body.buildOutput).toContain("Build: 1 succeeded");
    expect(response.body.buildOutput).not.toContain("Hello World");
    expect(response.body.output).toBe(response.body.buildOutput);
  });

  it("keeps successful UNIX cc output silent and execution separate", async () => {
    const response = await request(app).post("/api/compilations").send({ environmentId: "unix-v7-cc-c" });
    expect(response.status).toBe(201);
    expect(response.body).toMatchObject({
      status: "succeeded",
      buildOutput: "",
      executionOutput: "Hello World",
      phases: [{ id: "cc", label: "Compile and load", output: "" }],
    });
    expect(response.body.phases).toHaveLength(1);
  });

  it("keeps silent TypeScript compilation separate from Node program output", async () => {
    const response = await request(app).post("/api/compilations").send({ environmentId: "windows-11-vscode-typescript" });
    expect(response.status).toBe(201);
    expect(response.body).toMatchObject({
      status: "succeeded",
      buildOutput: "",
      executionOutput: "Hello World",
      phases: [{ id: "tsc", label: "Type-check and emit", output: "" }],
    });
    expect(response.body.phases).toHaveLength(1);
  });

  it("keeps Visual C++ build output separate from its console output", async () => {
    const response = await request(app).post("/api/compilations").send({ environmentId: "windows-98-vcpp-6" });
    expect(response.status).toBe(201);
    expect(response.body).toMatchObject({ status: "succeeded", executionOutput: "Hello, world!", programOutput: "Hello, world!" });
    expect(response.body.buildOutput).toContain("HelloWorld.exe - 0 error(s), 0 warning(s)");
    expect(response.body.buildOutput).not.toContain("Hello, world!");
    expect(response.body.output).toBe(response.body.buildOutput);
  });

  it("keeps Turbo Pascal compilation output separate from its user-screen output", async () => {
    const response = await request(app).post("/api/compilations").send({ environmentId: "ms-dos-5-turbo-pascal-6" });
    expect(response.status).toBe(201);
    expect(response.body).toMatchObject({ status: "succeeded", executionOutput: "Hello, World!", programOutput: "Hello, World!" });
    expect(response.body.buildOutput).toContain("Compile successful");
    expect(response.body.buildOutput).not.toContain("Hello, World!");
    expect(response.body.output).toBe(response.body.buildOutput);
  });

  it("keeps NetBeans build output separate from its run output", async () => {
    const response = await request(app).post("/api/compilations").send({ environmentId: "ubuntu-14-netbeans-8-java" });
    expect(response.status).toBe(201);
    expect(response.body.status).toBe("succeeded");
    expect(response.body.buildOutput).toContain("BUILD SUCCESSFUL");
    expect(response.body.buildOutput).not.toContain("Hello, World!");
    expect(response.body.executionOutput).toContain("Hello, World!");
    expect(response.body.output).toBe(response.body.buildOutput);
  });

  it("keeps Eclipse automatic-build status separate from Console output", async () => {
    const response = await request(app).post("/api/compilations").send({ environmentId: "ubuntu-8-eclipse-java" });
    expect(response.status).toBe(201);
    expect(response.body.status).toBe("succeeded");
    expect(response.body.buildOutput).toContain("Java Builder");
    expect(response.body.buildOutput).not.toContain("Hello, World!");
    expect(response.body.executionOutput).toBe("Hello, World!");
    expect(response.body.output).toBe(response.body.buildOutput);
  });

  it("runs BASICA directly without inventing a compilation phase", async () => {
    const response = await request(app).post("/api/compilations").send({ environmentId: "ibm-pc-dos-2-basica" });
    expect(response.status).toBe(201);
    expect(response.body).toMatchObject({
      status: "succeeded",
      buildOutput: "RUN",
      executionOutput: "HELLO WORLD\nOk",
      phases: [{ id: "run", label: "Invoke interpreter", output: "RUN" }],
    });
    expect(response.body.phases).toHaveLength(1);
  });

  it("starts a Visual Basic project without inventing a visible compile phase", async () => {
    const response = await request(app).post("/api/compilations").send({ environmentId: "windows-95-visual-basic-4" });
    expect(response.status).toBe(201);
    expect(response.body).toMatchObject({
      status: "succeeded",
      buildOutput: "Start Project1",
      executionOutput: "Hello World",
      phases: [{ id: "start", label: "Enter run mode", output: "Start Project1" }],
    });
    expect(response.body.buildOutput).not.toMatch(/compile/i);
  });

  it("rejects compilation requests without the workspace", async () => {
    expect((await request(app).post("/api/compilations").send({})).status).toBe(400);
    expect((await request(app).post("/api/compilations").send({ environmentId: "unknown" })).status).toBe(400);
  });
});
