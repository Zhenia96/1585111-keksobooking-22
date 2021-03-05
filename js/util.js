const errorTemplate = document.querySelector('#error').content;
const error = errorTemplate.querySelector('.error');
const errorButton = error.querySelector('.error__button');
const successTemplate = document.querySelector('#success').content;
const success = successTemplate.querySelector('.success');
const main = document.querySelector('main');
const keyEscape = 'Escape';

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

const getRandomElements = (array) => {
  let result = [];

  for (let i = 0; i < array.length; i++) {
    if (getRandomNumber(0, 1)) {
      result.push(array[i]);
    }
  }

  return result;
}

const hideElement = (element) => {
  element.classList.add('visually-hidden');
}

const showErrorMessage = () => {
  const ERROR_MESSAGE_SHOW_TIME = 6000;
  const errorMessageBlock = document.createElement('div');

  errorMessageBlock.style.position = 'absolute';
  errorMessageBlock.style.top = '0';
  errorMessageBlock.style.left = '20%';
  errorMessageBlock.style.zIndex = '1000';
  errorMessageBlock.style.padding = '10px';
  errorMessageBlock.style.width = '60%';
  errorMessageBlock.style.textAlign = 'center';
  errorMessageBlock.style.backgroundColor = 'orange';
  errorMessageBlock.textContent = 'Конишуа, невозможно отобразить объявления';

  document.body.appendChild(errorMessageBlock);

  setTimeout(() => errorMessageBlock.remove(), ERROR_MESSAGE_SHOW_TIME);
};

const showSuccessPopup = () => {
  success.style.zIndex = '1000';
  main.appendChild(success);
  document.addEventListener('keydown', (evt) => {
    if (evt.code === keyEscape) {
      success.remove();
    }
  })
  document.addEventListener('click', () => {
    success.remove();
  })
}

const showErrorPopup = () => {
  error.style.zIndex = '1000';
  main.appendChild(error);

  document.addEventListener('keydown', (evt) => {
    if (evt.code === keyEscape) {
      error.remove();
    }
  })

  document.addEventListener('click', () => {
    error.remove();
  })

  errorButton.addEventListener('click', () => {
    error.remove();
  })
}

export { getRandomNumber, getRandomElements, hideElement, showErrorMessage, showSuccessPopup, showErrorPopup };
