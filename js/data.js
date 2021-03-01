const getData = (implementAds, showErrorMessage) => {
  return fetch('https://22.javascript.pages.academy/keksobooking/data')
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
    })
    .then((adsData) => implementAds(adsData))
    .catch(() => {
      showErrorMessage();
    })
}

const sendData = (formData, showErrorPopup, onSuccess) => {
  return fetch('https://22.javascript.pages.academy/keksobooking',
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
