// js/groups.js
import { drawSittingPerson } from './characters.js';

// ---- ??????? ?????? ----
export function drawFriendGroup(x, y, s) {
  const spacing = 90;
  const scale = s;

  // ?????
  drawSittingPerson({
    x: x - spacing * 9.2 * s, y, s: scale,
    skin: '#e8c0a0', hair: '#7c5426', hairStyle: 'shortGuy',
    top: '#2c8d44', topShade: '#124829', pants: '#2e2a26',
    pose: 0.10, warmSide: -1,
  });

  // ????
  drawSittingPerson({
    x: x + spacing * 1.5 * s, y, s: scale,
    skin: '#c89a70', hair: '#070707', hairStyle: 'shortGuy',
    top: '#6a4a2a', topShade: '#4a3018', pants: '#3a3a42',
    pose: 0.05, warmSide: -1,
  });

  // ??????
  drawSittingPerson({
    x: x + spacing * 0.5 * s, y, s: scale,
    skin: '#e8b890', hair: '#c0c29a', hairStyle: 'long',
    top: '#171515', topShade: '#181313', pants: '#2e2a26',
    pose: 0.05, warmSide: 1,
  });


  // ?????
  drawSittingPerson({
    x: x - spacing * 8.2 * s, y, s: scale,
    skin: '#d9a074', hair: '#1e1612', hairStyle: 'shortGuy',
    top: '#afb5af', topShade: '#243824', pants: '#3a2e24',
    pose: 0.10, warmSide: 1,
  });
  
}

// ---- ????? ----
export function drawFamilyGroup(x, y, s) {
  const spacing = 80;
  const scale = s;

  //????
  drawSittingPerson({
    x: x - spacing * 1.5 * s, y, s: scale,
    skin: '#c89a70', hair: '#181515', hairStyle: 'long',
    top: '#c21717', topShade: '#5a2424', pants: '#2e2a26',
    pose: 0.05, warmSide: -1,
  });

  //??????
  drawSittingPerson({
    x: x - spacing * 0.5 * s, y, s: scale,
    skin: '#e8b890', hair: '#261d1d', hairStyle: 'long',
    top: '#9f75a2', topShade: '#af6bb5', pants: '#3a3a42',
    pose: 0.05, warmSide: 1,
  });

  //?????
  drawSittingPerson({
    x: x + spacing * 0.5 * s, y, s: scale,
    skin: '#e8c0a0', hair: '#323030', hairStyle: 'shortGuy',
    top: '#4a5a6a', topShade: '#2e3a48', pants: '#2e2a26',
    pose: 0.10, warmSide: -1,
  });
}

// ---- ??????????????? ?????? ----
export function drawUniGroup(x, y, s) {
  const spacing = 90;
  const scale = s;

  drawSittingPerson({
    x: x - spacing * 5.0 * s, y, s: scale,
    skin: '#e8c0a0', hair: '#45321e', hairStyle: 'shortGuy',
    top: '#4a5a6a', topShade: '#2e3a48', pants: '#2e2a26',
    pose: 0.10, warmSide: -1,
  });

  drawSittingPerson({
    x: x + spacing * 0.9 * s, y, s: scale,
    skin: '#c89a70', hair: '#141414', hairStyle: 'short',
    top: '#6a4a2a', topShade: '#4a3018', pants: '#3a3a42',
    pose: 0.05, warmSide: -1,
  });

  drawSittingPerson({
    x: x + spacing * 1.8 * s, y, s: scale,
    skin: '#e8b890', hair: '#fd8c0b', hairStyle: 'long',
    top: '#7a3a3a', topShade: '#5a2424', pants: '#2e2a26',
    pose: 0.05, warmSide: 1,
  });

  drawSittingPerson({
    x: x + spacing * 4.7 * s, y, s: scale,
    skin: '#d9a074', hair: '#2e1c12', hairStyle: 'long',
    top: '#3a5a3a', topShade: '#243824', pants: '#3a2e24',
    pose: 0.10, warmSide: 1,
  });
}