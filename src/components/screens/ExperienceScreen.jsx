import React from "react";
import CRTScreen from "../CRTScreen";

const EXPERIENCES = [
  {
    role: "FULL STACK DEVELOPER",
    org: "V.V. Caring Center",
    duration: "June – July,2025",
    type: "Internship",
    points: [
      "Designed, developed & deployed a full-scale responsive website.",
      "Built admin panel for content & enquiry management",
      "Integrated Firebase for real-time data handling",
      "Optimized images, lazy loading & performance",
    ],
  },
];

export default function ExperienceScreen() {
  return (
    <CRTScreen>
      <div className="w-full h-full flex items-center justify-center  md:p-19">
        <div className="md:border-3 border-gray-900 p-4 sm:p-6 flex flex-col w-full max-w-5xl h-fit">
          <div className="border-2 border-black/70 p-2 mb-4">
            <div className="flex justify-between items-center text-xs">
              <div className="flex items-center gap-2">
                <span className="font-mono">SYSTEM_ROOT </span>
              </div>
            </div>
          </div>

          <div className="mb-4">
            <div className="flex items-baseline gap-2 mb-1">
              <h1 className="text-xl sm:text-2xl font-bold tracking-widest">
                EXPERIENCE.log
              </h1>
              <span className="text-xs opacity-70 font-mono">[UPDATED]</span>
            </div>
            <div className="flex items-center gap-2 text-xs opacity-90">
              <span className="font-mono">USER: KUSH</span>
              <span>•</span>
              <span className="font-mono">ENTRIES: {EXPERIENCES.length}</span>
            </div>
          </div>

          <div className="flex flex-col gap-3 flex-1 mb-3">
            {EXPERIENCES.map((exp, idx) => (
              <div
                key={idx}
                className="border-2 border-black/70 hover:border-black transition-all duration-200"
              >
                {/* Header Bar */}
                <div className="border-b-2 border-black/70 px-3 py-2 bg-black/5">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono">▶</span>
                      <h2 className="text-xs sm:text-sm font-bold tracking-wide font-mono">
                        {exp.role}
                      </h2>
                    </div>
                    <div className="text-xs opacity-80 font-mono">
                      {exp.duration}
                    </div>
                  </div>
                </div>

                <div className="p-3">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 mb-2 text-xs">
                    <span className="opacity-90 font-mono">{exp.org}</span>
                    <span className="opacity-70 font-mono">
                      TYPE: {exp.type}
                    </span>
                  </div>

                  <ul className="text-xs list-none space-y-1">
                    {exp.points.map((point, i) => (
                      <li key={i} className="flex gap-2 items-start">
                        <span className="opacity-60 mt-0.5">›</span>
                        <span className="flex-1">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          <div className="border-2 border-black/70 p-2">
            <div className="text-xs font-mono flex flex-col sm:flex-row justify-between items-start sm:items-center gap-1">
              <div className="flex items-center gap-2">
                <span>C:\USERS\KUSH&gt;</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </CRTScreen>
  );
}
