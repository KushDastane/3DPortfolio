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
  FaFlask,
} from "react-icons/fa";
import {
  SiTailwindcss,
  SiMongodb,
  SiMysql,
  SiFirebase,
  SiThreedotjs,
} from "react-icons/si";
import CRTScreen from "../CRTScreen";

/* ================= SCREEN ================= */

export default function SkillsScreen() {
  return (
    <CRTScreen align="center">
      <div className="w-full max-w-5xl crt-frame sm:p-6 px-4 py-6">
        {/* ================= HEADER ================= */}
        <div className="mb-5">
          <div className="flex items-baseline gap-2 mb-1">
            <h1 className="text-xl sm:text-2xl font-bold tracking-widest">
              SKILLS.sys
            </h1>

          </div>

        </div>

        {/* ================= MAIN GRID ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 mb-5">
          {/* LEFT SIDE */}
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
                { name: "Flask", icon: FaFlask },
              ]}
            />
          </div>

          {/* RIGHT SIDE */}
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

        {/* ================= SYSTEM BAR ================= */}
        <div className="mb-4">
          <div className="flex justify-between text-xs mb-1 font-mono">
            <span>SYSTEM_SCAN</span>
            <span>100%</span>
          </div>

          <div className="h-2.5 border border-black/70 relative overflow-hidden">
            <div className="absolute inset-0 bg-black/25" />
            <div className="absolute inset-0 bg-black/60" />
          </div>
        </div>

        {/* ================= FOOTER ================= */}
        <div className="border border-black/70 p-2">
          <div className="text-xs font-mono flex flex-wrap items-center gap-2">
            <span>C:\USERS\KUSH&gt;</span>
            <span>SCAN_COMPLETE</span>
            <span className="inline-block w-1.5 h-3 bg-black" />
          </div>
        </div>
      </div>
    </CRTScreen>
  );
}

/* ================= SKILL BLOCK ================= */

function SkillBlock({ title, skills }) {
  return (
    <div className="border border-black/70 hover:border-black transition-colors">
      {/* Header */}
      <div className="border-b border-black/70 px-2 py-1.5 bg-black/5">
        <div className="flex justify-between items-center text-xs font-mono">
          <div className="flex items-center gap-1.5">
            <span>▶</span>
            <span className="font-bold tracking-wide">{title}</span>
          </div>
          <span className="opacity-60">[{skills.length}]</span>
        </div>
      </div>

      {/* Items */}
      <div className="p-3 grid gap-2 text-xs">
        {skills.map(({ name, icon: Icon }) => (
          <div
            key={name}
            className="flex items-center gap-2 px-2 py-1 border border-black/20 hover:border-black/50 hover:bg-black/5 transition"
          >
            <Icon className="text-black/80 text-sm" />
            <span className="font-mono">{name}</span>
            <span className="ml-auto opacity-0 hover:opacity-60 transition">
              ✓
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
