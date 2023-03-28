import { add, subtract, multiply, divide } from './mathoperations.js';

const buttons = document.querySelectorAll('button');
const numbers = document.querySelectorAll('.number');
const inputField = document.querySelector('#input-field');

numbers.forEach(item => {
  item.addEventListener('click', inputNumbers);
});

function inputNumbers(event) {
  inputField.value += event.target.value;
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
