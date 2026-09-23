// js/characters.js
import { ctx, scene, sway } from './scene.js';

// ?????? ????????? ?????? ?? ??????
function warmthOnSilhouette(x, y, w, h, sideSign) {
  const { cx, fireY } = scene();
  const g = ctx.createRadialGradient(cx, fireY - 40, 20, cx, fireY - 40, 500);
  g.addColorStop(0, 'rgba(255, 140, 40, 0.55)');
  g.addColorStop(0.5, 'rgba(255, 80, 10, 0.20)');
  g.addColorStop(1, 'rgba(255, 40, 0, 0)');
  ctx.globalCompositeOperation = 'source-atop';
  ctx.fillStyle = g;
  ctx.fillRect(x, y, w, h);
  ctx.globalCompositeOperation = 'source-over';
}

// ---- ????????????? "??????? ???????" (??? ?? ?????) ----
export function drawSittingPerson(opts) {
  const {
    x, y, s,
    skin, hair,
    top, topShade, pants,
    pose = 0, warmSide = -1,
    hairStyle = 'short',
  } = opts;

  const t = performance.now() / 1000;
  const breathe = sway(t, 0.015, 1.2);
  const tilt = sway(t, 0.01, 0.7) + pose;

  ctx.save();
  ctx.translate(x, y);
  ctx.scale(s, s);
  ctx.rotate(tilt * 0.05);

  // --- ???? ---
  ctx.fillStyle = pants;
  ctx.beginPath();
  ctx.fillRect(-31, -25, 62, 15);

  // ????
  const torsoGrad = ctx.createLinearGradient(0, -90, 0, -20);
  torsoGrad.addColorStop(0, top);
  torsoGrad.addColorStop(1, topShade);
  ctx.fillStyle = torsoGrad;
  ctx.beginPath();
  ctx.moveTo(-30 + breathe * 2, -22);
  ctx.quadraticCurveTo(-38, -60, -28, -88);
  ctx.quadraticCurveTo(0, -98, 28, -88);
  ctx.quadraticCurveTo(38, -60, 30 + breathe * 2, -22);
  ctx.quadraticCurveTo(0, -14, -30 + breathe * 2, -22);
  ctx.closePath();
  ctx.fill();

  // ???????
  ctx.strokeStyle = 'rgba(0,0,0,0.18)';
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  ctx.moveTo(0, -84);
  ctx.quadraticCurveTo(-4 + breathe * 2, -55, 0, -24);
  ctx.stroke();

  // ???
  ctx.fillStyle = skin;
  ctx.beginPath();
  ctx.roundRect(-9, -104, 18, 15, 5);
  ctx.fill();

  // ?????? (???????)
  ctx.fillStyle = skin;
  ctx.beginPath();
  ctx.ellipse(0, -118, 22, 25, 0, 0, Math.PI * 2);
  ctx.fill();

  // ??????
  ctx.fillStyle = hair;
  if (hairStyle === 'short') {
    ctx.beginPath();
    ctx.ellipse(0, -122, 24, 24, 0, Math.PI * 0.95, Math.PI * 2.05);
    ctx.quadraticCurveTo(22, -112, 20, -100);
    ctx.quadraticCurveTo(0, -108, -20, -100);
    ctx.quadraticCurveTo(-22, -112, -24, -122);
    ctx.fill();
  } else if (hairStyle === 'long') {
    ctx.beginPath();
    ctx.ellipse(0, -122, 25, 26, 0, Math.PI * 0.9, Math.PI * 2.1);
    ctx.lineTo(26, -60);
    ctx.quadraticCurveTo(30, -55, 22, -55);
    ctx.quadraticCurveTo(18, -80, 14, -100);
    ctx.quadraticCurveTo(0, -110, -14, -100);
    ctx.quadraticCurveTo(-18, -80, -22, -55);
    ctx.quadraticCurveTo(-30, -55, -26, -60);
    ctx.closePath();
    ctx.fill();

    ctx.strokeStyle = 'rgba(0,0,0,0.2)';
    ctx.lineWidth = 1;
    for (let i = -1; i <= 1; i++) {
      ctx.beginPath();
      ctx.moveTo(i * 8, -130);
      ctx.quadraticCurveTo(i * 14, -95, i * 10, -110);
      ctx.stroke();
    }
  } else if (hairStyle === 'shortGuy') {
    ctx.beginPath();
    ctx.ellipse(0, -124, 23, 22, 0, Math.PI * 1.0, Math.PI * 3.0);
    ctx.quadraticCurveTo(0, -108, -23, -124);
    ctx.fill();
  }

  // --- ???? (??????? ????? ???? / ?????????) ---
  ctx.fillStyle = topShade;
  // ????? ????
  ctx.beginPath();
  ctx.moveTo(-28, -88);
  ctx.quadraticCurveTo(-42, -55, -38, -28);
  ctx.quadraticCurveTo(-20, -30, -24, -45);
  ctx.quadraticCurveTo(-26, -60, -22, -72);
  ctx.closePath();
  ctx.fill();
  // ?????? ????
  ctx.beginPath();
  ctx.moveTo(28, -88);
  ctx.quadraticCurveTo(42, -55, 38, -28);
  ctx.quadraticCurveTo(20, -30, 24, -45);
  ctx.quadraticCurveTo(26, -60, 22, -72);
  ctx.closePath();
  ctx.fill();


  // ?????? ????
  warmthOnSilhouette(-90, -150, 180, 180, warmSide);

  ctx.restore();
}

