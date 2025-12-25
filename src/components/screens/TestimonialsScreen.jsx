import React from "react";
import CRTScreen from "../CRTScreen";

/* ================= DATA ================= */

const TESTIMONIALS = [
  {
    id: 1,
    name: "Mr. Yash Raut",
    role: "Project Supervisor · V.V. Caring Center",
    rating: 5,
    message:
      "Kush developed a full website and admin panel for us, his professionalism and problem-solving abilities made a significant impact on our online presence.",
  },
];

/* ================= HELPERS ================= */

function RatingBar({ value }) {
  const filled = Math.floor(value);
  const hasHalf = value % 1 >= 0.5;
  const empty = 5 - filled - (hasHalf ? 1 : 0);

  return (
    <div className="flex items-center gap-2 text-xs mt-2 mb-3">
      <span className="tracking-widest text-base">
        {"█".repeat(filled)}
        {hasHalf ? "▓" : ""}
        {"░".repeat(empty)}
      </span>
      <span className="opacity-60">{value}/5</span>
    </div>
  );
}

/* ================= SCREEN ================= */

export default function TestimonialsScreen() {
  return (
    <CRTScreen>
      <div className="crt-frame p-6 sm:p-7 flex flex-col h-full">
        {/* TOP BAR */}
        <div className="flex justify-between text-xs sm:text-sm pb-3 mb-5 border-b-2 border-black/70">
          <span>FEEDBACK_LOG</span>
          <span className="opacity-60">{TESTIMONIALS.length} ENTRIES</span>
        </div>

        {/* TITLE */}
        <h1 className="text-xl sm:text-2xl font-bold tracking-widest mb-2">
          TESTIMONIALS.<span className="text-sm">log</span>
        </h1>
        <p className="text-xs sm:text-sm opacity-70 mb-6">
          Verified feedback from collaborators
        </p>

        {/* LIST */}
        <div className="flex flex-col gap-5 overflow-y-auto pr-1">
          {TESTIMONIALS.map((t, idx) => (
            <div key={t.id} className="border-2 border-black/70 p-5 relative">
              {/* Corner number */}
              <div className="absolute top-2 right-2 text-xs opacity-40 font-mono">
                [{idx + 1}]
              </div>

              {/* NAME & ROLE */}
              <div className="mb-3">
                <div className="font-bold text-base tracking-wide mb-1">
                  {t.name}
                </div>
                <div className="text-xs opacity-70">{t.role}</div>
              </div>

              {/* RATING */}
              <RatingBar value={t.rating} />

              {/* MESSAGE */}
              <p className="text-sm leading-relaxed italic opacity-90">
                "{t.message}"
              </p>
            </div>
          ))}
        </div>

        {/* FOOTER */}
        <div className="mt-auto pt-5 text-xs flex justify-between items-center border-t-2 border-black/70">
          <span className="font-mono">
            END_OF_FILE<span className="blink">_</span>
          </span>
          <span className="opacity-60">[▶] CONTINUE</span>
        </div>
      </div>
    </CRTScreen>
  );
}
