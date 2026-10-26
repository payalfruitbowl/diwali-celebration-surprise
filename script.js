/**
 * SHUBH DEEPAWALI 2026 - Interactive Celebration Experience
 * Full interactive fireworks, sparkler cursor, sound engine, rangoli studio,
 * mithai platter, and custom meta preview card generator.
 */

// ==================== 1. PROCEDURAL WEB AUDIO SYNTHESIZER ====================
class SoundEngine {
  constructor() {
    this.ctx = null;
    this.enabled = true;
    this.isInitialized = false;
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioContext();
      this.isInitialized = true;
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggle() {
    this.enabled = !this.enabled;
    return this.enabled;
  }

  // Realistic Temple Brass Bell (Ghanti)
  playTempleBell() {
    if (!this.enabled) return;
    this.init();
    const now = this.ctx.currentTime;
    const freqs = [587.33, 1174.66, 1760.00, 2349.32, 3520.00]; // D5 and bright metallic harmonics
    const weights = [1, 0.6, 0.4, 0.25, 0.1];

    freqs.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = idx === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(weights[idx] * 0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 3.2);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 3.3);
    });
  }

  // Firework Launch Whoosh
  playRocketLaunch() {
    if (!this.enabled) return;
    this.init();
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(160, now);
    osc.frequency.exponentialRampToValueAtTime(800, now + 0.6);

    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.65);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.7);
  }

  // Firework Explosion Boom & Crackle
  playFireworkBurst() {
    if (!this.enabled) return;
    this.init();
    const now = this.ctx.currentTime;

    // 1. Low Thud / Boom
    const osc = this.ctx.createOscillator();
    const boomGain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(140, now);
    osc.frequency.exponentialRampToValueAtTime(30, now + 0.5);

    boomGain.gain.setValueAtTime(0.4, now);
    boomGain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);

    osc.connect(boomGain);
    boomGain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.65);

    // 2. High Frequency Sparkling Crackles
    const bufferSize = this.ctx.sampleRate * 0.4;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    const whiteNoise = this.ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1800, now);
    filter.Q.setValueAtTime(2.0, now);

    const noiseGain = this.ctx.createGain();
    noiseGain.gain.setValueAtTime(0.25, now + 0.05);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);

    whiteNoise.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(this.ctx.destination);
    whiteNoise.start(now + 0.05);
    whiteNoise.stop(now + 0.5);
  }

  // Sparkler / Phuljhadi Burning Sizzle
  playSparklerCrackle() {
    if (!this.enabled) return;
    this.init();
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(1200 + Math.random() * 800, now);
    gain.gain.setValueAtTime(0.04, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.08);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.09);
  }

  // Sacred Diya Lighting Harmonious Chime
  playDiyaChime() {
    if (!this.enabled) return;
    this.init();
    const notes = [440, 554.37, 659.25, 830.61, 880]; // A Major pentatonic sparkle
    notes.forEach((freq, idx) => {
      setTimeout(() => {
        if (!this.enabled) return;
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now);
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.8);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 1.9);
      }, idx * 120);
    });
  }
}

const sounds = new SoundEngine();

// ==================== 2. FIREWORKS SIMULATION ENGINE ====================
class FireworksEngine {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.rockets = [];
    this.particles = [];
    this.anars = [];
    this.chakris = [];
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.resize();
    window.addEventListener('resize', () => this.resize());
    this.burstCount = 0;
  }

  resize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.canvas.width = this.width;
    this.canvas.height = this.height;
  }

  launchRocket(targetX = null, targetY = null, customColor = null) {
    const startX = this.width * (0.2 + Math.random() * 0.6);
    const destX = targetX !== null ? targetX : this.width * (0.15 + Math.random() * 0.7);
    const destY = targetY !== null ? targetY : this.height * (0.12 + Math.random() * 0.4);

    const colors = [
      '#f59e0b', '#fbbf24', '#ef4444', '#ec4899', '#10b981', '#3b82f6', '#a855f7', '#f43f5e'
    ];
    const color = customColor || colors[Math.floor(Math.random() * colors.length)];

    this.rockets.push({
      x: startX,
      y: this.height,
      startX,
      startY: this.height,
      destX,
      destY,
      color,
      progress: 0,
      speed: 0.025 + Math.random() * 0.012,
      trail: []
    });

    sounds.playRocketLaunch();
  }

  sparkAnar(x = this.width / 2, y = this.height - 20) {
    for (let i = 0; i < 90; i++) {
      const angle = -Math.PI / 2 + (Math.random() - 0.5) * 0.8;
      const speed = 7 + Math.random() * 11;
      this.particles.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        color: Math.random() > 0.3 ? '#fbbf24' : '#f59e0b',
        alpha: 1,
        decay: 0.02 + Math.random() * 0.025,
        size: 2 + Math.random() * 3,
        gravity: 0.3
      });
    }
    sounds.playFireworkBurst();
    this.incrementCounter();
  }

  spinChakri(x = this.width / 2, y = this.height / 2) {
    for (let i = 0; i < 80; i++) {
      const angle = (i / 80) * Math.PI * 2 + Math.random() * 0.2;
      const speed = 4 + Math.random() * 6;
      this.particles.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        color: i % 2 === 0 ? '#fbbf24' : '#ec4899',
        alpha: 1,
        decay: 0.02 + Math.random() * 0.02,
        size: 3,
        gravity: 0.05
      });
    }
    sounds.playFireworkBurst();
    this.incrementCounter();
  }

  createBurst(x, y, color) {
    const particleCount = 80 + Math.floor(Math.random() * 40);
    for (let i = 0; i < particleCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 2 + Math.random() * 6.5;
      this.particles.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        color,
        alpha: 1,
        decay: 0.012 + Math.random() * 0.018,
        size: 2 + Math.random() * 2.5,
        gravity: 0.08
      });
    }
    sounds.playFireworkBurst();
    this.incrementCounter();
  }

  incrementCounter() {
    this.burstCount++;
    const counterEl = document.getElementById('crackers-burst-count');
    if (counterEl) counterEl.textContent = this.burstCount;
  }

  updateAndDraw() {
    this.ctx.clearRect(0, 0, this.width, this.height);

    // Update and draw rockets
    for (let i = this.rockets.length - 1; i >= 0; i--) {
      const r = this.rockets[i];
      r.progress += r.speed;

      r.x = r.startX + (r.destX - r.startX) * r.progress;
      r.y = r.startY + (r.destY - r.startY) * r.progress;

      // Rocket trail
      this.ctx.beginPath();
      this.ctx.arc(r.x, r.y, 3, 0, Math.PI * 2);
      this.ctx.fillStyle = '#fff';
      this.ctx.fill();

      // Spark trail
      this.particles.push({
        x: r.x,
        y: r.y,
        vx: (Math.random() - 0.5) * 1.5,
        vy: (Math.random() - 0.5) * 1.5 + 1,
        color: '#f59e0b',
        alpha: 0.7,
        decay: 0.05,
        size: 1.5,
        gravity: 0.05
      });

      if (r.progress >= 1) {
        this.createBurst(r.destX, r.destY, r.color);
        this.rockets.splice(i, 1);
      }
    }

    // Update and draw particles
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += p.gravity;
      p.vx *= 0.98;
      p.alpha -= p.decay;

      if (p.alpha <= 0) {
        this.particles.splice(i, 1);
        continue;
      }

      this.ctx.save();
      this.ctx.globalAlpha = Math.max(0, p.alpha);
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      this.ctx.fillStyle = p.color;
      this.ctx.shadowBlur = 8;
      this.ctx.shadowColor = p.color;
      this.ctx.fill();
      this.ctx.restore();
    }
  }
}

