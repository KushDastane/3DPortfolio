import ThreeExperience from "./three/core/ThreeExperience";
import PortfolioUI from "./components/PortfolioUI";
import LoadingScreen from "./components/LoadingScreen";
import AudioControls from "./components/AudioControls";
import { useExperience } from "./store/useExperience";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { audioManager } from "./utils/AudioManager";

function App() {
  const { navReady, goNext, goPrev, canGoPrev, isTransitioning, fullyLoaded } =
    useExperience();

  const handleNext = () => {
    audioManager.playClick();

    // Ensure ambient system is started/resumed if music is enabled
    audioManager.startAmbient();

    goNext();
  };

  const handlePrev = () => {
    audioManager.playClick();
    audioManager.startAmbient(); // Start ambient on first interaction
    goPrev();
  };

  return (
    <>
      {/* Loading Screen - shows until fully loaded */}
      {!fullyLoaded && <LoadingScreen />}

      <div className="fixed inset-0">
        <ThreeExperience />
      </div>

      {/* Audio Controls (Hidden on CRT) */}
      <div className="audio-controls-wrapper">
        <AudioControls />
      </div>

      {/* Portfolio UI Panels */}
      <PortfolioUI />

      {/* NAV (ONLY INTERACTIVE AREA) */}

      {navReady && (
        <>
          <button
            onClick={handlePrev}
            disabled={!canGoPrev || isTransitioning}
            aria-label="Previous section"
            className={`
        three-nav fixed left-4 top-1/2 -translate-y-1/2 z-[10000]
        w-12 h-12 rounded-full
        bg-black/70 backdrop-blur
        border border-teal-400/70
        text-teal-300
        shadow-[0_0_22px_rgba(45,212,191,0.7)]
        transition
        flex items-center justify-center
        ${canGoPrev && !isTransitioning
                ? "hover:scale-110 cursor-pointer"
                : "opacity-50 cursor-not-allowed"
              }
      `}
          >
            <FiChevronLeft size={26} />
          </button>

          <button
            onClick={handleNext}
            disabled={isTransitioning}
            aria-label="Next section"
            className={`
        three-nav fixed right-4 top-1/2 -translate-y-1/2 z-[10000]
        w-12 h-12 rounded-full
        bg-black/70 backdrop-blur
        border border-teal-400/70
        text-teal-300
        shadow-[0_0_22px_rgba(45,212,191,0.7)]
        transition
        flex items-center justify-center
        ${isTransitioning
                ? "opacity-50 cursor-not-allowed"
                : "hover:scale-110 cursor-pointer"
              }
      `}
          >
            <FiChevronRight size={26} />
          </button>
        </>
      )}

      {/* Fake scroll space */}
      <div className="scroll-container" />
    </>
  );
}

export default App;
