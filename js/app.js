import { add, subtract, multiply, divide } from './mathoperations.js';

// Selectors
const display = document.querySelector('.display');
const displayText = document.querySelector('.display-text');
const delButton = document.querySelector('.del');
const clearButton = document.querySelector('.clear');
const numberButtons = document.querySelectorAll('.number');
const operatorButtons = document.querySelectorAll('.operator');

// Variable declarations
let operandA = null;
let operandB = null;
let operation = null;

// Flag to overwrite input after operation is selected and on clear
let flagOverwrite = true;

// Event Listeners
delButton.addEventListener('click', deleteLastCharacter);
clearButton.addEventListener('click', clearDisplay);

numberButtons.forEach(item => {
  item.addEventListener('click', inputNumbers);
});

operatorButtons.forEach(item => {
  item.addEventListener('click', inputNumbers);
});

// functions
function inputNumbers(event) {
  const displayWidth =
    parseFloat(getComputedStyle(display).width) -
    parseFloat(getComputedStyle(display).paddingLeft) * 2;
  const displayTextWidth = parseFloat(getComputedStyle(displayText).width);
  const characterWidth = displayTextWidth / displayText.textContent.length;

  if (flagOverwrite === true) {
    flagOverwrite = false;
    displayText.textContent = '';
  }

  if (displayWidth < characterWidth * (displayText.textContent.length + 1))
    return;

  // if (displayText.textContent === '0') displayText.textContent = '';
  displayText.textContent += event.target.value;
}

function clearDisplay() {
  displayText.textContent = '0';
  flagOverwrite = true;
}

function deleteLastCharacter() {
  displayText.textContent = displayText.textContent.slice(0, -1);
  if (displayText.textContent.length === 0) clearDisplay();
}

function operate(operator, a, b) {
  switch (operator) {
    case 'add':
      return add(a, b);
    // break;
    case 'subtract':
      return subtract(a, b);
    // break;
    case 'multiply':
      return multiply(a, b);
    // break;
    case 'divide':
      return divide(a, b);
    // break;
    default:
      return 'NOT AN OPERATION';
  }
}

function prepareForOperation(event) {
  if (operandA === null) {
    operandA = parseFloat(displayText.textContent);
    operation = event.target.value;
    return;
  }
  operandB = parseFloat(displayText.textContent);
  operandA = operate(operation, operandA, operandB);
  displayText.textContent = `${operandA}`;
  flagOverwrite = true;
}

// https://mrbuddh4.github.io/calculator/
