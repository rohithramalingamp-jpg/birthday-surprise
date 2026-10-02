/**
 * Audio Player utility with graceful fallback:
 * 1. Attempts to play custom audio file from config (e.g. /birthday-music.mp3)
 * 2. If no MP3 is found or an error occurs, falls back to a gentle celestial
 *    music box synth playing a warm, ambient melody using the Web Audio API.
 * 3. Never autoplays sound without explicit user gesture.
 */

class BirthdaySoundManager {
  private audioElement: HTMLAudioElement | null = null;
  private audioCtx: AudioContext | null = null;
  private isSynthPlaying = false;
  private synthInterval: number | null = null;
  private isUsingCustomAudio = false;

  constructor() {
    // Initialized lazily on user interaction
  }

  public initAudio(url: string) {
    if (typeof window === 'undefined') return;

    this.audioElement = new Audio();
    this.audioElement.src = url;
    this.audioElement.loop = true;
    this.audioElement.volume = 0.6;

    this.audioElement.addEventListener('error', () => {
      // Audio file not present or failed to load
      this.isUsingCustomAudio = false;
    });

    this.audioElement.addEventListener('canplaythrough', () => {
      this.isUsingCustomAudio = true;
    });
  }

  public async play(): Promise<boolean> {
    if (this.audioElement && this.isUsingCustomAudio) {
      try {
        await this.audioElement.play();
        return true;
      } catch (err) {
        console.warn('Audio element play failed, falling back to synth', err);
        return this.startCelestialSynth();
      }
    } else {
      return this.startCelestialSynth();
    }
  }

  public pause() {
    if (this.audioElement && !this.audioElement.paused) {
      this.audioElement.pause();
    }
    this.stopCelestialSynth();
  }

  public toggle(url?: string): boolean {
    if (this.isPlaying()) {
      this.pause();
      return false;
    } else {
      if (url && !this.audioElement) {
        this.initAudio(url);
      }
      this.play();
      return true;
    }
  }

  public isPlaying(): boolean {
    const audioPlaying = this.audioElement ? !this.audioElement.paused : false;
    return audioPlaying || this.isSynthPlaying;
  }

  /**
   * Generates a warm, ambient music box chime using Web Audio API oscillators.
   * Plays a delicate, pentatonic celestial lullaby rendition of "Happy Birthday".
   */
  private startCelestialSynth(): boolean {
    try {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!this.audioCtx) {
        this.audioCtx = new AudioContextClass();
      }
      if (this.audioCtx.state === 'suspended') {
        this.audioCtx.resume();
      }

      this.isSynthPlaying = true;

      // Note frequencies (Hz) for a dreamy music box:
      // F4, G4, A4, Bb4, C5, D5, E5, F5
      const notes: { [key: string]: number } = {
        C4: 261.63,
        D4: 293.66,
        E4: 329.63,
        F4: 349.23,
        G4: 392.0,
        A4: 440.0,
        Bb4: 466.16,
        B4: 493.88,
        C5: 523.25,
        D5: 587.33,
        E5: 659.25,
        F5: 698.46,
        G5: 783.99,
        A5: 880.0,
      };

      // Soft Happy Birthday melody sequence: [note, duration in seconds]
      const melody = [
        { note: 'C4', dur: 0.5 },
        { note: 'C4', dur: 0.3 },
        { note: 'D4', dur: 0.8 },
        { note: 'C4', dur: 0.8 },
        { note: 'F4', dur: 0.8 },
        { note: 'E4', dur: 1.4 },

        { note: 'C4', dur: 0.5 },
        { note: 'C4', dur: 0.3 },
        { note: 'D4', dur: 0.8 },
        { note: 'C4', dur: 0.8 },
        { note: 'G4', dur: 0.8 },
        { note: 'F4', dur: 1.4 },

        { note: 'C4', dur: 0.5 },
        { note: 'C4', dur: 0.3 },
        { note: 'C5', dur: 0.8 },
        { note: 'A4', dur: 0.8 },
        { note: 'F4', dur: 0.8 },
        { note: 'E4', dur: 0.8 },
        { note: 'D4', dur: 1.4 },

        { note: 'Bb4', dur: 0.5 },
        { note: 'Bb4', dur: 0.3 },
        { note: 'A4', dur: 0.8 },
        { note: 'F4', dur: 0.8 },
        { note: 'G4', dur: 0.8 },
        { note: 'F4', dur: 2.0 },
      ];

      let noteIdx = 0;

      const playNext = () => {
        if (!this.isSynthPlaying || !this.audioCtx) return;

        const current = melody[noteIdx];
        const freq = notes[current.note] || 440;
        this.triggerChime(freq, current.dur);

        noteIdx = (noteIdx + 1) % melody.length;
        this.synthInterval = window.setTimeout(playNext, current.dur * 1000 * 0.95);
      };

      playNext();
      return true;
    } catch (e) {
      console.warn('Could not start synth audio', e);
      return false;
    }
  }

  private triggerChime(freq: number, duration: number) {
    if (!this.audioCtx) return;

    const ctx = this.audioCtx;
    const now = ctx.currentTime;

    // Primary bell tone
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    // Harmonics for a sweet glass/celesta chime
    const harmonicOsc = ctx.createOscillator();
    const harmonicGain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now);

    harmonicOsc.type = 'triangle';
    harmonicOsc.frequency.setValueAtTime(freq * 2.76, now); // Metallic celestial overtone

    // Delicate envelope
    gain.gain.setValueAtTime(0.001, now);
    gain.gain.exponentialRampToValueAtTime(0.18, now + 0.04);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration + 0.8);

    harmonicGain.gain.setValueAtTime(0.001, now);
    harmonicGain.gain.exponentialRampToValueAtTime(0.05, now + 0.02);
    harmonicGain.gain.exponentialRampToValueAtTime(0.0001, now + duration * 0.4);

    osc.connect(gain);
    harmonicOsc.connect(harmonicGain);

    gain.connect(ctx.destination);
    harmonicGain.connect(ctx.destination);

    osc.start(now);
    harmonicOsc.start(now);

    osc.stop(now + duration + 0.9);
    harmonicOsc.stop(now + duration + 0.5);
  }

  private stopCelestialSynth() {
    this.isSynthPlaying = false;
    if (this.synthInterval) {
      clearTimeout(this.synthInterval);
      this.synthInterval = null;
    }
  }

  public playChimeEffect(type: 'sparkle' | 'fanfare' | 'pop') {
    if (typeof window === 'undefined') return;
    try {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = this.audioCtx || new AudioContextClass();
      this.audioCtx = ctx;

      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const now = ctx.currentTime;

      if (type === 'sparkle') {
        [587.33, 739.99, 880, 1174.66].forEach((f, i) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(f, now + i * 0.08);

          gain.gain.setValueAtTime(0.001, now + i * 0.08);
          gain.gain.exponentialRampToValueAtTime(0.12, now + i * 0.08 + 0.02);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.08 + 0.4);

          osc.connect(gain);
          gain.connect(ctx.destination);

          osc.start(now + i * 0.08);
          osc.stop(now + i * 0.08 + 0.45);
        });
      } else if (type === 'pop') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(300, now);
        osc.frequency.exponentialRampToValueAtTime(600, now + 0.1);

        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.15);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + 0.2);
      }
    } catch {
      // Audio context might be restricted before gesture
    }
  }
}

export const soundManager = new BirthdaySoundManager();
