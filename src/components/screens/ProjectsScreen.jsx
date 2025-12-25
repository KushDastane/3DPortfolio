import { useState, useEffect, useRef } from "react";
import CRTScreen from "../CRTScreen";
import { useExperience } from "../../store/useExperience";

/* ================= DATA ================= */

const PROJECTS = [
  {
    id: "eco_commerce",
    title: "ECO_COMMERCE",
    status: "COMPLETED",
    tech: ["React", "Node.js", "MongoDB"],
    desc: "A sustainable shopping platform with real-time inventory tracking and carbon footprint calculation.",
    live: "https://example.com",
    git: "https://github.com/example/eco-commerce",
    image: "https://images.unsplash.com/photo-1557821552-17105176677c?w=800",
  },
  {
    id: "retro_dash",
    title: "RETRO_DASH",
    status: "ONGOING",
    tech: ["React", "Tailwind", "UI Systems"],
    desc: "A retro-futuristic dashboard inspired by classic operating systems and CRT aesthetics.",
    live: "https://example.com",
    git: "https://github.com/example/retro-dash",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800",
  },
  {
    id: "portfolio_os",
    title: "PORTFOLIO_OS",
    status: "ACTIVE",
    tech: ["Three.js", "React", "WebGL"],
    desc: "An interactive 3D portfolio experience blending real-time graphics with narrative UI systems.",
    live: "https://example.com",
    git: "https://github.com/example/portfolio-os",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800",
  },
  {
    id: "portfolio_os",
    title: "PORTFOLIO_OS",
    status: "ACTIVE",
    tech: ["Three.js", "React", "WebGL"],
    desc: "An interactive 3D portfolio experience blending real-time graphics with narrative UI systems.",
    live: "https://example.com",
    git: "https://github.com/example/portfolio-os",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800",
  },
  {
    id: "portfolio_os",
    title: "PORTFOLIO_OS",
    status: "ACTIVE",
    tech: ["Three.js", "React", "WebGL"],
    desc: "An interactive 3D portfolio experience blending real-time graphics with narrative UI systems.",
    live: "https://example.com",
    git: "https://github.com/example/portfolio-os",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800",
  },
  {
    id: "portfolio_os",
    title: "PORTFOLIO_OS",
    status: "ACTIVE",
    tech: ["Three.js", "React", "WebGL"],
    desc: "An interactive 3D portfolio experience blending real-time graphics with narrative UI systems.",
    live: "https://example.com",
    git: "https://github.com/example/portfolio-os",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800",
  },
];

/* ================= MAIN ================= */

