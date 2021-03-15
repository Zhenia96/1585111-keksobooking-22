/* global L:readonly */
import { changeAddress } from './form.js';

const icon = L.icon({
  iconUrl: 'img/main-pin.svg',
  iconSize: [50, 50],
  iconAnchor: [25, 50],
});

const createMainMarker = (initialCoordinate) => {
  let firstCoordinate = initialCoordinate[0].toFixed(5);
  let secondCoordinate = initialCoordinate[1].toFixed(5);

  const marker = L.marker(initialCoordinate, {
    icon: icon,
    draggable: true,
  });

  changeAddress(firstCoordinate, secondCoordinate);

  marker.on('move', (evt) => {
    const currentCoordinates = evt.target.getLatLng();
    firstCoordinate = currentCoordinates.lat.toFixed(5);
    secondCoordinate = currentCoordinates.lng.toFixed(5);
    changeAddress(firstCoordinate, secondCoordinate);
  });

  return marker;
}

export { createMainMarker };
