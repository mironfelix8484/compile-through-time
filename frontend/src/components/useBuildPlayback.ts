import { useEffect, useRef, useState } from "react";
import { createCompilation } from "../services/compilations";
import type { CompilationResponse } from "../types/Compilation";

export type BuildState = "idle" | "building" | "built" | "error";

export function useBuildPlayback(environmentId: string) {
  const timers = useRef<number[]>([]);
  const [compilation, setCompilation] = useState<CompilationResponse | null>(null);
  const [visiblePhases, setVisiblePhases] = useState(0);
  const [buildState, setBuildState] = useState<BuildState>("idle");

  function clearTimers(): void {
    timers.current.forEach(window.clearTimeout);
    timers.current = [];
  }

  useEffect(() => () => clearTimers(), []);

  async function build(): Promise<void> {
    clearTimers();
    setCompilation(null);
    setVisiblePhases(0);
    setBuildState("building");
    try {
      const result = await createCompilation(environmentId);
      setCompilation(result);
      const interval = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 120 : 430;
      result.phases.forEach((_phase, index) => {
        timers.current.push(window.setTimeout(() => {
          setVisiblePhases(index + 1);
          if (index === result.phases.length - 1) setBuildState("built");
        }, 180 + index * interval));
      });
    } catch {
      setBuildState("error");
    }
  }

  function reset(): void {
    clearTimers();
    setCompilation(null);
    setVisiblePhases(0);
    setBuildState("idle");
  }

  return {
    build,
    buildState,
    compilation,
    phases: compilation?.phases.slice(0, visiblePhases) ?? [],
    reset,
    visiblePhases,
  };
}
