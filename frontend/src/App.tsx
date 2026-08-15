import { useEffect, useState } from "react";
import { EnvironmentResults } from "./components/EnvironmentResults";
import { getEnvironments } from "./services/environments";
import type { DevelopmentEnvironment } from "./types/Environment";
import "./styles.css";

export default function App() {
  const [date, setDate] = useState("");
  const [environments, setEnvironments] = useState<DevelopmentEnvironment[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!date) { setEnvironments([]); return; }
    const controller = new AbortController();
    setError("");
    getEnvironments(date, controller.signal)
      .then(({ environments: results }) => setEnvironments(results))
      .catch((reason: unknown) => {
        if (!(reason instanceof DOMException && reason.name === "AbortError")) setError("Unable to load development environments.");
      });
    return () => controller.abort();
  }, [date]);

  return (
    <main>
      <h1>Compile Through Time</h1>
      <label>Choose a date<input type="date" value={date} onChange={(event) => setDate(event.target.value)} /></label>
      {error && <p role="alert">{error}</p>}
      {date && !error && <EnvironmentResults environments={environments} />}
    </main>
  );
}
