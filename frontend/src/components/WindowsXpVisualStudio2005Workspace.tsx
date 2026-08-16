import { useEffect, useRef, useState } from "react";
import { createCompilation } from "../services/compilations";
import type { CompilationResponse } from "../types/Compilation";
import type { DevelopmentEnvironment } from "../types/Environment";
import { EvidencePanel } from "./EvidencePanel";

interface WorkspaceProps {
  environment: DevelopmentEnvironment;
  onExit: () => void;
}

export function WindowsXpVisualStudio2005Workspace({ environment, onExit }: WorkspaceProps) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const timers = useRef<number[]>([]);
  const [scale, setScale] = useState(1);
  const [buildMenuOpen, setBuildMenuOpen] = useState(false);
  const [compilation, setCompilation] = useState<CompilationResponse | null>(null);
  const [visiblePhases, setVisiblePhases] = useState(0);
  const [buildState, setBuildState] = useState<"idle" | "building" | "built" | "error">("idle");
  const [consoleOpen, setConsoleOpen] = useState(false);
  const [researchOpen, setResearchOpen] = useState(false);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    const updateScale = () => setScale(Math.min(viewport.clientWidth / 1024, viewport.clientHeight / 768, 1));
    const observer = new ResizeObserver(updateScale);
    observer.observe(viewport);
    updateScale();
    return () => observer.disconnect();
  }, []);

  useEffect(() => () => clearTimers(), []);

  function clearTimers(): void {
    timers.current.forEach(window.clearTimeout);
    timers.current = [];
  }

  async function buildSolution(): Promise<void> {
    clearTimers();
    setBuildMenuOpen(false);
    setConsoleOpen(false);
    setCompilation(null);
    setVisiblePhases(0);
    setBuildState("building");
    try {
      const result = await createCompilation(environment.id);
      setCompilation(result);
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const interval = reducedMotion ? 140 : 550;
      result.phases.forEach((_phase, index) => {
        timers.current.push(window.setTimeout(() => {
          setVisiblePhases(index + 1);
          if (index === result.phases.length - 1) setBuildState("built");
        }, 250 + index * interval));
      });
    } catch {
      setBuildState("error");
    }
  }

  function replay(): void {
    clearTimers();
    setCompilation(null);
    setVisiblePhases(0);
    setBuildState("idle");
    setConsoleOpen(false);
    setBuildMenuOpen(false);
  }

  async function toggleFullscreen(): Promise<void> {
    if (document.fullscreenElement) await document.exitFullscreen();
    else await viewportRef.current?.requestFullscreen();
  }

  const sourceLines = environment.experience!.source.code.split("\n");
  const phases = compilation?.phases.slice(0, visiblePhases) ?? [];

  return (
    <main className="workspace-page">
      <nav className="workspace-controls" aria-label="Workspace controls">
        <button onClick={onExit} type="button">← Exit workspace</button>
        <span>Windows XP · Visual Studio 2005 · C#</span>
        <button onClick={replay} type="button">Replay</button>
        <button onClick={toggleFullscreen} type="button">Fullscreen</button>
        <button aria-expanded={researchOpen} onClick={() => setResearchOpen((open) => !open)} type="button">Research</button>
      </nav>
      {researchOpen && <EvidencePanel environment={environment} />}
      <div className="workspace-viewport" ref={viewportRef}>
        <div
          className="xp-canvas"
          style={{
            left: `calc(50% - ${512 * scale}px)`,
            top: `calc(50% - ${384 * scale}px)`,
            transform: `scale(${scale})`,
          }}
        >
          <div className="xp-desktop-icon xp-computer"><span aria-hidden="true">▣</span><b>My Computer</b></div>
          <div className="xp-desktop-icon xp-recycle"><span aria-hidden="true">♲</span><b>Recycle Bin</b></div>

          <section className="vs2005-window" aria-label="Microsoft Visual Studio 2005">
            <header className="vs-titlebar"><span className="vs-logo">∞</span><b>HelloWorld - Microsoft Visual Studio</b><span className="xp-window-buttons">_ □ ×</span></header>
            <div className="vs-menubar">
              {['File', 'Edit', 'View', 'Project'].map((item) => <span key={item}>{item}</span>)}
              <div className="vs-menu-anchor">
                <button aria-expanded={buildMenuOpen} onClick={() => setBuildMenuOpen((open) => !open)} type="button">Build</button>
                {buildMenuOpen && <div className="vs-dropdown"><button disabled={buildState === "building"} onClick={buildSolution} type="button"><span>Build Solution</span><kbd>Ctrl+Shift+B</kbd></button></div>}
              </div>
              {['Debug', 'Data', 'Tools', 'Window', 'Help'].map((item) => <span key={item}>{item}</span>)}
            </div>
            <div className="vs-toolbars">
              <div className="vs-tool-icons">▤　▣　▢　↶　↷</div>
              <select aria-label="Build configuration" defaultValue="Debug"><option>Debug</option></select>
              <select aria-label="Build platform" defaultValue="Any CPU"><option>Any CPU</option></select>
              <button className="vs-build-shortcut" disabled={buildState === "building"} onClick={buildSolution} title="Build Solution" type="button">▦ Build Solution</button>
              <button className="vs-run-button" disabled={buildState !== "built"} onClick={() => setConsoleOpen(true)} type="button">▶ Start Without Debugging</button>
            </div>

            <div className="vs-document-area">
              <section className="vs-editor" aria-label="Read-only Program.cs source code">
                <div className="vs-document-tab">Program.cs <span>×</span></div>
                <div className="vs-code" role="textbox" aria-readonly="true">
                  {sourceLines.map((line, index) => <div className="code-line" key={`${index}-${line}`}><span>{index + 1}</span><code>{line || " "}</code></div>)}
                </div>
              </section>
              <aside className="vs-solution-explorer">
                <div className="vs-pane-heading">Solution Explorer <span>×</span></div>
                <div className="solution-toolbar">▤　⌂　↻</div>
                <div className="solution-tree"><b>▾ Solution 'HelloWorld' (1 project)</b><span>　▾ HelloWorld</span><span>　　 Properties</span><span>　　 References</span><span>　　 <b>Program.cs</b></span></div>
                <div className="vs-properties-heading">Properties</div>
              </aside>
            </div>

            <section className="vs-output-window" aria-live="polite">
              <div className="vs-output-heading">Output <span>×</span></div>
              <div className="vs-output-filter">Show output from: <select defaultValue="Build"><option>Build</option></select></div>
              <div className="vs-output-content">
                {buildState === "idle" && <span className="output-idle">Ready</span>}
                {phases.map((phase) => <pre key={phase.id}>{phase.output}</pre>)}
                {buildState === "building" && visiblePhases === 0 && <span>Build started...</span>}
                {buildState === "error" && <span className="build-error">The historical transcript could not be loaded.</span>}
              </div>
            </section>
            <footer className="vs-statusbar"><span>{buildState === "building" ? "Build started..." : buildState === "built" ? "Build succeeded" : "Ready"}</span><span>Ln 1　Col 1　Ch 1　INS</span></footer>
          </section>

          {consoleOpen && compilation && <section className="xp-command-window" aria-label="Program output"><header>C:\WINDOWS\system32\cmd.exe <span>_ □ ×</span></header><pre>{compilation.executionOutput}{"\n\n"}Press any key to continue . . .</pre></section>}

          <footer className="xp-taskbar"><button className="xp-start" type="button"><span>⊞</span> start</button><button className="xp-task active" type="button"><span>∞</span> HelloWorld - Microsoft Visual Studio</button>{consoleOpen && <button className="xp-task" type="button">▣ cmd.exe</button>}<div className="xp-tray">◀　🔊　10:42 AM</div></footer>
        </div>
      </div>
    </main>
  );
}
