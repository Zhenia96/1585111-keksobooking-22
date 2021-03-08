const errorPopupTemplate = document.querySelector('#error').content;
const errorPopup = errorPopupTemplate.querySelector('.error');
const errorPopupButton = errorPopup.querySelector('.error__button');
const successPopupTemplate = document.querySelector('#success').content;
const successPopup = successPopupTemplate.querySelector('.success');
const main = document.querySelector('main');
const ERROR_MESSAGE_SHOW_TIME = 6000;
const KEY_ESCAPE = 'Escape';

const hideElement = (element) => {
  element.classList.add('visually-hidden');
}

const showErrorMessage = () => {
  const errorMessage = document.createElement('div');

  errorMessage.style.position = 'absolute';
  errorMessage.style.top = '0';
  errorMessage.style.left = '20%';
  errorMessage.style.zIndex = '1000';
  errorMessage.style.padding = '10px';
  errorMessage.style.width = '60%';
  errorMessage.style.textAlign = 'center';
  errorMessage.style.backgroundColor = 'orange';
  errorMessage.textContent = 'Конишуа, невозможно отобразить объявления';

  document.body.appendChild(errorMessage);

  setTimeout(() => errorMessage.remove(), ERROR_MESSAGE_SHOW_TIME);
};

const showSuccessPopup = () => {
  successPopup.style.zIndex = '1000';
  main.appendChild(successPopup);
  document.addEventListener('keydown', (evt) => {
    if (evt.code === KEY_ESCAPE) {
      successPopup.remove();
    }
  })
  document.addEventListener('click', () => {
    successPopup.remove();
  })
}

const showErrorPopup = () => {
  errorPopup.style.zIndex = '1000';
  main.appendChild(errorPopup);

  document.addEventListener('keydown', (evt) => {
    if (evt.code === KEY_ESCAPE) {
      errorPopup.remove();
    }
  })

  document.addEventListener('click', () => {
    errorPopup.remove();
  })

  errorPopupButton.addEventListener('click', () => {
    errorPopup.remove();
  })
}

export { hideElement, showErrorMessage, showSuccessPopup, showErrorPopup };
