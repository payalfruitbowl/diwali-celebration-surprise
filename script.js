/**
 * THE SOAN PAPDI CHRONICLE (2018 - 2026) 📦✨
 * Automated 9:16 Comic Video Reel Engine
 */

// ==================== 1. PROCEDURAL COMIC AUDIO SYNTHESIZER ====================
class ComicAudioEngine {
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

  // Act 1: Vintage Sweet Shop Bell & Shimmer
  playShopBell() {
    if (!this.enabled) return;
    this.unlock();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    
    // Brass sweet shop chime
    [659.25, 987.77, 1318.51].forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + idx * 0.05);

      gain.gain.setValueAtTime(0.12, now + idx * 0.05);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.05 + 1.2);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now + idx * 0.05);
      osc.stop(now + idx * 0.05 + 1.3);
    });
  }

  // Act 2: Cartoon Scooter Horn & Fast Whoosh
  playScooterRelay() {
    if (!this.enabled) return;
    this.unlock();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;

    // Fast cartoon whoosh
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(280, now);
    osc.frequency.exponentialRampToValueAtTime(1100, now + 0.3);

    gain.gain.setValueAtTime(0.14, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.38);

    // Beep-beep horn
    setTimeout(() => {
      if (!this.enabled || !this.ctx) return;
      const t = this.ctx.currentTime;
      [587.33, 587.33].forEach((f, i) => {
        const hOsc = this.ctx.createOscillator();
        const hGain = this.ctx.createGain();
        hOsc.type = 'square';
        hOsc.frequency.setValueAtTime(f, t + i * 0.12);
        hGain.gain.setValueAtTime(0.08, t + i * 0.12);
        hGain.gain.exponentialRampToValueAtTime(0.001, t + i * 0.12 + 0.09);
        hOsc.connect(hGain);
        hGain.connect(this.ctx.destination);
        hOsc.start(t + i * 0.12);
        hOsc.stop(t + i * 0.12 + 0.1);
      });
    }, 280);
  }

  // Act 3: Sci-Fi Atomic Zap & Danger Crackle
  playAtomicZap() {
    if (!this.enabled) return;
    this.unlock();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(1200, now);
    osc.frequency.exponentialRampToValueAtTime(120, now + 0.4);

    gain.gain.setValueAtTime(0.16, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.42);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.45);
  }

  // Act 4: Doorbell DING DONG! 🔔 Followed by Festive Fanfare
  playDoorbellArrival() {
    if (!this.enabled) return;
    this.unlock();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;

    // DING (high note)
    const ding = this.ctx.createOscillator();
    const dingGain = this.ctx.createGain();
    ding.type = 'sine';
    ding.frequency.setValueAtTime(659.25, now); // E5
    dingGain.gain.setValueAtTime(0.3, now);
    dingGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);
    ding.connect(dingGain);
    dingGain.connect(this.ctx.destination);
    ding.start(now);
    ding.stop(now + 1.25);

    // DONG (lower note)
    const dong = this.ctx.createOscillator();
    const dongGain = this.ctx.createGain();
    dong.type = 'sine';
    dong.frequency.setValueAtTime(523.25, now + 0.35); // C5
    dongGain.gain.setValueAtTime(0.3, now + 0.35);
    dongGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.8);
    dong.connect(dongGain);
    dongGain.connect(this.ctx.destination);
    dong.start(now + 0.35);
    dong.stop(now + 1.85);

    // Grand Diwali celebration sparkle chords
    setTimeout(() => {
      if (!this.enabled || !this.ctx) return;
      const t = this.ctx.currentTime;
      const victoryNotes = [523.25, 659.25, 783.99, 1046.50]; // C Major triumph
      victoryNotes.forEach((freq, idx) => {
        const vOsc = this.ctx.createOscillator();
        const vGain = this.ctx.createGain();
        vOsc.type = 'triangle';
        vOsc.frequency.setValueAtTime(freq, t + idx * 0.08);
        vGain.gain.setValueAtTime(0.12, t + idx * 0.08);
        vGain.gain.exponentialRampToValueAtTime(0.0001, t + idx * 0.08 + 2.0);
        vOsc.connect(vGain);
        vGain.connect(this.ctx.destination);
        vOsc.start(t + idx * 0.08);
        vOsc.stop(t + idx * 0.08 + 2.1);
      });
    }, 900);
  }

  // Soft sparkle click
  playSparkle() {
    if (!this.enabled || !this.ctx) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(1600, now);
    gain.gain.setValueAtTime(0.05, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.08);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.09);
  }
}

