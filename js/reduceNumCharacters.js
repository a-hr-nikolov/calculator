export function reduceNumCharacters(string, charLimit) {
  // Guard clause
  if (string.length <= charLimit) return;

  // Decimal point number check; can be easily reduced
  if (string.slice(0, charLimit).includes('.')) {
    return string.slice(0, charLimit);
  }

  // The code below can easily be done in a single return statement
  // but I want to make it easier to read and understand.

  // We use -1 on exponentNumber, because the decimal point is after
  // the first digit. So if we multiply firstFourDigits by 10^exponentNumber
  // we will get the same number of digits as the initial number.
  const firstFourDigits = `${parseFloat(string.match(/^-?\d{4}/)[0]) / 1000}`;
  const exponentNumber = `${string.length - 1}`;

  return `${firstFourDigits}e+${exponentNumber}`;
}
