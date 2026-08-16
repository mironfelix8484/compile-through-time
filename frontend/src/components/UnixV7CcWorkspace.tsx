import { useState } from "react";
import { createCompilation } from "../services/compilations";
import type { CompilationResponse } from "../types/Compilation";
import type { DevelopmentEnvironment } from "../types/Environment";
import { EvidencePanel } from "./EvidencePanel";
import { useFixedCanvasScale } from "./useFixedCanvasScale";
import "./unixV7Cc.css";

interface WorkspaceProps {
  environment: DevelopmentEnvironment;
  onExit: () => void;
}

type SessionState = "source" | "compiling" | "compiled" | "running" | "done" | "error";

export function UnixV7CcWorkspace({ environment, onExit }: WorkspaceProps) {
  const { viewportRef, scale } = useFixedCanvasScale(960, 720);
  const [sessionState, setSessionState] = useState<SessionState>("source");
  const [result, setResult] = useState<CompilationResponse | null>(null);
  const [researchOpen, setResearchOpen] = useState(false);
  const sourceLines = environment.experience!.source.code.split("\n");

  async function compile(): Promise<void> {
    if (sessionState === "compiling") return;
    setSessionState("compiling");
    setResult(null);
    try {
      const compilation = await createCompilation(environment.id);
      setResult(compilation);
      setSessionState("compiled");
    } catch {
      setSessionState("error");
    }
  }

  function run(): void {
    if (!result) return;
    setSessionState("running");
    window.setTimeout(() => setSessionState("done"), 180);
  }

  function replay(): void {
    setSessionState("source");
    setResult(null);
  }

  async function toggleFullscreen(): Promise<void> {
    if (document.fullscreenElement) await document.exitFullscreen();
    else await viewportRef.current?.requestFullscreen();
  }

  const compiled = sessionState === "compiled" || sessionState === "running" || sessionState === "done";

  return (
    <main className="workspace-page">
      <nav className="workspace-controls" aria-label="Workspace controls">
        <button onClick={onExit} type="button">← Exit workspace</button>
        <span>1979 · UNIX Seventh Edition · cc · C</span>
        <button onClick={replay} type="button">Replay</button>
        <button onClick={toggleFullscreen} type="button">Fullscreen</button>
        <button aria-expanded={researchOpen} onClick={() => setResearchOpen((open) => !open)} type="button">Research</button>
      </nav>
      {researchOpen && <EvidencePanel environment={environment} />}

      <div className="workspace-viewport" ref={viewportRef}>
        <div
          className="unix79-canvas"
          style={{
            left: `calc(50% - ${480 * scale}px)`,
            top: `calc(50% - ${360 * scale}px)`,
            transform: `scale(${scale})`,
          }}
        >
          <section className="unix79-terminal" aria-label="Seventh Edition UNIX terminal session">
            <div className="unix79-screen">
              <p>Research Unix Version 7</p>
              <p>tty8</p>
              <p className="unix79-space" />
              <p>login: dmr</p>
              <p>$ vi hello.c</p>
              <div className="unix79-source" role="textbox" aria-readonly="true" aria-label="Read-only hello.c source">
                {sourceLines.map((line, index) => <p key={`${index}-${line}`}>{line || " "}</p>)}
                <p className="unix79-vi-status">&quot;hello.c&quot; 4 lines, 46 characters</p>
              </div>
              <p>$ cat hello.c</p>
              {sourceLines.map((line, index) => <p key={`cat-${index}-${line}`}>{line || " "}</p>)}

              {sessionState === "source" && (
                <p className="unix79-command-line"><span>$ </span><button onClick={compile} type="button">cc hello.c -o hello</button><span className="unix79-cursor"> </span></p>
              )}
              {sessionState !== "source" && <p>$ cc hello.c -o hello</p>}
              {sessionState === "compiling" && <p><span className="unix79-cursor"> </span></p>}
              {sessionState === "error" && <><p>cc: fatal error</p><p>$ <span className="unix79-cursor"> </span></p></>}
              {compiled && sessionState === "compiled" && (
                <p className="unix79-command-line"><span>$ </span><button onClick={run} type="button">./hello</button><span className="unix79-cursor"> </span></p>
              )}
              {(sessionState === "running" || sessionState === "done") && <p>$ ./hello</p>}
              {sessionState === "running" && <p><span className="unix79-cursor"> </span></p>}
              {sessionState === "done" && result && <><p>{result.executionOutput}</p><p>$ <span className="unix79-cursor"> </span></p></>}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
