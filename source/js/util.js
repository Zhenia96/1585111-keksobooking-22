const errorPopupTemplate = document.querySelector('#error').content;
const errorPopup = errorPopupTemplate.querySelector('.error');
const errorPopupButton = errorPopup.querySelector('.error__button');
const successPopupTemplate = document.querySelector('#success').content;
const successPopup = successPopupTemplate.querySelector('.success');
const main = document.querySelector('main');
const ERROR_MESSAGE_SHOW_TIME = 6000;
const KEY_ESCAPE = 'Escape';
const FILE_TYPES_FOR_PICTURE = ['.jpg', '.jpeg', '.png'];

const hideElement = (element) => element.classList.add('visually-hidden');

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
}

const removeSuccessPopup = () => {
  successPopup.remove();
  document.removeEventListener('click', successPopupClickHandler);
  document.removeEventListener('keydown', successPopupKeydownHandler);
}

const successPopupKeydownHandler = (evt) => {
  if (evt.code === KEY_ESCAPE) {
    removeSuccessPopup();
  }
}

const successPopupClickHandler = () => removeSuccessPopup();

const showSuccessPopup = () => {
  successPopup.style.zIndex = '1000';
  main.appendChild(successPopup);
  document.addEventListener('keydown', successPopupKeydownHandler)
  document.addEventListener('click', successPopupClickHandler)
}

const removeErrorPopup = () => {
  errorPopup.remove();
  document.removeEventListener('keydown', errorPopupKeydownHandler);
  document.removeEventListener('click', errorPopupClickHandler);
  errorPopupButton.removeEventListener('click', errorPopupClickHandler);
}

const errorPopupClickHandler = () => {
  removeErrorPopup();
}

const errorPopupKeydownHandler = (evt) => {
  if (evt.code === KEY_ESCAPE) {
    removeErrorPopup();
  }
}

const showErrorPopup = () => {
  errorPopup.style.zIndex = '1000';
  main.appendChild(errorPopup);

  document.addEventListener('keydown', errorPopupKeydownHandler);
  document.addEventListener('click', errorPopupClickHandler);
  errorPopupButton.addEventListener('click', errorPopupClickHandler);
}

const isPicture = (pictureName) => {
  pictureName.toLowerCase();
  return FILE_TYPES_FOR_PICTURE.some((filesType) => pictureName.endsWith(filesType));
}

export { hideElement, showErrorMessage, showSuccessPopup, showErrorPopup, isPicture };
