import { useExperience } from "../store/useExperience";

export default function CRTScreen({ children }) {
  const { isResyncing } = useExperience();

  return (
    <div className={`crt-ui ${isResyncing ? "crt-resync" : ""}`}>
      <div className="crt-root">
        <div className="crt-monitor">
          <div className="crt-glass">
            <div className="crt-scroll">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
