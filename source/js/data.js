import { setFilterChangeListener, disableFilters } from './filter.js';

const FORM_ADDRESS = 'https://22.javascript.pages.academy/keksobooking';
const ADS_ADDRESS = 'https://22.javascript.pages.academy/keksobooking/data';

const getData = (showErrorMessage) => {
  return fetch(ADS_ADDRESS)
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

const sendData = (formData, showErrorPopup, showSuccessPopup, reset) => {
  return fetch(FORM_ADDRESS,
    {
      method: 'POST',
      body: formData,
    })
    .then((response) => {
      if (response.ok) {
        showSuccessPopup();
        reset();
      } else {
        showErrorPopup();
      }
    })
    .catch(() => {
      showErrorPopup();
    })
}

export { getData, sendData };
