import { useExperience } from "../store/useExperience";

export default function CRTScreen({ children, align = "center" }) {
  const { isResyncing } = useExperience();

  return (
    <div className={`crt-ui ${isResyncing ? "crt-resync" : ""}`}>
      <div className="crt-root">
        <div className="crt-monitor">
          {/* SINGLE SCROLL CONTAINER */}
          <div className="crt-glass overflow-y-auto">
            {/* ALIGNMENT WRAPPER */}
            <div
              className={`min-h-full w-full flex ${
                align === "center"
                  ? "items-center justify-center"
                  : "items-start justify-start"
              }`}
            >
              {/* CONTENT WRAPPER (THIS IS KEY) */}
              <div className="w-full flex justify-center ">
                {children}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
