/* global L:readonly */
import { disableForm } from './form.js';
import { createMainMarker } from './main-marker.js';
import { createAdsMarker } from './ads-marker.js';
import { createCard } from './card.js';

const filterForm = document.querySelector('.map__filters');
const filters = document.querySelectorAll('.map__filter');
const featuresField = document.querySelector('.map__features');
const TOKYO_CENTER_COORDINATES = [35.6895, 139.69171];

const disableFilters = (status) => {
  if (status) {
    filterForm.classList.add('map__filters--disabled');
  } else {
    filterForm.classList.remove('map__filters--disabled');
  }

  featuresField.disabled = status;

  filters.forEach(filter => {
    filter.disabled = status;
  })
}

disableForm(true);
disableFilters(true);

const map = L.map('map-canvas').
  on('load', () => {
    disableForm(false);
    disableFilters(false);
  }).
  setView(TOKYO_CENTER_COORDINATES, 12);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainMarker = createMainMarker(TOKYO_CENTER_COORDINATES);

const addMainMarker = () => {
  mainMarker.addTo(map);
}

const setMainMarkerPosition = (position = TOKYO_CENTER_COORDINATES) => {
  mainMarker.setLatLng(position);
}

const addAdsMarker = (location, card) => {
  const marker = createAdsMarker(location.lat, location.lng);
  marker.addTo(map);
  marker.bindPopup(card);
}

const implementAds = (ads) => {
  ads.forEach((ad) => {
    const card = createCard(ad);
    addAdsMarker(ad.location, card);
  })
}

export { addMainMarker, addAdsMarker, implementAds, setMainMarkerPosition, filterForm };
