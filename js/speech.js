// js/speech.js
// Система «облачков с репликами» над персонажами.
// Реплики появляются периодически, держатся 2 секунды,
// плавно появляются и исчезают. При скрытом интерфейсе не рисуются.

import { ctx, W, H, getSlots } from './scene.js';

// ---- Настройки ----
const HOLD_MS      = 2000;   // сколько висит реплика
const FADE_IN_MS   = 250;    // плавное появление
const FADE_OUT_MS  = 350;    // плавное исчезновение
const COOLDOWN_MS  = 10000;   // пауза между репликами у одного персонажа
const TICK_S       = 1.5;    // раз в сколько секунд бросаем «кубик»
const CHANCE       = 0.4;    // вероятность запуска на тик

// ---- Хранилище активных реплик ----
const bubbles = new Map();   // id → { text, startTime }

// ---- Сопоставление участника группы с самой группой ----
// Нужно, чтобы понять, «виден ли» участник: смотрим на видимость группы.
const MEMBER_TO_GROUP = {
  andrey: 'group',
  minh:   'group',
  anya:   'group',
  dima:   'group',
  mom:    'family',
  sister: 'family',
  dad:    'family',
  kirill: 'uni',
  lena:   'uni',
  sonya:  'uni',
  max:    'uni',
};

// ---- Список реплик ----
const LINES = {
  // ----- Одиночные персонажи -----
  guy1: [
    { text: 'Как же хорошо…',       weight: 2 },
    { text: 'Красотаааа',           weight: 1 },
    { text: 'Я мог бы здесь жить',  weight: 1 },
  ],
  guy1a: [
    { text: 'Свежо сегодня',         weight: 2 },
    { text: 'Хорошо, что взял плед', weight: 1 },
    { text: 'Осень — моё время',     weight: 1 },
  ],
  girl: [
    { text: 'С тобой так хорошо…', weight: 3 },
    { text: 'Смотри, звёзды!',     weight: 1 },
    { text: 'Так спокойно и уютно', weight: 1 },
  ],
  cat: [
    { text: 'Мррр…', weight: 3 },
    { text: 'Мяу.',  weight: 1 },
    { text: 'Мур?',  weight: 1 },
  ],

  // ----- Близкие друзья -----
  andrey: [
    { text: 'Сейчас бы в страйкбол...', weight: 2 },
    { text: 'Хорошо сидим',            weight: 1 },
  ],
  minh: [
    { text: 'Есть темка...', weight: 2 },
    { text: 'Приезжай в гости в Москву',     weight: 1 },
  ],
  anya: [
    { text: 'Класс!', weight: 2 },
    { text: '😢😞🥀🥀',   weight: 1 },
  ],
   dima: [
    { text: 'Тише, я слушаю огонь',  weight: 3 },
    { text: 'Тут должна была быть шутка про негра', weight: 1 },
  ],

  // ----- Семья -----
  dad: [
    { text: 'Не замёрзли?',         weight: 2 },
    { text: 'Как в старые времена', weight: 1 },
  ],
  mom: [
    { text: 'Тепло',           weight: 2 },
    { text: 'Мне тут нравится',  weight: 1 },
  ],
  sister: [
    { text: 'Хороший вечер',        weight: 2 },
    { text: 'А раньше...', weight: 1 },
  ],

  // ----- Университетские друзья -----
  kirill: [
    { text: 'Так хорошо, я как будто умер',  weight: 2 },
    { text: 'А Катю не позвали?', weight: 1 },
  ],
  max: [
    { text: 'Может, в настолки поиграем?', weight: 2 },
    { text: 'А вы были во Вьетнаме?',        weight: 1 },
  ],
  sonya: [
    { text: 'Я непротив поиграть в настолки', weight: 2 },
    { text: 'Волшебно!',  weight: 1 },
  ],
  lena: [
    { text: 'Как будто и не надо диплом писать...', weight: 2 },
    { text: 'Вот бы пары проходили в таких местах',  weight: 1 },
  ],
};

// ---- Выбор случайной реплики с учётом веса ----
function pickLine(id) {
  const list = LINES[id];
  if (!list || !list.length) return null;
  const total = list.reduce((s, l) => s + l.weight, 0);
  let r = Math.random() * total;
  for (const l of list) {
    r -= l.weight;
    if (r <= 0) return l.text;
  }
  return list[0].text;
}

// ---- Планировщик ----
const lastShown = new Map();
let schedulerAccum = 0;

export function updateSpeech(dt, isVisible) {
  const now = performance.now();

  // --- 1. Удаляем устаревшие реплики ---
  for (const [id, b] of bubbles) {
    if (now - b.startTime > HOLD_MS + FADE_OUT_MS) {
      bubbles.delete(id);
    }
  }

  // --- 2. Планируем новые ---
  schedulerAccum += dt;
  if (schedulerAccum < TICK_S) return;
  schedulerAccum = 0;

  if (document.body.classList.contains('ui-hidden')) return;

  for (const id of Object.keys(LINES)) {
    // Видимость: обычный персонаж — сам по себе,
    // участник группы — по видимости своей группы.
    const groupId = MEMBER_TO_GROUP[id];
    const visible = groupId ? isVisible(groupId) : isVisible(id);
    if (!visible) continue;

    if (bubbles.has(id)) continue;

    const last = lastShown.get(id) || 0;
    if (now - last < COOLDOWN_MS) continue;

    // Если группа уже говорит голосом другого участника — не перебиваем.
    if (groupId) {
      const anySpeaking = Object.keys(LINES).some(otherId =>
        MEMBER_TO_GROUP[otherId] === groupId && bubbles.has(otherId)
      );
      if (anySpeaking) continue;
    }

    if (Math.random() < CHANCE) {
      const text = pickLine(id);
      if (!text) continue;
      bubbles.set(id, { text, startTime: now });
      lastShown.set(id, now);
    }
  }
}

