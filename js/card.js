import { hideElement } from './util.js'

const cardTemplate = document.querySelector('#card').content;
const card = cardTemplate.querySelector('.popup');

const createPrice = (priceElement, priceValue) => {
  if (priceValue) {
    const currency = priceElement.querySelector('span');
    priceElement.textContent = `${priceValue} `;
    priceElement.appendChild(currency);
  } else {
    hideElement(priceElement);
  }
}

const selectType = (housingType) => {
  switch (housingType) {
    case 'flat':
      return 'Квартиры';
    case 'bungalow':
      return 'Бунгало';
    case 'house':
      return 'Дом';
    case 'palace':
      return 'Дворец';
  }
}

const createCapacity = (roomsCount, guestsCount) => `${roomsCount} комнаты для ${guestsCount} гостей`;

const hasClass = (classContent, data) => {
  for (let i = 0; i < data.length; i++) {
    if (classContent.includes(`--${data[i]}`)) {
      return true;
    }
  }
  return false;
}

const selectFeatures = (features, data) => {
  features.forEach(element => {
    const classContent = element.className;
    if (!hasClass(classContent, data)) {
      hideElement(element);
    }
  });
}

const createTime = (checkin, checkout) => `Заезд после ${checkin}, выезд до ${checkout}`;

const addPhoto = (container, data) => {
  const templatePhoto = container.querySelector('.popup__photo');
  const photosFragment = document.createDocumentFragment();
  container.innerHTML = '';
  for (let i = 0; i < data.length; i++) {
    const photo = templatePhoto.cloneNode(true);
    photo.src = data[i];
    photosFragment.appendChild(photo);
  }
  container.appendChild(photosFragment);
}

const makeContent = (element, data) => element.textContent = data ? data : hideElement(element);

const createCard = ({ author, offer }) => {
  const newCard = card.cloneNode(true);
  const avatar = newCard.querySelector('.popup__avatar');
  const title = newCard.querySelector('.popup__title');
  const address = newCard.querySelector('.popup__text--address');
  const price = newCard.querySelector('.popup__text--price');
  const type = newCard.querySelector('.popup__type');
  const capacity = newCard.querySelector('.popup__text--capacity');
  const time = newCard.querySelector('.popup__text--time');
  const features = newCard.querySelectorAll('.popup__feature');
  const description = newCard.querySelector('.popup__description');
  const photosContainer = newCard.querySelector('.popup__photos');

  avatar.src = author.avatar ? author.avatar : hideElement(avatar);
  makeContent(title, offer.title);
  makeContent(address, offer.address);
  createPrice(price, offer.price);
  type.textContent = offer.type ? selectType(offer.type) : hideElement(type);
  capacity.textContent = offer.rooms && offer.guests ? createCapacity(offer.rooms, offer.guests) : hideElement(capacity);
  time.textContent = offer.checkin && offer.checkout ? createTime(offer.checkin, offer.checkout) : hideElement(time);
  selectFeatures(features, offer.features);
  makeContent(description, offer.description);
  offer.photos.length ? addPhoto(photosContainer, offer.photos) : hideElement(photosContainer);

  return newCard;
}

export { createCard };
