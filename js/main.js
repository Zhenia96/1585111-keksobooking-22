import { addMainMarker, implementAds } from './map.js';
import { getData } from './data.js';
import { showErrorMessage } from './util.js';

addMainMarker();

getData(implementAds, showErrorMessage);
