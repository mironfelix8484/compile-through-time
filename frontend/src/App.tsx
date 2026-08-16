import { useEffect, useState } from "react";
import { WorkspaceRenderer } from "./components/WorkspaceRenderer";
import { YearTimeline } from "./components/YearTimeline";
import { getEnvironments } from "./services/environments";
import type { DevelopmentEnvironment } from "./types/Environment";
import "./styles.css";

const SNAPSHOT_YEARS = [1979, 1983, 1991, 1995, 1999, 2005, 2008, 2015, 2026];

export default function App() {
  const [date, setDate] = useState("");
  const [environment, setEnvironment] = useState<DevelopmentEnvironment | null>(null);
  const [entered, setEntered] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setEnvironment(null);
    setEntered(false);
    if (!date) return;
    const controller = new AbortController();
    setError("");
    getEnvironments(date, controller.signal)
      .then(({ environments }) => setEnvironment(environments[0] ?? null))
      .catch((reason: unknown) => {
        if (!(reason instanceof DOMException && reason.name === "AbortError")) setError("Unable to load the workspace snapshot.");
      });
    return () => controller.abort();
  }, [date]);

  if (entered && environment) return <WorkspaceRenderer environment={environment} onExit={() => setEntered(false)} />;

  return (
    <main className="timeline-page">
      <header className="intro">
        <p className="eyebrow">Compile Through Time</p>
        <h1>Choose a year. Sit down at the machine.</h1>
        <p>Reconstructed developer workspaces focused on what appeared on screen when Build or Run was pressed.</p>
      </header>
      <section className="time-navigation" aria-labelledby="timeline-heading">
        <h2 id="timeline-heading">Timeline</h2>
        <YearTimeline availableYears={SNAPSHOT_YEARS} date={date} onChange={setDate} />
        <p className="timeline-hint">Nine researched workspaces are currently open to visitors.</p>
      </section>
      {error && <p className="error-message" role="alert">{error}</p>}
      {date && !error && environment && (
        <article className="snapshot-card">
          <div><span className="snapshot-year">{date.slice(0, 4)}</span><span className="fidelity-badge">{environment.fidelity}</span></div>
          <h2>{environment.operatingSystem} · {environment.tool.name}</h2>
          <p>{environment.languages.join(", ")} · Hello World · {environment.experience?.buildActionLabel}</p>
          <button className="enter-workspace" onClick={() => setEntered(true)} type="button">Enter workspace</button>
        </article>
      )}
    </main>
  );
}
