// js/backgrounds/nizhniy.js
// ??????? ??????? ?????????: ??????? ?????, ?????, ???????? ?????
// ? ????????, ?????? ? ??????? ?????????? ????????.

export function drawNizhniy(ctx, W, H) {
  // ?????????:
  //   ????:    0%..50%
  //   ????:   50%..60%   (10%)
  //   ?????:  60%..100%  (40%)
  const skyEnd    = H * 0.50;
  const riverEnd  = H * 0.60;

  // ============================================================
  //  1. ???? — ????????, ????-??????????
  // ============================================================
  const sky = ctx.createLinearGradient(0, 0, 0, skyEnd);
  sky.addColorStop(0,    '#0a1024');
  sky.addColorStop(0.4,  '#1a2040');
  sky.addColorStop(0.7,  '#3a3050');
  sky.addColorStop(1,    '#5a4050');
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, W, skyEnd);

  // ????
  const moonX = W * 0.78;
  const moonY = skyEnd * 0.30;
  const moonR = Math.min(W, H) * 0.025;

  const halo = ctx.createRadialGradient(moonX, moonY, 0, moonX, moonY, moonR * 8);
  halo.addColorStop(0,   'rgba(200,215,255,0.3)');
  halo.addColorStop(0.4, 'rgba(160,180,240,0.1)');
  halo.addColorStop(1,   'rgba(100,120,200,0)');
  ctx.fillStyle = halo;
  ctx.beginPath();
  ctx.arc(moonX, moonY, moonR * 8, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#e8eeff';
  ctx.beginPath();
  ctx.arc(moonX, moonY, moonR, 0, Math.PI * 2);
  ctx.fill();

    // ============================================================
  //  2. ???????? ?????? ?????? ????????
  //  ?????????? ??????? ?????? ??? ???????????:
  //  ?????? ?? ???? ? ???? ? ????? ? ?????????? ? ???? ? ???????
  // ============================================================
  const baseY = skyEnd + H * 0.005;
  const dark  = '#0a0e1a';

  // ?????? ?????? ? ????????-?????, ????? ????? ???????? ??? ? ????
  const panoCanvas = document.createElement('canvas');
  panoCanvas.width = W;
  panoCanvas.height = Math.round(H);
  const pctx = panoCanvas.getContext('2d');

  // ??? ??????????????? ??????? ???????? ? pctx (????? ????????)
  function silhouettePath() {
    pctx.fillStyle = dark;

    // ---- 1. ???? ? ??????? (?????) ----
    const hillPlateauL = W * 0.05;
    const hillPlateauR = W * 0.24;
    const hillTopY     = baseY - H * 0.10;

    // ???? ????
    pctx.beginPath();
    pctx.moveTo(0, baseY);
    pctx.quadraticCurveTo(W * 0.02, baseY - H * 0.02, hillPlateauL, hillTopY);
    pctx.lineTo(hillPlateauR, hillTopY);
    pctx.quadraticCurveTo(W * 0.26, baseY - H * 0.04, W * 0.30, baseY);
    pctx.closePath();
    pctx.fill();

    // ????? ?????? — ???????? ????? ?? ???????? ????
    const wallL = W * 0.06;
    const wallR = W * 0.23;
    const wallH = H * 0.030;
    pctx.fillRect(wallL, hillTopY - wallH, wallR - wallL, wallH);
    const merlonW = (wallR - wallL) / 12;
    for (let i = 0; i < 12; i += 2) {
      pctx.fillRect(wallL + i * merlonW, hillTopY - wallH - wallH * 0.25, merlonW, wallH * 0.25);
    }

    // 4 ????? ? ??????? — ?????? ?? ??????
    const towers = [
      { x: W * 0.07,  w: W * 0.018, h: H * 0.055 },
      { x: W * 0.115, w: W * 0.026, h: H * 0.095 }, // ???????????? — ???????
      { x: W * 0.165, w: W * 0.020, h: H * 0.070 },
      { x: W * 0.215, w: W * 0.016, h: H * 0.055 },
    ];
    towers.forEach(({ x, w, h }) => {
      pctx.fillRect(x - w / 2, hillTopY - h, w, h);
      // ?????
      pctx.beginPath();
      pctx.moveTo(x - w * 0.7, hillTopY - h);
      pctx.lineTo(x, hillTopY - h - h * 0.55);
      pctx.lineTo(x + w * 0.7, hillTopY - h);
      pctx.closePath();
      pctx.fill();
    });

    // ---- 2. ???? ????? ??????? ? ??????? ----
    // ?????????: ????????? ????????????? ?????? ?????? ??????.
    const houses1 = [
      { x: W * 0.30, w: W * 0.035, h: H * 0.055 },
      { x: W * 0.34, w: W * 0.028, h: H * 0.070 },
      { x: W * 0.37, w: W * 0.038, h: H * 0.050 },
      { x: W * 0.41, w: W * 0.030, h: H * 0.075 },
      { x: W * 0.44, w: W * 0.032, h: H * 0.060 },
    ];
    houses1.forEach(({ x, w, h }) => {
      pctx.fillRect(x, baseY - h, w, h);
    });

    // ---- 3. ????? (?????) ----
    // ??????? ?????, 5 ?????????? ???? — ??????????? ??????,
    // ?????? ????? ?? ?????. ?????????, ??? ????.
    const cX = W * 0.52;
    const cW = W * 0.09;
    const cH = H * 0.11;

    // ???????? ?????
    pctx.fillRect(cX - cW / 2, baseY - cH, cW, cH);
    // ??????? ?? ?????
    pctx.fillRect(cX - cW * 0.75, baseY - cH * 0.7, cW * 0.25, cH * 0.7);
    pctx.fillRect(cX + cW * 0.5,  baseY - cH * 0.7, cW * 0.25, cH * 0.7);

    // ????????????? «?????????? ?????» ??? ??????
    function dome(cx, bottomY, r, h) {
      pctx.fillStyle = dark;
      // ???????
      pctx.fillRect(cx - r * 0.7, bottomY - h * 0.3, r * 1.4, h * 0.3);
      // ????????
      pctx.beginPath();
      pctx.moveTo(cx - r, bottomY - h * 0.3);
      pctx.bezierCurveTo(
        cx - r * 1.5, bottomY - h * 0.8,
        cx - r * 0.5, bottomY - h * 1.1,
        cx,           bottomY - h * 1.3,
      );
      pctx.bezierCurveTo(
        cx + r * 0.5, bottomY - h * 1.1,
        cx + r * 1.5, bottomY - h * 0.8,
        cx + r,       bottomY - h * 0.3,
      );
      pctx.closePath();
      pctx.fill();
      // ?????
      pctx.strokeStyle = dark;
      pctx.lineWidth = Math.max(1.5, r * 0.18);
      const cyc = bottomY - h * 1.3;
      pctx.beginPath();
      pctx.moveTo(cx, cyc);
      pctx.lineTo(cx, cyc - r * 1.4);
      pctx.moveTo(cx - r * 0.55, cyc - r * 1.0);
      pctx.lineTo(cx + r * 0.55, cyc - r * 1.0);
      pctx.stroke();
    }

    // ??????????? ?????
    const cDrumH = H * 0.05;
    pctx.fillRect(cX - cW * 0.15, baseY - cH - cDrumH, cW * 0.3, cDrumH);
    dome(cX, baseY - cH - cDrumH, W * 0.014, H * 0.045);

    // ?????? ????? ?????
    const smallDomes = [
      { x: cX - cW * 0.45, y: baseY - cH * 0.95, r: W * 0.009, h: H * 0.030 },
      { x: cX + cW * 0.45, y: baseY - cH * 0.95, r: W * 0.009, h: H * 0.030 },
      { x: cX - cW * 0.28, y: baseY - cH * 1.10, r: W * 0.008, h: H * 0.026 },
      { x: cX + cW * 0.28, y: baseY - cH * 1.10, r: W * 0.008, h: H * 0.026 },
    ];
    smallDomes.forEach(({ x, y, r, h }) => {
      // ?????? ???????
      pctx.fillRect(x - r * 0.6, y - h * 0.3, r * 1.2, h * 0.3);
      dome(x, y, r, h);
    });

    // ---- 4. ???? ????? ??????? ? ???????? ----
    const houses2 = [
      { x: W * 0.575, w: W * 0.030, h: H * 0.065 },
      { x: W * 0.610, w: W * 0.035, h: H * 0.050 },
      { x: W * 0.650, w: W * 0.028, h: H * 0.070 },
    ];
    houses2.forEach(({ x, w, h }) => {
      pctx.fillRect(x, baseY - h, w, h);
    });

    // ---- 5. ??????? (??????) ----
    // ??????? ????????? ??????, ??????????? ???????-?????,
    // ??? ??????? ?? ?????.
    const fairX = W * 0.69;
    const fairW = W * 0.29;
    const fairH = H * 0.085;

    pctx.fillRect(fairX, baseY - fairH, fairW, fairH);

    // ??????????? ???????-???????????
    pctx.beginPath();
    pctx.moveTo(fairX + fairW * 0.38, baseY - fairH);
    pctx.lineTo(fairX + fairW * 0.5,  baseY - fairH - H * 0.04);
    pctx.lineTo(fairX + fairW * 0.62, baseY - fairH);
    pctx.closePath();
    pctx.fill();

    // ????? ? ??????? ??? ?????????
    pctx.fillRect(fairX + fairW * 0.493, baseY - fairH - H * 0.06, fairW * 0.014, H * 0.02);
    pctx.beginPath();
    pctx.arc(fairX + fairW * 0.5, baseY - fairH - H * 0.06, fairW * 0.014, 0, Math.PI * 2);
    pctx.fill();

    // ??????? ?? ????? ???????
    function fairTower(cx) {
      pctx.fillStyle = dark;
      const tw = W * 0.022;
      const th = H * 0.035;
      pctx.fillRect(cx - tw / 2, baseY - fairH - th, tw, th);
      // ?????
      pctx.beginPath();
      pctx.moveTo(cx - tw * 0.6, baseY - fairH - th);
      pctx.lineTo(cx, baseY - fairH - th - H * 0.035);
      pctx.lineTo(cx + tw * 0.6, baseY - fairH - th);
      pctx.closePath();
      pctx.fill();
    }
    fairTower(fairX + fairW * 0.04);
    fairTower(fairX + fairW * 0.96);

    // ????????? ??????? ????? — ??????????? ??????????
    pctx.fillRect(0, baseY - H * 0.02, W, H * 0.02);
  }

  // ?????? ???????? ? ?????
  silhouettePath();

  // ???????? ????? ?? ???????? ?????
  ctx.drawImage(panoCanvas, 0, 0);

  // ============================================================
  //  2b. ????????? ???????? ? ????
  //  ????????? ?????????? ?????, ???? ???????? ? ??????????????.
  // ============================================================
  ctx.save();

  // ???????? ???????????? ????? ???? (skyEnd)
  ctx.translate(0, skyEnd * 2);
  ctx.scale(1, -1);

  // ???????????????? ? ?????? ??????????
  ctx.globalAlpha = 0.28;

  ctx.drawImage(panoCanvas, 0, 0);

  ctx.restore();

  // ????????? ???????? ????????? ??????????????? ?????????
  // (???????? ???? ?? ????)
  ctx.save();
  ctx.globalCompositeOperation = 'destination-out';
  for (let i = 0; i < 40; i++) {
    const y = skyEnd + (i / 40) * (riverEnd - skyEnd) * 1.4;
    ctx.fillStyle = `rgba(0,0,0,${0.15 + (i % 3) * 0.05})`;
    const h = 1 + (i % 4);
    ctx.fillRect(0, y, W, h);
  }
  ctx.restore();

  // ============================================================
  //  3. ???? — 50%..60% (10% ??????)
  // ============================================================
  const river = ctx.createLinearGradient(0, skyEnd, 0, riverEnd);
  river.addColorStop(0,   '#1a2540');
  river.addColorStop(0.5, '#0e1a30');
  river.addColorStop(1,   '#060c18');
  ctx.fillStyle = river;
  ctx.fillRect(0, skyEnd, W, riverEnd - skyEnd);

  // ---- ????????? ????? ?? ???? ----
  // ????????? ?????????????? ???????
  const fireflies = [
    { x: W * 0.15, color: 'rgba(255, 200, 120, 0.5)' },
    { x: W * 0.22, color: 'rgba(255, 180, 100, 0.4)' },
    { x: W * 0.48, color: 'rgba(255, 220, 140, 0.5)' },
    { x: W * 0.75, color: 'rgba(255, 200, 120, 0.6)' },
    { x: W * 0.82, color: 'rgba(255, 220, 160, 0.4)' },
  ];
  fireflies.forEach(({ x, color }) => {
    ctx.strokeStyle = color;
    ctx.lineWidth = 1.5;
    for (let i = 0; i < 6; i++) {
      const y = skyEnd + (i / 6) * (riverEnd - skyEnd);
      const len = 8 + (i % 3) * 6;
      ctx.beginPath();
      ctx.moveTo(x - len / 2, y);
      ctx.lineTo(x + len / 2, y);
      ctx.stroke();
    }
  });

  // ???? ?? ????
  const moonPath = ctx.createLinearGradient(
    moonX - W * 0.03, 0, moonX + W * 0.03, 0,
  );
  moonPath.addColorStop(0,   'rgba(200,215,255,0)');
  moonPath.addColorStop(0.5, 'rgba(200,215,255,0.2)');
  moonPath.addColorStop(1,   'rgba(200,215,255,0)');
  ctx.fillStyle = moonPath;
  ctx.fillRect(moonX - W * 0.03, skyEnd, W * 0.06, riverEnd - skyEnd);

  // ?????? ????
  ctx.strokeStyle = 'rgba(120,150,200,0.08)';
  ctx.lineWidth = 1;
  for (let i = 0; i < 15; i++) {
    const y = skyEnd + ((i * 37) % (riverEnd - skyEnd));
    const x = (i * 83) % W;
    const len = 15 + (i % 5) * 12;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + len, y);
    ctx.stroke();
  }

  // ============================================================
  //  4. ??????? ????? — 60%..100% (40% ??????)
  // ============================================================
  const grass = ctx.createLinearGradient(0, riverEnd, 0, H);
  grass.addColorStop(0,    '#1a3a1a');
  grass.addColorStop(0.3,  '#0f2a12');
  grass.addColorStop(0.7,  '#081a0a');
  grass.addColorStop(1,    '#020805');
  ctx.fillStyle = grass;
  ctx.fillRect(0, riverEnd, W, H - riverEnd);

  // ---- ?????? ???? (??????? ?????) ----
  ctx.strokeStyle = 'rgba(140, 170, 220, 0.5)';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(0, riverEnd);
  ctx.lineTo(W, riverEnd);
  ctx.stroke();

  // ---- ?????: ????? ----
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

  // ???? ?????
  const grassRows = [
    [0.62, 0.02, 0.035, 24],
    [0.68, 0.03, 0.05, 18],
    [0.76, 0.045, 0.07, 13],
    [0.86, 0.06, 0.09, 8],
    [0.96, 0.08, 0.12, 5],
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

  // ????????? ????????
  for (let i = 0; i < 16; i++) {
    const x = ((i * 8623 + 149) % 1000) / 1000 * W;
    const y = H * (0.64 + ((i * 3457) % 1000) / 1000 * 0.32);
    const h = H * (0.025 + ((i * 2671) % 1000) / 1000 * 0.04);

    ctx.strokeStyle = `rgba(40, 70, 35, 0.8)`;
    ctx.lineWidth = 0.9;
    ctx.lineCap = 'round';
    const lean = ((i % 3) - 1) * h * 0.4;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.quadraticCurveTo(x + lean * 0.3, y - h * 0.5, x + lean, y - h);
    ctx.stroke();
  }

  // ????????
  const vig = ctx.createLinearGradient(0, H * 0.85, 0, H);
  vig.addColorStop(0, 'rgba(0,0,0,0)');
  vig.addColorStop(1, 'rgba(0,0,0,0.6)');
  ctx.fillStyle = vig;
  ctx.fillRect(0, H * 0.85, W, H * 0.15);
}