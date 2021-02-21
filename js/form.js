const form = document.querySelector('.ad-form');
const fields = form.querySelectorAll('fieldset')
const housingType = form.querySelector('#type');
const price = form.querySelector('#price');
const time = form.querySelector('.ad-form__element--time');
const timeIn = time.querySelector('#timein');
const timeOut = time.querySelector('#timeout');
const address = form.querySelector('#address');

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

price.max = 1000000;
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

export { disableForm, changeAddress };
