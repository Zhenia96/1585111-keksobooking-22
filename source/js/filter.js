/* global _:readonly */
import { implementAds } from './map.js';

const featuresField = document.querySelector('.map__features');
const filter = document.querySelector('.map__filters');
const filterFields = document.querySelectorAll('.map__filter');
const DEFAULT_FILTER_VALUE = 'any';
const ADS_COUNT = 10;
const FUNCTION_DELAY_TIME = 500;
const LOW_PRICE = 10000;
const HIGH_PRICE = 50000;

const disableFilters = (status) => {
  if (status) {
    filter.classList.add('map__filters--disabled');
  } else {
    filter.classList.remove('map__filters--disabled');
  }

  featuresField.disabled = status;

  filterFields.forEach(field => {
    field.disabled = status;
  });
}

const getFeaturesValues = (features) => Array.from(features).map((feature) => feature.value);

const isValidPrice = (priceRank, price) => {
  switch (priceRank) {
    case 'low':
      return price <= LOW_PRICE;
    case 'middle':
      return price >= LOW_PRICE && price <= HIGH_PRICE;
    case 'high':
      return price >= HIGH_PRICE;
    default:
      return true;
  }
}

const hasFeatures = (adFeatures) => {
  const filterFeatures = getFeaturesValues(filter.querySelectorAll('[name="features"]:checked'));

  return !filterFeatures.some((filter) => !adFeatures.includes(filter));
}

const filterAds = (ads) => {
  const type = filter.querySelector('#housing-type').value;
  const priceRank = filter.querySelector('#housing-price').value;
  const roomsCount = filter.querySelector('#housing-rooms').value;
  const guestsCount = filter.querySelector('#housing-guests').value;

  const filteredAds = ads.filter((ad) => {

    if (!(type === ad.offer.type || type === DEFAULT_FILTER_VALUE)) {
      return
    }
    if (!isValidPrice(priceRank, ad.offer.price)) {
      return
    }
    if (!(Number(roomsCount) === Number(ad.offer.rooms) || roomsCount === DEFAULT_FILTER_VALUE)) {
      return
    }
    if (!(Number(guestsCount) === Number(ad.offer.guests) || guestsCount === DEFAULT_FILTER_VALUE)) {
      return
    }
    if (!hasFeatures(ad.offer.features)) {
      return
    }

    return ad;
  })

  return filteredAds;
}

const setFilterChangeListener = (ads) => {
  implementAds(ads.slice(0, ADS_COUNT));
  filter.addEventListener('change', _.debounce(() => {
    const filteredAds = filterAds(ads);

    implementAds(filteredAds.slice(0, ADS_COUNT));
  }, FUNCTION_DELAY_TIME));
}

export { setFilterChangeListener, disableFilters, filter }
