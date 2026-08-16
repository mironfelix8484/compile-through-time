import { useState } from "react";
import { createCompilation } from "../services/compilations";
import type { CompilationResponse } from "../types/Compilation";
import type { DevelopmentEnvironment } from "../types/Environment";
import { EvidencePanel } from "./EvidencePanel";
import { useFixedCanvasScale } from "./useFixedCanvasScale";
import "./windows95VisualBasic.css";

interface WorkspaceProps {
  environment: DevelopmentEnvironment;
  onExit: () => void;
}

export function Windows95VisualBasicWorkspace({ environment, onExit }: WorkspaceProps) {
  const { viewportRef, scale } = useFixedCanvasScale(1024, 768);
  const [runMenuOpen, setRunMenuOpen] = useState(false);
  const [runState, setRunState] = useState<"design" | "starting" | "running" | "error">("design");
  const [result, setResult] = useState<CompilationResponse | null>(null);
  const [messageOpen, setMessageOpen] = useState(false);
  const [researchOpen, setResearchOpen] = useState(false);
  const sourceLines = environment.experience!.source.code.split("\n");

  async function startProject(): Promise<void> {
    if (runState === "starting" || runState === "running") return;
    setRunMenuOpen(false);
    setMessageOpen(false);
    setRunState("starting");
    try {
      setResult(await createCompilation(environment.id));
      setRunState("running");
    } catch {
      setRunState("error");
    }
  }

  function replay(): void {
    setRunMenuOpen(false);
    setRunState("design");
    setResult(null);
    setMessageOpen(false);
  }

  async function toggleFullscreen(): Promise<void> {
    if (document.fullscreenElement) await document.exitFullscreen();
    else await viewportRef.current?.requestFullscreen();
  }

  return (
    <main className="workspace-page">
      <nav className="workspace-controls" aria-label="Workspace controls">
        <button onClick={onExit} type="button">← Exit workspace</button>
        <span>Windows 95 · Microsoft Visual Basic 4.0 · Visual Basic</span>
        <button onClick={replay} type="button">Replay</button>
        <button onClick={toggleFullscreen} type="button">Fullscreen</button>
        <button aria-expanded={researchOpen} onClick={() => setResearchOpen((open) => !open)} type="button">Research</button>
      </nav>
      {researchOpen && <EvidencePanel environment={environment} />}

      <div className="workspace-viewport" ref={viewportRef}>
        <div
          className="win95-canvas"
          style={{
            left: `calc(50% - ${512 * scale}px)`,
            top: `calc(50% - ${384 * scale}px)`,
            transform: `scale(${scale})`,
          }}
        >
          <DesktopIcon className="win95-computer" glyph="▣" label="My Computer" />
          <DesktopIcon className="win95-network" glyph="⌘" label="Network Neighborhood" />
          <DesktopIcon className="win95-recycle" glyph="♲" label="Recycle Bin" />

          <section className="vb4-window" aria-label="Microsoft Visual Basic 4.0">
            <header className="vb4-titlebar">
              <span className="vb4-logo" aria-hidden="true">VB</span>
              <b>Project1 - Microsoft Visual Basic [{runState === "running" ? "run" : "design"}]</b>
              <span className="win95-window-buttons" aria-hidden="true"><i>_</i><i>□</i><i>×</i></span>
            </header>
            <div className="vb4-menubar">
              {['File', 'Edit', 'View', 'Insert', 'Format', 'Debug'].map((item) => <span key={item}>{item}</span>)}
              <div className="vb4-menu-anchor">
                <button aria-expanded={runMenuOpen} onClick={() => setRunMenuOpen((open) => !open)} type="button">Run</button>
                {runMenuOpen && (
                  <div className="vb4-dropdown">
                    <button disabled={runState === "starting" || runState === "running"} onClick={startProject} type="button"><span>Start</span><kbd>F5</kbd></button>
                    <button disabled type="button"><span>Break</span><kbd>Ctrl+Break</kbd></button>
                    <button disabled type="button"><span>End</span><kbd /></button>
                  </div>
                )}
              </div>
              {['Tools', 'Add-Ins', 'Window', 'Help'].map((item) => <span key={item}>{item}</span>)}
            </div>
            <div className="vb4-toolbar" aria-label="Visual Basic toolbar">
              <button title="New Project" type="button">▤</button><button title="Open Project" type="button">▱</button><button title="Save Project" type="button">▣</button>
              <span className="vb4-separator" />
              <button title="Cut" type="button">✂</button><button title="Copy" type="button">▧</button><button title="Paste" type="button">▨</button>
              <span className="vb4-separator" />
              <button className="vb4-start" disabled={runState === "starting" || runState === "running"} onClick={startProject} title="Start (F5)" type="button">▶</button>
              <button disabled title="Break" type="button">Ⅱ</button><button disabled title="End" type="button">■</button>
              <span className="vb4-position">X: 120　Y: 72　 W: 3195　H: 2115</span>
            </div>

            <div className="vb4-workspace">
              <aside className="vb4-toolbox">
                <div className="vb4-child-title">Toolbox <span>×</span></div>
                <div className="vb4-tool-grid" aria-label="Visual Basic Toolbox">
                  {['↖','A','ab','▢','▣','☑','◉','⌄','▤','↕','↔','◷','A:','▥','◫','◇','／','▧','DB','OLE'].map((tool, index) => <button className={index === 0 ? "selected" : ""} key={`${index}-${tool}`} type="button">{tool}</button>)}
                </div>
              </aside>

              <div className="vb4-center-area">
                <section className="vb4-form-designer" aria-label="Form Designer">
                  <div className="vb4-child-title">Form1 (Form) <span>_ □ ×</span></div>
                  <div className="vb4-design-surface">
                    <div className="vb4-designed-form">
                      <header>Form1 <span>_ □ ×</span></header>
                      <button className="vb4-design-command" type="button">Say Hello</button>
                      <i className="vb4-sizing-handle h1" /><i className="vb4-sizing-handle h2" /><i className="vb4-sizing-handle h3" /><i className="vb4-sizing-handle h4" />
                    </div>
                  </div>
                </section>

                <section className="vb4-code-window" aria-label="Read-only Form1 source code">
                  <div className="vb4-child-title">Form1 (Code) <span>_ □ ×</span></div>
                  <div className="vb4-code-selectors"><select defaultValue="Command1"><option>Command1</option></select><select defaultValue="Click"><option>Click</option></select></div>
                  <div className="vb4-code" role="textbox" aria-readonly="true">
                    {sourceLines.map((line, index) => <VisualBasicLine key={`${index}-${line}`} line={line} />)}
                  </div>
                </section>
              </div>

              <aside className="vb4-right-panels">
                <section className="vb4-project-window">
                  <div className="vb4-child-title">Project - Project1 <span>×</span></div>
                  <div className="vb4-project-tools">▤　▣　⌂</div>
                  <div className="vb4-project-tree"><b>▾ Project1 (Project1.vbp)</b><span>　▾ Forms</span><span className="vb4-selected-node">　　 Form1 (Form1.frm)</span></div>
                </section>
                <section className="vb4-properties-window">
                  <div className="vb4-child-title">Properties - Form1 <span>×</span></div>
                  <select aria-label="Selected object" defaultValue="Form1"><option>Form1　Form</option></select>
                  <div className="vb4-property-tabs"><b>Alphabetic</b><span>Categorized</span></div>
                  <div className="vb4-property-grid">
                    <PropertyRow name="(Name)" value="Form1" /><PropertyRow name="Appearance" value="1 - 3D" /><PropertyRow name="BackColor" value="&H8000000F&" /><PropertyRow name="BorderStyle" value="2 - Sizable" /><PropertyRow name="Caption" value="Form1" /><PropertyRow name="ControlBox" value="True" /><PropertyRow name="Enabled" value="True" /><PropertyRow name="Font" value="MS Sans Serif" /><PropertyRow name="Height" value="2115" /><PropertyRow name="Icon" value="(Icon)" /><PropertyRow name="Left" value="120" /><PropertyRow name="MaxButton" value="True" />
                  </div>
                  <div className="vb4-property-help"><b>Caption</b><span>Returns/sets the text displayed in an object's title bar.</span></div>
                </section>
              </aside>
            </div>
            <footer className="vb4-statusbar"><span>{runState === "starting" ? "Starting Project1..." : runState === "error" ? "Unable to start project" : "Ready"}</span><span>Form1　Twips</span></footer>
          </section>

          {runState === "running" && result && (
            <section className="vb4-running-form" aria-label="Running Form1 application">
              <header>Form1 <span className="win95-window-buttons" aria-hidden="true"><i>_</i><i>□</i><i>×</i></span></header>
              <button onClick={() => setMessageOpen(true)} type="button">Say Hello</button>
            </section>
          )}

          {messageOpen && result && (
            <section className="vb4-message-box" role="dialog" aria-modal="true" aria-label="Project1 message">
              <header>Project1 <span className="win95-window-buttons" aria-hidden="true"><i>×</i></span></header>
              <div><span className="vb4-info-icon">i</span><p>{result.executionOutput}</p></div>
              <button onClick={() => setMessageOpen(false)} type="button">OK</button>
            </section>
          )}

          <footer className="win95-taskbar">
            <button className="win95-start" type="button"><span>▰</span> Start</button>
            <button className="win95-task active" type="button"><span>VB</span> Project1 - Microsoft Visual Basic</button>
            {runState === "running" && <button className="win95-task" type="button">▣ Form1</button>}
            <div className="win95-tray">🔊　2:35 PM</div>
          </footer>
        </div>
      </div>
    </main>
  );
}

function DesktopIcon({ className, glyph, label }: { className: string; glyph: string; label: string }) {
  return <div className={`win95-desktop-icon ${className}`}><span aria-hidden="true">{glyph}</span><b>{label}</b></div>;
}

function PropertyRow({ name, value }: { name: string; value: string }) {
  return <div><b>{name}</b><span>{value}</span></div>;
}

function VisualBasicLine({ line }: { line: string }) {
  const parts = line.split(/(Private|Sub|End|MsgBox|vbInformation|"[^"]*")/g);
  return <div>{parts.map((part, index) => <span className={/^(Private|Sub|End)$/.test(part) ? "vb4-keyword" : /^"/.test(part) ? "vb4-string" : ""} key={`${index}-${part}`}>{part}</span>)}</div>;
}
