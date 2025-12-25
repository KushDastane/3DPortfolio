import ThreeExperience from "./three/core/ThreeExperience";
import PortfolioUI from "./components/PortfolioUI";
import { useExperience } from "./store/useExperience";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

function App() {
  const { navReady, goNext, goPrev } = useExperience();

  return (
    <>
      <div className="fixed inset-0">
        <ThreeExperience />
      </div>

      {/* Portfolio UI Panels */}
      <PortfolioUI />

      {/* NAV (ONLY INTERACTIVE AREA) */}

      {navReady && (
        <>
          <button
            onClick={goPrev}
            aria-label="Previous section"
            className="
        three-nav fixed left-4 top-1/2 -translate-y-1/2 z-[10000]
        w-12 h-12 rounded-full
        bg-black/70 backdrop-blur
        border border-teal-400/70
        text-teal-300
        shadow-[0_0_22px_rgba(45,212,191,0.7)]
        hover:scale-110 transition
        flex items-center justify-center
      "
          >
            <FiChevronLeft size={26} />
          </button>

          <button
            onClick={goNext}
            aria-label="Next section"
            className="
        three-nav fixed right-4 top-1/2 -translate-y-1/2 z-[10000]
        w-12 h-12 rounded-full
        bg-black/70 backdrop-blur
        border border-teal-400/70
        text-teal-300
        shadow-[0_0_22px_rgba(45,212,191,0.7)]
        hover:scale-110 transition
        flex items-center justify-center
      "
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
