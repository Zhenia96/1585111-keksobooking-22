import { setFilterChangeListener, disableFilters } from './filter.js';

const formAddress = 'https://22.javascript.pages.academy/keksobooking';
const adsAddress = 'https://22.javascript.pages.academy/keksobooking/data';

const getData = (showErrorMessage) => {
  return fetch(adsAddress)
    .then((response) => {
      if (response.ok) {
        disableFilters(false);
        return response.json();
      }
    })
    .then((adsData) => setFilterChangeListener(adsData))
    .catch(() => {
      showErrorMessage();
    })
}

const sendData = (formData, showErrorPopup, onSuccess) => {
  return fetch(formAddress,
    {
      method: 'POST',
      body: formData,
    })
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        showErrorPopup();
      }
    })
    .catch(() => {
      showErrorPopup();
    })
}

export { getData, sendData };
