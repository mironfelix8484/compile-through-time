import type { DevelopmentEnvironment } from "../types/Environment";

export function EnvironmentResults({ environments }: { environments: DevelopmentEnvironment[] }) {
  const groups = environments.reduce<Record<string, DevelopmentEnvironment[]>>((result, environment) => {
    (result[environment.operatingSystem] ??= []).push(environment);
    return result;
  }, {});

  if (environments.length === 0) return <p>No environments found for this date.</p>;
  return (
    <section className="results" aria-live="polite">
      {Object.entries(groups).map(([operatingSystem, items]) => (
        <article className="os-group" key={operatingSystem}>
          <h2>{operatingSystem}</h2>
          {items.map((environment) => (
            <div className="environment" key={environment.id}>
              <strong>{environment.tool.name}</strong><span>{environment.tool.type}</span>
              <p>{environment.languages.join(" · ")}</p>
            </div>
          ))}
        </article>
      ))}
    </section>
  );
}
