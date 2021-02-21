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

export { getRandomNumber, getRandomElements, hideElement };
