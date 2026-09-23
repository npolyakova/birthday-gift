// js/backgrounds/index.js
import { drawSea }       from './sea.js';
import { drawMountains } from './mountains.js';
import { drawSirius }    from './sirius.js';
import { drawPustyn }    from './pustyn.js';
import { drawSirius2 }   from './khosta.js';
import { drawNizhniy }   from './nizhniy.js';

export const backgrounds = {
  sea:       drawSea,
  mountains: drawMountains,
  sirius:    drawSirius,
  pustyn:    drawPustyn,
  lipetsk:   drawSirius2,
  nizhniy:   drawNizhniy,
};

export const defaultBackground = 'sea';
