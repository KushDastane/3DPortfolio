import React from "react";
import {
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaReact,
  FaNodeJs,
  FaGithub,
  FaAws,
  FaDatabase,
  FaCloudflare,
} from "react-icons/fa";
import {
  SiTailwindcss,
  SiMongodb,
  SiMysql,
  SiFirebase,
  SiThreedotjs,
} from "react-icons/si";
import CRTScreen from "../CRTScreen";

export default function SkillsScreen() {
  return (
    <CRTScreen>
      <div className="w-full h-full flex items-center justify-center p-4">
        <div className="crt-frame p-4 sm:p-6 flex flex-col w-full max-w-6xl h-fit">
          {/* ================= HEADER PANEL ================= */}
          <div className="border-2 border-black/70 p-2 mb-4">
            <div className="flex justify-between items-center text-xs">
              <div className="flex items-center gap-2">
                <span className="font-mono">SYSTEM_ROOT // SKILLS</span>
                <span className="hidden sm:inline opacity-60">|</span>
                <span className="hidden sm:inline opacity-80">v2.4.1</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-black rounded-full animate-pulse"></span>
                <span className="font-mono">ACTIVE</span>
              </div>
            </div>
          </div>

          {/* ================= TITLE SECTION ================= */}
          <div className="mb-4">
            <div className="flex items-baseline gap-2 mb-1">
              <h1 className="text-xl sm:text-2xl font-bold tracking-widest">
                SKILLS.sys
              </h1>
              <span className="text-xs opacity-70 font-mono">
                [DIAGNOSTICS]
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs opacity-90">
              <span className="font-mono">USER: KUSH</span>
              <span>•</span>
              <span className="font-mono">
                SESSION: {new Date().getFullYear()}
              </span>
              <span>•</span>
              <span className="font-mono">STATUS: OPERATIONAL</span>
            </div>
          </div>

          {/* ================= MAIN GRID - ASYMMETRIC LAYOUT ================= */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 flex-1 mb-4">
            {/* LEFT COLUMN - Stacked */}
            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <SkillBlock
                title="FRONTEND_STACK"
                skills={[
                  { name: "HTML5", icon: FaHtml5 },
                  { name: "CSS3", icon: FaCss3Alt },
                  { name: "JavaScript", icon: FaJs },
                  { name: "React", icon: FaReact },
                  { name: "Tailwind CSS", icon: SiTailwindcss },
                  { name: "THREE.js", icon: SiThreedotjs },
                ]}
              />

              <SkillBlock
                title="BACKEND_STACK"
                skills={[
                  { name: "Node.js", icon: FaNodeJs },
                  { name: "Express.js", icon: FaNodeJs },
                  { name: "Firebase", icon: SiFirebase },
                  { name: "MongoDB", icon: SiMongodb },
                  { name: "MySQL", icon: SiMysql },
                ]}
              />
            </div>

            {/* RIGHT COLUMN - Vertical Stack */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
              <SkillBlock
                title="LANGUAGES"
                skills={[
                  { name: "C", icon: FaDatabase },
                  { name: "C++", icon: FaDatabase },
                  { name: "Java", icon: FaDatabase },
                ]}
              />

              <SkillBlock
                title="TOOLS_&_INFRA"
                skills={[
                  { name: "GitHub", icon: FaGithub },
                  { name: "Cloudflare", icon: FaCloudflare },
                  { name: "AWS", icon: FaAws },
                  { name: "SEO & Lazy Load", icon: FaReact },
                ]}
              />
            </div>
          </div>

          {/* ================= PROGRESS BAR ================= */}
          <div className="mb-3">
            <div className="flex justify-between text-xs mb-1">
              <span className="font-mono">SYSTEM_SCAN</span>
              <span className="font-mono">100%</span>
            </div>
            <div className="h-2.5 border-2 border-black/70 relative overflow-hidden">
              <div className="absolute inset-0 bg-black/20"></div>
              <div className="absolute inset-0 bg-black/60 animate-pulse"></div>
            </div>
          </div>

          {/* ================= FOOTER TERMINAL ================= */}
          <div className="border-2 border-black/70 p-2">
            <div className="text-xs font-mono flex flex-col sm:flex-row justify-between items-start sm:items-center gap-1">
              <div className="flex items-center gap-2">
                <span>C:\USERS\KUSH&gt;</span>
                <span>SCAN_COMPLETE</span>
                <span className="inline-block w-1.5 h-3 bg-black animate-pulse"></span>
              </div>
              <div className="flex items-center gap-2 opacity-80">
                <span>[CTRL+N]</span>
                <span>NEXT_MODULE</span>
                <span>▶</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </CRTScreen>
  );
}

/* ================= ENHANCED SKILL BLOCK ================= */

function SkillBlock({ title, skills }) {
  return (
    <div className="border-2 border-black/70 hover:border-black transition-all duration-200 group">
      {/* Header Bar */}
      <div className="border-b-2 border-black/70 px-2 py-1.5 bg-black/5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-mono">▶</span>
            <span className="text-xs font-bold tracking-wide font-mono">
              {title}
            </span>
          </div>
          <span className="text-xs opacity-60 font-mono">
            [{skills.length}]
          </span>
        </div>
      </div>

      {/* Skills Grid */}
      <div className="p-3">
        <div className="grid grid-cols-1 gap-2 text-xs">
          {skills.map(({ name, icon: Icon }) => (
            <div
              key={name}
              className="flex items-center gap-2 p-1.5 border border-black/20 hover:border-black/50 hover:bg-black/5 transition-all duration-150 group/item"
            >
              <div className="flex items-center justify-center w-5 h-5">
                <Icon className="text-black/80 group-hover/item:text-black text-sm transition-colors" />
              </div>
              <span className="font-mono">{name}</span>
              <span className="ml-auto text-xs opacity-0 group-hover/item:opacity-60 transition-opacity">
                ✓
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
