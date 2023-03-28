import { add, subtract, multiply, divide } from './mathoperations.js';

const numbers = document.querySelectorAll('.number');
const display = document.querySelector('.display');
const delButton = document.querySelector('.del');
const clearButton = document.querySelector('.clear');

delButton.addEventListener('click', deleteLastCharacter);
clearButton.addEventListener('click', clearDisplay);

numbers.forEach(item => {
  item.addEventListener('click', inputNumbers);
});

function inputNumbers(event) {
  if (display.textContent === '0') display.textContent = '';
  display.textContent += event.target.value;
}

function clearDisplay() {
  display.textContent = '0';
}

function deleteLastCharacter() {
  display.textContent = display.textContent.slice(0, -1);
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