// ==================== 2. AMBIENT COMIC PARTICLES ====================
class ComicCanvasParticles {
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
    this.loop();
  }

  resize() {
    if (!this.canvas) return;
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  createBurst(x, y, color = '#fbbf24') {
    const count = 40;
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.2;
      const speed = 2 + Math.random() * 6;
      this.particles.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        color,
        size: 3 + Math.random() * 3,
        alpha: 1,
        decay: 0.015 + Math.random() * 0.02
      });
    }
  }

  loop() {
    requestAnimationFrame(() => this.loop());
    if (!this.ctx || !this.canvas) return;

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.07;
      p.alpha -= p.decay;

      if (p.alpha <= 0) {
        this.particles.splice(i, 1);
        continue;
      }

      this.ctx.save();
      this.ctx.globalAlpha = Math.max(0, p.alpha);
      this.ctx.fillStyle = p.color;
      this.ctx.shadowBlur = 10;
      this.ctx.shadowColor = p.color;
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.restore();
    }
  }
}

// ==================== 3. SOAN PAPDI CINEMA REEL ENGINE ====================
class SoanPapdiReelEngine {
  constructor(audio, particles) {
    this.audio = audio;
    this.particles = particles;
    this.currentIndex = 0;
    this.totalActs = 4;
    this.durationPerAct = 8500; // 8.5 seconds per chapter
    this.elapsedTime = 0;
    this.isPlaying = true;
    this.lastTimestamp = null;

    // Elements
    this.scenes = [
      document.getElementById('scene-0'),
      document.getElementById('scene-1'),
      document.getElementById('scene-2'),
      document.getElementById('scene-3')
    ];

    this.fills = [
      document.getElementById('fill-0'),
      document.getElementById('fill-1'),
      document.getElementById('fill-2'),
      document.getElementById('fill-3')
    ];

    this.segments = Array.from(document.querySelectorAll('.progress-segment'));
    this.pills = Array.from(document.querySelectorAll('.concept-pill-btn'));
    this.badgeTitle = document.getElementById('reel-badge-title');
    this.hudNowPlaying = document.getElementById('hud-now-playing');
    this.playPauseBtn = document.getElementById('play-pause-btn');
    this.prevBtn = document.getElementById('prev-btn');
    this.nextBtn = document.getElementById('next-btn');
    this.soundBtn = document.getElementById('sound-btn');
    this.soundIcon = document.getElementById('sound-icon');
    this.toggleAspectBtn = document.getElementById('toggle-aspect-btn');
    this.reelViewport = document.getElementById('reel-viewport');

    this.actTitles = [
      "ACT 1 • THE GENESIS (2018)",
      "ACT 2 • 14 RELATIVES (4,800 KM)",
      "ACT 3 • ATOMIC HALF-LIFE",
      "ACT 4 • ARRIVAL AT YOUR DOOR 💀"
    ];

    this.hudDescriptions = [
      "The Soan Papdi Chronicle • Act 1: The Genesis (Diwali 2018)",
      "The Soan Papdi Chronicle • Act 2: The 14-Relative Relay Loop",
      "The Soan Papdi Chronicle • Act 3: Carbon-14 Durability Test",
      "The Soan Papdi Chronicle • Act 4: Special Delivery at Your Door!"
    ];

    this.actColors = [
      '#f59e0b', // warm gold amber
      '#38bdf8', // cartoon cyan
      '#ef4444', // hazard red
      '#fbbf24'  // triumphant yellow
    ];

    this.init();
  }

  init() {
    this.bindControls();
    this.loadAct(0);
    requestAnimationFrame((ts) => this.tick(ts));

    // Audio unlock on gesture
    const unlock = () => {
      this.audio.unlock();
      window.removeEventListener('click', unlock);
      window.removeEventListener('touchstart', unlock);
    };
    window.addEventListener('click', unlock, { passive: true });
    window.addEventListener('touchstart', unlock, { passive: true });
  }

