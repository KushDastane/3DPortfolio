import { useState, useEffect, useRef } from "react";
import CRTScreen from "../CRTScreen";
import { useExperience } from "../../store/useExperience";
import { FaReact, FaNodeJs, FaHtml5, FaCss3Alt, FaJs } from "react-icons/fa";
import {
  SiTailwindcss,
  SiFirebase,
  SiMongodb,
  SiExpress,
  SiThreedotjs,
  SiCloudflare,
} from "react-icons/si";
import { SiFlask } from "react-icons/si";

const TECH_ICONS = {
  react: FaReact,
  tailwindcss: SiTailwindcss,
  tailwind: SiTailwindcss,
  firebase: SiFirebase,
  cloudflare: SiCloudflare,
  mongodb: SiMongodb,
  node: FaNodeJs,
  express: SiExpress,
  javascript: FaJs,
  html: FaHtml5,
  css: FaCss3Alt,
  threejs: SiThreedotjs,
  flask: SiFlask,
};

const PROJECTS = [
  {
    id: "vv_caring",
    title: "V.V.CARING CENTER",
    status: "COMPLETED",
    tech: ["React", "TailwindCSS", "Firebase", "Cloudflare"],
    desc: "FullStack Web Application + Admin Panel, leading to ~25% growth and efficient management. ",
    live: "https://www.vvcaringcentre.com/",
    git: false,
    image: "/images/vvc.webp",
  },
  {
    id: "lf",
    title: "RETRIEVIA : LOST & FOUND",
    status: "COMPLETED",
    tech: ["HTML", "CSS", "JAVASCRIPT", "NODE", "EXPRESS", "MONGODB"],
    desc: "Full stack web app to replace the 10+ daily lost-item reports on University WhatsApp groups, streamlining communication into a structured system. Reunites users with lost items with AI NLP. Estimated to handle 300+ reports/month and reduce manual follow-ups by 50%.",
    live: "https://retrievia-lost-found-system-for.onrender.com/",
    git: "https://github.com/KushDastane/Lost-Found.git",
    image: "/images/lf.webp",
  },
  {
    id: "shoe",
    title: "3D Shoe",
    status: "COMPLETED",
    tech: ["Threejs", "React", "Tailwind"],
    desc: "Fun platform to interact with 3D model by color & material mix-match.",
    live: "https://3dshoemodifier.netlify.app/",
    git: "https://github.com/KushDastane/3D-Shoe-Modifier.git",
    image: "/images/shoe.webp",
  },
  {
    id: "webar",
    title: "WebAR 3D Heart",
    status: "COMPLETED",
    tech: ["Javascript"],
    desc: "Interactive WebAR Based Heart model to study its basic anatomy, built on PlayCanvas using JavaScript.",
    live: "https://launch.playcanvas.com/2104581?debug=true",
    git: "https://github.com/KushDastane/3D-Web-AR-Heart-Anatomy-.git",
    image: "/projects/AR.webm",
    marker: {
      label: "DOWNLOAD MARKER",
      file: "images/hiroMarker.webp",
    },
  },
  {
    id: "istyle_ar",
    title: "ISTYLE-AR",
    status: "ONGOING",
    tech: ["React", "Tailwind", "Firebase", "Flask"],
    desc: "Augmented Reality+AI based real-time virtual try-on system for clothes & accesories. Gesture Controlled experience, targeting 30–40% faster user interactions.",
    live: false,
    git: false,
    image: "/images/istylear.webp",

    marker: {
      label: "PUBLISHED JOURNAL",
      file: "https://www.ijraset.com/best-journal/istylear-virtual-tryon-using-augmented-reality",
    },
  },
];

/* ================= MAIN ================= */

export default function ProjectsScreen() {
  const { activeSection } = useExperience();

  const [mode, setMode] = useState("terminal"); // terminal | projects
  const [command, setCommand] = useState("");
  const [output, setOutput] = useState("");
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
    const cleaned = cmd.toLowerCase().trim();

    if (cleaned === "list") {
      setMode("projects");
      setOutput("");
    } else {
      setOutput(`command not found: ${cmd}`);
    }

    setCommand("");
  }

  return (
    <CRTScreen>
      {mode === "terminal" && (
        <div
          style={{
            padding: "24px",
            height: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
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
            {output && (
              <pre
                style={{
                  marginTop: "10px",
                  color: "#b91c1c",
                  fontSize: "12px",
                }}
              >
                {output}
              </pre>
            )}

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

      {project.image.endsWith(".webm") ? (
        <video
          autoPlay
          loop
          muted
          playsInline
          style={{
            width: "100%",
            height: "180px",
            objectFit: "cover",
            border: "1px solid black",
          }}
        >
          <source src={project.image} type="video/webm" />
        </video>
      ) : (
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
      )}

      <p style={{ fontSize: "13px", lineHeight: "1.6" }}>{project.desc}</p>

      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
        {project.tech.map((t) => {
          const Icon = TECH_ICONS[t.toLowerCase()];
          return Icon ? (
            <Icon key={t} size={18} title={t} style={{ opacity: 0.85 }} />
          ) : null;
        })}
      </div>

      {/* ACTIONS */}
      {/* ACTIONS */}
      <div className="mt-auto flex flex-wrap gap-3 text-[12px]">
        {/* LIVE */}
        {project.live ? (
          <a
            href={project.live}
            target="_blank"
            rel="noreferrer"
            className="font-bold border border-black px-2 py-[2px] hover:bg-black hover:text-[#3aeedd] transition"
          >
            [ OPEN LIVE ]
          </a>
        ) : (
          <span className="opacity-60 border border-dashed border-black px-2 py-[2px] cursor-not-allowed">
            [ COMING SOON ]
          </span>
        )}

        {/* SOURCE */}
        {project.git ? (
          <a
            href={project.git}
            target="_blank"
            rel="noreferrer"
            className="font-bold border border-black px-2 py-[2px] hover:bg-black hover:text-[#3aeedd] transition"
          >
            [ VIEW SOURCE ]
          </a>
        ) : (
          <span
            className="opacity-60 border border-dashed border-black px-2 py-[2px] cursor-not-allowed"
            title="Client / private project"
          >
            [ PRIVATE ]
          </span>
        )}

        {/* MARKER (WebAR only) */}
        {project.marker && (
          <a
            href={project.marker.file}
            {...(project.marker.file.startsWith("http")
              ? { target: "_blank", rel: "noreferrer" }
              : { download: true })}
            className="font-bold border border-black px-2 py-[2px] bg-black text-[#f5e96b] hover:bg-[#f5e96b] hover:text-black transition"
            title={project.marker.label}
          >
            [ {project.marker.label} ]
          </a>
        )}
      </div>
    </div>
  );
}
