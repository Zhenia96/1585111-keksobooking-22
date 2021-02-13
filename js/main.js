import { createAd } from './ad.js';

const ads = new Array(10).fill(null);
ads.forEach((value, index, array) => array[index] = createAd());
