import { useState } from "react";
import { createCompilation } from "../services/compilations";
import type { CompilationResponse } from "../types/Compilation";
import type { DevelopmentEnvironment } from "../types/Environment";
import { EvidencePanel } from "./EvidencePanel";
import { useFixedCanvasScale } from "./useFixedCanvasScale";
import "./ibmBasica.css";

interface WorkspaceProps {
  environment: DevelopmentEnvironment;
  onExit: () => void;
}

export function IbmBasicaWorkspace({ environment, onExit }: WorkspaceProps) {
  const { viewportRef, scale } = useFixedCanvasScale(960, 720);
  const [runState, setRunState] = useState<"idle" | "running" | "done" | "error">("idle");
  const [result, setResult] = useState<CompilationResponse | null>(null);
  const [researchOpen, setResearchOpen] = useState(false);
  const sourceLines = environment.experience!.source.code.split("\n");

  async function invokeRun(): Promise<void> {
    if (runState === "running") return;
    setRunState("running");
    setResult(null);
    try {
      setResult(await createCompilation(environment.id));
      setRunState("done");
    } catch {
      setRunState("error");
    }
  }

  function replay(): void {
    setResult(null);
    setRunState("idle");
  }

  async function toggleFullscreen(): Promise<void> {
    if (document.fullscreenElement) await document.exitFullscreen();
    else await viewportRef.current?.requestFullscreen();
  }

  return (
    <main className="workspace-page">
      <nav className="workspace-controls" aria-label="Workspace controls">
        <button onClick={onExit} type="button">← Exit workspace</button>
        <span>IBM PC · PC DOS 2.10 · BASICA A2.10 · BASIC</span>
        <button onClick={replay} type="button">Replay</button>
        <button onClick={toggleFullscreen} type="button">Fullscreen</button>
        <button aria-expanded={researchOpen} onClick={() => setResearchOpen((open) => !open)} type="button">Research</button>
      </nav>
      {researchOpen && <EvidencePanel environment={environment} />}

      <div className="workspace-viewport" ref={viewportRef}>
        <div
          className="basica-canvas"
          style={{
            left: `calc(50% - ${480 * scale}px)`,
            top: `calc(50% - ${360 * scale}px)`,
            transform: `scale(${scale})`,
          }}
        >
          <section className="basica-screen" aria-label="IBM Personal Computer BASIC interpreter">
            <div>The IBM Personal Computer Basic</div>
            <div>Version A2.10 Copyright IBM Corp. 1981, 1982, 1983</div>
            <div>60300 Bytes free</div>
            <div className="basica-gap" />
            <div>Ok</div>
            <div>LIST</div>
            {sourceLines.map((line) => <div key={line}>{line}</div>)}
            <div className="basica-gap" />
            <div>Ok</div>

            {runState === "idle" ? (
              <button className="basica-command" onClick={invokeRun} aria-label="Enter RUN" type="button">RUN<span className="basica-cursor"> </span></button>
            ) : (
              <div>RUN</div>
            )}
            {runState === "running" && <div><span className="basica-cursor"> </span></div>}
            {runState === "done" && result && <pre className="basica-program-output">{result.executionOutput}{"\n"}<span className="basica-cursor"> </span></pre>}
            {runState === "error" && <div>?I/O Error in 0</div>}
          </section>

          <footer className="basica-soft-keys" aria-label="BASIC function keys">
            <span><b>1</b>LIST</span>
            <button disabled={runState === "running"} onClick={invokeRun} type="button"><b>2</b>RUN</button>
            <span><b>3</b>LOAD&quot;</span><span><b>4</b>SAVE&quot;</span><span><b>5</b>CONT</span><span><b>6</b>,&quot;LPT1:</span><span><b>7</b>TRON</span><span><b>8</b>TROFF</span><span><b>9</b>KEY</span><span><b>0</b>SCREEN</span>
          </footer>
        </div>
      </div>
    </main>
  );
}
