import { useState } from "react";
import type { DevelopmentEnvironment } from "../types/Environment";
import { EvidencePanel } from "./EvidencePanel";
import { useBuildPlayback } from "./useBuildPlayback";
import { useFixedCanvasScale } from "./useFixedCanvasScale";
import "./msDosTurboPascal.css";

interface WorkspaceProps {
  environment: DevelopmentEnvironment;
  onExit: () => void;
}

type OpenMenu = "compile" | "run" | null;

export function MsDosTurboPascalWorkspace({ environment, onExit }: WorkspaceProps) {
  const { viewportRef, scale } = useFixedCanvasScale(960, 720);
  const { build, buildState, compilation, phases, reset, visiblePhases } = useBuildPlayback(environment.id);
  const [openMenu, setOpenMenu] = useState<OpenMenu>(null);
  const [userScreenOpen, setUserScreenOpen] = useState(false);
  const [researchOpen, setResearchOpen] = useState(false);
  const sourceLines = environment.experience!.source.code.split("\n");

  async function compileProgram(): Promise<void> {
    setOpenMenu(null);
    setUserScreenOpen(false);
    await build();
  }

  function replay(): void {
    reset();
    setOpenMenu(null);
    setUserScreenOpen(false);
  }

  async function toggleFullscreen(): Promise<void> {
    if (document.fullscreenElement) await document.exitFullscreen();
    else await viewportRef.current?.requestFullscreen();
  }

  return (
    <main className="workspace-page">
      <nav className="workspace-controls" aria-label="Workspace controls">
        <button onClick={onExit} type="button">← Exit workspace</button>
        <span>MS-DOS 5.0 · Turbo Pascal 6.0 · Pascal</span>
        <button onClick={replay} type="button">Replay</button>
        <button onClick={toggleFullscreen} type="button">Fullscreen</button>
        <button aria-expanded={researchOpen} onClick={() => setResearchOpen((open) => !open)} type="button">Research</button>
      </nav>
      {researchOpen && <EvidencePanel environment={environment} />}

      <div className="workspace-viewport" ref={viewportRef}>
        <div
          className="tp-canvas"
          style={{
            left: `calc(50% - ${480 * scale}px)`,
            top: `calc(50% - ${360 * scale}px)`,
            transform: `scale(${scale})`,
          }}
        >
          <div className="tp-menu-bar" role="menubar" aria-label="Turbo Pascal menu bar">
            {['File', 'Edit', 'Search'].map((item) => <span key={item}>{item}</span>)}
            <div className="tp-menu-anchor">
              <button aria-expanded={openMenu === "run"} onClick={() => setOpenMenu((menu) => menu === "run" ? null : "run")} role="menuitem" type="button"><u>R</u>un</button>
              {openMenu === "run" && (
                <div className="tp-dropdown tp-run-menu" role="menu">
                  <button disabled={buildState !== "built"} onClick={() => { setOpenMenu(null); setUserScreenOpen(true); }} role="menuitem" type="button"><span><u>R</u>un</span><kbd>Ctrl-F9</kbd></button>
                  <button disabled role="menuitem" type="button"><span>Program reset</span><kbd>Ctrl-F2</kbd></button>
                  <button disabled role="menuitem" type="button"><span>Go to cursor</span><kbd>F4</kbd></button>
                  <button disabled role="menuitem" type="button"><span>User screen</span><kbd>Alt-F5</kbd></button>
                </div>
              )}
            </div>
            <div className="tp-menu-anchor">
              <button aria-expanded={openMenu === "compile"} onClick={() => setOpenMenu((menu) => menu === "compile" ? null : "compile")} role="menuitem" type="button"><u>C</u>ompile</button>
              {openMenu === "compile" && (
                <div className="tp-dropdown tp-compile-menu" role="menu">
                  <button disabled={buildState === "building"} onClick={compileProgram} role="menuitem" type="button"><span><u>C</u>ompile</span><kbd>Alt-F9</kbd></button>
                  <button disabled role="menuitem" type="button"><span>Make</span><kbd>F9</kbd></button>
                  <button disabled role="menuitem" type="button"><span>Build</span><kbd /></button>
                  <button disabled role="menuitem" type="button"><span>Destination</span><kbd>Memory</kbd></button>
                  <button disabled role="menuitem" type="button"><span>Primary file</span><kbd /></button>
                  <button disabled role="menuitem" type="button"><span>Get info</span><kbd /></button>
                </div>
              )}
            </div>
            {['Debug', 'Tools', 'Options', 'Window', 'Help'].map((item) => <span key={item}>{item}</span>)}
          </div>

          <section className="tp-editor-window" aria-label="Read-only HELLO.PAS source code">
            <div className="tp-editor-frame-top"><span>■</span><b> C:\TP\HELLO.PAS </b><span>1</span></div>
            <div className="tp-editor-body">
              <div className="tp-editor-content">
                <div className="tp-code" role="textbox" aria-readonly="true">
                  {sourceLines.map((line, index) => <PascalLine key={`${index}-${line}`} line={line} />)}
                  <div className="tp-cursor-line"><span className="tp-block-cursor"> </span></div>
                </div>
                {buildState !== "idle" && !userScreenOpen && (
                  <section className="tp-compile-output" aria-live="polite" aria-label="Compilation output">
                    <div className="tp-compile-output-title">Compiler messages</div>
                    <div className="tp-compile-output-text">
                      {phases.map((phase) => <pre key={phase.id}>{phase.output}</pre>)}
                      {buildState === "building" && visiblePhases === 0 && <span>Compiling...</span>}
                      {buildState === "error" && <span>Compile error: transcript unavailable</span>}
                    </div>
                    <div className="tp-compile-output-status">{buildState === "built" ? "Compile successful — Ctrl-F9 Run" : "Compiling"}</div>
                  </section>
                )}
              </div>
              <div className="tp-scrollbar" aria-hidden="true"><span>▲</span><i /><span>▼</span></div>
            </div>
            <div className="tp-editor-status"><span>Line 1</span><span>Col 1</span><span>Insert</span><span>C:\TP\HELLO.PAS</span><span>5:1</span></div>
          </section>

          {userScreenOpen && compilation && (
            <section className="tp-user-screen" aria-label="Program output">
              <pre>{compilation.executionOutput}{"\n"}<span className="tp-user-cursor"> </span></pre>
            </section>
          )}

          <footer className="tp-shortcut-bar" aria-hidden="true">
            <span><b>F1</b> Help</span><span><b>F5</b> Zoom</span><span><b>F6</b> Switch</span><span><b>F7</b> Trace</span><span><b>F8</b> Step</span><span><b>F9</b> Make</span><span><b>F10</b> Menu</span>
          </footer>
        </div>
      </div>
    </main>
  );
}

function PascalLine({ line }: { line: string }) {
  const parts = line.split(/(program|begin|end\.|WriteLn|ReadLn|'[^']*')/g);
  return (
    <div className="tp-code-line">
      {parts.map((part, index) => {
        const keyword = /^(program|begin|end\.)$/.test(part);
        const string = /^'/.test(part);
        return <span className={keyword ? "tp-keyword" : string ? "tp-string" : ""} key={`${index}-${part}`}>{part}</span>;
      })}
    </div>
  );
}
