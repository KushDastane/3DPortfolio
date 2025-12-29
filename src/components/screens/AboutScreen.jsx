import CRTScreen from "../CRTScreen";

export default function AboutScreen() {
  return (
    <CRTScreen>
      <div className="w-full h-full flex items-center justify-center p-0 ">
        <div className="crt-frame about-frame p-4 sm:p-6 flex flex-col max-w-5xl w-full h-fit">
          <div className="border-2 border-black/70 mb-4">
            <div className="border-b-2 border-black/70 px-3 py-2 bg-black/5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono">▶ PROFILE_DATA</span>
                </div>
                <span className="text-xs opacity-60 font-mono">ID: KD-042</span>
              </div>
            </div>

            <div className="p-4 sm:p-5">
              <div className="grid gap-4 grid-cols-1 sm:grid-cols-[120px_1fr]">
                <div className="flex flex-col items-center sm:items-start gap-2">
                  <div className="w-[110px] h-[110px] border-2 border-black/70 bg-black/60 relative overflow-hidden">
                    <img
                      src="/images/pfp.webp"
                      alt="Profile"
                      className="
        w-full h-full object-cover  scale-130
        grayscale
        contrast-125
        brightness-90
        mix-blend-screen
      "
      loading="lazy"
                    />

                    <div className="absolute inset-0 border border-black/30 m-1 pointer-events-none"></div>

                    <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.08)_1px,transparent_1px)] bg-[length:100%_3px] pointer-events-none"></div>
                  </div>

                  <div className="border border-black/50 px-2 py-1 text-xs font-mono flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-black rounded-full animate-pulse"></span>
                    <span>Open to Work</span>
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <div>
                    <h1 className="text-xl sm:text-2xl font-bold tracking-widest mb-1">
                      KUSH DASTANE
                    </h1>
                    <p className="text-xs sm:text-sm opacity-90 font-mono">
                      FULL STACK DEVELOPER
                    </p>
                    <p className="text-xs sm:text-sm opacity-90 font-mono">
                      WEB-AR DEVELOPER
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="border border-black/30 p-2">
                      <span className="opacity-70 font-mono block mb-0.5">
                        EDUCATION
                      </span>
                      <span className="font-bold font-mono">MIT ADT UNIVERSITY, PUNE</span>
                    </div>
                    <div className="border border-black/30 p-2">
                      <span className="opacity-70 font-mono block mb-0.5">
                        LOCATION
                      </span>
                      <span className="font-bold font-mono">MUMBAI</span>
                    </div>
                  </div>

                  <div className="border-l-4 border-black/70 pl-3 py-1 bg-black/5">
                    <p className="text-xs sm:text-sm leading-relaxed">
                      I combine clean code with creative thinking to build fast,
                      user-focused web experiences.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

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
        </div>
      </div>
    </CRTScreen>
  );
}