// ---- Очистка всех активных реплик ----
export function clearBubbles() {
  bubbles.clear();
}

// ---- Перевод id реплики в id слота ----
function slotIdFor(id) {
  if (id === 'guy1')  return 'guySummer';
  if (id === 'guy1a') return 'guyAutumn';
  // Участники групп — оставляем как есть, getHeadPos сам их найдёт.
  return id;
}

// ---- Отрисовка всех активных облачков ----
export function drawSpeech(getHeadPos) {
  if (document.body.classList.contains('ui-hidden')) return;
  if (bubbles.size === 0) return;

  const now = performance.now();
  const slots = getSlots();

  for (const [id, b] of bubbles) {
    const elapsed = now - b.startTime;

    let alpha = 1;
    if (elapsed < FADE_IN_MS) {
      alpha = elapsed / FADE_IN_MS;
    } else if (elapsed > HOLD_MS) {
      alpha = 1 - (elapsed - HOLD_MS) / FADE_OUT_MS;
    }
    alpha = Math.max(0, Math.min(1, alpha));

    const slotId = slotIdFor(id);
    const pos = getHeadPos(slotId);
    if (!pos) continue;

    // Масштаб: у участников групп масштаб берём у самой группы.
    const groupId = MEMBER_TO_GROUP[id];
    const scaleSource = groupId ? slots[groupId] : slots[slotId];
    const scale = (scaleSource && scaleSource.s) || 1;

    drawBubble(pos.x, pos.y, b.text, alpha, scale);
  }
}

// ---- Отрисовка одного облачка ----
function drawBubble(x, y, text, alpha, scale) {
  ctx.save();
  ctx.globalAlpha = alpha;

  // На мобильном — базовый шрифт чуть меньше
  const isMobile = W < 720;
  const baseK = isMobile ? 0.016 : 0.018;
  const baseFont = Math.max(11, Math.min(W, H) * baseK);
  const fontSize = baseFont * Math.max(0.75, Math.min(1.2, scale));

  ctx.font = `${fontSize}px 'Segoe UI', system-ui, sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  const padding = fontSize * 0.9;
  const textW   = ctx.measureText(text).width;
  const bubbleW = textW + padding * 2;
  const bubbleH = fontSize * 1.8;
  const radius  = bubbleH * 0.4;

  let bubbleX = x - bubbleW / 2;
  const bubbleY = y - bubbleH - fontSize * 0.8;

  const margin = 8;
  if (bubbleX < margin) bubbleX = margin;
  if (bubbleX + bubbleW > W - margin) bubbleX = W - margin - bubbleW;

  const floatK = 1 - alpha;
  const finalY = bubbleY - floatK * 6;

  // тень
  ctx.fillStyle = 'rgba(0,0,0,0.35)';
  roundRectPath(bubbleX + 2, finalY + 3, bubbleW, bubbleH, radius);
  ctx.fill();

  // фон
  const bg = ctx.createLinearGradient(0, finalY, 0, finalY + bubbleH);
  bg.addColorStop(0, 'rgba(255, 240, 210, 0.96)');
  bg.addColorStop(1, 'rgba(240, 210, 170, 0.96)');
  ctx.fillStyle = bg;
  roundRectPath(bubbleX, finalY, bubbleW, bubbleH, radius);
  ctx.fill();

  // обводка
  ctx.strokeStyle = 'rgba(90, 60, 30, 0.55)';
  ctx.lineWidth = Math.max(1, fontSize * 0.08);
  roundRectPath(bubbleX, finalY, bubbleW, bubbleH, radius);
  ctx.stroke();

  // хвостик
  const tailCX   = x;
  const tailTop  = finalY + bubbleH - 1;
  const tailTipY = y - fontSize * 0.35;
  const tailW    = fontSize * 0.5;

  ctx.beginPath();
  ctx.moveTo(tailCX - tailW, tailTop);
  ctx.lineTo(tailCX, tailTipY);
  ctx.lineTo(tailCX + tailW, tailTop);
  ctx.closePath();
  ctx.fillStyle = 'rgba(255, 240, 210, 0.96)';
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(tailCX - tailW, tailTop);
  ctx.lineTo(tailCX, tailTipY);
  ctx.lineTo(tailCX + tailW, tailTop);
  ctx.strokeStyle = 'rgba(90, 60, 30, 0.55)';
  ctx.stroke();

  // текст
   ctx.fillStyle = '#2a1a0c';
  ctx.fillText(text, bubbleX + bubbleW / 2, finalY + bubbleH / 2);

  ctx.restore();
}

// ---- Скруглённый прямоугольник ----
function roundRectPath(x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}