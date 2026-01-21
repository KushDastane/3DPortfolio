import { useEffect, useState } from "react";
import { useExperience } from "../store/useExperience";

export default function LoadingScreen() {
  const { loadingProgress } = useExperience();
  const [dots, setDots] = useState("");

  useEffect(() => {
    const dotInterval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "" : prev + "."));
    }, 400);

    return () => clearInterval(dotInterval);
  }, []);

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/40 backdrop-blur-xl">
      <div
        className="relative w-80 p-8 rounded-2xl bg-white/5 border border-white/10 shadow-2xl backdrop-blur-md overflow-hidden"
        style={{
          boxShadow: '0 0 40px rgba(45,212,191,0.15), inset 0 0 20px rgba(255,255,255,0.05)'
        }}
      >
        {/* Glow effect in corner */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-teal-500/20 blur-[50px] rounded-full" />
        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-teal-500/20 blur-[50px] rounded-full" />

        <div className="relative text-center font-mono">
          {/* Title */}
          <div className="text-teal-400 text-xs font-bold tracking-[0.3em] mb-8 uppercase opacity-80">
            Initializing System
          </div>

          {/* Status */}
          <div className="text-teal-100/60 text-[10px] mb-2 flex justify-between uppercase tracking-widest">
            <span>Loading Assets{dots}</span>
            <span className="text-teal-400 font-bold">{Math.round(loadingProgress)}%</span>
          </div>

          {/* Minimal Progress bar */}
          <div className="w-full h-[2px] bg-white/10 rounded-full overflow-hidden mb-8">
            <div
              className="h-full bg-gradient-to-r from-teal-500 to-teal-300 transition-all duration-300 ease-out shadow-[0_0_8px_rgba(45,212,191,0.8)]"
              style={{ width: `${loadingProgress}%` }}
            />
          </div>

          {/* Subtext */}
          <div className="text-[9px] text-teal-100/30 uppercase tracking-[0.2em] animate-pulse">
            Configuring Neural Environment
          </div>
        </div>
      </div>
    </div>
  );
}
