// js/fire.js
import { ctx, W, H, scene } from './scene.js';

const particles = [];
const sparks = [];
const smoke = [];

function spawnFlame() {
  const { cx, fireY, scale } = scene();
  particles.push({
    x: cx + (Math.random() - 0.5) * 90 * scale,
    y: fireY + Math.random() * 10,
    vx: (Math.random() - 0.5) * 0.6,
    vy: -1.5 - Math.random() * 2.2,
    life: 1,
    decay: 0.012 + Math.random() * 0.015,
    size: (8 + Math.random() * 18) * scale,
    hue: 15 + Math.random() * 35,
  });
}

function spawnSpark() {
  const { cx, fireY, scale } = scene();
  sparks.push({
    x: cx + (Math.random() - 0.5) * 60 * scale,
    y: fireY,
    vx: (Math.random() - 0.5) * 1.5,
    vy: -2 - Math.random() * 3,
    life: 1,
    decay: 0.008 + Math.random() * 0.01,
    size: (1 + Math.random() * 2) * scale,
  });
}

function spawnSmoke() {
  const { cx, fireY, scale } = scene();
  smoke.push({
    x: cx + (Math.random() - 0.5) * 50 * scale,
    y: fireY - 60 * scale,
    vx: (Math.random() - 0.5) * 0.4,
    vy: -0.7 - Math.random() * 0.8,
    life: 1,
    decay: 0.006 + Math.random() * 0.006,
    size: (14 + Math.random() * 26) * scale,
    drift: (Math.random() - 0.5) * 0.02,
  });
}

export function drawFire() {
  const { cx, fireY, scale } = scene();

  ctx.save();
  ctx.translate(cx, fireY);
  const logs = [
    { angle: -0.15, len: 160 * scale, w: 22 * scale, color: '#3a2418' },
    { angle:  0.15, len: 160 * scale, w: 22 * scale, color: '#2e1c12' },
    { angle: -0.9,  len: 130 * scale, w: 18 * scale, color: '#33200f' },
    { angle:  0.9,  len: 130 * scale, w: 18 * scale, color: '#3a2418' },
  ];
  logs.forEach(l => {
    ctx.save();
    ctx.rotate(l.angle);
    ctx.fillStyle = l.color;
    ctx.beginPath();
    ctx.roundRect(-l.len / 2, -l.w / 2, l.len, l.w, 6 * scale);
    ctx.fill();
    ctx.fillStyle = 'rgba(255, 120, 20, 0.35)';
    ctx.beginPath();
    ctx.roundRect(-l.len / 2, -l.w / 2, l.len, l.w * 0.4, 6 * scale);
    ctx.fill();
    ctx.restore();
  });
  ctx.restore();

  const glow = ctx.createRadialGradient(cx, fireY, 5, cx, fireY, 140 * scale);
  glow.addColorStop(0, 'rgba(255, 150, 40, 0.55)');
  glow.addColorStop(0.5, 'rgba(255, 80, 10, 0.25)');
  glow.addColorStop(1, 'rgba(255, 50, 0, 0)');
  ctx.fillStyle = glow;
  ctx.beginPath();
  ctx.arc(cx, fireY, 140 * scale, 0, Math.PI * 2);
  ctx.fill();
}

export function drawAmbientGlow() {
  const { cx, fireY } = scene();
  const pulse = 1 + Math.sin(Date.now() * 0.005) * 0.05 + Math.random() * 0.03;
  const g = ctx.createRadialGradient(cx, fireY - H * 0.05, 20, cx, fireY - H * 0.05, 420 * pulse);
  g.addColorStop(0, 'rgba(255, 140, 30, 0.28)');
  g.addColorStop(0.4, 'rgba(255, 70, 10, 0.12)');
  g.addColorStop(1, 'rgba(255, 30, 0, 0)');
  ctx.fillStyle = g;
  ctx.beginPath();
  ctx.arc(cx, fireY - H * 0.05, 420 * pulse, 0, Math.PI * 2);
  ctx.fill();
}

export function drawParticles() {
  for (let i = smoke.length - 1; i >= 0; i--) {
    const s = smoke[i];
    s.x += s.vx + s.drift * (1 - s.life);
    s.y += s.vy;
    s.vy *= 0.995;
    s.size += 0.4;
    s.life -= s.decay;
    if (s.life <= 0) { smoke.splice(i, 1); continue; }
    ctx.globalAlpha = s.life * 0.10;
    ctx.fillStyle = '#555';
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = 1;

  ctx.globalCompositeOperation = 'lighter';
  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i];
    p.x += p.vx; p.y += p.vy;
    p.vy *= 0.985;
    p.vx += (Math.random() - 0.5) * 0.15;
    p.life -= p.decay;
    p.size *= 0.995;
    if (p.life <= 0) { particles.splice(i, 1); continue; }
    const alpha = p.life * 0.9;
    const size = p.size * (0.6 + p.life * 0.7);
    const hue = p.hue + (1 - p.life) * 20;
    const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, size);
    g.addColorStop(0, `hsla(${hue}, 100%, 70%, ${alpha})`);
    g.addColorStop(0.4, `hsla(${hue - 10}, 100%, 55%, ${alpha * 0.7})`);
    g.addColorStop(1, `hsla(${hue - 20}, 100%, 40%, 0)`);
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
    ctx.fill();
  }

  for (let i = sparks.length - 1; i >= 0; i--) {
    const s = sparks[i];
    s.x += s.vx; s.y += s.vy;
    s.vy += 0.03;
    s.vx += (Math.random() - 0.5) * 0.1;
    s.life -= s.decay;
    if (s.life <= 0 || s.y > H * 0.85) { sparks.splice(i, 1); continue; }
    ctx.fillStyle = `hsla(${40 + Math.random() * 20}, 100%, ${60 + s.life * 30}%, ${s.life})`;
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalCompositeOperation = 'source-over';
}

export function tickFire() {
  for (let i = 0; i < 6; i++) spawnFlame();
  if (Math.random() < 0.5) spawnSpark();
  if (Math.random() < 0.06) spawnSmoke();
}

// ---- ??????-???????? ----
export function drawBenchLog(percent, x) {
  const { cx, logY, logH } = scene();
  const len = Math.min(W * percent, 1500);
  const x0 = x;

  const grd = ctx.createLinearGradient(0, logY - logH, 0, logY + logH);
  grd.addColorStop(0, '#4a2e1a');
  grd.addColorStop(0.5, '#2e1a0e');
  grd.addColorStop(1, '#1a0e06');
  ctx.fillStyle = grd;
  ctx.beginPath();
  ctx.roundRect(x0, logY - logH / 2, len, logH, logH / 2);
  ctx.fill();

  ctx.strokeStyle = 'rgba(0,0,0,0.35)';
  ctx.lineWidth = 1;
  for (let i = 0; i < 40; i++) {
    const xr = x0 + Math.random() * len;
    ctx.beginPath();
    ctx.moveTo(xr, logY - logH / 2);
    ctx.lineTo(xr + (Math.random() - 0.5) * 20, logY + logH / 2);
    ctx.stroke();
  }

  const glow = ctx.createRadialGradient(cx, logY, 10, cx, logY, len * 0.6);
  glow.addColorStop(0, 'rgba(255, 120, 30, 0.35)');
  glow.addColorStop(1, 'rgba(255, 60, 0, 0)');
  ctx.fillStyle = glow;
  ctx.beginPath();
  ctx.roundRect(x0, logY - logH / 2, len, logH, logH / 2);
  ctx.fill();
}