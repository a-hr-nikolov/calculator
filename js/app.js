import { operate } from './mathoperations.js';

// Selectors
const display = document.querySelector('.display');
const displayText = document.querySelector('.display-text');
const delButton = document.querySelector('.del');
const clearButton = document.querySelector('.clear');
const numberButtons = document.querySelectorAll('.number');
const pointButton = document.querySelector('.point');
const operatorButtons = document.querySelectorAll('.operator');

// Variable declarations
let characterLimit = calcCharacterLimit();
let operandA = null;
let operandB = null;
let operation = null;

// Flag to overwrite input after operation is selected and on clear
let flagOverwrite = true;

// Event Listeners
delButton.addEventListener('click', deleteLastCharacter);
clearButton.addEventListener('click', clearDisplay);
pointButton.addEventListener('click', inputDecimal);

numberButtons.forEach(item => {
  item.addEventListener('click', inputNumbers);
});

operatorButtons.forEach(item => {
  item.addEventListener('click', prepareForOperation);
});

// Functions
function calcCharacterLimit() {
  const displayWidth =
    parseFloat(getComputedStyle(display).width) -
    parseFloat(getComputedStyle(display).paddingLeft) * 2;

  const displayTextWidth = parseFloat(getComputedStyle(displayText).width);

  const characterWidth = displayTextWidth / displayText.textContent.length;

  return Math.floor(displayWidth / characterWidth);
}

function inputNumbers(event) {
  if (flagOverwrite === true) {
    flagOverwrite = false;
    displayText.textContent = '';
  }

  if (displayText.textContent.length >= characterLimit) return;

  displayText.textContent += event.target.value;
}

function inputDecimal() {
  if (displayText.textContent.includes('.')) return;
  if (flagOverwrite === true) flagOverwrite = false;
  displayText.textContent += '.';
}

function clearDisplay() {
  displayText.textContent = '0';
  flagOverwrite = true;
  operandA = null;
  operandB = null;
}

function deleteLastCharacter() {
  if (flagOverwrite === true) {
    displayText.textContent = '0';
    return;
  }

  displayText.textContent = displayText.textContent.slice(0, -1);

  if (displayText.textContent.length === 0) {
    displayText.textContent = '0';
    flagOverwrite = true;
  }
}

function reduceNumCharacters(string, charLimit) {
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

function prepareForOperation(event) {
  flagOverwrite = true;
  if (operandA === null) {
    operandA = parseFloat(displayText.textContent);
    operation = event.target.value;
    return;
  }
  operandB = parseFloat(displayText.textContent);
  operandA = operate(operation, operandA, operandB);

  let stringA = `${operandA}`;
  if (stringA.length > characterLimit) {
    console.log(stringA);
    displayText.textContent = reduceNumCharacters(stringA, characterLimit);
  } else displayText.textContent = `${operandA}`;

  operation = event.target.value;

  if (operation === 'return') {
    operandA = null;
    operandB = null;
  }
}

// https://mrbuddh4.github.io/calculator/

// TODO
// Shouldn't be able to input multiple starting 0.
// When exceeding character limit, display font shrinks by a few
// pixels, until it gets to a max character limit.
// This is done through a onChange eventListener.

// Add exponentiation, sqrt,

// Add button inputs
