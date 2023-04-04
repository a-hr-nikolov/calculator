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
const plusMinusButton = document.querySelector('.plus-minus');

// The character limit can be either dynamic or static.
// If the limit is dynamic, the font size of the display will be static.
// If the limit is static, the font size of the display will be dynamic.
// Here I've chosen to implement dynamic font size, but the code for
// a dynamic character limit exists on a module (calcCharacterLimit.js).
let characterLimit = 17;

// Always makes sure that the font is small enough to fit 17 chars on screen;
display.style.fontSize = calcDisplayFontSize(characterLimit);

// Variable declarations
let operandA = null;
let operandB = null;
let operation = null;

// Flag to overwrite input after operation is selected and on clear
let flagOverwrite = true;

// Event Listeners
delButton.addEventListener('click', deleteLastCharacter);
clearButton.addEventListener('click', clearDisplay);
pointButton.addEventListener('click', inputDecimal);
plusMinusButton.addEventListener('click', negateNumber);

numberButtons.forEach(item => {
  item.addEventListener('click', inputNumbers);
});

operatorButtons.forEach(item => {
  item.addEventListener('click', executeOperationAlgorithm);
});

window.addEventListener('keydown', routeInput);

// Functions
function routeInput(event) {
  // To prevent enter from activating the focused button
  if (event.key === 'Enter') event.preventDefault();

  // To pass that object when calling the other event handler functions
  const eventObj = {
    target: { value: event.key },
  };

  if (/^\.$/.test(event.key)) inputDecimal();
  if (/^\d$/.test(event.key)) inputNumbers(eventObj);
  if (/^[\*\=\-\+\/]$/.test(event.key) || event.key === 'Enter')
    executeOperationAlgorithm(eventObj);
  if (event.key === 'Escape') clearDisplay();
  if (event.key === 'Backspace') deleteLastCharacter();
}

function calcDisplayFontSize(charLimit) {
  // Numeric value for the responsive width and font size of the display
  const displayWidth =
    parseFloat(getComputedStyle(display).width) -
    parseFloat(getComputedStyle(display).paddingLeft) * 2;
  const displayFontSize = parseFloat(getComputedStyle(display).fontSize);

  // Though the initial calculation is always done on a single character (0)
  // it is better to have the flexibility to change the font size regardless
  // of how many characters are already on the screen.
  const displayTextWidth = parseFloat(getComputedStyle(displayText).width);
  const characterWidth = displayTextWidth / displayText.textContent.length;

  // Calculating the proportions to adjust font size
  const charLimitAtCurrentFontSize = Math.floor(displayWidth / characterWidth);
  const proportionAdjustment = charLimitAtCurrentFontSize / charLimit;
  return `${Math.ceil(displayFontSize * proportionAdjustment)}px`;
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

function negateNumber() {
  const newNumber = `${parseFloat(displayText.textContent) * -1}`;
  if (newNumber.length > characterLimit)
    newNumber = reduceNumCharacters(newNumber, characterLimit);
  displayText.textContent = newNumber;
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
  console.log(stringA);
  if (stringA.length > characterLimit) {
    console.log(stringA);
    displayText.textContent = reduceNumCharacters(stringA, characterLimit);
  } else displayText.textContent = stringA;

  operation = event.target.value;

  if (operation === '=' || operation === 'Enter') {
    operandA = null;
    operandB = null;
  }
}

// https://mrbuddh4.github.io/calculator/

// TODO
// When exceeding character limit, display font shrinks by a few
// pixels, until it gets to a max character limit.
// This is done through a onChange eventListener.

// Add exponentiation, sqrt, percent and button inputs

// How should pressing multiple operators without input change work?

// Check if the rounding function works

// Known issue - Char limit on initial load is problematic, because
// the JS doesn't apply styling for some reason.
