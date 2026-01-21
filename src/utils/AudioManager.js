class AudioManager {
    constructor() {
        this.context = null;
        this.initialized = false;
        this.initPromise = null;
        this.buffers = {};
        this.urls = {
            click: "/audio/ui_click.mp3",
            whoosh: "/audio/whoosh.mp3",
        };
        this.musicEnabled = false;
        this.sfxEnabled = true;

        // Initialize Music immediately (don't wait for SFX buffers)
        this.ambient = new Audio("/audio/ambient.mp3");
        this.ambient.loop = true;
        this.ambient.volume = 0.4;

        this.listeners = new Set();
    }

    async init() {
        if (this.initialized) return;
        if (this.initPromise) return this.initPromise;

        this.initPromise = (async () => {
            try {
                this.context = new (window.AudioContext || window.webkitAudioContext)();

                // Pre-load and decode SFX
                const loadTasks = Object.entries(this.urls).map(async ([key, url]) => {
                    const response = await fetch(url);
                    const arrayBuffer = await response.arrayBuffer();
                    this.buffers[key] = await this.context.decodeAudioData(arrayBuffer);
                });

                await Promise.all(loadTasks);
                this.initialized = true;
            } catch (e) {
                console.error("Failed to initialize AudioManager:", e);
            }
        })();

        return this.initPromise;
    }

    subscribe(callback) {
        this.listeners.add(callback);
        // Immediately notify with current state
        callback({
            musicEnabled: this.musicEnabled,
            sfxEnabled: this.sfxEnabled
        });
        return () => this.listeners.delete(callback);
    }

    notify() {
        this.listeners.forEach(cb => cb({
            musicEnabled: this.musicEnabled,
            sfxEnabled: this.sfxEnabled
        }));
    }

    async toggleMusic() {
        this.musicEnabled = !this.musicEnabled;

        if (this.musicEnabled) {
            // Play immediately to satisfy user gesture
            this.ambient.play().catch(e => console.error("Music playback failed:", e));

            // Resume context if needed (for SFX later)
            if (this.context && this.context.state === 'suspended') {
                this.context.resume();
            }

            // Lazy load SFX if not ready
            if (!this.initialized) this.init();
        } else {
            this.ambient.pause();
        }
        this.notify();
        return this.musicEnabled;
    }

    toggleSFX() {
        this.sfxEnabled = !this.sfxEnabled;
        this.notify();
        return this.sfxEnabled;
    }

    async startAmbient() {
        if (!this.initialized) await this.init();
        if (!this.musicEnabled) return;

        if (this.context.state === 'suspended') {
            await this.context.resume();
        }

        if (this.ambient && this.ambient.paused) {
            this.ambient.play().catch(e => console.log("Audio autoplay blocked:", e));
        }
    }

    async playBuffer(name, volume = 0.5) {
        if (!this.sfxEnabled) return;
        if (!this.initialized) await this.init();
        if (!this.context || !this.buffers[name]) return;

        if (this.context.state === 'suspended') {
            await this.context.resume();
        }

        const source = this.context.createBufferSource();
        source.buffer = this.buffers[name];

        const gainNode = this.context.createGain();
        gainNode.gain.value = volume;

        source.connect(gainNode);
        gainNode.connect(this.context.destination);

        source.start(0);
    }

    async playClick() {
        await this.playBuffer("click", 0.3);
    }

    async playWhoosh() {
        await this.playBuffer("whoosh", 0.6);
    }
}

export const audioManager = new AudioManager();
