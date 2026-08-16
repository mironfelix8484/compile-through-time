import type { DevelopmentEnvironment } from "../types/Environment";

export function EvidencePanel({ environment }: { environment: DevelopmentEnvironment }) {
  return (
    <aside className="evidence-panel" aria-label="Historical fidelity and evidence">
      <div>
        <span className={`fidelity fidelity-${environment.fidelity.toLowerCase()}`}>{environment.fidelity}</span>
        <p>{fidelityDescription(environment.fidelity)}</p>
      </div>
      <details>
        <summary>Evidence and research notes ({environment.evidence.length})</summary>
        {environment.evidence.map((evidence) => (
          <article className="evidence-source" key={evidence.id}>
            <strong>{evidence.title}</strong>
            <span>{evidence.sourceType.replaceAll("_", " ")} · {evidence.confidenceLevel} confidence</span>
            <p>{evidence.notes}</p>
            {evidence.sourceUrl && <a href={evidence.sourceUrl} rel="noreferrer" target="_blank">Open source</a>}
          </article>
        ))}
      </details>
    </aside>
  );
}

function fidelityDescription(fidelity: DevelopmentEnvironment["fidelity"]): string {
  if (fidelity === "VERIFIED") return "Reproduced on matching software and supported by primary evidence.";
  if (fidelity === "RECONSTRUCTED") return "Reconstructed from credible contemporary evidence with documented assumptions.";
  return "Historically plausible, but important visible details still require direct evidence.";
}
