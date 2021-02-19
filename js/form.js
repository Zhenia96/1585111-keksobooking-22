const form = document.querySelector('.ad-form');
const housingType = form.querySelector('#type');
const price = form.querySelector('#price');
const time = form.querySelector('.ad-form__element--time');
const timeIn = time.querySelector('#timein');
const timeOut = time.querySelector('#timeout');

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
  let minPrice = getMinPrice(housingType);
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
