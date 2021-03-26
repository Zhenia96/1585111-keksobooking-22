import { addMainMarker, mapImage } from './map.js';
import { getData } from './data.js';
import { showErrorMessage } from './util.js';
import { disableFilters } from './filter.js';
import { disableForm } from './form.js';

disableForm(true);
disableFilters(true);

mapImage.addEventListener('load', () => {
  disableForm(false);
  addMainMarker();
  getData(showErrorMessage);
  mapImage.removeEventListener('load');
});
