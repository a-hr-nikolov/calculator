import { add, subtract, multiply, divide } from './mathoperations.js';

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

console.log(operate('*', 5, 10));

// https://mrbuddh4.github.io/calculator/
