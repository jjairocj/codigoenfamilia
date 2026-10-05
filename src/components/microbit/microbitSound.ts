// Authentic BBC micro:bit v2 Speaker & Buzzer Sound Synthesis
class MicrobitAudioSynthesizer {
  private ctx: AudioContext | null = null;

  private getContext(): AudioContext | null {
    if (typeof window === "undefined") return null;
    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!this.ctx && AudioCtx) {
      this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
    return this.ctx;
  }

  // Play a single 8-bit micro:bit buzzer tone
  playTone(freq: number, duration: number = 0.15, type: OscillatorType = "square") {
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, now);

      // Micro:bit speaker envelope: snappy attack, slight decay
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + duration);
    } catch {}
  }

  // Tactile button click (soft mechanical click)
  playButtonClick() {
    this.playTone(650, 0.04, "triangle");
  }

  // Heartbeat thump (dual low frequency thump)
  playHeartbeat() {
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const now = ctx.currentTime;

      [0, 0.12].forEach((offset) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(140, now + offset);
        osc.frequency.exponentialRampToValueAtTime(60, now + offset + 0.08);

        gain.gain.setValueAtTime(0.2, now + offset);
        gain.gain.exponentialRampToValueAtTime(0.001, now + offset + 0.08);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + offset);
        osc.stop(now + offset + 0.08);
      });
    } catch {}
  }

  // Startup melody (Ba-ding)
  playStartupSound() {
    this.playTone(523.25, 0.1, "triangle"); // C5
    setTimeout(() => this.playTone(783.99, 0.22, "triangle"), 110); // G5
  }

  // Happy celebration arpeggio
  playHappyMelody() {
    const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      setTimeout(() => this.playTone(freq, 0.12, "triangle"), idx * 90);
    });
  }

  // Sad / Game over downward slide
  playSadMelody() {
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "triangle";
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.linearRampToValueAtTime(220, now + 0.35);

      gain.gain.setValueAtTime(0.15, now);
      gain.gain.linearRampToValueAtTime(0.001, now + 0.35);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.35);
    } catch {}
  }

  // Rapid dice rattle sound
  playDiceRattle() {
    [0, 50, 100, 160, 230, 310].forEach((delay) => {
      setTimeout(() => {
        this.playTone(700 + Math.random() * 300, 0.03, "square");
      }, delay);
    });
  }

  // Musical scale for alligator clips / banana piano (P0, P1, P2, Logo)
  playPianoNote(noteIndex: number) {
    const scale = [261.63, 293.66, 329.63, 349.23, 392.0, 440.0, 493.88, 523.25]; // C4 to C5
    const freq = scale[Math.min(noteIndex, scale.length - 1)] || 440;
    this.playTone(freq, 0.25, "triangle");
  }
}

export const microbitSound = new MicrobitAudioSynthesizer();
