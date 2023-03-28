import { add, subtract, multiply, divide } from './mathoperations.js';

const numbers = document.querySelectorAll('.number');
const display = document.querySelector('.display');

numbers.forEach(item => {
  item.addEventListener('click', inputNumbers);
});

function inputNumbers(event) {
  if (display.textContent === '0') display.textContent = '';
  display.textContent += event.target.value;
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
