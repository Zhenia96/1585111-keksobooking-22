'use strict';

const generateNumber = (min, max) => {
  let number;

  while (!(number >= min && number <= max)) {
    number = Math.random() * max;
  }
  return number;
}

const getRandomNumber = (firstLimit, secondLimit, simbolCount = 0) => {
  let number = secondLimit;

  if (firstLimit < 0 || secondLimit < 0 || simbolCount < 0) {
    return;
  }

  if (firstLimit < secondLimit) {
    number = generateNumber(firstLimit, secondLimit);
  }

  if (firstLimit > secondLimit) {
    number = generateNumber(secondLimit, firstLimit);
  }

  number = number.toFixed(simbolCount);

  return Number(number);
}

const createImageAddress = (path, expansion, number = '') => path + number + expansion;

const createImageArray = (path, expansion, length) => {
  let result = [];

  for (let i = 0; i < length; i++) {
    result.push(createImageAddress(path, expansion, i + 1))
  }

  return result;
}

const getRandomElements = (array) => {
  let result = [];

  for (let i = 0; i < array.length; i++) {
    if (getRandomNumber(0, 1)) {
      result.push(array[i]);
    }
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

const createLocation = () => {
  return {
    x: getRandomNumber(35.65000, 35.70000, 5),
    y: getRandomNumber(139.70000, 139.80000, 5),
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

let ads = new Array(10).fill(null);
ads.forEach((value, index, array) => array[index] = createAd());
