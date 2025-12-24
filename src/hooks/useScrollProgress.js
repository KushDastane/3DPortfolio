import { useEffect, useRef, useState } from "react";

export function useScrollProgress() {
  const [progress, setProgress] = useState(0);
  const progressRef = useRef(0);

  useEffect(() => {
    function onWheel(e) {
      progressRef.current += e.deltaY * 0.0005; // sensitivity
      progressRef.current = Math.min(Math.max(progressRef.current, 0), 1);
      setProgress(progressRef.current);
    }

    window.addEventListener("wheel", onWheel, { passive: true });

    return () => {
      window.removeEventListener("wheel", onWheel);
    };
  }, []);

  return progress;
}
