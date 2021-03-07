import { sendData, getData } from './data.js'
import { showSuccessPopup, showErrorPopup, showErrorMessage } from './util.js';
import { setMainMarkerPosition } from './map.js';
import { filter } from './filter.js';

const form = document.querySelector('.ad-form');
const allFields = form.querySelectorAll('fieldset')
const housingTypeField = form.querySelector('#type');
const priceField = form.querySelector('#price');
const time = form.querySelector('.ad-form__element--time');
const timeInField = time.querySelector('#timein');
const timeOutField = time.querySelector('#timeout');
const addressField = form.querySelector('#address');
const capacityField = form.querySelector('#capacity');
const capacityOptions = capacityField.querySelectorAll('option');
const roomField = form.querySelector('#room_number');
const submitButton = form.querySelector('.ad-form__submit');
const resetButton = form.querySelector('.ad-form__reset');
const titleField = form.querySelector('#title');

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
  priceField.placeholder = minPrice;
  priceField.min = minPrice;
}

changeMinPrice(housingTypeField.value);
housingTypeField.addEventListener('change', () => changeMinPrice(housingTypeField.value));

time.addEventListener('change', (evt) => {
  const eventInitiator = evt.target;
  if (eventInitiator.id === 'timein') {
    timeOutField.value = eventInitiator.value;
  } else {
    timeInField.value = eventInitiator.value;
  }
})

const disableForm = (status) => {
  if (status) {
    form.classList.add('ad-form--disabled');
  } else {
    form.classList.remove('ad-form--disabled');
  }
  allFields.forEach(field => {
    field.disabled = status;
  })
}

addressField.readOnly = 'true';

const changeAddress = (firstCoordinate, secondCoordinate) => {
  addressField.value = `${firstCoordinate}, ${secondCoordinate}`;
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
  filter.reset();
  getData(showErrorMessage);
  changeMinPrice(housingTypeField.value);
  setMainMarkerPosition();
}

const onSuccess = () => {
  showSuccessPopup();
  reset();
}

capacityField.addEventListener('change', () => {
  const currentGuestsCount = capacityField.value;
  const currentRoomsCount = roomField.value;
  if (isGuestsCountValid(currentGuestsCount, currentRoomsCount)) {
    removeInvalidClass(capacityField);
  }
})

capacityField.addEventListener('click', () => {
  const currentRoomsCount = roomField.value;
  capacityOptions.forEach((option) => {
    const currentGuestsCount = option.value;
    if (!isGuestsCountValid(currentGuestsCount, currentRoomsCount)) {
      option.disabled = true;
    }
  })
})

roomField.addEventListener('change', () => {
  const currentGuestsCount = capacityField.value;
  const currentRoomsCount = roomField.value;
  if (isGuestsCountValid(currentGuestsCount, currentRoomsCount)) {
    removeInvalidClass(capacityField);
  }
})

roomField.addEventListener('click', () => {
  capacityOptions.forEach((option) => {
    option.disabled = false;
  })
})

titleField.addEventListener('input', () => {
  const titleLength = titleField.value.length;
  if (titleLength < titleField.minLength) {
    titleField.setCustomValidity(`Слишком короткий заголовок. Введите еще ${titleField.minLength - titleLength} символов`);
  } else if (titleLength > titleField.maxLength) {
    titleField.setCustomValidity(`Слишком длинный заголовок. Удалите ${titleLength - titleField.maxLength} символов`);
  } else {
    titleField.setCustomValidity('');
    removeInvalidClass(titleField);
  }
  titleField.reportValidity();
})

priceField.addEventListener('input', () => {
  const currentPrice = Number(priceField.value);
  const minPrice = Number(priceField.min);
  const maxPrice = Number(priceField.max);
  if (currentPrice < minPrice) {
    priceField.setCustomValidity(`Цена должна быть не менее ${minPrice}`);
  } else if (currentPrice > maxPrice) {
    priceField.setCustomValidity(`Цена должна быть не более ${maxPrice}`);
  } else {
    priceField.setCustomValidity('');
    removeInvalidClass(priceField);
  }
  priceField.reportValidity();
})

submitButton.addEventListener('click', () => {
  showSuccessPopup();
  indicateInvalidField(titleField);
  indicateInvalidField(priceField);
  const currentGuestsCount = capacityField.value;
  const currentRoomsCount = roomField.value;
  if (!isGuestsCountValid(currentGuestsCount, currentRoomsCount)) {
    addInvalidClass(capacityField);
  }
})

resetButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  reset();
})

form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const currentGuestsCount = capacityField.value;
  const currentRoomsCount = roomField.value;
  if (isGuestsCountValid(currentGuestsCount, currentRoomsCount)) {
    const formData = new FormData(form);
    sendData(formData, showErrorPopup, onSuccess);
  }
})

export { disableForm, changeAddress, form };
