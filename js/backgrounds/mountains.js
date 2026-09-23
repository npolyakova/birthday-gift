// js/backgrounds/mountains.js
// ?????? ???? ? ????? ? ????????.

function star(ctx, x, y, r, alpha) {
  ctx.fillStyle = `rgba(255,255,255,${alpha})`;
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fill();
}

export function drawMountains(ctx, W, H) {
  // ????
  const sky = ctx.createLinearGradient(0, 0, 0, H * 0.7);
  sky.addColorStop(0,    '#0a0e1f');
  sky.addColorStop(0.5,  '#1a2340');
  sky.addColorStop(1,    '#3a4a6a');
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, W, H);

  // ????
  ctx.fillStyle = 'rgba(230,235,255,0.95)';
  ctx.beginPath();
  ctx.arc(W * 0.78, H * 0.18, Math.min(W, H) * 0.06, 0, Math.PI * 2);
  ctx.fill();

  // ????? ????
  const moonGlow = ctx.createRadialGradient(
    W * 0.78, H * 0.18, Math.min(W, H) * 0.06,
    W * 0.78, H * 0.18, Math.min(W, H) * 0.22,
  );
  moonGlow.addColorStop(0, 'rgba(200,220,255,0.35)');
  moonGlow.addColorStop(1, 'rgba(200,220,255,0)');
  ctx.fillStyle = moonGlow;
  ctx.beginPath();
  ctx.arc(W * 0.78, H * 0.18, Math.min(W, H) * 0.22, 0, Math.PI * 2);
  ctx.fill();

  // ?????? (????????????????, ????? ?? ??????? ??? ???????????)
  for (let i = 0; i < 120; i++) {
    const x = (i * 79.13) % W;
    const y = (i * 41.77) % (H * 0.55);
    const r = 0.4 + (i % 4) * 0.35;
    const a = 0.3 + (i % 7) * 0.1;
    star(ctx, x, y, r, a);
  }

  // ??????? ???? (???????)
  function mountain(baseY, color, peaks) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(0, H);
    ctx.lineTo(0, baseY);
    peaks.forEach(p => ctx.lineTo(p[0] * W, p[1]));
    ctx.lineTo(W, baseY);
    ctx.lineTo(W, H);
    ctx.closePath();
    ctx.fill();
  }

  mountain(H * 0.62, '#2a3450', [
    [0.10, H * 0.45], [0.22, H * 0.52], [0.35, H * 0.38],
    [0.48, H * 0.50], [0.62, H * 0.40], [0.78, H * 0.48],
    [0.92, H * 0.42],
  ]);

  mountain(H * 0.72, '#1a2238', [
    [0.05, H * 0.58], [0.18, H * 0.62], [0.30, H * 0.52],
    [0.45, H * 0.60], [0.58, H * 0.50], [0.72, H * 0.58],
    [0.88, H * 0.54], [0.98, H * 0.60],
  ]);

  mountain(H * 0.86, '#0a0e1f', [
    [0.08, H * 0.72], [0.25, H * 0.78], [0.40, H * 0.70],
    [0.55, H * 0.76], [0.70, H * 0.68], [0.85, H * 0.74],
  ]);
}