// ==================== 3. SPARKLER (PHULJHADI) INTERACTIVE WAND ====================
class SparklerWand {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.isActive = false;
    this.sparks = [];
    this.mouseX = -100;
    this.mouseY = -100;
    this.resize();
    window.addEventListener('resize', () => this.resize());
    this.bindEvents();
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  toggle(forceState = null) {
    this.isActive = forceState !== null ? forceState : !this.isActive;
    return this.isActive;
  }

  bindEvents() {
    const updatePos = (clientX, clientY) => {
      this.mouseX = clientX;
      this.mouseY = clientY;
      if (this.isActive) {
        this.spawnEmbers(clientX, clientY);
        if (Math.random() > 0.6) sounds.playSparklerCrackle();
      }
    };

    window.addEventListener('mousemove', (e) => updatePos(e.clientX, e.clientY));
    window.addEventListener('touchmove', (e) => {
      if (e.touches.length > 0) {
        updatePos(e.touches[0].clientX, e.touches[0].clientY);
      }
    }, { passive: true });
  }

  spawnEmbers(x, y) {
    for (let i = 0; i < 8; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 1.5 + Math.random() * 4.5;
      this.sparks.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        alpha: 1,
        decay: 0.03 + Math.random() * 0.04,
        size: 1.5 + Math.random() * 2,
        color: Math.random() > 0.4 ? '#fbbf24' : '#fff'
      });
    }
  }

  updateAndDraw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    if (!this.isActive && this.sparks.length === 0) return;

    // Draw sparkler tip at mouse
    if (this.isActive && this.mouseX > 0) {
      this.ctx.save();
      this.ctx.beginPath();
      this.ctx.arc(this.mouseX, this.mouseY, 4, 0, Math.PI * 2);
      this.ctx.fillStyle = '#fff';
      this.ctx.shadowBlur = 15;
      this.ctx.shadowColor = '#f59e0b';
      this.ctx.fill();

      // Sparkler stick
      this.ctx.beginPath();
      this.ctx.moveTo(this.mouseX, this.mouseY);
      this.ctx.lineTo(this.mouseX - 20, this.mouseY + 40);
      this.ctx.strokeStyle = '#9ca3af';
      this.ctx.lineWidth = 3;
      this.ctx.lineCap = 'round';
      this.ctx.stroke();
      this.ctx.restore();
    }

    // Draw embers
    for (let i = this.sparks.length - 1; i >= 0; i--) {
      const s = this.sparks[i];
      s.x += s.vx;
      s.y += s.vy;
      s.vy += 0.1; // gravity
      s.alpha -= s.decay;

      if (s.alpha <= 0) {
        this.sparks.splice(i, 1);
        continue;
      }

      this.ctx.save();
      this.ctx.globalAlpha = s.alpha;
      this.ctx.beginPath();
      this.ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
      this.ctx.fillStyle = s.color;
      this.ctx.shadowBlur = 6;
      this.ctx.shadowColor = s.color;
      this.ctx.fill();
      this.ctx.restore();
    }
  }
}

// ==================== 4. PETALS GENERATOR ====================
function initPetalShower() {
  const container = document.getElementById('petals-container');
  if (!container) return;

  const createPetal = () => {
    const petal = document.createElement('div');
    petal.className = 'falling-petal';
    const isMarigold = Math.random() > 0.4;
    petal.style.background = isMarigold 
      ? 'radial-gradient(circle, #fbbf24 30%, #ea580c 90%)' 
      : 'radial-gradient(circle, #f43f5e 30%, #991b1b 90%)';

    const size = 12 + Math.random() * 14;
    petal.style.width = `${size}px`;
    petal.style.height = `${size * 1.3}px`;
    petal.style.left = `${Math.random() * 100}vw`;
    petal.style.animationDuration = `${6 + Math.random() * 8}s`;
    petal.style.animationDelay = `${Math.random() * 4}s`;

    container.appendChild(petal);

    setTimeout(() => {
      petal.remove();
    }, 14000);
  };

  for (let i = 0; i < 20; i++) {
    createPetal();
  }
  setInterval(createPetal, 1200);
}

