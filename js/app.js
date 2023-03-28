import { add, subtract, multiply, divide } from './mathoperations.js';

const numbers = document.querySelectorAll('.number');
const display = document.querySelector('.display');
const displayText = document.querySelector('.display-text');
const delButton = document.querySelector('.del');
const clearButton = document.querySelector('.clear');

delButton.addEventListener('click', deleteLastCharacter);
clearButton.addEventListener('click', clearDisplay);

numbers.forEach(item => {
  item.addEventListener('click', inputNumbers);
});

function inputNumbers(event) {
  const displayWidth =
    parseFloat(getComputedStyle(display).width) -
    parseFloat(getComputedStyle(display).paddingLeft) * 2;
  const displayTextWidth = parseFloat(getComputedStyle(displayText).width);
  const characterWidth = displayTextWidth / displayText.textContent.length;

  console.log(getComputedStyle(display).padding);
  console.log(displayTextWidth);
  console.log(characterWidth);

  if (displayWidth < characterWidth * (displayText.textContent.length + 1))
    return;

  if (displayText.textContent === '0') displayText.textContent = '';
  displayText.textContent += event.target.value;
}

function clearDisplay() {
  displayText.textContent = '0';
}

function deleteLastCharacter() {
  displayText.textContent = displayText.textContent.slice(0, -1);
  if (displayText.textContent === '') displayText.textContent = '0';
}

function operate(operator, a, b) {
  switch (operator) {
    case '+':
      return add(a, b);
    // break;
    case '-':
      return subtract(a, b);
    // break;
    case '*':
      return multiply(a, b);
    // break;
    case '/':
      return divide(a, b);
    // break;
    default:
      return 'NOT AN OPERATION';
  }
}

// https://mrbuddh4.github.io/calculator/
