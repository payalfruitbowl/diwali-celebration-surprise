/**
 * DIWALI CONCEPT VIDEO SHOWCASE 🎬✨
 * Automated 9:16 Cinema Reel Engine with Web Audio & Particle Motion
 */

// ==================== 1. PROCEDURAL AUDIO SYNTHESIZER ====================
class ReelAudioEngine {
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

  // Concept 1: 90s Nostalgic Warm Chime & Sparkler Sizzle
  play90sRetroChime() {
    if (!this.enabled) return;
    this.unlock();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    
    // Warm vintage chords (FM-style retro vibe)
    const notes = [329.63, 392.00, 493.88, 587.33]; // E minor / warm nostalgic
    notes.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + idx * 0.08);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.12, now + idx * 0.08 + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.08 + 1.8);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now + idx * 0.08);
      osc.stop(now + idx * 0.08 + 1.9);
    });
  }

  // Concept 2: 8-Bit Pixel Game Power-Up & Chiptune Chime
  play8BitPixelJingle() {
    if (!this.enabled) return;
    this.unlock();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;

    // Fast 8-bit arpeggio
    const arpNotes = [440, 554.37, 659.25, 880, 1108.73, 1318.51];
    arpNotes.forEach((freq, i) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(freq, now + i * 0.06);

      gain.gain.setValueAtTime(0.08, now + i * 0.06);
      gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.06 + 0.12);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now + i * 0.06);
      osc.stop(now + i * 0.06 + 0.13);
    });
  }

  // Concept 3: Comic Pop-Art Cartoon Whoosh & Bounce
  playComicPop() {
    if (!this.enabled) return;
    this.unlock();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;

    // Fun slide whistle / comic pop
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(220, now);
    osc.frequency.exponentialRampToValueAtTime(880, now + 0.25);

    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.3);

    // Followed by a cheerful chime
    setTimeout(() => {
      if (!this.enabled || !this.ctx) return;
      const t = this.ctx.currentTime;
      const chime = this.ctx.createOscillator();
      const chimeGain = this.ctx.createGain();
      chime.type = 'sine';
      chime.frequency.setValueAtTime(1046.5, t); // C6
      chimeGain.gain.setValueAtTime(0.1, t);
      chimeGain.gain.exponentialRampToValueAtTime(0.001, t + 0.4);
      chime.connect(chimeGain);
      chimeGain.connect(this.ctx.destination);
      chime.start(t);
      chime.stop(t + 0.45);
    }, 240);
  }

  // Concept 4: Sacred Temple Brass Bell & Resonant Diya Chime
  playSacredGoldBell() {
    if (!this.enabled) return;
    this.unlock();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;

    // Resonant brass bell harmonics
    const harmonics = [587.33, 1174.66, 1760.00, 2349.32, 2936.65];
    const weights = [0.25, 0.15, 0.1, 0.06, 0.03];

    harmonics.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = idx === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(weights[idx], now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 3.0);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 3.1);
    });
  }

  // Soft sparkle crackle
  playSparkleCrackle() {
    if (!this.enabled) return;
    this.unlock();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    for (let i = 0; i < 3; i++) {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(1400 + Math.random() * 800, now + i * 0.04);
      gain.gain.setValueAtTime(0.04, now + i * 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.04 + 0.06);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now + i * 0.04);
      osc.stop(now + i * 0.04 + 0.07);
    }
  }
}

// ==================== 2. AMBIENT PARTICLES & FIREWORKS ENGINE ====================
class CanvasParticleEngine {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.fireworks = [];
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
    const count = 35;
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.3;
      const speed = 2 + Math.random() * 5;
      this.particles.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        color,
        size: 2 + Math.random() * 2.5,
        alpha: 1,
        decay: 0.015 + Math.random() * 0.02
      });
    }
  }

  loop() {
    requestAnimationFrame(() => this.loop());
    if (!this.ctx || !this.canvas) return;

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Update and draw floating particles
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.06; // gravity
      p.alpha -= p.decay;

      if (p.alpha <= 0) {
        this.particles.splice(i, 1);
        continue;
      }

      this.ctx.save();
      this.ctx.globalAlpha = Math.max(0, p.alpha);
      this.ctx.fillStyle = p.color;
      this.ctx.shadowBlur = 8;
      this.ctx.shadowColor = p.color;
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.restore();
    }
  }
}

