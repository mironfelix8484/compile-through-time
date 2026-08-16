import { useEffect, useState } from "react";
import type { DevelopmentEnvironment } from "../types/Environment";
import { EvidencePanel } from "./EvidencePanel";
import { useBuildPlayback } from "./useBuildPlayback";
import { useFixedCanvasScale } from "./useFixedCanvasScale";
import "./ubuntuEclipse.css";

interface WorkspaceProps {
  environment: DevelopmentEnvironment;
  onExit: () => void;
}

type EclipseMenu = "project" | "run" | null;

export function UbuntuEclipseWorkspace({ environment, onExit }: WorkspaceProps) {
  const { viewportRef, scale } = useFixedCanvasScale(1024, 768);
  const { build, buildState, compilation, phases, reset, visiblePhases } = useBuildPlayback(environment.id);
  const [openMenu, setOpenMenu] = useState<EclipseMenu>(null);
  const [bottomView, setBottomView] = useState<"problems" | "console">("problems");
  const [researchOpen, setResearchOpen] = useState(false);
  const sourceLines = environment.experience!.source.code.split("\n");

  useEffect(() => {
    if (buildState === "built") setBottomView("console");
  }, [buildState]);

  async function runJavaApplication(): Promise<void> {
    setOpenMenu(null);
    setBottomView("problems");
    await build();
  }

  function replay(): void {
    reset();
    setOpenMenu(null);
    setBottomView("problems");
  }

  async function toggleFullscreen(): Promise<void> {
    if (document.fullscreenElement) await document.exitFullscreen();
    else await viewportRef.current?.requestFullscreen();
  }

  return (
    <main className="workspace-page">
      <nav className="workspace-controls" aria-label="Workspace controls">
        <button onClick={onExit} type="button">← Exit workspace</button>
        <span>Ubuntu 8.04 LTS · Eclipse 3.3.2 Europa · Java 6</span>
        <button onClick={replay} type="button">Replay</button>
        <button onClick={toggleFullscreen} type="button">Fullscreen</button>
        <button aria-expanded={researchOpen} onClick={() => setResearchOpen((open) => !open)} type="button">Research</button>
      </nav>
      {researchOpen && <EvidencePanel environment={environment} />}

      <div className="workspace-viewport" ref={viewportRef}>
        <div
          className="hardy-canvas"
          style={{
            left: `calc(50% - ${512 * scale}px)`,
            top: `calc(50% - ${384 * scale}px)`,
            transform: `scale(${scale})`,
          }}
        >
          <header className="gnome-top-panel">
            <span className="gnome-logo" aria-hidden="true">◉</span><b>Applications</b><b>Places</b><b>System</b>
            <span className="gnome-panel-right">⌁　▰　🔊　Mon Jun 2, 10:18 AM　alex</span>
          </header>

          <section className="eclipse-window" aria-label="Eclipse SDK 3.3.2">
            <header className="human-titlebar">
              <span className="eclipse-mark" aria-hidden="true">◒</span><b>HelloWorld - Eclipse SDK</b>
              <span className="human-window-buttons" aria-hidden="true"><i>−</i><i>□</i><i>×</i></span>
            </header>
            <div className="eclipse-menubar">
              {['File', 'Edit', 'Source', 'Refactor', 'Navigate', 'Search'].map((item) => <span key={item}>{item}</span>)}
              <div className="eclipse-menu-anchor">
                <button aria-expanded={openMenu === "project"} onClick={() => setOpenMenu((menu) => menu === "project" ? null : "project")} type="button">Project</button>
                {openMenu === "project" && (
                  <div className="eclipse-dropdown eclipse-project-menu">
                    <button disabled type="button"><span>Build All</span><kbd>Ctrl+B</kbd></button>
                    <button disabled type="button"><span>Build Project</span><kbd /></button>
                    <button disabled type="button"><span>Clean...</span><kbd /></button>
                    <button className="eclipse-checked" disabled type="button"><span>✓　Build Automatically</span><kbd /></button>
                  </div>
                )}
              </div>
              <div className="eclipse-menu-anchor">
                <button aria-expanded={openMenu === "run"} onClick={() => setOpenMenu((menu) => menu === "run" ? null : "run")} type="button">Run</button>
                {openMenu === "run" && (
                  <div className="eclipse-dropdown eclipse-run-menu">
                    <button disabled={buildState === "building"} onClick={runJavaApplication} type="button"><span>Run As　›　Java Application</span><kbd>Ctrl+F11</kbd></button>
                    <button disabled type="button"><span>Debug As　›</span><kbd>F11</kbd></button>
                    <button disabled type="button"><span>Run Configurations...</span><kbd /></button>
                  </div>
                )}
              </div>
              {['Window', 'Help'].map((item) => <span key={item}>{item}</span>)}
            </div>

            <div className="eclipse-toolbar" aria-label="Eclipse toolbar">
              <button title="New" type="button">▤</button><button title="Save" type="button">▣</button><button title="Save All" type="button">▥</button>
              <span className="eclipse-tool-separator" />
              <button title="Back" type="button">←</button><button title="Forward" type="button">→</button>
              <span className="eclipse-tool-separator" />
              <button className="eclipse-run-button" disabled={buildState === "building"} onClick={runJavaApplication} title="Run As Java Application" type="button">▶</button>
              <button className="eclipse-debug-button" disabled title="Debug" type="button">♟</button>
              <span className="eclipse-tool-separator" />
              <button title="Search" type="button">⌕</button>
              <div className="eclipse-perspectives"><span>Open Perspective</span><button className="active" type="button">Java</button><button type="button">Java Browsing</button></div>
            </div>

            <div className="eclipse-main-grid">
              <aside className="eclipse-package-explorer">
                <div className="eclipse-view-title"><b>Package Explorer</b><span>▾　×</span></div>
                <div className="eclipse-view-toolbar">⇆　▥　▾</div>
                <div className="eclipse-tree" aria-label="Package Explorer">
                  <b>▾ J HelloWorld</b>
                  <span>　▾ src</span>
                  <span>　　▾ helloworld</span>
                  <span className="eclipse-selected-file">　　　J HelloWorld.java</span>
                  <span>　▸ JRE System Library [JavaSE-1.6]</span>
                </div>
              </aside>

              <section className="eclipse-editor" aria-label="Read-only HelloWorld.java source code">
                <div className="eclipse-editor-tabs"><b>J HelloWorld.java</b><span>×</span></div>
                <div className="eclipse-editor-body" role="textbox" aria-readonly="true">
                  <div className="eclipse-fold-margin" aria-hidden="true">−<br /><br />−<br />　<br />−</div>
                  <div className="eclipse-code">
                    {sourceLines.map((line, index) => <EclipseJavaLine key={`${index}-${line}`} line={line} number={index + 1} />)}
                  </div>
                </div>
              </section>

              <aside className="eclipse-outline">
                <div className="eclipse-view-title"><b>Outline</b><span>▾　×</span></div>
                <div className="eclipse-outline-toolbar">▦　▥　▾</div>
                <div className="eclipse-outline-tree"><b>◇ HelloWorld</b><span>　◉ main(String[])</span></div>
              </aside>
            </div>

            <section className="eclipse-bottom-view" aria-live="polite">
              <div className="eclipse-bottom-tabs">
                <button className={bottomView === "problems" ? "active" : ""} onClick={() => setBottomView("problems")} type="button">Problems</button>
                <button type="button">Javadoc</button><button type="button">Declaration</button>
                <button className={bottomView === "console" ? "active" : ""} onClick={() => setBottomView("console")} type="button">Console</button>
                <span>▾　×</span>
              </div>
              {bottomView === "problems" ? (
                <div className="eclipse-problems">
                  <div className="eclipse-problems-header"><span>Description</span><span>Resource</span><span>Path</span><span>Location</span><span>Type</span></div>
                  <div className="eclipse-build-progress">
                    {buildState === "idle" && <span>0 errors, 0 warnings</span>}
                    {phases.map((phase) => <pre key={phase.id}>{phase.output}</pre>)}
                    {buildState === "building" && visiblePhases === 0 && <span>Building workspace</span>}
                    {buildState === "error" && <span className="build-error">Automatic build status unavailable.</span>}
                  </div>
                </div>
              ) : (
                <div className="eclipse-console">
                  <div className="eclipse-console-toolbar"><span>{compilation ? "HelloWorld [Java Application]" : "No consoles to display at this time."}</span><span>■　▣　▾</span></div>
                  <pre>{buildState === "built" && compilation ? compilation.executionOutput : ""}</pre>
                </div>
              )}
            </section>
            <footer className="eclipse-statusbar"><span>{buildState === "building" ? "Building workspace..." : " "}</span><span>Writable　Smart Insert　3 : 1</span></footer>
          </section>

          <footer className="gnome-bottom-panel">
            <button title="Show Desktop" type="button">▣</button><button className="gnome-window-task" type="button"><span>◒</span> HelloWorld - Eclipse SDK</button>
            <div className="gnome-workspaces" aria-hidden="true"><i /><i /><i /><i /></div><span>♲</span>
          </footer>
        </div>
      </div>
    </main>
  );
}

function EclipseJavaLine({ line, number }: { line: string; number: number }) {
  const parts = line.split(/(package|public|class|static|void|String|System|out|println|"[^"]*")/g);
  return (
    <div className="eclipse-code-line">
      <span className="eclipse-line-number">{number}</span>
      <code>{parts.map((part, index) => {
        const keyword = /^(package|public|class|static|void)$/.test(part);
        const type = /^(String|System)$/.test(part);
        const string = /^"/.test(part);
        return <span className={keyword ? "eclipse-java-keyword" : type ? "eclipse-java-type" : string ? "eclipse-java-string" : ""} key={`${index}-${part}`}>{part}</span>;
      })}</code>
    </div>
  );
}
