import { useState, useEffect, useRef } from "react";
import CRTScreen from "../CRTScreen";
import { useExperience } from "../../store/useExperience";
import { audioManager } from "../../utils/AudioManager";
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
import { DiPython } from "react-icons/di";

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
  python: DiPython,
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
    id: "particle_space",
    title: "PARTICLE SPACE 3D",
    status: "COMPLETED",
    tech: ["Threejs", "Python", "Javascript", "React", "Tailwind"],
    desc: "Gesture Controlled Futuristic 3D model viewer with AI based particle animation. Also designed for user uploaded 3D models.",
    live: "https://particlespace.netlify.app/",
    git: "https://github.com/KushDastane/ParticleSpace.git",
    image: "/images/thumbnail.webp",
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
                onChange={(e) => {
                  setCommand(e.target.value);
                  audioManager.playClick();
                }}
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
            scrollbarWidth: "none",
          }}
          className="no-scrollbar"
        >
          {/* GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 pb-20">
            {PROJECTS.map((p) => (
              <ProjectCard key={p.id} project={p} isMobile={isMobile} />
            ))}
          </div>
        </div>
      )}
    </CRTScreen>
  );
}

/* ================= CARD ================= */

function ProjectCard({ project, isMobile }) {
  // Mobile: Always colored (grayscale-0), full opacity.
  // Desktop: Grayscale + 80% opacity -> Full color + 100% opacity on hover.
  const imageClasses = isMobile
    ? "w-full h-full object-cover opacity-100 grayscale-0"
    : "w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500 grayscale group-hover:grayscale-0";

  return (
    <div
      className="group flex flex-col h-full bg-black border border-teal-500/30 transition-all duration-300 relative rounded-none"
    >
      {/* HUD CORNERS - Static now */}
      <div className="absolute -top-[1px] -left-[1px] w-2 h-2 border-t-2 border-l-2 border-teal-500/50 transition-colors" />
      <div className="absolute -top-[1px] -right-[1px] w-2 h-2 border-t-2 border-r-2 border-teal-500/50 transition-colors" />
      <div className="absolute -bottom-[1px] -left-[1px] w-2 h-2 border-b-2 border-l-2 border-teal-500/50 transition-colors" />
      <div className="absolute -bottom-[1px] -right-[1px] w-2 h-2 border-b-2 border-r-2 border-teal-500/50 transition-colors" />

      {/* MEDIA CONTAINER - 16:9 Aspect Ratio */}
      <div className="w-full aspect-video overflow-hidden border-b border-teal-500/20 relative z-0 transition-colors">
        {/* SCANLINE OVERLAY */}
        <div className="absolute inset-0 pointer-events-none z-[2] bg-[length:100%_4px] bg-[linear-gradient(rgba(0,0,0,0)50%,rgba(0,0,0,0.5)50%)] opacity-30" />

        {project.image.endsWith(".webm") ? (
          <video
            autoPlay
            loop
            muted
            playsInline
            className={imageClasses}
          >
            <source src={project.image} type="video/webm" />
          </video>
        ) : (
          <img
            src={project.image}
            alt={project.title}
            className={imageClasses}
          />
        )}

        {/* Status Badge */}
        <div className="absolute top-0 right-0 bg-black/90 border-b border-l border-teal-500/30 px-2 py-1 z-[10]">
          <span
            className={`text-[10px] font-mono tracking-widest
              ${project.status === "COMPLETED"
                ? "text-teal-400"
                : "text-amber-400" // Use amber for ongoing/alert
              }`}
          >
            [STATUS: {project.status}]
          </span>
        </div>
      </div>

      {/* CONTENT */}
      <div className="flex-1 flex flex-col p-4 gap-3 relative z-10 font-mono">

        <div className="flex items-center gap-2 border-b border-teal-500/10 pb-2 mb-1">
          <span className="text-teal-500/50 text-xs">&gt;</span>
          <h2 className="text-sm font-bold tracking-widest text-teal-100 transition-colors">
            {project.title.toUpperCase()}
          </h2>
        </div>

        {/* Improved Contrast: text-teal-400/90 instead of 500/70 */}
        <p className="text-xs text-teal-400/90 leading-relaxed min-h-[3.5em]">
          {project.desc}
        </p>

        {/* TECH STACK */}
        <div className="border-t border-teal-500/10 pt-2">
          <div className="text-[10px] text-teal-600 mb-1">LIB_DEPENDENCIES:</div>
          <div className="flex flex-wrap gap-x-3 gap-y-1">
            {project.tech.map((t) => {
              const Icon = TECH_ICONS[t.toLowerCase()];
              return Icon ? (
                <div key={t} className="flex items-center gap-1 text-teal-400/80 transition-colors" title={t}>
                  <Icon size={12} />
                  <span className="text-[10px] uppercase">{t}</span>
                </div>
              ) : null;
            })}
          </div>
        </div>

        {/* ACTIONS */}
        <div className="mt-auto pt-4 flex flex-wrap gap-2 text-[10px] font-bold tracking-wider">
          {/* LIVE */}
          {project.live ? (
            <a
              href={project.live}
              target="_blank"
              rel="noreferrer"
              className="flex-1 text-center py-2 border border-teal-500/30 text-teal-400 hover:bg-teal-500 hover:text-black transition-all uppercase"
            >
              [ OPEN_UPLINK ]
            </a>
          ) : (
            <span className="flex-1 text-center py-2 border border-white/5 text-white/20 cursor-not-allowed uppercase border-dashed">
              [ OFFLINE ]
            </span>
          )}

          {/* SOURCE */}
          {project.git ? (
            <a
              href={project.git}
              target="_blank"
              rel="noreferrer"
              className="flex-1 text-center py-2 border border-teal-500/30 text-teal-400 hover:bg-teal-500 hover:text-black transition-all uppercase"
            >
              [ SOURCE_DATA ]
            </a>
          ) : (
            <span
              className="flex-1 text-center py-2 border border-white/5 text-white/20 cursor-not-allowed uppercase border-dashed"
            >
              [ ENCRYPTED ]
            </span>
          )}

          {/* MARKER */}
          {project.marker && (
            <a
              href={project.marker.file}
              {...(project.marker.file.startsWith("http")
                ? { target: "_blank", rel: "noreferrer" }
                : { download: true })}
              className="w-full text-center py-2 border border-amber-500/30 text-amber-400 hover:bg-amber-500 hover:text-black transition-all uppercase"
            >
              [ GET_MARKER_FILE ]
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
