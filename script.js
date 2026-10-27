/**
 * SHUBH DEEPAWALI 2026 ✨
 * 3D Spinning Luxury Turntable Showcase Engine
 * "May your Soan Papdi collection be as cool as this!"
 */

// ==================== 1. PROCEDURAL LUXURY AUDIO ENGINE ====================
class LuxuryAudioEngine {
  constructor() {
    this.ctx = null;
    this.enabled = true;
    this.isUnlocked = false;
  }

  unlock() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        this.isUnlocked = true;
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggle() {
    this.enabled = !this.enabled;
    return this.enabled;
  }

  // Resonant Temple Brass Bell (Ghanti)
  playTempleBell() {
    if (!this.enabled) return;
    this.unlock();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const harmonics = [587.33, 1174.66, 1760.00, 2349.32, 2936.65];
    const weights = [0.28, 0.16, 0.1, 0.05, 0.02];

    harmonics.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = idx === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(weights[idx], now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 3.2);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 3.3);
    });
  }

  // Subtle Golden Pentatonic Chime for Turntable Rotation
  playTurntableChime(editionIndex = 0) {
    if (!this.enabled) return;
    this.unlock();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const scale = [659.25, 783.99, 987.77, 1318.51]; // E5, G5, B5, E6
    const baseFreq = scale[editionIndex % scale.length];

    [baseFreq, baseFreq * 1.5].forEach((freq, i) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + i * 0.04);

      gain.gain.setValueAtTime(0.08, now + i * 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.04 + 1.2);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now + i * 0.04);
      osc.stop(now + i * 0.04 + 1.3);
    });
  }
}

// ==================== 2. FLOATING GOLDEN DUST PARTICLES ====================
class GoldenDustCanvas {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.init();
  }

  init() {
    this.resize();
    window.addEventListener('resize', () => this.resize());
    this.createInitialDust();
    this.loop();
  }

  resize() {
    if (!this.canvas) return;
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  createInitialDust() {
    const count = 45;
    for (let i = 0; i < count; i++) {
      this.particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.4,
        vy: -0.3 - Math.random() * 0.6,
        size: 1 + Math.random() * 2.2,
        alpha: 0.2 + Math.random() * 0.6,
        pulseSpeed: 0.02 + Math.random() * 0.03
      });
    }
  }

  loop() {
    requestAnimationFrame(() => this.loop());
    if (!this.ctx || !this.canvas) return;

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.alpha += Math.sin(Date.now() * 0.002 + i) * 0.01;

      // Wrap around top/sides
      if (p.y < -10) {
        p.y = this.canvas.height + 10;
        p.x = Math.random() * this.canvas.width;
      }
      if (p.x < 0) p.x = this.canvas.width;
      if (p.x > this.canvas.width) p.x = 0;

      this.ctx.save();
      this.ctx.globalAlpha = Math.max(0.1, Math.min(0.9, p.alpha));
      this.ctx.fillStyle = '#fef08a';
      this.ctx.shadowBlur = 8;
      this.ctx.shadowColor = '#d4af37';
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.restore();
    }
  }
}

// ==================== 3. 3D TURNTABLE SPIN ENGINE ====================
class LuxurySpinEngine {
  constructor(audio) {
    this.audio = audio;
    this.ring = document.getElementById('carousel-ring');
    this.stage = document.getElementById('spin-stage-container');
    this.viewport = document.getElementById('reel-viewport');

    this.currentAngle = 0;
    this.targetAngle = 0;
    this.autoSpinSpeed = 0.32; // degrees per frame
    this.isAutoSpinning = true;
    this.isDragging = false;
    this.startX = 0;
    this.lastX = 0;
    this.velocity = 0;
    this.activeEdition = 0;
    this.lastSoundEdition = -1;

    // UI Elements
    this.fills = [
      document.getElementById('fill-0'),
      document.getElementById('fill-1'),
      document.getElementById('fill-2'),
      document.getElementById('fill-3')
    ];
    this.pills = Array.from(document.querySelectorAll('.concept-pill-btn'));
    this.playPauseBtn = document.getElementById('play-pause-btn');
    this.prevBtn = document.getElementById('prev-btn');
    this.nextBtn = document.getElementById('next-btn');
    this.soundBtn = document.getElementById('sound-btn');
    this.soundIcon = document.getElementById('sound-icon');
    this.toggleAspectBtn = document.getElementById('toggle-aspect-btn');

    // HUD Elements
    this.hudTag = document.getElementById('hud-edition-tag');
    this.hudName = document.getElementById('hud-edition-name');
    this.hudDesc = document.getElementById('hud-edition-desc');

    this.editionsData = [
      {
        tag: "✦ EDITION 01 OF 04 • 24K MATTE OBSIDIAN ✦",
        name: "L'Or de Soan Papdi • Diwali Cuvée",
        desc: "Hand-forged with 24K brushed gold leaf, Nero Marquina marble pedestal reflections & nuclear airtight seal."
      },
      {
        tag: "✦ EDITION 02 OF 04 • SACRED RADIANCE ✦",
        name: "Kinetic Sacred Light Diya",
        desc: "Radiant golden flame blooming into sacred botanical geometry on midnight obsidian velvet."
      },
      {
        tag: "✦ EDITION 03 OF 04 • 8-YEAR RESERVE ✦",
        name: "The 2018 Vintage Grand Reserve",
        desc: "Traveled 4,800 KM across 14 relatives. Certified atomic-grade freshness. Zero bites taken."
      },
      {
        tag: "✦ EDITION 04 OF 04 • THE INEVITABLE ✦",
        name: "Ding Dong! Special Superhero Arrival",
        desc: "Arrived at your door in a red superhero cape. Forward before midnight or Sharma Ji sends another box!"
      }
    ];

    this.init();
  }

