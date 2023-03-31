function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b == 0) return 'ERROR';
  return a / b;
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
      return a;
  }
}

export { operate };