// ==================== 5. RANGOLI STUDIO CANVAS ====================
class RangoliStudio {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.currentColor = '#f59e0b';
    this.symmetry = 8;
    this.isDrawing = false;
    this.lastX = 0;
    this.lastY = 0;
    this.centerX = canvas.width / 2;
    this.centerY = canvas.height / 2;
    this.init();
  }

  init() {
    this.drawBackgroundGuide();
    this.bindEvents();
  }

  drawBackgroundGuide() {
    this.ctx.save();
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Subtle guide circles
    this.ctx.strokeStyle = 'rgba(245, 158, 11, 0.15)';
    this.ctx.lineWidth = 1;
    [60, 120, 180, 240].forEach((radius) => {
      this.ctx.beginPath();
      this.ctx.arc(this.centerX, this.centerY, radius, 0, Math.PI * 2);
      this.ctx.stroke();
    });

    // Central floral core
    this.ctx.beginPath();
    this.ctx.arc(this.centerX, this.centerY, 12, 0, Math.PI * 2);
    this.ctx.fillStyle = '#f59e0b';
    this.ctx.fill();
    this.ctx.restore();
  }

  bindEvents() {
    const getPos = (e) => {
      const rect = this.canvas.getBoundingClientRect();
      const scaleX = this.canvas.width / rect.width;
      const scaleY = this.canvas.height / rect.height;
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      return {
        x: (clientX - rect.left) * scaleX,
        y: (clientY - rect.top) * scaleY
      };
    };

    const startDraw = (e) => {
      this.isDrawing = true;
      const pos = getPos(e);
      this.lastX = pos.x;
      this.lastY = pos.y;
    };

    const draw = (e) => {
      if (!this.isDrawing) return;
      e.preventDefault();
      const pos = getPos(e);
      this.drawSymmetricSegment(this.lastX, this.lastY, pos.x, pos.y);
      this.lastX = pos.x;
      this.lastY = pos.y;
    };

    const stopDraw = () => {
      this.isDrawing = false;
    };

    this.canvas.addEventListener('mousedown', startDraw);
    this.canvas.addEventListener('mousemove', draw);
    window.addEventListener('mouseup', stopDraw);

    this.canvas.addEventListener('touchstart', startDraw, { passive: false });
    this.canvas.addEventListener('touchmove', draw, { passive: false });
    window.addEventListener('touchend', stopDraw);
  }

  drawSymmetricSegment(x1, y1, x2, y2) {
    const angleStep = (Math.PI * 2) / this.symmetry;
    const relX1 = x1 - this.centerX;
    const relY1 = y1 - this.centerY;
    const relX2 = x2 - this.centerX;
    const relY2 = y2 - this.centerY;

    this.ctx.save();
    this.ctx.strokeStyle = this.currentColor;
    this.ctx.fillStyle = this.currentColor;
    this.ctx.lineWidth = 4;
    this.ctx.lineCap = 'round';
    this.ctx.shadowBlur = 8;
    this.ctx.shadowColor = this.currentColor;

    for (let i = 0; i < this.symmetry; i++) {
      const angle = i * angleStep;
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);

      // Rotate coordinates
      const rx1 = relX1 * cos - relY1 * sin + this.centerX;
      const ry1 = relX1 * sin + relY1 * cos + this.centerY;
      const rx2 = relX2 * cos - relY2 * sin + this.centerX;
      const ry2 = relX2 * sin + relY2 * cos + this.centerY;

      this.ctx.beginPath();
      this.ctx.moveTo(rx1, ry1);
      this.ctx.lineTo(rx2, ry2);
      this.ctx.stroke();

      // Sand droplet effect
      this.ctx.beginPath();
      this.ctx.arc(rx2, ry2, 2.5, 0, Math.PI * 2);
      this.ctx.fill();
    }
    this.ctx.restore();
  }

  drawMagicBlossom() {
    this.drawBackgroundGuide();
    const colors = ['#f59e0b', '#ef4444', '#ec4899', '#3b82f6', '#10b981', '#fef08a'];
    const petals = 8;
    const step = (Math.PI * 2) / petals;

    colors.forEach((col, cIdx) => {
      this.ctx.save();
      this.ctx.strokeStyle = col;
      this.ctx.fillStyle = col;
      this.ctx.lineWidth = 3;
      this.ctx.shadowBlur = 10;
      this.ctx.shadowColor = col;

      const r = 40 + cIdx * 32;
      for (let i = 0; i < petals; i++) {
        const theta = i * step;
        const x = this.centerX + Math.cos(theta) * r;
        const y = this.centerY + Math.sin(theta) * r;

        this.ctx.beginPath();
        this.ctx.arc(x, y, 14, 0, Math.PI * 2);
        this.ctx.stroke();

        this.ctx.beginPath();
        this.ctx.arc(x, y, 6, 0, Math.PI * 2);
        this.ctx.fill();
      }
      this.ctx.restore();
    });
  }
}

// ==================== 6. VIRTUAL MITHAI THALI ====================
class MithaiThali {
  constructor() {
    this.items = [];
    this.container = document.getElementById('thali-items-tray');
    this.sweetIcons = {
      'Kaju Katli': '💎',
      'Motichoor Ladoo': '🟠',
      'Warm Gulab Jamun': '🟤',
      'Crispy Jalebi': '🌀',
      'The Immortal Soan Papdi': '📦',
      'Rasgulla': '⚪'
    };
    this.bindEvents();
  }

