export default function CRTScreen({ children }) {
  return (
    <div className="crt-ui">
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
