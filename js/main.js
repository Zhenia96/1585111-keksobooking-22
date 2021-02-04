'use strict';

const generateNumber = (min, max) => {
  let number;

  while (!(number >= min && number <= max)) {
    number = Math.random() * max;
  }
  return number;
}

const getRandomNumber = (firstLimit, secondLimit, simbolCount) => {
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

getRandomNumber(1, 2, 3);
