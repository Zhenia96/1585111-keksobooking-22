import { sendData } from './data.js'
import { showSuccessPopup, showErrorPopup } from './util.js';
import { setMainMarkerPosition, filterForm } from './map.js';

const form = document.querySelector('.ad-form');
const fields = form.querySelectorAll('fieldset')
const housingType = form.querySelector('#type');
const price = form.querySelector('#price');
const time = form.querySelector('.ad-form__element--time');
const timeIn = time.querySelector('#timein');
const timeOut = time.querySelector('#timeout');
const address = form.querySelector('#address');
const capacity = form.querySelector('#capacity');
const capacityOptions = capacity.querySelectorAll('option');
const roomNumber = form.querySelector('#room_number');
const submitButton = form.querySelector('.ad-form__submit');
const resetButton = form.querySelector('.ad-form__reset');
const title = form.querySelector('#title');

const getMinPrice = (housingType) => {
  switch (housingType) {
    case 'flat':
      return 1000;
    case 'house':
      return 5000;
    case 'palace':
      return 10000;
    default:
      return 0;
  }
}

const changeMinPrice = (housingType) => {
  const minPrice = getMinPrice(housingType);
  price.placeholder = minPrice;
  price.min = minPrice;
}

changeMinPrice(housingType.value);
housingType.addEventListener('change', () => changeMinPrice(housingType.value));

time.addEventListener('change', (evt) => {
  const eventInitiator = evt.target;
  if (eventInitiator.id === 'timein') {
    timeOut.value = eventInitiator.value;
  } else {
    timeIn.value = eventInitiator.value;
  }
})

const disableForm = (status) => {
  if (status) {
    form.classList.add('ad-form--disabled');
  } else {
    form.classList.remove('ad-form--disabled');
  }
  fields.forEach(field => {
    field.disabled = status;
  })
}

address.readOnly = 'true';

const changeAddress = (firstCoordinate, secondCoordinate) => {
  address.value = `${firstCoordinate}, ${secondCoordinate}`;
}

const removeInvalidClass = (field) => {
  field.classList.remove('invalid');
}

const addInvalidClass = (field) => {
  field.classList.add('invalid');
}

const indicateInvalidField = (field) => {
  if (!field.checkValidity()) {
    addInvalidClass(field);
  } else {
    removeInvalidClass(field);
  }
}

const getPossibleGuestsCount = (roomsCount) => {
  switch (roomsCount) {
    case '1':
      return ['1'];
    case '2':
      return ['1', '2'];
    case '3':
      return ['1', '2', '3'];
    default:
      return ['0'];
  }
}

const isGuestsCountValid = (guestsCount, roomsCount) => {
  const possibleGuestsCount = getPossibleGuestsCount(roomsCount);
  if (possibleGuestsCount.includes(guestsCount)) {
    return true;
  }
  return false;
}

const reset = () => {
  form.reset();
  filterForm.reset();
  changeMinPrice(housingType.value);
  setMainMarkerPosition();
}

const onSuccess = () => {
  showSuccessPopup();
  reset();
}

capacity.addEventListener('change', () => {
  const currentGuestsCount = capacity.value;
  const currentRoomsCount = roomNumber.value;
  if (isGuestsCountValid(currentGuestsCount, currentRoomsCount)) {
    removeInvalidClass(capacity);
  }
})

capacity.addEventListener('click', () => {
  const currentRoomsCount = roomNumber.value;
  capacityOptions.forEach((option) => {
    const currentGuestsCount = option.value;
    if (!isGuestsCountValid(currentGuestsCount, currentRoomsCount)) {
      option.disabled = true;
    }
  })
})

roomNumber.addEventListener('change', () => {
  const currentGuestsCount = capacity.value;
  const currentRoomsCount = roomNumber.value;
  if (isGuestsCountValid(currentGuestsCount, currentRoomsCount)) {
    removeInvalidClass(capacity);
  }
})

roomNumber.addEventListener('click', () => {
  capacityOptions.forEach((option) => {
    option.disabled = false;
  })
})

title.addEventListener('input', () => {
  const titleLength = title.value.length;
  if (titleLength < title.minLength) {
    title.setCustomValidity(`Слишком короткий заголовок. Введите еще ${title.minLength - titleLength} символов`);
  } else if (titleLength > title.maxLength) {
    title.setCustomValidity(`Слишком длинный заголовок. Удалите ${titleLength - title.maxLength} символов`);
  } else {
    title.setCustomValidity('');
    removeInvalidClass(title);
  }
  title.reportValidity();
})

price.addEventListener('input', () => {
  const currentPrice = Number(price.value);
  const minPrice = Number(price.min);
  const maxPrice = Number(price.max);
  if (currentPrice < minPrice) {
    price.setCustomValidity(`Цена должна быть не менее ${minPrice}`);
  } else if (currentPrice > maxPrice) {
    price.setCustomValidity(`Цена должна быть не более ${maxPrice}`);
  } else {
    price.setCustomValidity('');
    removeInvalidClass(price);
  }
  price.reportValidity();
})

submitButton.addEventListener('click', () => {
  showSuccessPopup();
  indicateInvalidField(title);
  indicateInvalidField(price);
  const currentGuestsCount = capacity.value;
  const currentRoomsCount = roomNumber.value;
  if (!isGuestsCountValid(currentGuestsCount, currentRoomsCount)) {
    addInvalidClass(capacity);
  }
})

resetButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  reset();
})

form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const currentGuestsCount = capacity.value;
  const currentRoomsCount = roomNumber.value;
  if (isGuestsCountValid(currentGuestsCount, currentRoomsCount)) {
    const formData = new FormData(form);
    sendData(formData, showErrorPopup, onSuccess);
  }
})

export { disableForm, changeAddress, form };
