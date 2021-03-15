/* global L:readonly */
const icon = L.icon({
  iconUrl: 'img/pin.svg',
  iconSize: [50, 50],
  iconAnchor: [25, 50],
});

const createAdsMarker = (firstCoordinate, secondCoordinate) => {

  const marker = L.marker(
    {
      lat: firstCoordinate,
      lng: secondCoordinate,
    },
    {
      icon: icon,
    },
  );

  return marker;
}

export { createAdsMarker };
