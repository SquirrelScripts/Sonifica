let audioCtx;
let isMuted = false;
let activePalette = "bells";

const padFreqs = [261.63, 293.66, 329.63, 349.23, 392.0, 440.0];

const palettes = {
  bells: {
    type: "sine",
    duration: 0.45,
    gain: 0.18,
    release: 0.35,
    detune: 8,
  },
  drums: {
    type: "triangle",
    duration: 0.14,
    gain: 0.22,
    release: 0.12,
    detune: -120,
  },
  animals: {
    type: "square",
    duration: 0.2,
    gain: 0.1,
    release: 0.22,
    detune: 220,
  },
};

const pads = [...document.querySelectorAll(".pad")];
const paletteButtons = [...document.querySelectorAll(".palette-btn")];
const muteBtn = document.getElementById("muteBtn");

function ensureAudioContext() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioCtx.state === "suspended") {
    audioCtx.resume();
  }
}

function playPad(index) {
  if (isMuted) return;

  ensureAudioContext();

  const sound = palettes[activePalette];
  const now = audioCtx.currentTime;

  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();

  osc.type = sound.type;
  osc.frequency.value = padFreqs[index % padFreqs.length];
  osc.detune.value = sound.detune;

  gain.gain.setValueAtTime(0.001, now);
  gain.gain.exponentialRampToValueAtTime(sound.gain, now + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.001, now + sound.duration + sound.release);

  osc.connect(gain).connect(audioCtx.destination);
  osc.start(now);
  osc.stop(now + sound.duration + sound.release + 0.02);
}

function setActivePalette(paletteName) {
  activePalette = paletteName;
  paletteButtons.forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.palette === paletteName);
  });
}

function toggleMute() {
  isMuted = !isMuted;
  muteBtn.setAttribute("aria-pressed", String(isMuted));
  muteBtn.textContent = isMuted ? "🔇 Sound Off" : "🔊 Sound On";
}

paletteButtons.forEach((btn) => {
  btn.addEventListener("click", () => setActivePalette(btn.dataset.palette));
});

muteBtn.addEventListener("click", toggleMute);

pads.forEach((pad, index) => {
  pad.addEventListener("pointerdown", (event) => {
    pad.classList.add("active");
    playPad(index);
    event.preventDefault();
  });

  pad.addEventListener("pointerup", () => pad.classList.remove("active"));
  pad.addEventListener("pointercancel", () => pad.classList.remove("active"));
  pad.addEventListener("pointerleave", () => pad.classList.remove("active"));

  pad.addEventListener("pointerenter", (event) => {
    if (event.buttons > 0) {
      pad.classList.add("active");
      playPad(index);
    }
  });
});
