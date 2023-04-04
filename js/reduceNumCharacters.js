export function reduceNumCharacters(string, charLimit) {
  // Guard clause
  if (string.length <= charLimit) return;

  // The block below handles JavaScript's built-in character reducer.
  if (string.includes('e')) {
    let arrayFromString = string.split('e');

    // +1 accounts for the 'e' that disappears in the split
    const exponentLength = arrayFromString[1].length + 1;

    // For reducing the number of characters before exponent
    const baseCharLimit = charLimit - exponentLength;
    const reducedBase = reduceNumCharacters(arrayFromString[0], baseCharLimit);

    // Updating the exponent to account for the reduced characters
    let exponentValue = parseInt(arrayFromString[1]);
    exponentValue += arrayFromString[0].length - reducedBase.length;

    return `${reducedBase}e+${exponentValue}`;
  }

  // Decimal point number check to round the numbers
  if (string.slice(0, charLimit).includes('.')) {
    return string.slice(0, charLimit);
  }

  // The code below can easily be done in a single return statement
  // but I want to make it easier to read and understand.

  // We use -1 on exponentNumber, because the decimal point is after
  // the first digit. So if we multiply firstFourDigits by 10^exponentNumber
  // we will get the same number of digits as the initial number.
  // const firstFourDigits = `${parseFloat(string.match(/^-?\d{4}/)[0]) / 1000}`;
  // const exponentNumber = `${string.length - 1}`;

  const firstFourDigits = `${parseFloat(roundToLimit(string, 4)) / 1000}`;
  const exponentNumber = `${string.length - 1}`;

  return `${firstFourDigits}e+${exponentNumber}`;

  // Functions
  function roundToLimit(string, characterLimit) {
    // + 1 accounts for the number we need to know in order to round
    let reducedStringToArray = string.slice(0, characterLimit + 1).split('');
    let filteredString = reducedStringToArray
      .filter(item => item !== '.')
      .join('');
    let roundedNumber = `${Math.round(+filteredString / 10)}`;

    if (reducedStringToArray.includes('.')) {
      const placeOfDecimal = reducedStringToArray.indexOf('.') - 1;
      roundedNumber = roundedNumber.split('');
      roundedNumber.splice(placeOfDecimal, 0, '.');
      roundedNumber = roundedNumber.join('');
    }

    return roundedNumber;
  }
}
