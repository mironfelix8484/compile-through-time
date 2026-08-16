import { useState } from "react";
import type { DevelopmentEnvironment } from "../types/Environment";
import { EvidencePanel } from "./EvidencePanel";
import { useBuildPlayback } from "./useBuildPlayback";
import { useFixedCanvasScale } from "./useFixedCanvasScale";
import "./windows98VisualCpp6.css";

interface WorkspaceProps {
  environment: DevelopmentEnvironment;
  onExit: () => void;
}

export function Windows98VisualCpp6Workspace({ environment, onExit }: WorkspaceProps) {
  const { viewportRef, scale } = useFixedCanvasScale(1024, 768);
  const { build, buildState, compilation, phases, reset, visiblePhases } = useBuildPlayback(environment.id);
  const [buildMenuOpen, setBuildMenuOpen] = useState(false);
  const [consoleOpen, setConsoleOpen] = useState(false);
  const [researchOpen, setResearchOpen] = useState(false);
  const sourceLines = environment.experience!.source.code.split("\n");

  async function buildProject(): Promise<void> {
    setBuildMenuOpen(false);
    setConsoleOpen(false);
    await build();
  }

  function replay(): void {
    reset();
    setBuildMenuOpen(false);
    setConsoleOpen(false);
  }

  async function toggleFullscreen(): Promise<void> {
    if (document.fullscreenElement) await document.exitFullscreen();
    else await viewportRef.current?.requestFullscreen();
  }

  return (
    <main className="workspace-page">
      <nav className="workspace-controls" aria-label="Workspace controls">
        <button onClick={onExit} type="button">← Exit workspace</button>
        <span>Windows 98 · Visual C++ 6.0 · C++</span>
        <button onClick={replay} type="button">Replay</button>
        <button onClick={toggleFullscreen} type="button">Fullscreen</button>
        <button aria-expanded={researchOpen} onClick={() => setResearchOpen((open) => !open)} type="button">Research</button>
      </nav>
      {researchOpen && <EvidencePanel environment={environment} />}

      <div className="workspace-viewport" ref={viewportRef}>
        <div
          className="win98-canvas"
          style={{
            left: `calc(50% - ${512 * scale}px)`,
            top: `calc(50% - ${384 * scale}px)`,
            transform: `scale(${scale})`,
          }}
        >
          <DesktopIcon className="win98-my-computer" glyph="▣" label="My Computer" />
          <DesktopIcon className="win98-network" glyph="⌘" label="Network Neighborhood" />
          <DesktopIcon className="win98-recycle" glyph="♲" label="Recycle Bin" />

          <section className="vc6-window" aria-label="Microsoft Visual C++ 6.0">
            <header className="win98-titlebar">
              <span className="vc6-app-icon" aria-hidden="true">✣</span>
              <b>HelloWorld - Microsoft Visual C++</b>
              <span className="win98-window-buttons" aria-hidden="true"><i>_</i><i>□</i><i>×</i></span>
            </header>

            <div className="vc6-menubar">
              {['File', 'Edit', 'View', 'Insert', 'Project'].map((item) => <span key={item}>{item}</span>)}
              <div className="vc6-menu-anchor">
                <button aria-expanded={buildMenuOpen} onClick={() => setBuildMenuOpen((open) => !open)} type="button">Build</button>
                {buildMenuOpen && (
                  <div className="vc6-dropdown">
                    <button disabled={buildState === "building"} onClick={buildProject} type="button"><span>Build HelloWorld.exe</span><kbd>F7</kbd></button>
                    <button disabled={buildState !== "built"} onClick={() => { setBuildMenuOpen(false); setConsoleOpen(true); }} type="button"><span>Execute HelloWorld.exe</span><kbd>Ctrl+F5</kbd></button>
                  </div>
                )}
              </div>
              {['Tools', 'Window', 'Help'].map((item) => <span key={item}>{item}</span>)}
            </div>

            <div className="vc6-toolbars" aria-label="Developer Studio toolbars">
              <span className="vc6-grip" aria-hidden="true">⋮</span>
              <button title="New" type="button">▤</button><button title="Open" type="button">▱</button><button title="Save" type="button">▣</button>
              <span className="vc6-separator" />
              <button title="Cut" type="button">✂</button><button title="Copy" type="button">▧</button><button title="Paste" type="button">▨</button>
              <span className="vc6-separator" />
              <select aria-label="Active configuration" defaultValue="Win32 Debug"><option>Win32 Debug</option></select>
              <button disabled={buildState === "building"} onClick={buildProject} title="Build HelloWorld.exe (F7)" type="button">▦</button>
              <button className="vc6-execute" disabled={buildState !== "built"} onClick={() => setConsoleOpen(true)} title="Execute HelloWorld.exe (Ctrl+F5)" type="button">!</button>
              <span className="vc6-wizardbar">HelloWorld&nbsp;&nbsp;&nbsp;&nbsp;[Global Scope]</span>
            </div>

            <div className="vc6-main-area">
              <aside className="vc6-workspace-pane">
                <div className="vc6-pane-title">Workspace <span>×</span></div>
                <div className="vc6-tree" aria-label="Project files">
                  <b>▾ HelloWorld classes</b>
                  <b>▾ HelloWorld files</b>
                  <span>　▾ Source Files</span>
                  <span className="vc6-selected-file">　　 C++ HelloWorld.cpp</span>
                  <span>　　 C++ StdAfx.cpp</span>
                  <span>　▸ Header Files</span>
                  <span>　▸ Resource Files</span>
                </div>
                <div className="vc6-workspace-tabs"><span>ClassView</span><span>ResourceView</span><b>FileView</b></div>
              </aside>

              <section className="vc6-editor" aria-label="Read-only HelloWorld.cpp source code">
                <div className="vc6-document-title">HelloWorld.cpp</div>
                <div className="vc6-code" role="textbox" aria-readonly="true">
                  {sourceLines.map((line, index) => (
                    <div className="vc6-code-line" key={`${index}-${line}`}>
                      <code className={line.startsWith("#") ? "vc6-preprocessor" : line.includes("return") || line.startsWith("int ") ? "vc6-keyword" : ""}>{line || " "}</code>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            <section className="vc6-output" aria-live="polite">
              <div className="vc6-pane-title">Output <span>×</span></div>
              <div className="vc6-output-content">
                {buildState === "idle" && <span className="vc6-ready">Ready</span>}
                {phases.map((phase) => <pre key={phase.id}>{phase.output}</pre>)}
                {buildState === "building" && visiblePhases === 0 && <span>Building...</span>}
                {buildState === "error" && <span className="build-error">The historical transcript could not be loaded.</span>}
              </div>
              <div className="vc6-output-tabs"><b>Build</b><span>Debug</span><span>Find in Files 1</span><span>Find in Files 2</span><span>Results</span></div>
            </section>
            <footer className="vc6-statusbar">
              <span>{buildState === "building" ? "Building..." : buildState === "built" ? "Build complete" : "Ready"}</span>
              <span>Ln 1, Col 1&nbsp;&nbsp;&nbsp;REC&nbsp;&nbsp;COL&nbsp;&nbsp;OVR</span>
            </footer>
          </section>

          {consoleOpen && compilation && (
            <section className="win98-console" aria-label="Program output">
              <header><span>HelloWorld</span><span className="win98-window-buttons" aria-hidden="true"><i>_</i><i>□</i><i>×</i></span></header>
              <pre>{compilation.executionOutput}{"\n\n"}{environment.experience?.console.prompt}</pre>
            </section>
          )}

          <footer className="win98-taskbar">
            <button className="win98-start" type="button"><span aria-hidden="true">▰</span> Start</button>
            <div className="win98-quick-launch" aria-hidden="true">▤　◉　▣</div>
            <button className="win98-task active" type="button">✣ HelloWorld - Microsoft Visual C++</button>
            {consoleOpen && <button className="win98-task" type="button">▣ HelloWorld</button>}
            <div className="win98-tray">♬　3:42 PM</div>
          </footer>
        </div>
      </div>
    </main>
  );
}

function DesktopIcon({ className, glyph, label }: { className: string; glyph: string; label: string }) {
  return <div className={`win98-desktop-icon ${className}`}><span aria-hidden="true">{glyph}</span><b>{label}</b></div>;
}
