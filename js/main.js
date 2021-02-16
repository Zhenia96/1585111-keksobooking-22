import { createAd } from './ad.js';
import { createCard } from './card.js';

const canvas = document.querySelector('.map__canvas');

const ads = new Array(10).fill(null);
ads.forEach((value, index, array) => array[index] = createAd());

const card = createCard(ads[0]);
canvas.appendChild(card);
