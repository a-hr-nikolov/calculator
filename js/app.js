import { operate } from './mathoperations.js';
import { reduceNumCharacters } from './reduceNumCharacters.js';

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
  item.addEventListener('click', executeOperationAlgorithm);
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
  // Disabling multiple consecutive zeros before decimal point
  if (
    (flagOverwrite === true || displayText.textContent === '0') &&
    event.target.value === '0'
  ) {
    displayText.textContent = '0';
    flagOverwrite = true;
    return;
  }

  if (flagOverwrite === true) {
    flagOverwrite = false;
    displayText.textContent = '';
  }

  if (displayText.textContent.length >= characterLimit) return;

  displayText.textContent += event.target.value;
}

function inputDecimal() {
  // Guard clause to stop multiple decimal points
  if (displayText.textContent.includes('.')) return;

  // Allowing point overwriting to assume '0.'
  if (flagOverwrite === true) {
    flagOverwrite = false;
    displayText.textContent = '0';
  }
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

function executeOperationAlgorithm(event) {
  flagOverwrite = true;
  if (operandA === null) {
    operandA = parseFloat(displayText.textContent);
    operation = event.target.value;
    return;
  }
  operandB = parseFloat(displayText.textContent);
  operandA = operate(operation, operandA, operandB);

  const stringA = `${operandA}`;
  if (stringA.length > characterLimit) {
    console.log(stringA);
    displayText.textContent = reduceNumCharacters(stringA, characterLimit);
  } else displayText.textContent = stringA;

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