// ==================== 3. CINEMA REEL ENGINE (AUTO-PLAYING 4 CONCEPTS) ====================
class CinemaReelEngine {
  constructor(audio, particles) {
    this.audio = audio;
    this.particles = particles;
    this.currentIndex = 0;
    this.totalConcepts = 4;
    this.durationPerConcept = 8500; // 8.5 seconds per scene (ideal reel timing)
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

    this.conceptTitles = [
      "CONCEPT 1 • 90s RETRO",
      "CONCEPT 2 • 8-BIT PIXEL",
      "CONCEPT 3 • SOAN PAPDI",
      "CONCEPT 4 • KINETIC GOLD"
    ];

    this.hudDescriptions = [
      "Playing: Concept 1 / 4 • 90s Childhood Memories",
      "Playing: Concept 2 / 4 • 8-Bit Pixel Mohalla",
      "Playing: Concept 3 / 4 • The Soan Papdi Chronicle",
      "Playing: Concept 4 / 4 • Kinetic Molten Gold"
    ];

    this.conceptColors = [
      '#f59e0b', // warm gold amber
      '#38bdf8', // pixel cyan/sky
      '#fbbf24', // bright comic yellow
      '#eab308'  // radiant molten gold
    ];

    this.init();
  }

  init() {
    this.bindControls();
    this.loadConcept(0);
    
    // Start continuous requestAnimationFrame animation loop
    requestAnimationFrame((ts) => this.tick(ts));

    // Unlock WebAudio on any first tap
    const unlockAudio = () => {
      this.audio.unlock();
      window.removeEventListener('click', unlockAudio);
      window.removeEventListener('touchstart', unlockAudio);
    };
    window.addEventListener('click', unlockAudio, { passive: true });
    window.addEventListener('touchstart', unlockAudio, { passive: true });
  }

