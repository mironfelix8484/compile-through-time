import { useState } from "react";
import type { DevelopmentEnvironment } from "../types/Environment";
import { EvidencePanel } from "./EvidencePanel";
import { useBuildPlayback } from "./useBuildPlayback";
import { useFixedCanvasScale } from "./useFixedCanvasScale";
import "./ubuntuNetBeans.css";

interface WorkspaceProps {
  environment: DevelopmentEnvironment;
  onExit: () => void;
}

export function UbuntuNetBeansWorkspace({ environment, onExit }: WorkspaceProps) {
  const { viewportRef, scale } = useFixedCanvasScale(1024, 768);
  const { build, buildState, compilation, phases, reset, visiblePhases } = useBuildPlayback(environment.id);
  const [runMenuOpen, setRunMenuOpen] = useState(false);
  const [outputMode, setOutputMode] = useState<"build" | "run">("build");
  const [researchOpen, setResearchOpen] = useState(false);
  const sourceLines = environment.experience!.source.code.split("\n");

  async function buildProject(): Promise<void> {
    setRunMenuOpen(false);
    setOutputMode("build");
    await build();
  }

  function runProject(): void {
    setRunMenuOpen(false);
    setOutputMode("run");
  }

  function replay(): void {
    reset();
    setRunMenuOpen(false);
    setOutputMode("build");
  }

  async function toggleFullscreen(): Promise<void> {
    if (document.fullscreenElement) await document.exitFullscreen();
    else await viewportRef.current?.requestFullscreen();
  }

  return (
    <main className="workspace-page">
      <nav className="workspace-controls" aria-label="Workspace controls">
        <button onClick={onExit} type="button">← Exit workspace</button>
        <span>Ubuntu 14.04 LTS · NetBeans IDE 8.0.2 · Java</span>
        <button onClick={replay} type="button">Replay</button>
        <button onClick={toggleFullscreen} type="button">Fullscreen</button>
        <button aria-expanded={researchOpen} onClick={() => setResearchOpen((open) => !open)} type="button">Research</button>
      </nav>
      {researchOpen && <EvidencePanel environment={environment} />}

      <div className="workspace-viewport" ref={viewportRef}>
        <div
          className="ubuntu-canvas"
          style={{
            left: `calc(50% - ${512 * scale}px)`,
            top: `calc(50% - ${384 * scale}px)`,
            transform: `scale(${scale})`,
          }}
        >
          <header className="unity-panel">
            <b>NetBeans IDE 8.0.2</b>
            <span>File&nbsp;&nbsp; Edit</span>
            <span className="unity-indicators">●　⌁　▰　10:24 AM　⚙</span>
          </header>
          <aside className="unity-launcher" aria-label="Ubuntu launcher">
            <span className="unity-dash">◉</span><span className="unity-launcher-icon">⌂</span><span className="unity-launcher-icon">▣</span><span className="unity-launcher-icon active">◆</span><span className="unity-launcher-icon">♨</span><span className="unity-launcher-icon">▤</span><span className="unity-launcher-icon unity-trash">♲</span>
          </aside>

          <section className="netbeans-window" aria-label="NetBeans IDE 8.0.2">
            <header className="netbeans-titlebar">
              <span className="netbeans-logo" aria-hidden="true">◆</span>
              <b>HelloWorld - NetBeans IDE 8.0.2</b>
              <span className="ubuntu-window-buttons" aria-hidden="true"><i>×</i><i>−</i><i>□</i></span>
            </header>
            <div className="netbeans-menubar">
              {['File', 'Edit', 'View', 'Navigate', 'Source', 'Refactor'].map((item) => <span key={item}>{item}</span>)}
              <div className="netbeans-menu-anchor">
                <button aria-expanded={runMenuOpen} onClick={() => setRunMenuOpen((open) => !open)} type="button">Run</button>
                {runMenuOpen && (
                  <div className="netbeans-dropdown">
                    <button disabled={buildState === "building"} onClick={buildProject} type="button"><span>Clean and Build Project (HelloWorld)</span><kbd>Shift+F11</kbd></button>
                    <button disabled={buildState !== "built"} onClick={runProject} type="button"><span>Run Project (HelloWorld)</span><kbd>F6</kbd></button>
                  </div>
                )}
              </div>
              {['Debug', 'Profile', 'Team', 'Tools', 'Window', 'Help'].map((item) => <span key={item}>{item}</span>)}
            </div>
            <div className="netbeans-toolbar" aria-label="NetBeans toolbar">
              <button title="New File" type="button">▤</button><button title="Open Project" type="button">▱</button><button title="Save All" type="button">▣</button>
              <span className="netbeans-toolbar-separator" />
              <button title="Undo" type="button">↶</button><button title="Redo" type="button">↷</button>
              <span className="netbeans-toolbar-separator" />
              <button className="netbeans-build" disabled={buildState === "building"} onClick={buildProject} title="Clean and Build Project (Shift+F11)" type="button">🔨</button>
              <button className="netbeans-run" disabled={buildState !== "built"} onClick={runProject} title="Run Project (F6)" type="button">▶</button>
              <button disabled title="Debug Project" type="button">▰</button>
              <span className="netbeans-search">Quick Search <b>⌕</b></span>
            </div>

            <div className="netbeans-work-area">
              <aside className="netbeans-projects">
                <div className="netbeans-pane-tabs"><b>Projects</b><span>Files</span><span>Services</span></div>
                <div className="netbeans-project-tree" aria-label="Projects panel">
                  <b>▾ ☕ HelloWorld</b>
                  <span>　▾ Source Packages</span>
                  <span>　　▾ helloworld</span>
                  <span className="netbeans-selected-file">　　　◇ HelloWorld.java</span>
                  <span>　▸ Test Packages</span>
                  <span>　▸ Libraries</span>
                </div>
                <div className="netbeans-navigator-title">Navigator</div>
                <div className="netbeans-navigator"><b>HelloWorld</b><span>　◇ main(String[] args)</span></div>
              </aside>

              <section className="netbeans-editor" aria-label="Read-only HelloWorld.java source code">
                <div className="netbeans-document-tabs"><b>HelloWorld.java</b><span>×</span></div>
                <div className="netbeans-breadcrumb">HelloWorld.java　›　helloworld　›　HelloWorld</div>
                <div className="netbeans-code" role="textbox" aria-readonly="true">
                  {sourceLines.map((line, index) => <JavaLine key={`${index}-${line}`} line={line} number={index + 1} />)}
                </div>
              </section>
            </div>

            <section className="netbeans-output" aria-live="polite" aria-label="Output panel">
              <div className="netbeans-output-tabs">
                <button className={outputMode === "build" ? "active" : ""} onClick={() => setOutputMode("build")} type="button">HelloWorld (clean,jar)</button>
                {compilation && <button className={outputMode === "run" ? "active" : ""} disabled={buildState !== "built"} onClick={runProject} type="button">HelloWorld (run)</button>}
                <span>×</span>
              </div>
              <div className="netbeans-output-content">
                {outputMode === "build" && buildState === "idle" && <span className="netbeans-output-idle">Output will appear here after the project is built.</span>}
                {outputMode === "build" && phases.map((phase) => <pre key={phase.id}>{phase.output}</pre>)}
                {outputMode === "build" && buildState === "building" && visiblePhases === 0 && <span>Building HelloWorld...</span>}
                {outputMode === "build" && buildState === "error" && <span className="build-error">The historical transcript could not be loaded.</span>}
                {outputMode === "run" && compilation && <pre>{compilation.executionOutput}</pre>}
              </div>
            </section>
            <footer className="netbeans-statusbar"><span>{buildState === "building" ? "Building HelloWorld..." : " "}</span><span>INS　1:1　UTF-8　LF</span></footer>
          </section>
        </div>
      </div>
    </main>
  );
}

function JavaLine({ line, number }: { line: string; number: number }) {
  const parts = line.split(/(package|public|class|static|void|String|System|out|println|"[^"]*")/g);
  return (
    <div className="netbeans-code-line">
      <span className="netbeans-line-number">{number}</span>
      <code>{parts.map((part, index) => {
        const keyword = /^(package|public|class|static|void)$/.test(part);
        const type = /^(String|System)$/.test(part);
        const string = /^"/.test(part);
        return <span className={keyword ? "java-keyword" : type ? "java-type" : string ? "java-string" : ""} key={`${index}-${part}`}>{part}</span>;
      })}</code>
    </div>
  );
}
