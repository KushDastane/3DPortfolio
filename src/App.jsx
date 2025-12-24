import ThreeExperience from "./three/core/ThreeExperience";
import PortfolioUI from "./components/PortfolioUI";

function App() {
  return (
    <>
      <div className="fixed inset-0">
        <ThreeExperience />
      </div>

      {/* Portfolio UI Panels */}
      <PortfolioUI />

      {/* Fake scroll space */}
      <div className="scroll-container" />
    </>
  );
}

export default App;
