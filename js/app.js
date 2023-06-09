import { operate } from './mathoperations.js';
import { reduceNumCharacters } from './reduceNumCharacters.js';
import { calcCharacterLimit } from './calcCharacterLimit.js';

// Selectors
const display = document.querySelector('.display');
const displayText = document.querySelector('.display-text');
const delButton = document.querySelector('.del');
const clearButton = document.querySelector('.clear');
const numberButtons = document.querySelectorAll('.number');
const pointButton = document.querySelector('.point');
const operatorButtons = document.querySelectorAll('.operator');
const plusMinusButton = document.querySelector('.plus-minus');

// Because the font takes a while to load and causes issues
// I think I'll be trying to insert my own font
let characterLimit;
setTimeout(() => {
  characterLimit = calcCharacterLimit(display, displayText);
}, 1000);

// Variable declarations
let operandA = null;
let operandB = null;
let operation = null;
let operationLockedFlag = false;

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
  // To prevent undesired default behavior of some keys
  if (event.key === 'Enter') event.preventDefault();
  if (event.key === '/') event.preventDefault();

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
  operatorButtons.forEach(item => {
    item.classList.remove('active');
  });
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
  let newNumber = `${parseFloat(displayText.textContent) * -1}`;
  if (newNumber.length > characterLimit)
    newNumber = reduceNumCharacters(newNumber, characterLimit);
  displayText.textContent = newNumber;
}

function executeOperationAlgorithm(event) {
  if (operandA === null) {
    operandA = parseFloat(displayText.textContent);
    pickOperation();
    flagOverwrite = true;
    return;
  }

  if (flagOverwrite === true && /\D/.test(event.target.value)) {
    pickOperation();
    return;
  }

  flagOverwrite = true;

  operandB = parseFloat(displayText.textContent);
  operandA = operate(operation, operandA, operandB);

  const stringA = `${operandA}`;
  if (stringA.length > characterLimit) {
    displayText.textContent = reduceNumCharacters(stringA, characterLimit);
  } else displayText.textContent = stringA;

  pickOperation();

  function pickOperation() {
    operation = event.target.value;
    operatorButtons.forEach(item => {
      if (item.value === event.target.value) item.classList.add('active');
      else item.classList.remove('active');
    });
  }
}

// TODO

// Add exponentiation, sqrt, percent and corresponding button inputs