  bindEvents() {
    const addButtons = document.querySelectorAll('.add-sweet-btn');
    addButtons.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const card = e.target.closest('.mithai-tray-card');
        const sweetName = card.dataset.sweet;
        this.addSweet(sweetName);
      });
    });

    const clearBtn = document.getElementById('clear-thali-btn');
    if (clearBtn) {
      clearBtn.addEventListener('click', () => this.clear());
    }

    const shareBtn = document.getElementById('send-thali-whatsapp');
    if (shareBtn) {
      shareBtn.addEventListener('click', () => this.shareOnWhatsApp());
    }
  }

  addSweet(name) {
    if (this.items.length >= 12) {
      alert("Your festive Thali is overflowing with sweetness! 🪔 Send it or reset.");
      return;
    }
    this.items.push(name);
    sounds.playTempleBell();
    this.render();
  }

  clear() {
    this.items = [];
    this.render();
  }

  render() {
    if (!this.container) return;
    this.container.innerHTML = '';

    if (this.items.length === 0) {
      this.container.innerHTML = '<span class="empty-thali-hint">Your Thali is empty! Tap sweets above to load it up.</span>';
      return;
    }

    const total = this.items.length;
    const radius = 135; // Radius around center diya

    this.items.forEach((item, idx) => {
      const angle = (idx / total) * Math.PI * 2;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;

      const pill = document.createElement('div');
      pill.className = 'thali-sweet-pill';
      const icon = this.sweetIcons[item] || '🍬';
      pill.innerHTML = `${icon} ${item}`;
      pill.style.transform = `translate(${x}px, ${y}px)`;

      this.container.appendChild(pill);
    });
  }

  shareOnWhatsApp() {
    if (this.items.length === 0) {
      alert("Please add at least one sweet to your festive thali before sending! 🍬");
      return;
    }
    const sweetCounts = {};
    this.items.forEach(x => { sweetCounts[x] = (sweetCounts[x] || 0) + 1; });
    const sweetSummary = Object.entries(sweetCounts)
      .map(([name, count]) => `${this.sweetIcons[name] || '🍬'} ${count}x ${name}`)
      .join(', ');

    const text = encodeURIComponent(
      `🪔 *Shubh Deepawali 2026!* ✨\n\nI just prepared a special festive Diwali Mithai Thali for you with: ${sweetSummary}!\n\nOpen our family celebration surprise link to burst crackers and view our memories:\n${window.location.href}`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  }
}

// ==================== 7. META IMAGE & GREETING LINK GENERATOR ====================
class GreetingCustomizer {
  constructor() {
    this.familyNameInput = document.getElementById('input-family-name');
    this.recipientInput = document.getElementById('input-recipient-name');
    this.customWishInput = document.getElementById('input-custom-wish');
    this.generateBtn = document.getElementById('generate-link-btn');
    this.previewMetaBtn = document.getElementById('preview-meta-btn');
    this.linkBox = document.getElementById('generated-link-box');
    this.urlInput = document.getElementById('shareable-url-input');
    this.copyBtn = document.getElementById('copy-link-btn');

    this.modal = document.getElementById('meta-modal');
    this.closeModalBtn = document.getElementById('close-modal-btn');
    this.metaCanvas = document.getElementById('meta-canvas-preview');
    this.downloadBtn = document.getElementById('download-og-image-btn');

    this.bindEvents();
    this.parseUrlParameters();
  }

  bindEvents() {
    if (this.generateBtn) {
      this.generateBtn.addEventListener('click', () => this.generateLink());
    }

    if (this.copyBtn) {
      this.copyBtn.addEventListener('click', () => {
        this.urlInput.select();
        navigator.clipboard.writeText(this.urlInput.value);
        this.copyBtn.textContent = '✓ Copied!';
        setTimeout(() => { this.copyBtn.textContent = '📋 Copy'; }, 2000);
      });
    }

    if (this.previewMetaBtn) {
      this.previewMetaBtn.addEventListener('click', () => this.openMetaModal());
    }

    if (this.closeModalBtn) {
      this.closeModalBtn.addEventListener('click', () => this.closeMetaModal());
    }

    if (this.downloadBtn) {
      this.downloadBtn.addEventListener('click', () => this.downloadHighResMetaImage());
    }

    // Photo choices
    const photoRadios = document.querySelectorAll('input[name="photo-choice"]');
    photoRadios.forEach(radio => {
      radio.addEventListener('change', () => {
        document.querySelectorAll('.preset-img-option').forEach(el => el.classList.remove('active'));
        radio.closest('.preset-img-option').classList.add('active');
        this.renderMetaCanvas();
      });
    });
  }

  parseUrlParameters() {
    const params = new URLSearchParams(window.location.search);
    const family = params.get('family');
    const to = params.get('to');
    const msg = params.get('msg');

    if (family) {
      document.getElementById('meta-title').textContent = `${family} Diwali Celebration 2026 ✨ | A Surprise Inside`;
      document.getElementById('intro-family-caption').textContent = `✨ From: ${family} ✨`;
      if (this.familyNameInput) this.familyNameInput.value = family;
    }

    if (to) {
      document.getElementById('intro-to-greeting').textContent = `Dear ${to}, A Festive Blessing for You`;
      document.getElementById('hero-greeting-to').textContent = `Happy Diwali to ${to} & Your Loved Ones`;
      if (this.recipientInput) this.recipientInput.value = to;
    }

    if (msg) {
      document.getElementById('hero-custom-message').textContent = `"${msg}"`;
      if (this.customWishInput) this.customWishInput.value = msg;
    }
  }

  generateLink() {
    const family = encodeURIComponent(this.familyNameInput.value.trim() || 'The Sharma Family');
    const to = encodeURIComponent(this.recipientInput.value.trim() || '');
    const msg = encodeURIComponent(this.customWishInput.value.trim() || '');

    const baseUrl = window.location.origin + window.location.pathname;
    const shareUrl = `${baseUrl}?family=${family}${to ? '&to=' + to : ''}${msg ? '&msg=' + msg : ''}`;

    this.urlInput.value = shareUrl;
    this.linkBox.classList.remove('hidden');

    // Update social share buttons
    const whatsappText = encodeURIComponent(
      `🪔 *${decodeURIComponent(family)}* sent you a warm Diwali surprise! ✨\nTap to light the Diya and see our festive celebration:\n${shareUrl}`
    );
    document.getElementById('share-whatsapp-btn').href = `https://api.whatsapp.com/send?text=${whatsappText}`;
    document.getElementById('share-twitter-btn').href = `https://twitter.com/intent/tweet?text=${whatsappText}`;
    document.getElementById('share-facebook-btn').href = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;

    sounds.playTempleBell();
    this.linkBox.scrollIntoView({ behavior: 'smooth' });
  }

