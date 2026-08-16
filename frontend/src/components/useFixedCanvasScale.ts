import { useEffect, useRef, useState } from "react";

export function useFixedCanvasScale(width: number, height: number) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    const updateScale = () => setScale(Math.min(viewport.clientWidth / width, viewport.clientHeight / height, 1));
    const observer = new ResizeObserver(updateScale);
    observer.observe(viewport);
    updateScale();
    return () => observer.disconnect();
  }, [height, width]);

  return { viewportRef, scale };
}
