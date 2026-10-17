/**
 * CyberShield Academy - Audio Manager
 * Web Audio API sounds + Speech Synthesis for voiceover
 */
(function () {
  'use strict';

  let audioCtx = null;

  function getCtx() {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    return audioCtx;
  }

  function playTone(freq, duration, type = 'sine', volume = 0.15, delay = 0) {
    try {
      const ctx = getCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime + delay);
      gain.gain.setValueAtTime(0, ctx.currentTime + delay);
      gain.gain.linearRampToValueAtTime(volume, ctx.currentTime + delay + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + delay + duration);
      osc.start(ctx.currentTime + delay);
      osc.stop(ctx.currentTime + delay + duration + 0.05);
    } catch (e) {
      // silently ignore if AudioContext not available
    }
  }

  const SoundFX = {
    click() {
      playTone(800, 0.05, 'square', 0.08);
    },
    success() {
      playTone(523, 0.12, 'sine', 0.12);
      playTone(659, 0.12, 'sine', 0.12, 0.12);
      playTone(784, 0.2, 'sine', 0.12, 0.24);
    },
    error() {
      playTone(200, 0.18, 'sawtooth', 0.1);
      playTone(150, 0.25, 'sawtooth', 0.1, 0.18);
    },
    alert() {
      playTone(440, 0.08, 'square', 0.12);
      playTone(440, 0.08, 'square', 0.12, 0.16);
    },
    step() {
      playTone(600, 0.08, 'sine', 0.1);
    },
    complete() {
      [523, 659, 784, 1047].forEach((f, i) => {
        playTone(f, 0.15, 'sine', 0.14, i * 0.12);
      });
    }
  };

  // Voiceover via Speech Synthesis
  const Voiceover = {
    enabled: true,
    currentLang: 'fr-FR',
    synth: window.speechSynthesis,

    speak(text, lang) {
      if (!this.enabled || !this.synth) return;
      this.synth.cancel();
      const utter = new SpeechSynthesisUtterance(text);
      utter.lang = lang || this.currentLang;
      utter.rate = 0.95;
      utter.pitch = 1;
      utter.volume = 0.9;
      this.synth.speak(utter);
    },

    stop() {
      if (this.synth) this.synth.cancel();
    },

    toggle() {
      this.enabled = !this.enabled;
      if (!this.enabled) this.stop();
      return this.enabled;
    },

    setLang(lang) {
      this.currentLang = lang === 'ar' ? 'ar-SA' : 'fr-FR';
    }
  };

  window.SoundFX = SoundFX;
  window.Voiceover = Voiceover;
})();

