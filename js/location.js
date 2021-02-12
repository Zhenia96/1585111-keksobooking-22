import { getRandomNumber } from './util.js';

const createLocation = () => {
  return {
    x: getRandomNumber(35.65000, 35.70000, 5),
    y: getRandomNumber(139.70000, 139.80000, 5),
  }
}

export { createLocation };
