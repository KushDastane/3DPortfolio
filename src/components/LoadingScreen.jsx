import { useEffect, useState } from "react";
import { useExperience } from "../store/useExperience";

export default function LoadingScreen() {
  const { loadingProgress } = useExperience();
  const [dots, setDots] = useState("");
  // Removed fake progress logic, now using real progress from store

  useEffect(() => {
    const dotInterval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "" : prev + "."));
    }, 400);

    return () => clearInterval(dotInterval);
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/80">
      <div className="border-2 border-green-400 bg-black p-8 shadow-lg shadow-green-400/20">
        <div className="text-center font-mono">
          {/* Title */}
          <div className="text-green-400 text-2xl mb-2 tracking-widest">
            SYSTEM.EXE
          </div>

          {/* Separator */}
          <div className="text-green-400 text-xs mb-6">
            ════════════════════════════
          </div>

          {/* Status */}
          <div className="text-green-400 text-sm mb-6 text-left">
            &gt; Loading 3D model{dots}
          </div>

          {/* Progress bar */}
          <div className="w-80 border-2 border-green-400 p-1 bg-black mb-3">
            <div
              className="h-6 bg-green-400 transition-all duration-300"
              style={{ width: `${loadingProgress}%` }}
            />
          </div>

          {/* Percentage */}
          <div className="text-green-400 text-lg font-bold tabular-nums">
            [{Math.round(loadingProgress)}%]
          </div>

          {/* Footer */}
          <div className="text-green-400 text-xs mt-6 opacity-70">
            PLEASE WAIT...
          </div>
        </div>
      </div>
    </div>
  );
}
