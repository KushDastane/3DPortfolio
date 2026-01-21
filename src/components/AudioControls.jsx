import { useState, useEffect } from "react";
import { FiMusic, FiVolume2 } from "react-icons/fi";
import { audioManager } from "../utils/AudioManager";
import { useExperience } from "../store/useExperience";

export default function AudioControls() {
    const [musicEnabled, setMusicEnabled] = useState(audioManager.musicEnabled);
    const [sfxEnabled, setSfxEnabled] = useState(audioManager.sfxEnabled);
    const { activeSection } = useExperience();

    useEffect(() => {
        // Subscribe to state changes from the manager
        const unsubscribe = audioManager.subscribe((state) => {
            setMusicEnabled(state.musicEnabled);
            setSfxEnabled(state.sfxEnabled);
        });
        return unsubscribe;
    }, []);

    const handleMusicToggle = () => {
        audioManager.toggleMusic();
        audioManager.playClick();
    };

    const handleSfxToggle = () => {
        audioManager.toggleSFX();
        if (!sfxEnabled) {
            audioManager.playClick();
        }
    };

    // Logic: controls are now always visible
    const isControlsVisible = true;

    return (
        <div
            className={`
        fixed bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4 z-[10001]
        transition-opacity duration-500 ease-in-out
        opacity-100 pointer-events-auto
      `}
        >
            <button
                onClick={handleMusicToggle}
                className={`
          flex items-center justify-center
          w-10 h-10 rounded-full
          backdrop-blur-md border transition-all duration-300
          ${musicEnabled
                        ? "bg-teal-500/20 border-teal-400 text-teal-300 shadow-[0_0_15px_rgba(45,212,191,0.5)]"
                        : "bg-black/40 border-white/10 text-white/40 hover:border-white/30 hover:text-white/60"
                    }
        `}
                aria-label="Toggle Music"
            >
                <div className="relative">
                    <FiMusic size={18} />
                    {!musicEnabled && (
                        <div className="absolute top-1/2 left-1/2 w-[120%] h-[2px] bg-current -translate-x-1/2 -translate-y-1/2 rotate-45" />
                    )}
                </div>
            </button>

            <button
                onClick={handleSfxToggle}
                className={`
          flex items-center justify-center
          w-10 h-10 rounded-full
          backdrop-blur-md border transition-all duration-300
          ${sfxEnabled
                        ? "bg-teal-500/20 border-teal-400 text-teal-300 shadow-[0_0_15px_rgba(45,212,191,0.5)]"
                        : "bg-black/40 border-white/10 text-white/40 hover:border-white/30 hover:text-white/60"
                    }
        `}
                aria-label="Toggle SFX"
            >
                <div className="relative">
                    <FiVolume2 size={20} />
                    {!sfxEnabled && (
                        <div className="absolute top-1/2 left-1/2 w-[120%] h-[2px] bg-current -translate-x-1/2 -translate-y-1/2 rotate-45" />
                    )}
                </div>
            </button>
        </div>
    );
}