// ---- 1. ??????, ???? ----
export function drawGuySummer(x, y, s) {
  drawSittingPerson({
    x, y, s,
    skin: '#d9a074',
    hair: '#3a2418',
    hairStyle: 'shortGuy',
    top: '#51141f',
    topShade: '#51141f',
    pants: '#3a4a5a',
    pose: 0.15,
    warmSide: -1,
  });
}

// ---- 2. ??????, ????? ----
export function drawGuyAutumn(x, y, s) {
  drawSittingPerson({
    x, y, s,
    skin: '#dbbba2',
    hair: '#3a2418',
    hairStyle: 'shortGuy',
    top: '#7a4a2a',
    topShade: '#5a3418',
    pants: '#2e2a26',
    pose: 0.15,
    warmSide: -1,
  });

  // ???????? ? ????
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(s, s);
  ctx.rotate(0.02);

  ctx.fillStyle = '#5a3418';
  ctx.beginPath();
  ctx.ellipse(0, -100, 22, 8, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#8a2a2a';
  ctx.beginPath();
  ctx.ellipse(0, -98, 20, 7, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(6, -96);
  ctx.quadraticCurveTo(14, -80, 10, -66);
  ctx.lineTo(2, -66);
  ctx.quadraticCurveTo(6, -80, 0, -96);
  ctx.closePath();
  ctx.fill();

  ctx.restore();
}

// ---- 3. ???????, ?????, ???????? ----
export function drawGirlRed(x, y, s) {
  const t = performance.now() / 1000;
  const swayHair = Math.sin(t * 0.8) * 0.03;

  drawSittingPerson({
    x, y, s,
    skin: '#e8b890',
    hair: '#9d5031',
    hairStyle: 'long',
    top: '#5c6775',
    topShade: '#4d4e4f',
    pants: '#5a5048',
    pose: 0.10,
    warmSide: -1,
  });

  // ?????? ??????????? ?????
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(s, s);
  ctx.rotate(swayHair);
  ctx.fillStyle = 'rgba(192, 74, 26, 0.6)';
  ctx.beginPath();
  ctx.moveTo(-22, -58);
  ctx.quadraticCurveTo(-26, -50, -20, -48);
  ctx.quadraticCurveTo(-18, -54, -22, -58);
  ctx.fill();
  ctx.restore();
}

// ---- 4. ????? ----
export function drawCat(x, y, s) {
  const t = performance.now() / 1000;
  const cycle = t % 4.5;
  const lookingUp = cycle > 3.0 ? Math.min(1, (cycle - 3.0) / 0.4) : 0;
  const headLift = lookingUp * 10;

  ctx.save();
  ctx.translate(x, y);
  ctx.scale(s, s);

  // ????
  ctx.fillStyle = 'rgba(0,0,0,0.45)';
  ctx.beginPath();
  ctx.ellipse(0, 4, 34, 8, 0, 0, Math.PI * 2);
  ctx.fill();

  // ?????
  ctx.strokeStyle = '#3a3a42';
  ctx.lineWidth = 8;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(26, -8);
  ctx.quadraticCurveTo(40, -6, 34, 2);
  ctx.quadraticCurveTo(24, 6, 8, 2);
  ctx.stroke();

  // ????
  const bodyGrad = ctx.createLinearGradient(0, -55, 0, 0);
  bodyGrad.addColorStop(0, '#4a4a52');
  bodyGrad.addColorStop(1, '#2a2a30');
  ctx.fillStyle = bodyGrad;
  ctx.beginPath();
  ctx.moveTo(-24, 0);
  ctx.quadraticCurveTo(-28, -40, -14, -55);
  ctx.quadraticCurveTo(0, -62, 14, -55);
  ctx.quadraticCurveTo(28, -40, 24, 0);
  ctx.closePath();
  ctx.fill();

  // ????
  ctx.fillStyle = '#3a3a42';
  ctx.beginPath();
  ctx.roundRect(-14, -14, 8, 16, 3);
  ctx.fill();
  ctx.beginPath();
  ctx.roundRect(6, -14, 8, 16, 3);
  ctx.fill();

  // ??????
  const headY = -60 - headLift;
  ctx.save();
  ctx.translate(0, headY);
  ctx.rotate(-headLift * 0.03);

  ctx.fillStyle = '#3a3a42';
  ctx.beginPath();
  ctx.roundRect(-7, 0, 14, 10 + headLift * 0.5, 4);
  ctx.fill();

  const headGrad = ctx.createRadialGradient(-6, -4, 2, 0, 0, 20);
  headGrad.addColorStop(0, '#5a5a62');
  headGrad.addColorStop(1, '#34343c');
  ctx.fillStyle = headGrad;
  ctx.beginPath();
  ctx.ellipse(0, -6, 18, 17, 0, 0, Math.PI * 2);
  ctx.fill();

  // ???
  ctx.fillStyle = '#34343c';
  ctx.beginPath();
  ctx.moveTo(-16, -12);
  ctx.lineTo(-20, -26);
  ctx.lineTo(-6, -18);
  ctx.closePath();
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(16, -12);
  ctx.lineTo(20, -26);
  ctx.lineTo(6, -18);
  ctx.closePath();
  ctx.fill();

  // ?????????? ????? ????
  ctx.fillStyle = 'rgba(220, 140, 140, 0.6)';
  ctx.beginPath();
  ctx.moveTo(-15, -14);
  ctx.lineTo(-18, -23);
  ctx.lineTo(-8, -18);
  ctx.closePath();
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(15, -14);
  ctx.lineTo(18, -23);
  ctx.lineTo(8, -18);
  ctx.closePath();
  ctx.fill();

 
  ctx.restore();
  ctx.restore();
}