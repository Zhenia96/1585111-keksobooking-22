/* global _:readonly */
import { implementAds } from './map.js';

const featuresField = document.querySelector('.map__features');
const filter = document.querySelector('.map__filters');
const filters = document.querySelectorAll('.map__filter');
const DEFAULT_FILTER_VALUE = 'any';
const ADS_COUNT = 10;

const disableFilters = (status) => {
  if (status) {
    filter.classList.add('map__filters--disabled');
  } else {
    filter.classList.remove('map__filters--disabled');
  }

  featuresField.disabled = status;

  filters.forEach(filter => {
    filter.disabled = status;
  })
}

const getfeaturesValues = (features) => {
  const featuresValues = [];
  features.forEach(element => featuresValues.push(element.value));
  return featuresValues;
}

const getPriceRank = (price) => {
  let rank = '';
  if (price <= 10000) {
    rank = 'low'
  } else if (price < 50000) {
    rank = 'middle'
  } else {
    rank = 'high';
  }
  return rank;
}

const getAdsRank = (offer) => {
  const type = filter.querySelector('#housing-type').value;
  const price = filter.querySelector('#housing-price').value;
  const roomsCount = filter.querySelector('#housing-rooms').value;
  const guestsCount = filter.querySelector('#housing-guests').value;
  const features = filter.querySelectorAll('[name="features"]:checked');
  const featuresValues = getfeaturesValues(features);
  const HIGT_PRIORITY = 3;

  let rank = 0;

  if (type === offer.type || type === DEFAULT_FILTER_VALUE) {
    rank += HIGT_PRIORITY;
  }
  if (price === getPriceRank(offer.price) || price === DEFAULT_FILTER_VALUE) {
    rank++;
  }
  if (Number(roomsCount) === Number(offer.rooms) || roomsCount === DEFAULT_FILTER_VALUE) {
    rank++;
  }
  if (Number(guestsCount) === Number(offer.guests) || guestsCount === DEFAULT_FILTER_VALUE) {
    rank++;
  }

  featuresValues.forEach((feature) => {
    if (offer.features.includes(feature)) {
      rank++;
    }
  })

  return rank;
}

const compareAds = (firstAd, secondAd) => {
  const firstAdRank = getAdsRank(firstAd.offer);
  const secondAdRank = getAdsRank(secondAd.offer);

  return secondAdRank - firstAdRank;
}

const sortAds = (ads) => {
  const sortedAds = ads
    .slice()
    .sort(compareAds);
  return sortedAds;
}


const setFilterChangeListener = (ads) => {
  implementAds(ads.slice(0, ADS_COUNT));
  filter.addEventListener('change', _.debounce(() => {
    implementAds(sortAds(ads).slice(0, ADS_COUNT));
  }, 500))
}

export { setFilterChangeListener, disableFilters, filter }
