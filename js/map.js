/* global L:readonly */
import { disableForm } from './form.js';
import { createMainMarker } from './main-marker.js';
import { createAdsMarker } from './ads-marker.js';

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

const addMainMarker = () => {
  const mainMarker = createMainMarker(TOKYO_CENTER_COORDINATES);
  mainMarker.addTo(map);
}

const addAdsMarker = (location, card) => {
  const marker = createAdsMarker(location.x, location.y);
  marker.addTo(map);
  marker.bindPopup(card);
}

export { addMainMarker, addAdsMarker };
