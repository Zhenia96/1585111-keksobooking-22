import { createAd } from './ad.js';
import { createCard } from './card.js';
import { } from './form.js';
import { addAdsMarker, addMainMarker } from './map.js';

const ads = new Array(10).fill(null);
ads.forEach((value, index, array) => array[index] = createAd());

addMainMarker();

ads.forEach((value) => {
  const card = createCard(value);
  addAdsMarker(value.location, card);
})
