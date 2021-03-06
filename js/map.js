/* global L:readonly */
import { createMainMarker } from './main-marker.js';
import { createAdsMarker } from './ads-marker.js';
import { createCard } from './card.js';

const MAP_IMAGE_ADDRESS = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const TOKYO_CENTER_COORDINATES = [35.6895, 139.69171];

const map = L.map('map-canvas').setView(TOKYO_CENTER_COORDINATES, 12);

const mapImage = L.tileLayer(MAP_IMAGE_ADDRESS,
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
)

mapImage.addTo(map);

mapImage.on('tileerror', () => {
  mapImage.removeEventListener('load');
});

const adMarkersLayer = L.layerGroup();
adMarkersLayer.addTo(map);

const mainMarker = createMainMarker(TOKYO_CENTER_COORDINATES);

const addMainMarker = () => {
  mainMarker.addTo(map);
}

const setMainMarkerPosition = (position = TOKYO_CENTER_COORDINATES) => {
  mainMarker.setLatLng(position);
}

const addAdsMarker = (location, card) => {
  const marker = createAdsMarker(location.lat, location.lng);
  marker.addTo(adMarkersLayer);
  marker.bindPopup(card);
}

const implementAds = (ads) => {
  adMarkersLayer.clearLayers();
  ads.forEach((ad) => {
    const card = createCard(ad);
    addAdsMarker(ad.location, card);
  })
}

export { addMainMarker, addAdsMarker, implementAds, setMainMarkerPosition, mapImage };