  init() {
    this.bindEvents();
    this.updateHUD(0);
    this.audio.playTempleBell();
    requestAnimationFrame(() => this.loop());

    // Audio unlock on first tap
    const unlock = () => {
      this.audio.unlock();
      window.removeEventListener('click', unlock);
      window.removeEventListener('touchstart', unlock);
    };
    window.addEventListener('click', unlock, { passive: true });
    window.addEventListener('touchstart', unlock, { passive: true });
  }

  bindEvents() {
    // Auto-spin Play/Pause
    if (this.playPauseBtn) {
      this.playPauseBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.isAutoSpinning = !this.isAutoSpinning;
        this.playPauseBtn.textContent = this.isAutoSpinning ? '⏸ Auto-Spin' : '▶ Spin';
      });
    }

    // Previous / Next Buttons (Snap 90 deg)
    if (this.prevBtn) {
      this.prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.snapToEdition((this.activeEdition - 1 + 4) % 4);
      });
    }

    if (this.nextBtn) {
      this.nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.snapToEdition((this.activeEdition + 1) % 4);
      });
    }

    // Navigation Pills
    this.pills.forEach((pill) => {
      pill.addEventListener('click', (e) => {
        e.stopPropagation();
        const idx = parseInt(pill.dataset.index, 10);
        if (!isNaN(idx)) this.snapToEdition(idx);
      });
    });

    // Sound Button
    if (this.soundBtn) {
      this.soundBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const enabled = this.audio.toggle();
        if (this.soundIcon) {
          this.soundIcon.textContent = enabled ? '🔊' : '🔇';
        }
        if (enabled) this.audio.playTurntableChime(this.activeEdition);
      });
    }

    // Fullscreen / Reel Toggle
    if (this.toggleAspectBtn && this.viewport) {
      this.toggleAspectBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const isFs = this.viewport.classList.toggle('fullscreen-mode');
        this.toggleAspectBtn.textContent = isFs ? '📺 Exit Full' : '📱 Reel 9:16';
      });
    }

    // Interactive 3D Drag & Touch on Stage
    if (this.stage) {
      const onStart = (clientX) => {
        this.isDragging = true;
        this.startX = clientX;
        this.lastX = clientX;
        this.velocity = 0;
      };

      const onMove = (clientX) => {
        if (!this.isDragging) return;
        const delta = clientX - this.lastX;
        this.velocity = delta * 0.45;
        this.currentAngle += this.velocity;
        this.lastX = clientX;
      };

      const onEnd = () => {
        this.isDragging = false;
      };

      this.stage.addEventListener('mousedown', (e) => onStart(e.clientX));
      window.addEventListener('mousemove', (e) => onMove(e.clientX));
      window.addEventListener('mouseup', onEnd);

      this.stage.addEventListener('touchstart', (e) => {
        if (e.touches.length > 0) onStart(e.touches[0].clientX);
      }, { passive: true });

      window.addEventListener('touchmove', (e) => {
        if (e.touches.length > 0) onMove(e.touches[0].clientX);
      }, { passive: true });

      window.addEventListener('touchend', onEnd);
    }
  }

  snapToEdition(index) {
    const targetAngle = -index * 90;
    this.currentAngle = targetAngle;
    this.updateActiveEdition(index);
    this.audio.playTurntableChime(index);
  }

  loop() {
    requestAnimationFrame(() => this.loop());

    if (!this.isDragging) {
      if (Math.abs(this.velocity) > 0.05) {
        this.currentAngle += this.velocity;
        this.velocity *= 0.94; // damping
      } else if (this.isAutoSpinning) {
        this.currentAngle -= this.autoSpinSpeed;
      }
    }

    // Render 3D transform on ring
    if (this.ring) {
      this.ring.style.transform = `rotateY(${this.currentAngle}deg)`;
    }

    // Calculate which face is currently pointing front
    // Face 0 = 0 deg, Face 1 = 90 deg (facing front when ring is at -90 deg), Face 2 = 180 deg, Face 3 = 270 deg
    const normalizedAngle = (-this.currentAngle % 360 + 360) % 360;
    const currentFrontIndex = Math.round(normalizedAngle / 90) % 4;

    if (currentFrontIndex !== this.activeEdition) {
      this.updateActiveEdition(currentFrontIndex);
    }
  }

  updateActiveEdition(index) {
    this.activeEdition = index;
    this.updateHUD(index);

    // Update Progress Bars
    this.fills.forEach((fill, i) => {
      if (fill) {
        fill.style.width = i <= index ? '100%' : '0%';
      }
    });

    // Update Pills
    this.pills.forEach((pill, i) => {
      pill.classList.toggle('active', i === index);
    });

    // Trigger Audio Chime when a new face aligns
    if (this.lastSoundEdition !== index) {
      this.lastSoundEdition = index;
      this.audio.playTurntableChime(index);
    }
  }

  updateHUD(index) {
    const data = this.editionsData[index];
    if (!data) return;

    if (this.hudTag) this.hudTag.textContent = data.tag;
    if (this.hudName) this.hudName.textContent = data.name;
    if (this.hudDesc) this.hudDesc.textContent = data.desc;
  }
}

// ==================== 4. BOOTSTRAP INITIALIZATION ====================
window.addEventListener('DOMContentLoaded', () => {
  const audio = new LuxuryAudioEngine();
  const dust = new GoldenDustCanvas('fireworks-canvas');
  window.luxurySpin = new LuxurySpinEngine(audio);
});
