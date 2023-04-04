export function reduceNumCharacters(string, charLimit) {
  // Guard clause
  if (string.length <= charLimit) return;

  // The block below handles JavaScript's built-in character reducer.
  if (string.includes('e')) {
    let arrayFromString = string.split('e');

    // +1 accounts for the 'e' that disappears in the split
    const exponentLength = arrayFromString[1].length + 1;

    // Reducing the number of characters before exponent
    const baseCharLimit = charLimit - exponentLength;
    const reducedBase = reduceNumCharacters(arrayFromString[0], baseCharLimit);

    // Updating the exponent to account for the reduced characters
    let exponentValue = parseInt(arrayFromString[1]);
    exponentValue += arrayFromString[0].length - reducedBase.length;

    return `${reducedBase}e+${exponentValue}`;
  }

  // Decimal point check handles simpler rounding cases
  if (string.slice(0, charLimit).includes('.')) {
    return roundToLimit(string, charLimit);
  }

  // -1 on exponentNumber, because the decimal point is after
  // the first digit. Multiplying firstFourDigits by 10^exponentNumber
  // returns the same number of digits as the initial number.
  const firstFourDigits = `${parseFloat(roundToLimit(string, 4)) / 1000}`;
  const exponentValue = `${string.length - 1}`;

  return `${firstFourDigits}e+${exponentValue}`;

  // Handling rounding when shortening the numbers
  function roundToLimit(string, characterLimit) {
    // + 1 accounts for the number we need to know in order to round
    const reducedStringToArray = string.slice(0, characterLimit + 1).split('');
    const filteredString = reducedStringToArray
      .filter(item => item !== '.')
      .join('');
    let roundedNumber = `${Math.round(+filteredString / 10)}`;

    if (reducedStringToArray.includes('.')) {
      const placeOfDecimal = reducedStringToArray.indexOf('.');
      console.log(placeOfDecimal);
      roundedNumber = roundedNumber.split('');
      roundedNumber.splice(placeOfDecimal, 0, '.');
      console.log(roundedNumber);
      roundedNumber = roundedNumber.join('');
    }

    return roundedNumber;
  }
}
