// js/backgrounds/lipetsk.js
// ??? ?????? ????: ?? ???????? ????? ?????, ?????, ???????;
// ???? — ???????? ???????? ???????????? ??????????? ???????,
// ??????? ?????????? (????????? ???????? ???????);
// ??? ?????? — ??????? ????; ???? ? ?????? ???????, ??????????.
// ? ???? — ????????????? ???????, ??????? ????? ??????? ? ?????? ?? ???????.

export function drawSirius2(ctx, W, H, time = 0) {
  // ????????? ?????? ????:
  //   ???? ? ???????:     0%..30%
  //   ???? (???????):    30%..36%
  //   ?????? (????????): 36%..52%
  //   ?????/???????:     52%..100%
  const skyEnd   = H * 0.30;
  const seaEnd   = H * 0.36;
  const townEnd  = H * 0.52;

  // ============================================================
  //  1. ???? — ??????????, ?????? ?????
  // ============================================================
  const sky = ctx.createLinearGradient(0, 0, 0, skyEnd);
  sky.addColorStop(0,    '#1a2540');
  sky.addColorStop(0.4,  '#3a3455');
  sky.addColorStop(0.7,  '#7a4a55');
  sky.addColorStop(0.9,  '#c86a45');
  sky.addColorStop(1,    '#f0a060');
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, W, skyEnd);

  // ?????? — ?????, ? ????? ????? ????
  const sunX = W * 0.65;
  const sunY = skyEnd - H * 0.01;
  const sunR = Math.min(W, H) * 0.06;

  // ??????? ????
  const halo = ctx.createRadialGradient(sunX, sunY, 0, sunX, sunY, sunR * 6);
  halo.addColorStop(0,   'rgba(255,220,150,0.85)');
  halo.addColorStop(0.3, 'rgba(255,170,90,0.4)');
  halo.addColorStop(1,   'rgba(255,120,50,0)');
  ctx.fillStyle = halo;
  ctx.beginPath();
  ctx.arc(sunX, sunY, sunR * 6, 0, Math.PI * 2);
  ctx.fill();

  // ????
  ctx.fillStyle = '#ffd878';
  ctx.beginPath();
  ctx.arc(sunX, sunY, sunR, 0, Math.PI * 2);
  ctx.fill();

  // ???? ??????? — ??????, ?????????? ?????
  function cloud(cx, cy, w, alpha) {
    const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, w);
    g.addColorStop(0, `rgba(120,90,110,${alpha})`);
    g.addColorStop(1, 'rgba(120,90,110,0)');
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.ellipse(cx, cy, w, w * 0.22, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = `rgba(255,160,90,${alpha * 0.5})`;
    ctx.beginPath();
    ctx.ellipse(cx, cy + w * 0.10, w * 0.9, w * 0.08, 0, 0, Math.PI * 2);
    ctx.fill();
  }
  cloud(W * 0.15, H * 0.10, W * 0.10, 0.45);
  cloud(W * 0.45, H * 0.06, W * 0.13, 0.4);
  cloud(W * 0.85, H * 0.14, W * 0.09, 0.35);

  // ============================================================
  //  1b. ????????????? ??????? — ????? ????? ???????,
  //      ???????? ? ????????? (??????? ?? ???????)
  //  ????: ?????????? ????? ?? ??????, ??????? ?? ??????? ????,
  //  ????? ?????????? ?????. ?????? — 12 ??????.
  // ============================================================
  function drawLandingPlane(cx, cy, scale, angle) {
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(angle);

    // ????-?????
    ctx.fillStyle = 'rgba(0,0,0,0.18)';
    ctx.beginPath();
    ctx.ellipse(0, scale * 1.6, scale * 2.2, scale * 0.5, 0, 0, Math.PI * 2);
    ctx.fill();

    // ???????
    ctx.fillStyle = 'rgba(225,230,240,0.95)';
    ctx.beginPath();
    ctx.ellipse(0, 0, scale * 2.2, scale * 0.45, 0, 0, Math.PI * 2);
    ctx.fill();

    // ??? (??????? ??????, ?.?. ????? ????? ???????)
    ctx.beginPath();
    ctx.moveTo(scale * 2.2, 0);
    ctx.lineTo(scale * 2.8, -scale * 0.12);
    ctx.lineTo(scale * 2.8,  scale * 0.12);
    ctx.closePath();
    ctx.fill();

    // ?????
    ctx.beginPath();
    ctx.moveTo(-scale * 2.2, 0);
    ctx.lineTo(-scale * 2.9, -scale * 0.5);
    ctx.lineTo(-scale * 2.3, -scale * 0.15);
    ctx.closePath();
    ctx.fill();

    // ??????
    ctx.fillStyle = 'rgba(200,210,225,0.9)';
    ctx.beginPath();
    ctx.moveTo(scale * 0.4, 0);
    ctx.lineTo(-scale * 0.6, -scale * 1.8);
    ctx.lineTo(scale * 0.9, -scale * 0.15);
    ctx.closePath();
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(scale * 0.4, 0);
    ctx.lineTo(-scale * 0.6,  scale * 1.8);
    ctx.lineTo(scale * 0.9,  scale * 0.15);
    ctx.closePath();
    ctx.fill();

    // ????? ?? ????????
    ctx.strokeStyle = 'rgba(90,100,120,0.5)';
    ctx.lineWidth = Math.max(0.6, scale * 0.12);
    ctx.beginPath();
    ctx.moveTo(-scale * 2.0, 0);
    ctx.lineTo( scale * 2.4, 0);
    ctx.stroke();

    // ????????? ?????? — ????????
    const blink = 0.5 + 0.5 * Math.sin(time * 6);
    ctx.fillStyle = `rgba(255,80,60,${0.4 + blink * 0.6})`;
    ctx.beginPath();
    ctx.arc(-scale * 2.6, -scale * 0.35, scale * 0.18 * (0.8 + blink * 0.4), 0, Math.PI * 2);
    ctx.fill();

    // ??????? ??????
    ctx.fillStyle = 'rgba(255,255,220,0.95)';
    ctx.beginPath();
    ctx.arc(scale * 2.6, 0, scale * 0.14, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }

  // --- ????????? ???????? ---
  const planePeriod  = 12;   // ?????? ??????? ???????, ???
  const planeVisible = 0.85; // ???? ???????, ????? ??????? ?????

  const t = (time % planePeriod) / planePeriod;
  const active = t < planeVisible;
  const p = active ? t / planeVisible : 0; // 0..1 — ???????? ????

  // X: ????? ?? ?????? ? ?????? ?? ??????
  const planeX = -W * 0.15 + p * (W * 1.35);

  // Y: ??????? ???????? — ? ~0.10H ?? ~0.24H (? ?????????)
  const ease = p * p * (3 - 2 * p); // ease-in-out
  const planeY = H * 0.10 + ease * (H * 0.14);

  // ??????: ??? ?????? ????? ????, ?.?. ????? ?????? —
  // ?????? ????????????? (?? ???????). ???? ?????? ???????????.
  const wobble = Math.sin(time * 2.2) * 0.02;
  const planeAngle = 0.06 + ease * 0.18 + wobble;

  // ??????? — ???? ?????? ?? ???? «???????????» (?????? ? ????).
  const planeScale = Math.min(W, H) * (0.010 + ease * 0.004);

  if (active) {
    drawLandingPlane(planeX, planeY, planeScale, planeAngle);
  }

  // ============================================================
  //  2. ???? — ?????? ??????? ?? ?????????
  // ============================================================
  const sea = ctx.createLinearGradient(0, skyEnd, 0, seaEnd);
  sea.addColorStop(0,   '#6a5a7a');
  sea.addColorStop(0.4, '#4a4a72');
  sea.addColorStop(1,   '#2e3a5a');
  ctx.fillStyle = sea;
  ctx.fillRect(0, skyEnd, W, seaEnd - skyEnd);

  // ??????? ?? ?????? ?? ????
  const sunPath = ctx.createLinearGradient(sunX - W * 0.06, 0, sunX + W * 0.06, 0);
  sunPath.addColorStop(0,   'rgba(255,200,120,0)');
  sunPath.addColorStop(0.5, 'rgba(255,200,120,0.55)');
  sunPath.addColorStop(1,   'rgba(255,200,120,0)');
  ctx.fillStyle = sunPath;
  ctx.fillRect(sunX - W * 0.06, skyEnd, W * 0.12, seaEnd - skyEnd);

  // ?????
  ctx.strokeStyle = 'rgba(255,220,160,0.35)';
  ctx.lineWidth = 1;
  for (let i = 0; i < 6; i++) {
    const y = skyEnd + (i / 6) * (seaEnd - skyEnd);
    const len = 30 + (i % 3) * 20;
    ctx.beginPath();
    ctx.moveTo(sunX - len / 2, y);
    ctx.lineTo(sunX + len / 2, y);
    ctx.stroke();
  }

  // ============================================================
  //  3. ?????? — ???????? ???????? ???????????? ???????????
  // ============================================================
  const townTop    = seaEnd;
  const townHeight = townEnd - seaEnd;

  // ---- 3.1 ??? ???????? — ?????? ????? ?? ?????? ----
  const townBack = ctx.createLinearGradient(0, townTop, 0, townEnd);
  townBack.addColorStop(0,    '#3a3448');
  townBack.addColorStop(0.5,  '#2a2638');
  townBack.addColorStop(1,    '#1e1c2a');
  ctx.fillStyle = townBack;
  ctx.fillRect(0, townTop, W, townHeight);

  // ---- 3.2 ??????? ??? — ??????? ??????????? ----
  function distantBuilding(x, w, h, tone) {
    const top = townTop + townHeight * 0.55 - h;
    const g = ctx.createLinearGradient(0, top, 0, townTop + townHeight * 0.55);
    g.addColorStop(0, `rgba(${Math.round(70 + tone * 20)}, ${Math.round(66 + tone * 18)}, ${Math.round(88 + tone * 22)}, 1)`);
    g.addColorStop(1, `rgba(${Math.round(40 + tone * 15)}, ${Math.round(38 + tone * 12)}, ${Math.round(56 + tone * 16)}, 1)`);
    ctx.fillStyle = g;
    ctx.fillRect(x, top, w, h);

    ctx.fillStyle = `rgba(255,200,140,${0.15 + tone * 0.15})`;
    const cols = Math.max(2, Math.floor(w / 5));
    for (let i = 0; i < cols; i++) {
      const wx = x + (i + 0.5) * (w / cols);
      ctx.fillRect(wx - 0.6, top + h * 0.25, 1.2, 1.6);
      ctx.fillRect(wx - 0.6, top + h * 0.55, 1.2, 1.6);
    }
  }

  let dx = -W * 0.01;
  while (dx < W) {
    const w = W * (0.020 + ((Math.abs(Math.sin(dx * 0.13)) * 0.018)));
    const h = H * (0.030 + ((Math.abs(Math.cos(dx * 0.17)) * 0.025)));
    distantBuilding(dx, w, h, 0.4 + (Math.abs(Math.sin(dx * 0.07)) * 0.3));
    dx += w + W * 0.004;
  }

  // ---- 3.3 ???????? ???????? — ???????? ??? ???????????? ??????????? ----
  const facadeTopY    = townTop + townHeight * 0.10;
  const facadeBottomY = townTop + townHeight * 0.98;

  // ??????? ??????? ?????? ?????.
  const facadePalette = [
    { r: 205, g: 185, b: 165 }, // ?????? ???????
    { r: 185, g: 170, b: 150 }, // ????????
    { r: 170, g: 175, b: 180 }, // ????-???????
    { r: 150, g: 145, b: 160 }, // ??????????-?????
    { r: 195, g: 160, b: 140 }, // ????????????
    { r: 165, g: 160, b: 140 }, // ????????-???????
    { r: 200, g: 175, b: 175 }, // ????????-?????
    { r: 140, g: 150, b: 165 }, // ???????? ????-?????
    { r: 180, g: 140, b: 120 }, // ????????-???????
    { r: 160, g: 170, b: 150 }, // ??????????-?????
    { r: 190, g: 195, b: 200 }, // ??????-?????
    { r: 175, g: 155, b: 175 }, // ??????-???????
  ];

  // ????????????????? «??????» — ????? ???? ?? ?????? ??? ???????????.
  function rand01(seed) {
    const x = Math.sin(seed * 12.9898 + 78.233) * 43758.5453;
    return x - Math.floor(x);
  }

  let bx = -W * 0.005;
  let idx = 0;
  while (bx < W) {
    const bw = W * (0.024 + rand01(idx * 1.7) * 0.016);
    const bh = townHeight * (0.55 + rand01(idx * 2.3) * 0.30);

    const bTop    = facadeBottomY - bh;
    const bBottom = facadeBottomY;

    // ????????? ??????? ???? ???? ?? ???????
    const col = facadePalette[Math.floor(rand01(idx * 3.1) * facadePalette.length) % facadePalette.length];

    // ?????? ???????? ???????
    const brightK = 0.85 + rand01(idx * 4.7) * 0.30;

    // ???????? ??????: ?????? ??????? (?????), ????? ?????? (????)
    const topR = Math.min(255, Math.round(col.r * brightK + 40));
    const topG = Math.min(255, Math.round(col.g * brightK + 30));
    const topB = Math.min(255, Math.round(col.b * brightK + 20));

    const midR = Math.round(col.r * brightK);
    const midG = Math.round(col.g * brightK);
    const midB = Math.round(col.b * brightK);

    const botR = Math.round(col.r * brightK * 0.45);
    const botG = Math.round(col.g * brightK * 0.45);
    const botB = Math.round(col.b * brightK * 0.50);

    const facG = ctx.createLinearGradient(0, bTop, 0, bBottom);
    facG.addColorStop(0,    `rgb(${topR}, ${topG}, ${topB})`);
    facG.addColorStop(0.45, `rgb(${midR}, ${midG}, ${midB})`);
    facG.addColorStop(1,    `rgb(${botR}, ${botG}, ${botB})`);

    ctx.fillStyle = facG;
    ctx.fillRect(bx, bTop, bw, bh);

    // ?????? ?????? «???» ????? ??????
    ctx.strokeStyle = 'rgba(30,28,36,0.55)';
    ctx.lineWidth = 0.8;
    ctx.beginPath();
    ctx.moveTo(bx, bTop);
    ctx.lineTo(bx, bBottom);
    ctx.stroke();

    // ??????? ?????? ?????
    ctx.fillStyle = 'rgba(40,38,46,0.9)';
    ctx.fillRect(bx, bTop - Math.max(1, H * 0.003), bw, Math.max(1, H * 0.003));

    // ---- ???? ----
    const floors = Math.max(3, Math.floor(bh / (H * 0.012)));
    const cols   = Math.max(2, Math.floor(bw / (W * 0.006)));
    for (let f = 0; f < floors; f++) {
      const fy = bTop + (f + 0.5) * (bh / floors);
      const lightK = 1 - f / floors;

      for (let c = 0; c < cols; c++) {
        const fx = bx + (c + 0.5) * (bw / cols);

        const lit = rand01(idx * 5.3 + f * 7 + c * 13) < 0.55;
        if (lit) {
          ctx.fillStyle = `rgba(255,${Math.round(190 + lightK * 40)},${Math.round(120 + lightK * 40)},${0.55 + lightK * 0.4})`;
        } else {
          ctx.fillStyle = `rgba(40,42,55,${0.5 + (1 - lightK) * 0.3})`;
        }
        ctx.fillRect(fx - 0.8, fy - 1, 1.6, 2);
      }
    }

    bx += bw;
    idx++;
  }

  // ---- 3.4 ?????? ????????? ?? ?????? ?? ????? ???????? ----
  const sunWash = ctx.createLinearGradient(0, facadeTopY, 0, facadeTopY + townHeight * 0.35);
  sunWash.addColorStop(0, 'rgba(255,200,140,0.22)');
  sunWash.addColorStop(1, 'rgba(255,200,140,0)');
  ctx.fillStyle = sunWash;
  ctx.fillRect(0, facadeTopY, W, townHeight * 0.35);

  // ---- 3.5 ??????????? ??????? ----
  function olympicStadium(cx, cy, w, h) {
    ctx.fillStyle = 'rgba(215,220,230,0.95)';
    ctx.beginPath();
    ctx.ellipse(cx, cy, w * 0.5, h * 0.5, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = 'rgba(60,65,80,0.85)';
    ctx.lineWidth = 1.4;
    ctx.beginPath();
    ctx.ellipse(cx, cy, w * 0.5, h * 0.5, 0, 0, Math.PI * 2);
    ctx.stroke();

    ctx.fillStyle = 'rgba(95,140,95,0.9)';
    ctx.beginPath();
    ctx.ellipse(cx, cy, w * 0.30, h * 0.28, 0, 0, Math.PI * 2);
    ctx.fill();

    for (let i = 0; i < 8; i++) {
      const a = (i / 8) * Math.PI * 2;
      const px = cx + Math.cos(a) * w * 0.5;
      const py = cy + Math.sin(a) * h * 0.5;
      ctx.fillStyle = 'rgba(255,200,120,0.95)';
      ctx.beginPath();
      ctx.arc(px, py, 1.4, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function olympicArena(cx, cy, w, h) {
    const g = ctx.createLinearGradient(0, cy - h / 2, 0, cy + h / 2);
    g.addColorStop(0, 'rgba(235,238,245,0.98)');
    g.addColorStop(1, 'rgba(150,155,170,0.95)');
    ctx.fillStyle = g;
    ctx.fillRect(cx - w / 2, cy - h / 2, w, h);

    ctx.strokeStyle = 'rgba(60,65,80,0.85)';
    ctx.lineWidth = 1.2;
    ctx.strokeRect(cx - w / 2, cy - h / 2, w, h);

    ctx.fillStyle = 'rgba(255,210,140,0.65)';
    const cols = Math.max(3, Math.floor(w / 6));
    for (let i = 0; i < cols; i++) {
      const wx = cx - w / 2 + (i + 0.5) * (w / cols);
      ctx.fillRect(wx - 0.8, cy - h * 0.30, 1.6, h * 0.60);
    }
  }

  function skiJump(cx, cy, w, h) {
    ctx.fillStyle = 'rgba(130,135,145,0.95)';
    ctx.fillRect(cx - w * 0.05, cy - h * 0.5, w * 0.10, h);

    ctx.strokeStyle = 'rgba(230,235,245,0.98)';
    ctx.lineWidth = Math.max(1.5, w * 0.08);
    ctx.beginPath();
    ctx.moveTo(cx + w * 0.45, cy + h * 0.35);
    ctx.lineTo(cx - w * 0.45, cy - h * 0.45);
    ctx.stroke();

    ctx.fillStyle = 'rgba(240,245,255,1)';
    ctx.fillRect(cx - w * 0.55, cy - h * 0.55, w * 0.22, 2);
  }

  // ---- 3.6 ????? ??? ??????? ----
  const haze = ctx.createLinearGradient(0, townTop, 0, townEnd);
  haze.addColorStop(0, 'rgba(180,150,180,0.14)');
  haze.addColorStop(1, 'rgba(180,150,180,0)');
  ctx.fillStyle = haze;
  ctx.fillRect(0, townTop, W, townHeight);

  // ============================================================
  //  4. ???????? ???? — ?????, ?????, ???????
  // ============================================================

  const lawn = ctx.createLinearGradient(0, townEnd, 0, H);
  lawn.addColorStop(0,   '#2a3a24');
  lawn.addColorStop(0.3, '#1e3020');
  lawn.addColorStop(0.7, '#142418');
  lawn.addColorStop(1,   '#0a140c');
  ctx.fillStyle = lawn;
  ctx.fillRect(0, townEnd, W, H - townEnd);

  function drawGrassTuft(cx, baseY, h, density, tone) {
    ctx.lineCap = 'round';

    for (let i = 0; i < density; i++) {
      const dx = (i - density / 2) * (h * 0.06);
      const lean = Math.sin(i * 2.3) * h * 0.12;
      const heightK = 0.7 + ((i * 7) % 5) * 0.08;
      const topX = cx + dx + lean;
      const topY = baseY - h * heightK;

      const r = Math.round(20 + tone * 20);
      const g = Math.round(45 + tone * 35);
      const b = Math.round(20 + tone * 20);
      ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${0.7 + tone * 0.25})`;
      ctx.lineWidth = 0.8 + tone * 0.9;

      ctx.beginPath();
      ctx.moveTo(cx + dx, baseY);
      ctx.quadraticCurveTo(cx + dx + lean * 0.3, baseY - h * heightK * 0.5, topX, topY);
      ctx.stroke();
    }
  }

  const grassRows = [
    [0.56, 0.025, 0.040, 22],
    [0.63, 0.035, 0.055, 16],
    [0.72, 0.050, 0.075, 11],
    [0.83, 0.070, 0.100, 7],
    [0.95, 0.095, 0.135, 4],
  ];

  grassRows.forEach(([yPct, hMinPct, hMaxPct, count], rowIdx) => {
    for (let i = 0; i < count; i++) {
      const r1 = ((i * 7919 + rowIdx * 2137) % 1000) / 1000;
      const r2 = ((i * 4567 + rowIdx * 4127) % 1000) / 1000;

      const x = (i + 0.5) / count * W + (r1 - 0.5) * (W / count) * 0.9;
      const y = H * yPct + (r2 - 0.5) * H * 0.015;
      const h = H * (hMinPct + r2 * (hMaxPct - hMinPct));
      const tone = 0.35 + rowIdx * 0.15;
      const density = Math.round(5 + (1 - rowIdx / grassRows.length) * 5);

      drawGrassTuft(x, y, h, density, tone);
    }
  });

  function bush(cx, cy, r, tone) {
    ctx.fillStyle = `rgba(${Math.round(15 + tone * 15)}, ${Math.round(35 + tone * 25)}, ${Math.round(15 + tone * 15)}, 0.95)`;
    ctx.beginPath();
    ctx.ellipse(cx, cy, r, r * 0.75, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = `rgba(${Math.round(50 + tone * 25)}, ${Math.round(85 + tone * 30)}, ${Math.round(45 + tone * 20)}, 0.35)`;
    ctx.beginPath();
    ctx.ellipse(cx - r * 0.25, cy - r * 0.35, r * 0.55, r * 0.35, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = 'rgba(0,0,0,0.35)';
    ctx.beginPath();
    ctx.ellipse(cx + r * 0.15, cy + r * 0.6, r * 0.9, r * 0.3, 0, 0, Math.PI * 2);
    ctx.fill();
  }

  bush(W * 0.15, H * 0.72, W * 0.035, 0.4);
  bush(W * 0.80, H * 0.75, W * 0.045, 0.5);
  bush(W * 0.42, H * 0.85, W * 0.055, 0.7);
  bush(W * 0.66, H * 0.92, W * 0.070, 0.9);
  bush(W * 0.10, H * 0.96, W * 0.080, 0.95);

  function treeFromAbove(cx, baseY, r, tone) {
    ctx.fillStyle = 'rgba(0,0,0,0.5)';
    ctx.beginPath();
    ctx.ellipse(cx + r * 0.2, baseY + r * 0.55, r * 0.95, r * 0.35, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = `rgba(${Math.round(30 + tone * 20)}, ${Math.round(20 + tone * 15)}, ${Math.round(12 + tone * 10)}, 1)`;
    ctx.beginPath();
    ctx.ellipse(cx, baseY, r * 0.18, r * 0.10, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = `rgba(${Math.round(10 + tone * 15)}, ${Math.round(28 + tone * 22)}, ${Math.round(12 + tone * 10)}, 1)`;
    ctx.beginPath();
    const petals = 7;
    for (let i = 0; i <= petals; i++) {
      const a = (i / petals) * Math.PI * 2;
      const rr = r * (0.85 + Math.sin(i * 1.7) * 0.15);
      const px = cx + Math.cos(a) * rr;
      const py = baseY - r * 0.4 + Math.sin(a) * rr * 0.85;
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = `rgba(${Math.round(60 + tone * 30)}, ${Math.round(90 + tone * 35)}, ${Math.round(55 + tone * 25)}, 0.35)`;
    ctx.beginPath();
    ctx.ellipse(cx - r * 0.25, baseY - r * 0.75, r * 0.45, r * 0.30, -0.4, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = 'rgba(0,0,0,0.4)';
    ctx.beginPath();
    ctx.arc(cx + r * 0.1, baseY - r * 0.3, r * 0.18, 0, Math.PI * 2);
    ctx.fill();
  }

  treeFromAbove(W * 0.08, H * 0.68, W * 0.055, 0.4);
  treeFromAbove(W * 0.92, H * 0.70, W * 0.060, 0.45);
  treeFromAbove(W * 0.25, H * 0.82, W * 0.075, 0.65);
  treeFromAbove(W * 0.75, H * 0.86, W * 0.085, 0.7);
  treeFromAbove(W * 0.50, H * 0.97, W * 0.110, 0.9);

  const vig = ctx.createLinearGradient(0, H * 0.88, 0, H);
  vig.addColorStop(0, 'rgba(0,0,0,0)');
  vig.addColorStop(1, 'rgba(0,0,0,0.6)');
  ctx.fillStyle = vig;
  ctx.fillRect(0, H * 0.88, W, H * 0.12);
}