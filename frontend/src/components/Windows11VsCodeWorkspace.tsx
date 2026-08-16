import { useState } from "react";
import { createCompilation } from "../services/compilations";
import type { CompilationResponse } from "../types/Compilation";
import type { DevelopmentEnvironment } from "../types/Environment";
import { EvidencePanel } from "./EvidencePanel";
import { useFixedCanvasScale } from "./useFixedCanvasScale";
import "./windows11VsCode.css";

interface WorkspaceProps {
  environment: DevelopmentEnvironment;
  onExit: () => void;
}

type SessionState = "idle" | "building" | "built" | "running" | "done" | "error";

export function Windows11VsCodeWorkspace({ environment, onExit }: WorkspaceProps) {
  const { viewportRef, scale } = useFixedCanvasScale(1440, 900);
  const [sessionState, setSessionState] = useState<SessionState>("idle");
  const [result, setResult] = useState<CompilationResponse | null>(null);
  const [researchOpen, setResearchOpen] = useState(false);

  async function build(): Promise<void> {
    if (sessionState === "building") return;
    setSessionState("building");
    setResult(null);
    try {
      setResult(await createCompilation(environment.id));
      setSessionState("built");
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
    setSessionState("idle");
    setResult(null);
  }

  async function toggleFullscreen(): Promise<void> {
    if (document.fullscreenElement) await document.exitFullscreen();
    else await viewportRef.current?.requestFullscreen();
  }

  const hasBuilt = sessionState === "built" || sessionState === "running" || sessionState === "done";

  return (
    <main className="workspace-page">
      <nav className="workspace-controls" aria-label="Workspace controls">
        <button onClick={onExit} type="button">← Exit workspace</button>
        <span>2026 · Windows 11 · Visual Studio Code · TypeScript</span>
        <button onClick={replay} type="button">Replay</button>
        <button onClick={toggleFullscreen} type="button">Fullscreen</button>
        <button aria-expanded={researchOpen} onClick={() => setResearchOpen((open) => !open)} type="button">Research</button>
      </nav>
      {researchOpen && <EvidencePanel environment={environment} />}

      <div className="workspace-viewport" ref={viewportRef}>
        <div className="win11-canvas" style={{ left: `calc(50% - ${720 * scale}px)`, top: `calc(50% - ${450 * scale}px)`, transform: `scale(${scale})` }}>
          <section className="vscode-window" aria-label="Visual Studio Code">
            <header className="vscode-titlebar">
              <span className="vscode-mark">⌁</span>
              <nav>File&nbsp;&nbsp; Edit&nbsp;&nbsp; Selection&nbsp;&nbsp; View&nbsp;&nbsp; Go&nbsp;&nbsp; Run&nbsp;&nbsp; Terminal&nbsp;&nbsp; Help</nav>
              <div className="vscode-command-center">⌕&nbsp;&nbsp; hello-world</div>
              <span className="vscode-layout">◫　▣　◧</span>
              <span className="vscode-window-controls">—　□　×</span>
            </header>

            <div className="vscode-workbench">
              <aside className="vscode-activity" aria-label="Activity Bar">
                <button className="active" title="Explorer" type="button">▱</button>
                <button title="Search" type="button">⌕</button>
                <button title="Source Control" type="button">⑂</button>
                <button title="Run and Debug" type="button">▷</button>
                <button title="Extensions" type="button">▦</button>
                <span />
                <button title="Accounts" type="button">◎</button>
                <button title="Manage" type="button">⚙</button>
              </aside>

              <aside className="vscode-explorer" aria-label="Explorer">
                <header>EXPLORER <span>•••</span></header>
                <div className="vscode-folder-title">⌄ HELLO-WORLD</div>
                <div className="vscode-tree">
                  <div>⌄ <b>src</b></div>
                  <div className="selected">　<span className="ts-file">TS</span> index.ts</div>
                  {hasBuilt && <><div>⌄ <b>dist</b></div><div>　<span className="js-file">JS</span> index.js</div></>}
                  <div><span className="json-file">&#123;&#125;</span> package.json</div>
                  <div><span className="json-file">&#123;&#125;</span> tsconfig.json</div>
                </div>
                <div className="vscode-outline">› OUTLINE</div>
                <div className="vscode-outline">› TIMELINE</div>
              </aside>

              <div className="vscode-main">
                <div className="vscode-tabs" aria-label="Editor tabs">
                  <div className="active"><span className="ts-file">TS</span> index.ts <b>×</b></div>
                  <div><span className="json-file">&#123;&#125;</span> tsconfig.json <b>×</b></div>
                </div>
                <div className="vscode-breadcrumbs">hello-world　›　src　›　<span className="ts-file">TS</span> index.ts　›　…</div>
                <section className="vscode-editor" aria-label="Read-only TypeScript source" role="textbox" aria-readonly="true">
                  <div className="vscode-line"><span className="line-number">1</span><code><span className="vscode-variable">console</span>.<span className="vscode-method">log</span>(<span className="vscode-string">&quot;Hello World&quot;</span>);</code></div>
                  <div className="vscode-line"><span className="line-number">2</span><code /></div>
                  <div className="vscode-minimap">console.log(&quot;Hello World&quot;);</div>
                </section>

                <section className="vscode-panel" aria-label="Integrated terminal">
                  <header><b>PROBLEMS <i>0</i></b><b>OUTPUT</b><b>DEBUG CONSOLE</b><b className="active">TERMINAL</b><b>PORTS</b><span>powershell　＋　⌄　▱　×</span></header>
                  <div className="vscode-terminal-body">
                    {sessionState === "idle" && <p>PS C:\Users\alex\hello-world&gt; <TerminalAction onClick={build}>npx tsc</TerminalAction></p>}
                    {sessionState !== "idle" && <p>PS C:\Users\alex\hello-world&gt; npx tsc</p>}
                    {sessionState === "building" && <p><span className="vscode-cursor"> </span></p>}
                    {sessionState === "error" && <p className="vscode-error">The terminal process could not complete the task.</p>}
                    {sessionState === "built" && <p>PS C:\Users\alex\hello-world&gt; <TerminalAction onClick={run}>node dist/index.js</TerminalAction></p>}
                    {(sessionState === "running" || sessionState === "done") && <p>PS C:\Users\alex\hello-world&gt; node dist/index.js</p>}
                    {sessionState === "running" && <p><span className="vscode-cursor"> </span></p>}
                    {sessionState === "done" && result && <><p>{result.executionOutput}</p><p>PS C:\Users\alex\hello-world&gt; <span className="vscode-cursor"> </span></p></>}
                  </div>
                </section>
              </div>
            </div>

            <footer className="vscode-statusbar"><span>⑂ main*　↻　ⓧ 0　⚠ 0</span><span>Ln 1, Col 28　 Spaces: 2　 UTF-8　 CRLF　 &#123; &#125;　 TypeScript　 ◉ Go Live　 🔔</span></footer>
          </section>

          <footer className="win11-taskbar" aria-label="Windows 11 taskbar">
            <span className="win11-widgets">72°F　☀</span>
            <div><button type="button" aria-label="Start">⊞</button><button type="button" aria-label="Search">⌕</button><button className="vscode-task-icon" type="button" aria-label="Visual Studio Code">⌁</button><button type="button" aria-label="File Explorer">▰</button></div>
            <span className="win11-tray">⌃　Wi-Fi　▣　2:41 PM<br />8/16/2026</span>
          </footer>
        </div>
      </div>
    </main>
  );
}

function TerminalAction({ children, onClick }: { children: string; onClick: () => void }) {
  return <button onClick={onClick} type="button">{children}</button>;
}