  bindControls() {
    // Play / Pause Button
    if (this.playPauseBtn) {
      this.playPauseBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.togglePlayPause();
      });
    }

    // Previous Button
    if (this.prevBtn) {
      this.prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.prevConcept();
      });
    }

    // Next Button
    if (this.nextBtn) {
      this.nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.nextConcept();
      });
    }

    // Sound Button
    if (this.soundBtn) {
      this.soundBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const enabled = this.audio.toggle();
        if (this.soundIcon) {
          this.soundIcon.textContent = enabled ? '🔊' : '🔇';
        }
        if (enabled) {
          this.audio.playSparkleCrackle();
        }
      });
    }

    // Navigation Pills
    this.pills.forEach((pill) => {
      pill.addEventListener('click', (e) => {
        e.stopPropagation();
        const idx = parseInt(pill.dataset.index, 10);
        if (!isNaN(idx)) this.loadConcept(idx);
      });
    });

    // Story Progress Segments Click
    this.segments.forEach((seg, idx) => {
      seg.addEventListener('click', (e) => {
        e.stopPropagation();
        this.loadConcept(idx);
      });
    });

    // Tap Viewport for Story Style Jump (Left 30% = prev, Right 70% = next)
    if (this.reelViewport) {
      this.reelViewport.addEventListener('click', (e) => {
        // Don't trigger if clicked on controls or header buttons
        if (e.target.closest('.reel-header-overlay') || e.target.closest('.story-progress-bar')) {
          return;
        }
        const rect = this.reelViewport.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        if (clickX < rect.width * 0.3) {
          this.prevConcept();
        } else {
          this.nextConcept();
        }
      });
    }

    // Toggle Aspect Ratio (Reel 9:16 vs Fullscreen)
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
      const progressRatio = Math.min(1, this.elapsedTime / this.durationPerConcept);

      // Smoothly update current progress bar
      if (this.fills[this.currentIndex]) {
        this.fills[this.currentIndex].style.width = `${(progressRatio * 100).toFixed(2)}%`;
      }

      // Automatically transition to next concept when time completes
      if (this.elapsedTime >= this.durationPerConcept) {
        this.nextConcept();
      }
    }

    requestAnimationFrame((ts) => this.tick(ts));
  }

  loadConcept(index) {
    this.currentIndex = index;
    this.elapsedTime = 0;

    // 1. Update Active Scene Display
    this.scenes.forEach((scene, i) => {
      if (!scene) return;
      if (i === index) {
        scene.classList.add('active');
        // Restart scene entrance animations
        const animElements = scene.querySelectorAll('.animate-in');
        animElements.forEach(el => {
          el.style.animation = 'none';
          void el.offsetHeight; // force reflow
          el.style.animation = '';
        });
      } else {
        scene.classList.remove('active');
      }
    });

    // 2. Update Instagram-Style Progress Segment Fills
    this.segments.forEach((seg, i) => {
      seg.classList.toggle('completed', i < index);
      if (this.fills[i]) {
        if (i < index) {
          this.fills[i].style.width = '100%';
        } else if (i === index) {
          this.fills[i].style.width = '0%';
        } else {
          this.fills[i].style.width = '0%';
        }
      }
    });

    // 3. Update Concept Navigation Pills
    this.pills.forEach((pill, i) => {
      pill.classList.toggle('active', i === index);
    });

    // 4. Update Header Badge and HUD Titles
    if (this.badgeTitle && this.conceptTitles[index]) {
      this.badgeTitle.textContent = this.conceptTitles[index];
    }
    if (this.hudNowPlaying && this.hudDescriptions[index]) {
      this.hudNowPlaying.textContent = this.hudDescriptions[index];
    }

    // 5. Trigger Theme Sound & Synchronized Sparkles
    this.triggerSceneTheme(index);
  }

  triggerSceneTheme(index) {
    try {
      if (index === 0) {
        this.audio.play90sRetroChime();
      } else if (index === 1) {
        this.audio.play8BitPixelJingle();
      } else if (index === 2) {
        this.audio.playComicPop();
      } else if (index === 3) {
        this.audio.playSacredGoldBell();
      }

      // Trigger ambient canvas burst
      if (this.particles) {
        const color = this.conceptColors[index] || '#fbbf24';
        const rect = this.reelViewport ? this.reelViewport.getBoundingClientRect() : { left: window.innerWidth / 2, top: window.innerHeight / 2, width: 0, height: 0 };
        const burstX = rect.left + rect.width / 2;
        const burstY = rect.top + rect.height * 0.4;
        this.particles.createBurst(burstX, burstY, color);
      }
    } catch (err) {
      console.warn("Theme trigger caught:", err);
    }
  }

  nextConcept() {
    const nextIdx = (this.currentIndex + 1) % this.totalConcepts;
    this.loadConcept(nextIdx);
  }

  prevConcept() {
    const prevIdx = (this.currentIndex - 1 + this.totalConcepts) % this.totalConcepts;
    this.loadConcept(prevIdx);
  }

  togglePlayPause() {
    this.isPlaying = !this.isPlaying;
    if (this.playPauseBtn) {
      this.playPauseBtn.textContent = this.isPlaying ? '⏸ Pause' : '▶ Play';
    }
  }
}

// ==================== 4. BOOTSTRAP INITIALIZATION ====================
window.addEventListener('DOMContentLoaded', () => {
  const audio = new ReelAudioEngine();
  const particles = new CanvasParticleEngine('fireworks-canvas');
  window.cinemaReel = new CinemaReelEngine(audio, particles);
});