  bindControls() {
    if (this.playPauseBtn) {
      this.playPauseBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.togglePlayPause();
      });
    }

    if (this.prevBtn) {
      this.prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.prevAct();
      });
    }

    if (this.nextBtn) {
      this.nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.nextAct();
      });
    }

    if (this.soundBtn) {
      this.soundBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const enabled = this.audio.toggle();
        if (this.soundIcon) {
          this.soundIcon.textContent = enabled ? '🔊' : '🔇';
        }
        if (enabled) this.audio.playSparkle();
      });
    }

    this.pills.forEach((pill) => {
      pill.addEventListener('click', (e) => {
        e.stopPropagation();
        const idx = parseInt(pill.dataset.index, 10);
        if (!isNaN(idx)) this.loadAct(idx);
      });
    });

    this.segments.forEach((seg, idx) => {
      seg.addEventListener('click', (e) => {
        e.stopPropagation();
        this.loadAct(idx);
      });
    });

    // Story tap navigation (Left 30% = prev, Right 70% = next)
    if (this.reelViewport) {
      this.reelViewport.addEventListener('click', (e) => {
        if (e.target.closest('.reel-header-overlay') || e.target.closest('.story-progress-bar')) {
          return;
        }
        const rect = this.reelViewport.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        if (clickX < rect.width * 0.3) {
          this.prevAct();
        } else {
          this.nextAct();
        }
      });
    }

    // Toggle 9:16 vs Fullscreen
    if (this.toggleAspectBtn && this.reelViewport) {
      this.toggleAspectBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const isFs = this.reelViewport.classList.toggle('fullscreen-mode');
        this.toggleAspectBtn.textContent = isFs ? '📺 Exit Full' : '📱 Reel 9:16';
      });
    }
  }

  tick(timestamp) {
    if (!this.lastTimestamp) this.lastTimestamp = timestamp;
    const delta = timestamp - this.lastTimestamp;
    this.lastTimestamp = timestamp;

    if (this.isPlaying) {
      this.elapsedTime += delta;
      const progressRatio = Math.min(1, this.elapsedTime / this.durationPerAct);

      if (this.fills[this.currentIndex]) {
        this.fills[this.currentIndex].style.width = `${(progressRatio * 100).toFixed(2)}%`;
      }

      if (this.elapsedTime >= this.durationPerAct) {
        this.nextAct();
      }
    }

    requestAnimationFrame((ts) => this.tick(ts));
  }

  loadAct(index) {
    this.currentIndex = index;
    this.elapsedTime = 0;

    // 1. Update Active Scene
    this.scenes.forEach((scene, i) => {
      if (!scene) return;
      if (i === index) {
        scene.classList.add('active');
        const animEls = scene.querySelectorAll('.animate-in');
        animEls.forEach(el => {
          el.style.animation = 'none';
          void el.offsetHeight;
          el.style.animation = '';
        });
      } else {
        scene.classList.remove('active');
      }
    });

    // 2. Update Progress Segments
    this.segments.forEach((seg, i) => {
      seg.classList.toggle('completed', i < index);
      if (this.fills[i]) {
        this.fills[i].style.width = i < index ? '100%' : '0%';
      }
    });

    // 3. Update Pills
    this.pills.forEach((pill, i) => {
      pill.classList.toggle('active', i === index);
    });

    // 4. Update Header Titles
    if (this.badgeTitle && this.actTitles[index]) {
      this.badgeTitle.textContent = this.actTitles[index];
    }
    if (this.hudNowPlaying && this.hudDescriptions[index]) {
      this.hudNowPlaying.textContent = this.hudDescriptions[index];
    }

    // 5. Trigger Theme Audio & Canvas Bursts
    this.triggerActTheme(index);
  }

  triggerActTheme(index) {
    try {
      if (index === 0) {
        this.audio.playShopBell();
      } else if (index === 1) {
        this.audio.playScooterRelay();
      } else if (index === 2) {
        this.audio.playAtomicZap();
      } else if (index === 3) {
        this.audio.playDoorbellArrival();
      }

      if (this.particles) {
        const color = this.actColors[index] || '#fbbf24';
        const rect = this.reelViewport ? this.reelViewport.getBoundingClientRect() : { left: window.innerWidth / 2, top: window.innerHeight / 2, width: 0, height: 0 };
        const burstX = rect.left + rect.width / 2;
        const burstY = rect.top + rect.height * 0.35;
        this.particles.createBurst(burstX, burstY, color);
      }
    } catch (err) {
      console.warn("Audio trigger:", err);
    }
  }

  nextAct() {
    const nextIdx = (this.currentIndex + 1) % this.totalActs;
    this.loadAct(nextIdx);
  }

  prevAct() {
    const prevIdx = (this.currentIndex - 1 + this.totalActs) % this.totalActs;
    this.loadAct(prevIdx);
  }

  togglePlayPause() {
    this.isPlaying = !this.isPlaying;
    if (this.playPauseBtn) {
      this.playPauseBtn.textContent = this.isPlaying ? '⏸ Pause' : '▶ Play';
    }
  }
}

// ==================== 4. BOOTSTRAP ====================
window.addEventListener('DOMContentLoaded', () => {
  const audio = new ComicAudioEngine();
  const particles = new ComicCanvasParticles('fireworks-canvas');
  window.soanPapdiReel = new SoanPapdiReelEngine(audio, particles);
});
