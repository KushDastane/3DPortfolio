import CRTScreen from "../CRTScreen";

export default function AboutScreen() {
  return (
    <CRTScreen>
      <div className="w-full h-full flex items-center justify-center p-4">
        <div className="crt-frame about-frame p-4 sm:p-6 flex flex-col max-w-5xl w-full h-fit">
          {/* ================= HEADER PANEL ================= */}
          <div className="border-2 border-black/70 p-2 mb-4">
            <div className="flex justify-between items-center text-xs">
              <div className="flex items-center gap-2">
                <span className="font-mono">SYSTEM_ROOT // PROFILE</span>
              </div>
              <span className="font-mono">MEM: 640KB OK</span>
            </div>
          </div>

          {/* ================= MAIN PROFILE CARD ================= */}
          <div className="border-2 border-black/70 mb-4">
            {/* Card Header */}
            <div className="border-b-2 border-black/70 px-3 py-2 bg-black/5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono">▶ PROFILE_DATA</span>
                </div>
                <span className="text-xs opacity-60 font-mono">ID: KD-042</span>
              </div>
            </div>

            {/* Card Body */}
            <div className="p-4 sm:p-5">
              <div className="grid gap-4 grid-cols-1 sm:grid-cols-[120px_1fr]">
                {/* ===== AVATAR SECTION ===== */}
                <div className="flex flex-col items-center sm:items-start gap-2">
                  <div className="w-[110px] h-[110px] flex items-center justify-center border-2 border-black/70 bg-black/50 relative">
                    <span className="text-xs tracking-widest font-mono">
                      PHOTO
                    </span>
                    <div className="absolute inset-0 border border-black/30 m-1"></div>
                  </div>
                  <div className="border border-black/70 px-2 py-1 text-xs font-mono flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-black rounded-full animate-pulse"></span>
                    <span>ACTIVE</span>
                  </div>
                </div>

                {/* ===== CONTENT SECTION ===== */}
                <div className="flex flex-col gap-3">
                  {/* Name & Title */}
                  <div>
                    <h1 className="text-xl sm:text-2xl font-bold tracking-widest mb-1">
                      KUSH DASTANE
                    </h1>
                    <p className="text-xs sm:text-sm opacity-90 font-mono">
                      FULL STACK DEVELOPER · INTERACTIVE SYSTEMS
                    </p>
                  </div>

                  {/* Meta Information Grid */}
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div className="border border-black/30 p-2">
                      <span className="opacity-70 font-mono block mb-0.5">
                        STATUS
                      </span>
                      <span className="font-bold font-mono">ACTIVE</span>
                    </div>
                    <div className="border border-black/30 p-2">
                      <span className="opacity-70 font-mono block mb-0.5">
                        LOCATION
                      </span>
                      <span className="font-bold font-mono">INDIA</span>
                    </div>
                    <div className="border border-black/30 p-2">
                      <span className="opacity-70 font-mono block mb-0.5">
                        MODE
                      </span>
                      <span className="font-bold font-mono">BUILDING</span>
                    </div>
                  </div>

                  {/* Bio Text */}
                  <div className="border-l-4 border-black/70 pl-3 py-1 bg-black/5">
                    <p className="text-xs sm:text-sm leading-relaxed">
                      I design and build thoughtful digital systems where logic,
                      interaction, and clarity come together. Focused on
                      creating experiences that feel intentional, grounded, and
                      alive.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ================= PHILOSOPHY CARD ================= */}
          <div className="border-2 border-black/70 mb-4">
            <div className="border-b-2 border-black/70 px-3 py-2 bg-black/5">
              <span className="text-xs font-mono">▶ PHILOSOPHY</span>
            </div>
            <div className="p-4">
              <div className="border-l-4 border-black/70 pl-3">
                <p className="text-xs sm:text-sm mb-1.5 italic">
                  "विद्या ददाति विनयं, विनयाद् याति पात्रताम्।"
                </p>
                <p className="text-xs opacity-70">
                  Knowledge brings humility, and from humility comes true worth.
                </p>
              </div>
            </div>
          </div>

          {/* ================= FOOTER TERMINAL ================= */}
          <div className="border-2 border-black/70 p-2">
            <div className="text-xs font-mono flex flex-col sm:flex-row justify-between items-start sm:items-center gap-1">
              <div className="flex items-center gap-2">
                <span>C:\USERS\KUSH&gt;</span>
                <span>WAITING_FOR_INPUT</span>
                <span className="inline-block w-1.5 h-3 bg-black animate-pulse"></span>
              </div>
              <div className="flex items-center gap-2 opacity-80">
                <span>[ESC] LOGOUT</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </CRTScreen>
  );
}