  openMetaModal() {
    const family = this.familyNameInput.value.trim() || 'The Sharma Family';
    document.getElementById('modal-meta-title').textContent = `${family} Diwali Celebration 2026 ✨`;
    document.getElementById('modal-meta-desc').textContent = `A warm Diwali surprise from our home to yours! Tap to light the golden diya and experience our family's celebration.`;
    document.getElementById('mockup-contact-name').textContent = `${family} Group`;

    this.modal.classList.remove('hidden');
    this.renderMetaCanvas();
  }

  closeMetaModal() {
    this.modal.classList.add('hidden');
  }

  renderMetaCanvas(targetCanvas = this.metaCanvas) {
    if (!targetCanvas) return;
    const ctx = targetCanvas.getContext('2d');
    const w = targetCanvas.width;
    const h = targetCanvas.height;

    // Draw dark regal background
    const grad = ctx.createRadialGradient(w / 2, h / 2, 50, w / 2, h / 2, w * 0.7);
    grad.addColorStop(0, '#2d1202');
    grad.addColorStop(0.5, '#190a02');
    grad.addColorStop(1, '#080312');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    // Try to draw family image if available
    const imgEl = document.getElementById('intro-family-img');
    if (imgEl && imgEl.complete && imgEl.naturalWidth > 0) {
      try {
        ctx.save();
        ctx.globalAlpha = 0.88;
        ctx.drawImage(imgEl, 0, 0, w, h);

        // Dark gradient overlay on bottom for text readability
        const overlay = ctx.createLinearGradient(0, h * 0.35, 0, h);
        overlay.addColorStop(0, 'rgba(8, 3, 18, 0)');
        overlay.addColorStop(0.7, 'rgba(8, 3, 18, 0.75)');
        overlay.addColorStop(1, 'rgba(8, 3, 18, 0.95)');
        ctx.fillStyle = overlay;
        ctx.fillRect(0, 0, w, h);
        ctx.restore();
      } catch (err) {
        // Fallback gracefully
      }
    }

    // Golden Royal Frame
    ctx.save();
    ctx.strokeStyle = '#ca8a04';
    ctx.lineWidth = 10;
    ctx.strokeRect(10, 10, w - 20, h - 20);

    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 2;
    ctx.strokeRect(20, 20, w - 40, h - 40);

    // Corner decorative rosettes
    const corners = [
      [20, 20], [w - 20, 20], [20, h - 20], [w - 20, h - 20]
    ];
    ctx.fillStyle = '#f59e0b';
    corners.forEach(([cx, cy]) => {
      ctx.beginPath();
      ctx.arc(cx, cy, 8, 0, Math.PI * 2);
      ctx.fill();
    });

    // Top Header Pill
    ctx.fillStyle = 'rgba(245, 158, 11, 0.95)';
    ctx.beginPath();
    ctx.roundRect(w / 2 - 140, 36, 280, 38, 19);
    ctx.fill();

    ctx.fillStyle = '#1a0800';
    ctx.font = 'bold 18px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('✨ SHUBH DEEPAWALI 2026 ✨', w / 2, 61);

    // Main Family Text
    const family = this.familyNameInput ? (this.familyNameInput.value.trim() || 'The Sharma Family') : 'The Sharma Family';
    ctx.fillStyle = '#fef3c7';
    ctx.font = 'bold 36px Georgia, serif';
    ctx.shadowColor = '#000';
    ctx.shadowBlur = 10;
    ctx.fillText(`${family}'s Diwali Celebration`, w / 2, h - 75);

    // Call to Action Subtitle
    ctx.fillStyle = '#fde68a';
    ctx.font = '500 18px sans-serif';
    ctx.fillText('🪔 Tap to light the golden Diya & unlock our celebration 🪔', w / 2, h - 38);
    ctx.restore();
  }

  downloadHighResMetaImage() {
    const highResCanvas = document.createElement('canvas');
    highResCanvas.width = 1200;
    highResCanvas.height = 630;
    this.renderMetaCanvas(highResCanvas);

    const link = document.createElement('a');
    link.download = 'diwali-og-image-1200x630.png';
    link.href = highResCanvas.toDataURL('image/png');
    link.click();
  }
}

