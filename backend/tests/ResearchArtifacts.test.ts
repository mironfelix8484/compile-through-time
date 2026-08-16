import { access } from "node:fs/promises";
import { describe, expect, it } from "vitest";
import { ResearchArtifactRepository } from "../src/research/ResearchArtifactRepository.js";

const repository = new ResearchArtifactRepository();

describe("workspace research artifacts", () => {
  it("publishes nine internally consistent workspace snapshots", async () => {
    const [snapshots, evidence] = await Promise.all([repository.getWorkspaceSnapshots(), repository.getEvidence()]);
    const evidenceIds = new Set(evidence.map(({ id }) => id));
    expect(snapshots).toHaveLength(9);
    expect(snapshots).toEqual(expect.arrayContaining([
      expect.objectContaining({ id: "unix-v7-cc-c", representativeDate: "1979-06-01" }),
      expect.objectContaining({ id: "ibm-pc-dos-2-basica", representativeDate: "1983-10-01" }),
      expect.objectContaining({ id: "ms-dos-5-turbo-pascal-6", representativeDate: "1991-12-01" }),
      expect.objectContaining({ id: "windows-95-visual-basic-4", representativeDate: "1995-12-01" }),
      expect.objectContaining({ id: "ubuntu-8-eclipse-java", representativeDate: "2008-06-01" }),
      expect.objectContaining({ id: "ubuntu-14-netbeans-8-java", representativeDate: "2015-06-01" }),
      expect.objectContaining({ id: "windows-98-vcpp-6", representativeDate: "1999-12-01" }),
      expect.objectContaining({ id: "windows-xp-vs-2005", representativeDate: "2005-12-01" }),
      expect.objectContaining({ id: "windows-11-vscode-typescript", representativeDate: "2026-08-01" }),
    ]));
    for (const snapshot of snapshots) {
      expect(snapshot.evidenceIds.every((id) => evidenceIds.has(id))).toBe(true);
      const transcript = await repository.getTranscript(snapshot.transcriptPath);
      expect(transcript.buildOutput).not.toContain(transcript.executionOutput);
      expect(transcript.phases.length).toBeGreaterThan(0);
    }
  });

  it("ships the reconstructed wallpaper referenced by the snapshot", async () => {
    const snapshot = (await repository.getWorkspaceSnapshots()).find(({ id }) => id === "windows-xp-vs-2005")!;
    expect(snapshot.wallpaper).toMatchObject({ fidelity: "RECONSTRUCTED", asset: "/assets/windows-xp/bliss-inspired.png" });
    const root = new URL("../../", import.meta.url);
    await expect(access(new URL(`frontend/public${snapshot.wallpaper.asset}`, root))).resolves.toBeUndefined();
  });

  it("ships the project-created Windows 98 desktop background", async () => {
    const snapshot = (await repository.getWorkspaceSnapshots()).find(({ id }) => id === "windows-98-vcpp-6")!;
    expect(snapshot.wallpaper).toMatchObject({ fidelity: "RECONSTRUCTED", asset: "/assets/windows-98/desktop-teal.svg" });
    const root = new URL("../../", import.meta.url);
    await expect(access(new URL(`frontend/public${snapshot.wallpaper.asset}`, root))).resolves.toBeUndefined();
  });

  it("ships the project-created Windows 95 desktop background", async () => {
    const snapshot = (await repository.getWorkspaceSnapshots()).find(({ id }) => id === "windows-95-visual-basic-4")!;
    expect(snapshot.wallpaper).toMatchObject({ fidelity: "RECONSTRUCTED", asset: "/assets/windows-95/desktop-teal.svg" });
    const root = new URL("../../", import.meta.url);
    await expect(access(new URL(`frontend/public${snapshot.wallpaper.asset}`, root))).resolves.toBeUndefined();
  });

  it("ships the project-created Windows 11 desktop background", async () => {
    const snapshot = (await repository.getWorkspaceSnapshots()).find(({ id }) => id === "windows-11-vscode-typescript")!;
    expect(snapshot.wallpaper).toMatchObject({ fidelity: "RECONSTRUCTED", asset: "/assets/windows-11/windows-bloom-inspired.svg" });
    const root = new URL("../../", import.meta.url);
    await expect(access(new URL(`frontend/public${snapshot.wallpaper.asset}`, root))).resolves.toBeUndefined();
  });

  it("ships the project-created Ubuntu-inspired desktop background", async () => {
    const snapshot = (await repository.getWorkspaceSnapshots()).find(({ id }) => id === "ubuntu-14-netbeans-8-java")!;
    expect(snapshot.wallpaper).toMatchObject({ fidelity: "RECONSTRUCTED", asset: "/assets/ubuntu-14/ubuntu-inspired.svg" });
    const root = new URL("../../", import.meta.url);
    await expect(access(new URL(`frontend/public${snapshot.wallpaper.asset}`, root))).resolves.toBeUndefined();
  });

  it("ships the project-created Ubuntu Human-era background", async () => {
    const snapshot = (await repository.getWorkspaceSnapshots()).find(({ id }) => id === "ubuntu-8-eclipse-java")!;
    expect(snapshot.wallpaper).toMatchObject({ fidelity: "RECONSTRUCTED", asset: "/assets/ubuntu-8/human-inspired.svg" });
    const root = new URL("../../", import.meta.url);
    await expect(access(new URL(`frontend/public${snapshot.wallpaper.asset}`, root))).resolves.toBeUndefined();
  });

});