export default function ProjectsScreen() {
  const { activeSection } = useExperience();

  const [mode, setMode] = useState("terminal"); // terminal | projects
  const [command, setCommand] = useState("");
  const [isMobile, setIsMobile] = useState(false);

  const inputRef = useRef(null);

  /* ---------- MOBILE DETECT ---------- */
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  /* ---------- AUTO FOCUS ---------- */
  useEffect(() => {
    if (activeSection === "projects" && inputRef.current) {
      inputRef.current.focus();
    }
  }, [activeSection]);

  /* ---------- COMMAND ---------- */
  function runCommand(cmd) {
    if (cmd.toLowerCase().trim() === "list") {
      setMode("projects");
    }
    setCommand("");
  }

  return (
    <CRTScreen>
      {/* ================= TERMINAL ================= */}
      {mode === "terminal" && (
        <div
          style={{
            padding: "24px",
            height: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* TOP BAR */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              borderBottom: "2px solid rgba(0,0,0,0.7)",
              paddingBottom: "10px",
              marginBottom: "18px",
              fontSize: "13px",
            }}
          >
            <span>OS_SYSTEM_V1.0</span>
            <span>DIR:/PROJECTS</span>
          </div>

          {/* TERMINAL BODY */}
          <div
            style={{
              flex: 1,
              border: "2px solid rgba(0,0,0,0.7)",
              padding: "16px",
              fontSize: "13px",
            }}
          >
            <pre style={{ marginBottom: "12px" }}>
              TYPE 'list' TO VIEW PROJECTS
            </pre>

            <div style={{ display: "flex" }}>
              <span>&gt;</span>
              <input
                ref={inputRef}
                value={command}
                onChange={(e) => setCommand(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") runCommand(command);
                }}
                style={{
                  flex: 1,
                  background: "transparent",
                  border: "none",
                  outline: "none",
                  marginLeft: "6px",
                  fontFamily: "inherit",
                }}
              />
            </div>

            {/* MOBILE BUTTON */}
            {isMobile && (
              <button
                onClick={() => setMode("projects")}
                style={{
                  marginTop: "16px",
                  border: "2px solid rgba(0,0,0,0.7)",
                  padding: "8px 14px",
                  fontSize: "13px",
                }}
              >
                LIST PROJECTS
              </button>
            )}
          </div>

          {/* FOOTER */}
          <div
            style={{
              borderTop: "2px solid rgba(0,0,0,0.7)",
              paddingTop: "10px",
              fontSize: "12px",
              marginTop: "14px",
            }}
          >
            C:\PROJECTS&gt; READY_
          </div>
        </div>
      )}

      {/* ================= PROJECTS ================= */}
      {mode === "projects" && (
        <div
          style={{
            padding: isMobile ? "18px" : "28px",
            height: "100%",
            overflowY: "auto",
          }}
        >
          {/* HEADER */}
          <div
            style={{
              borderBottom: "2px solid rgba(0,0,0,0.7)",
              paddingBottom: "12px",
              marginBottom: "22px",
            }}
          >
            <h1
              style={{
                fontSize: isMobile ? "22px" : "28px",
                letterSpacing: "2px",
              }}
            >
              PROJECTS_DIRECTORY
            </h1>
            <p style={{ fontSize: "12px", opacity: 0.8 }}>
              SELECTED WORK · INTERACTIVE SYSTEMS
            </p>
          </div>

          {/* GRID */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile
                ? "1fr"
                : "repeat(auto-fit, minmax(320px, 1fr))",
              gap: isMobile ? "18px" : "22px",
            }}
          >
            {PROJECTS.map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>
        </div>
      )}
    </CRTScreen>
  );
}

/* ================= CARD ================= */

function ProjectCard({ project }) {
  return (
    <div
      style={{
        border: "2px solid rgba(0,0,0,0.7)",
        padding: "16px",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
      }}
    >
      <h2 style={{ fontSize: "18px" }}>{project.title}</h2>

      <p className="text-[11px]">
        STATUS:{" "}
        <span
          className={`px-2 py-[2px] rounded font-bold tracking-wider
      ${
        project.status === "COMPLETED"
          ? "bg-black text-[#3aeedd] shadow-[0_0_6px_rgba(58,238,221,0.6)]"
          : "bg-black text-[#f5e96b] shadow-[0_0_6px_rgba(245,233,107,0.6)]"
      }`}
        >
          {project.status}
        </span>
      </p>

      <img
        src={project.image}
        alt={project.title}
        style={{
          width: "100%",
          height: "180px",
          objectFit: "cover",
          border: "1px solid black",
        }}
      />

      <p style={{ fontSize: "13px", lineHeight: "1.6" }}>{project.desc}</p>

      <div style={{ fontSize: "11px" }}>TECH: {project.tech.join(", ")}</div>

      {/* ACTIONS */}
      <div
        style={{
          marginTop: "auto",
          display: "flex",
          gap: "14px",
          fontSize: "12px",
        }}
      >
        <a href={project.live} target="_blank" rel="noreferrer">
          [ OPEN LIVE ]
        </a>
        <a href={project.git} target="_blank" rel="noreferrer">
          [ VIEW SOURCE ]
        </a>
      </div>
    </div>
  );
}
