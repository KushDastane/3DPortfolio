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
    <div className="flex items-center gap-3 text-xs mt-2 mb-4">
      <span className="tracking-widest font-mono text-sm">
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
      <div className="flex justify-center items-start sm:items-center h-full px-4 sm:px-0">
        <div className="w-full max-w-3xl flex flex-col md:border-3 border-gray-900 sm:p-7 pt-6 sm:max-h-[75vh]">
          {/* TOP BAR */}
          <div className="flex justify-between items-center text-xs sm:text-sm pb-3 mb-5 border-b border-black/60">
            <span className="tracking-widest">FEEDBACK_LOG</span>
            <span className="opacity-60">{TESTIMONIALS.length} ENTRIES</span>
          </div>

          {/* TITLE */}
          <div className="mb-6">
            <h1 className="text-xl sm:text-2xl font-bold tracking-widest">
              TESTIMONIALS<span className="text-sm opacity-70">.log</span>
            </h1>
            <p className="text-xs sm:text-sm opacity-70 mt-1">
              Verified feedback from collaborators
            </p>
          </div>

          {/* LIST */}
          <div className="flex flex-col gap-5 overflow-y-auto pr-1">
            {TESTIMONIALS.map((t, idx) => (
              <div
                key={t.id}
                className="relative border border-black/60 p-5 bg-black/5"
              >
                {/* Index */}
                <div className="absolute top-2 right-3 text-xs opacity-40 font-mono">
                  [{idx + 1}]
                </div>

                {/* NAME */}
                <div className="mb-3">
                  <div className="font-bold text-base tracking-wide">
                    {t.name}
                  </div>
                  <div className="text-xs opacity-70 mt-[2px]">{t.role}</div>
                </div>

                {/* RATING */}
                <RatingBar value={t.rating} />

                {/* MESSAGE */}
                <p className="text-sm leading-relaxed italic opacity-90">
                  “{t.message}”
                </p>
              </div>
            ))}
          </div>

          {/* FOOTER */}
          <div className="mt-auto pt-4 text-xs flex justify-between items-center border-t border-black/60">
            <span className="font-mono">
              UPDATED<span className="blink">_</span>
            </span>
          </div>
        </div>
      </div>
    </CRTScreen>
  );
}