// ==================== 8. DOM INITIALIZATION & EVENTS ====================
document.addEventListener('DOMContentLoaded', () => {
  const fwCanvas = document.getElementById('fireworks-canvas');
  const sparklerCanvas = document.getElementById('sparkler-canvas');
  const rangoliCanvas = document.getElementById('rangoli-canvas');

  const fireworks = new FireworksEngine(fwCanvas);
  const sparkler = new SparklerWand(sparklerCanvas);
  const rangoli = new RangoliStudio(rangoliCanvas);
  const mithai = new MithaiThali();
  const customizer = new GreetingCustomizer();

  initPetalShower();

  // Animation Loop
  function animLoop() {
    fireworks.updateAndDraw();
    sparkler.updateAndDraw();
    requestAnimationFrame(animLoop);
  }
  requestAnimationFrame(animLoop);

  // Sound Toggle Button
  const soundBtn = document.getElementById('sound-btn');
  const soundIcon = document.getElementById('sound-icon');
  const soundLabel = document.getElementById('sound-label');
  if (soundBtn) {
    soundBtn.addEventListener('click', () => {
      const isEnabled = sounds.toggle();
      soundIcon.textContent = isEnabled ? '🔊' : '🔇';
      soundLabel.textContent = isEnabled ? 'Sound On' : 'Muted';
      soundBtn.classList.toggle('active', isEnabled);
    });
  }

  // Sparkler Wand Mode Toggle
  const sparklerBtn = document.getElementById('sparkler-mode-btn');
  if (sparklerBtn) {
    sparklerBtn.addEventListener('click', () => {
      const active = sparkler.toggle();
      sparklerBtn.classList.toggle('active', active);
    });
  }

  // Customize Navigation Shortcut
  const customizeBtn = document.getElementById('customize-btn');
  if (customizeBtn) {
    customizeBtn.addEventListener('click', () => {
      const el = document.getElementById('customizer-hub');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    });
  }

  // ==================== 9. THE GRAND REVEAL (IGNITE DIYA) ====================
  const igniteBtn = document.getElementById('ignite-diya-btn');
  const introScreen = document.getElementById('intro-screen');
  const mainContent = document.getElementById('main-content');

  function triggerGrandCelebration() {
    sounds.init();
    sounds.playDiyaChime();
    sounds.playTempleBell();

    // Launch intense grand finale firework series
    for (let i = 0; i < 7; i++) {
      setTimeout(() => {
        fireworks.launchRocket(
          window.innerWidth * (0.15 + i * 0.12),
          window.innerHeight * (0.15 + Math.random() * 0.3)
        );
      }, i * 220);
    }

    // Dissolve intro
    setTimeout(() => {
      introScreen.classList.add('dissolve');
      mainContent.classList.remove('hidden');
      document.body.classList.remove('is-intro');

      // Update lit diya count
      const diyaCount = document.getElementById('diyas-lit-count');
      if (diyaCount) diyaCount.textContent = '101';
    }, 900);
  }

  if (igniteBtn) {
    igniteBtn.addEventListener('click', triggerGrandCelebration);
  }

  // Launch fireworks on direct background click
  window.addEventListener('click', (e) => {
    // If not clicking inside an interactive card or button
    if (!e.target.closest('button, input, select, textarea, a, .card-inner, .mithai-tray-card, .rangoli-studio-container')) {
      fireworks.launchRocket(e.clientX, e.clientY);
    }
  });

  // Dock Buttons
  const launchRocketBtn = document.getElementById('launch-sky-rocket');
  if (launchRocketBtn) {
    launchRocketBtn.addEventListener('click', () => {
      fireworks.launchRocket();
    });
  }

  const anarBtn = document.getElementById('light-anar-btn');
  if (anarBtn) {
    anarBtn.addEventListener('click', () => {
      fireworks.sparkAnar();
    });
  }

  const chakriBtn = document.getElementById('spin-chakri-btn');
  if (chakriBtn) {
    chakriBtn.addEventListener('click', () => {
      fireworks.spinChakri();
    });
  }

  const bellBtn = document.getElementById('play-temple-bell');
  if (bellBtn) {
    bellBtn.addEventListener('click', () => {
      sounds.playTempleBell();
    });
  }

  // Rangoli color picker
  const colorDots = document.querySelectorAll('.color-dot');
  colorDots.forEach(dot => {
    dot.addEventListener('click', () => {
      colorDots.forEach(d => d.classList.remove('active'));
      dot.classList.add('active');
      rangoli.currentColor = dot.dataset.color;
    });
  });

  const symmetrySelect = document.getElementById('rangoli-symmetry');
  if (symmetrySelect) {
    symmetrySelect.addEventListener('change', (e) => {
      rangoli.symmetry = parseInt(e.target.value, 10);
    });
  }

  const clearRangoliBtn = document.getElementById('clear-rangoli-btn');
  if (clearRangoliBtn) {
    clearRangoliBtn.addEventListener('click', () => rangoli.drawBackgroundGuide());
  }

  const presetRangoliBtn = document.getElementById('preset-rangoli-btn');
  if (presetRangoliBtn) {
    presetRangoliBtn.addEventListener('click', () => rangoli.drawMagicBlossom());
  }

  // Jump buttons
  const jumpRangoli = document.getElementById('jump-to-rangoli');
  if (jumpRangoli) {
    jumpRangoli.addEventListener('click', () => {
      document.getElementById('rangoli-studio').scrollIntoView({ behavior: 'smooth' });
    });
  }

  const jumpMithai = document.getElementById('jump-to-mithai');
  if (jumpMithai) {
    jumpMithai.addEventListener('click', () => {
      document.getElementById('mithai-hub').scrollIntoView({ behavior: 'smooth' });
    });
  }

  // Luxury Timeline CTA Button Actions
  const dhanterasCta = document.getElementById('cta-dhanteras-blessing');
  if (dhanterasCta) {
    dhanterasCta.addEventListener('click', () => {
      sounds.playTempleBell();
      sounds.playDiyaChime();
      fireworks.sparkAnar(window.innerWidth / 2, window.innerHeight - 50);
      alert("✨ Shubh Dhanteras! May Goddess Lakshmi bless your home with boundless prosperity, gold, and eternal happiness! 🪙🪔");
    });
  }

  const mahaAartiCta = document.getElementById('cta-open-maha-aarti');
  if (mahaAartiCta) {
    mahaAartiCta.addEventListener('click', () => {
      inviteSwitcher.switchInvite(2);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  const sparklerCta = document.getElementById('cta-sparkler-ignite');
  if (sparklerCta) {
    sparklerCta.addEventListener('click', () => {
      const active = sparkler.toggle(true);
      const sparklerBtn = document.getElementById('sparkler-mode-btn');
      if (sparklerBtn) sparklerBtn.classList.toggle('active', active);
      sounds.playSparklerCrackle();
      alert("✨ Virtual Phuljhadi Activated! Move your mouse or drag your finger across the screen to paint glowing fire trails! 🎆");
    });
  }

  // ==================== 10. 3 DIGITAL INVITES SWITCHER & MANAGERS ====================
  class InviteSwitcher {
    constructor() {
      this.menuTrigger = document.getElementById('invite-menu-trigger');
      this.menuPanel = document.getElementById('invite-dropdown-panel');
      this.bindEvents();
    }

    bindEvents() {
      // Toggle dropdown menu
      if (this.menuTrigger && this.menuPanel) {
        this.menuTrigger.addEventListener('click', (e) => {
          e.stopPropagation();
          const isHidden = this.menuPanel.classList.toggle('hidden');
          this.menuTrigger.setAttribute('aria-expanded', !isHidden ? 'true' : 'false');
        });

        // Close on outside click
        document.addEventListener('click', (e) => {
          if (!this.menuPanel.contains(e.target) && !this.menuTrigger.contains(e.target)) {
            this.menuPanel.classList.add('hidden');
            this.menuTrigger.setAttribute('aria-expanded', 'false');
          }
        });
      }
    }
  }

  const inviteSwitcher = new InviteSwitcher();

  // Royal RSVP Submission & Concierge Actions
  const confirmRsvpBtn = document.getElementById('confirm-rsvp-btn');
  if (confirmRsvpBtn) {
    confirmRsvpBtn.addEventListener('click', () => {
      const nameInput = document.getElementById('input-guest-name');
      const guestName = (nameInput && nameInput.value.trim()) || 'Lord & Lady Kapoor';
      const passName = document.getElementById('pass-guest-name');
      if (passName) passName.textContent = guestName;
      const confirmedPass = document.getElementById('rsvp-confirmed-pass');
      if (confirmedPass) confirmedPass.classList.remove('hidden');
      sounds.playTempleBell();
      sounds.playDiyaChime();
      fireworks.launchRocket();
      confirmedPass.scrollIntoView({ behavior: 'smooth' });
    });
  }

  const calBtn = document.getElementById('calendar-btn');
  if (calBtn) {
    calBtn.addEventListener('click', () => {
      alert("📅 Event added to your calendar: Royal Deepawali Gala • Kartik Amavasya • 7:00 PM at The Grand Palace!");
    });
  }

  const dirBtn = document.getElementById('directions-btn');
  if (dirBtn) {
    dirBtn.addEventListener('click', () => {
      alert("📍 Navigating to The Grand Heritage Palace, Umaid Gardens. Valet parking reserved for your vehicle.");
    });
  }

  const rooftopRsvp = document.getElementById('rsvp-rooftop-btn');
  if (rooftopRsvp) {
    rooftopRsvp.addEventListener('click', () => {
      sounds.playTempleBell();
      sounds.playDiyaChime();
      fireworks.launchRocket();
      const pass = document.getElementById('rooftop-confirmed-pass');
      if (pass) {
        pass.classList.remove('hidden');
        pass.scrollIntoView({ behavior: 'smooth' });
      } else {
        alert("🍸 VIP Terrace Access Pass Confirmed! We look forward to clinking saffron spritzers at Kabir & Ananya's Rooftop Soirée!");
      }
    });
  }

  const corpTableBtn = document.getElementById('reserve-corporate-table-btn');
  if (corpTableBtn) {
    corpTableBtn.addEventListener('click', () => {
      sounds.playTempleBell();
      sounds.playDiyaChime();
      fireworks.launchRocket();
      const pass = document.getElementById('corporate-confirmed-pass');
      if (pass) {
        pass.classList.remove('hidden');
        pass.scrollIntoView({ behavior: 'smooth' });
      } else {
        alert("💼 Executive VIP Table Reserved for Vertex Global Annual Deepawali Gala at The Grand Ballroom, Taj Palace.");
      }
    });
  }

  const reserveThaliBtn = document.getElementById('reserve-thali-btn');
  if (reserveThaliBtn) {
    reserveThaliBtn.addEventListener('click', () => {
      sounds.playTempleBell();
      sounds.playDiyaChime();
      alert("✨ Festive Mithai selection saved to your Royal Guest Thali! It will be served fresh at your reserved table. 🥮🪔");
    });
  }

  // ==================== 11. TEMPLATE 2: ROYAL MAHA AARTI MANAGER ====================
  class MahaAartiManager {
    constructor() {
      this.bells = document.querySelectorAll('.temple-bell-interactive');
      this.thali = document.getElementById('interactive-aarti-thali');
      this.grid = document.getElementById('diya-mandala-grid');
      this.litBadge = document.getElementById('diyas-lit-badge');
      this.igniteAllBtn = document.getElementById('ignite-all-diyas-btn');
      this.lotusBtn = document.getElementById('shower-lotus-btn');
      this.chimesBtn = document.getElementById('ring-temple-chimes-btn');
      this.diyasCount = 108;
      this.litCount = 12;
      this.init();
    }

    init() {
      this.renderDiyasGrid();
      this.bindEvents();
    }

    bindEvents() {
      // Bells
      this.bells.forEach(bell => {
        bell.addEventListener('click', () => {
          bell.classList.remove('ringing');
          void bell.offsetWidth; // force reflow
          bell.classList.add('ringing');
          sounds.playTempleBell();
        });
      });

      // Thali swirling
      if (this.thali) {
        this.thali.addEventListener('click', () => {
          this.thali.classList.toggle('swirling');
          sounds.playDiyaChime();
        });
      }

      // Ignite All 108
      if (this.igniteAllBtn) {
        this.igniteAllBtn.addEventListener('click', () => this.igniteAll());
      }

      // Lotus Shower
      if (this.lotusBtn) {
        this.lotusBtn.addEventListener('click', () => this.showerLotusPetals());
      }

      // Ring all chimes
      if (this.chimesBtn) {
        this.chimesBtn.addEventListener('click', () => {
          this.bells.forEach((b, i) => {
            setTimeout(() => {
              b.classList.remove('ringing');
              void b.offsetWidth;
              b.classList.add('ringing');
              sounds.playTempleBell();
            }, i * 150);
          });
        });
      }
    }

    renderDiyasGrid() {
      if (!this.grid) return;
      this.grid.innerHTML = '';
      for (let i = 1; i <= this.diyasCount; i++) {
        const diya = document.createElement('div');
        diya.className = 'micro-diya';
        diya.innerHTML = '🪔';
        diya.dataset.id = i;
        if (i <= this.litCount) diya.classList.add('lit');

        diya.addEventListener('click', () => {
          diya.classList.toggle('lit');
          sounds.playDiyaChime();
          this.updateCount();
        });

        this.grid.appendChild(diya);
      }
    }

    igniteAll() {
      const diyas = this.grid.querySelectorAll('.micro-diya');
      sounds.playDiyaChime();
      sounds.playTempleBell();
      diyas.forEach((d, idx) => {
        setTimeout(() => {
          d.classList.add('lit');
          if (idx % 12 === 0) sounds.playTempleBell();
          if (idx === diyas.length - 1) this.updateCount();
        }, idx * 18);
      });
    }

    updateCount() {
      const lit = this.grid.querySelectorAll('.micro-diya.lit').length;
      if (this.litBadge) this.litBadge.textContent = `${lit} / 108 Lit`;
    }

    showerLotusPetals() {
      const container = document.getElementById('petals-container');
      if (!container) return;
      for (let i = 0; i < 30; i++) {
        setTimeout(() => {
          const petal = document.createElement('div');
          petal.className = 'falling-petal';
          petal.style.background = 'radial-gradient(circle, #f472b6 20%, #db2777 90%)';
          petal.style.width = '20px';
          petal.style.height = '24px';
          petal.style.left = `${Math.random() * 100}vw`;
          petal.style.animationDuration = `${5 + Math.random() * 5}s`;
          container.appendChild(petal);
          setTimeout(() => petal.remove(), 10000);
        }, i * 60);
      }
      sounds.playDiyaChime();
    }
  }

  const aartiManager = new MahaAartiManager();

  // ==================== 12. TEMPLATE 3: MIDNIGHT NEON PATAKHA ====================
  class NeonPatakhaManager {
    constructor() {
      this.rapidBtn = document.getElementById('btn-rapid-barrage');
      this.anarBtn = document.getElementById('btn-twin-anar');
      this.chakriBtn = document.getElementById('btn-hyper-chakri');
      this.lightPaintBtn = document.getElementById('btn-light-paint-auto');
      this.canvas = document.getElementById('light-writing-canvas');
      this.ctx = this.canvas ? this.canvas.getContext('2d') : null;
      this.neonBurstCount = 0;
      this.bindEvents();
    }

    bindEvents() {
      if (this.rapidBtn) {
        this.rapidBtn.addEventListener('click', () => this.fireRapidBarrage());
      }
      if (this.anarBtn) {
        this.anarBtn.addEventListener('click', () => this.fireTwinAnars());
      }
      if (this.chakriBtn) {
        this.chakriBtn.addEventListener('click', () => this.fireHyperChakris());
      }
      if (this.lightPaintBtn) {
        this.lightPaintBtn.addEventListener('click', () => this.animateSparklerWriting());
      }

      // Interactive drag on light writing canvas
      if (this.canvas) {
        let isDrawing = false;
        const draw = (e) => {
          if (!isDrawing) return;
          const rect = this.canvas.getBoundingClientRect();
          const x = (e.clientX - rect.left) * (this.canvas.width / rect.width);
          const y = (e.clientY - rect.top) * (this.canvas.height / rect.height);
          this.ctx.beginPath();
          this.ctx.arc(x, y, 4, 0, Math.PI * 2);
          this.ctx.fillStyle = '#fbbf24';
          this.ctx.shadowBlur = 15;
          this.ctx.shadowColor = '#f59e0b';
          this.ctx.fill();
          if (Math.random() > 0.7) sounds.playSparklerCrackle();
        };

        this.canvas.addEventListener('mousedown', () => { isDrawing = true; });
        this.canvas.addEventListener('mousemove', draw);
        window.addEventListener('mouseup', () => { isDrawing = false; });
      }
    }

    fireRapidBarrage() {
      const colors = ['#ec4899', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ef4444'];
      for (let i = 0; i < 10; i++) {
        setTimeout(() => {
          const col = colors[i % colors.length];
          const x = window.innerWidth * (0.15 + (i / 10) * 0.7);
          const y = window.innerHeight * (0.15 + Math.random() * 0.3);
          fireworks.launchRocket(x, y, col);
          this.neonBurstCount++;
          const countEl = document.getElementById('neon-burst-count');
          if (countEl) countEl.textContent = `${this.neonBurstCount} 💥`;
        }, i * 200);
      }
    }

    fireTwinAnars() {
      fireworks.sparkAnar(100, window.innerHeight - 30);
      fireworks.sparkAnar(window.innerWidth - 100, window.innerHeight - 30);
      for (let i = 0; i < 6; i++) {
        setTimeout(() => {
          fireworks.sparkAnar(100, window.innerHeight - 30);
          fireworks.sparkAnar(window.innerWidth - 100, window.innerHeight - 30);
        }, i * 350);
      }
    }

    fireHyperChakris() {
      fireworks.spinChakri(window.innerWidth * 0.35, window.innerHeight * 0.6);
      fireworks.spinChakri(window.innerWidth * 0.65, window.innerHeight * 0.6);
    }

    animateSparklerWriting() {
      if (!this.ctx) return;
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      const text = "✨ SHUBH DIWALI 2026 ✨";
      this.ctx.font = 'bold 38px Georgia, serif';
      this.ctx.fillStyle = '#fbbf24';
      this.ctx.shadowBlur = 20;
      this.ctx.shadowColor = '#f59e0b';
      this.ctx.textAlign = 'center';
      
      let step = 0;
      const interval = setInterval(() => {
        step++;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fillText(text.slice(0, step), this.canvas.width / 2, this.canvas.height / 2 + 12);
        sounds.playSparklerCrackle();
        if (step >= text.length) {
          clearInterval(interval);
          this.fireRapidBarrage();
        }
      }, 90);
    }
  }

  const neonManager = new NeonPatakhaManager();

  // End of Main DOM Initialization
});

