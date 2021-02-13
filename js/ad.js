import { getRandomNumber, getRandomElements } from './util.js';
import { createLocation } from './location.js';

const createImageAddress = (path, expansion, number = '') => path + number + expansion;

const createImageArray = (path, expansion, length) => {
  let result = [];

  for (let i = 0; i < length; i++) {
    result.push(createImageAddress(path, expansion, i + 1))
  }

  return result;
}

const createAutor = () => {
  const avatarNumber = getRandomNumber(1, 8);
  let avatarPath = 'img/avatars/user';

  if (avatarNumber < 10) {
    avatarPath += '0';
  }

  return {
    avatar: createImageAddress(avatarPath, '.png', avatarNumber),
  }
}

const createOffer = (location) => {
  const times = ['12:00', '13:00', '14:00'];
  const checkinIndex = getRandomNumber(0, times.length - 1);
  const checkoutIndex = getRandomNumber(checkinIndex, times.length - 1);
  const allFeatures = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  const allTypes = ['palace', 'flat', 'house', 'bungalow'];
  const typeIndex = getRandomNumber(0, allTypes.length - 1);
  const allPhotos = createImageArray(
    'http://o0.github.io/assets/images/tokyo/hotel',
    '.jpg',
    getRandomNumber(1, 3));

  return {
    title: 'Для культурных людей',
    address: location.x + ', ' + location.y,
    price: getRandomNumber(0, 1000000),
    type: allTypes[typeIndex],
    rooms: getRandomNumber(1, 100),
    guests: getRandomNumber(0, 3),
    checkin: times[checkinIndex],
    checkout: times[checkoutIndex],
    features: getRandomElements(allFeatures),
    description: 'Это жильё замечательное и вообще...',
    photos: getRandomElements(allPhotos),
  }
}

const createAd = () => {
  const location = createLocation();

  return {
    author: createAutor(),
    offer: createOffer(location),
    location: location,
  }
}

export { createAd };
