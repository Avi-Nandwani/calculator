const display = document.getElementById('display');
let firstOperand = '';
let secondOperand = '';
let currentOperator = null;
let shouldResetScreen = false;

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
  if (b === 0) return "Err: Can't /0!";
  return a / b;
}

function operate(operator, a, b) {
  a = parseFloat(a);
  b = parseFloat(b);
  if (operator === '+') return add(a, b);
  if (operator === '-') return subtract(a, b);
  if (operator === '×') return multiply(a, b);
  if (operator === '÷') return divide(a, b);
  return b;
}

function updateDisplay(value) {
  display.textContent = value;
}

function appendNumber(number) {
  if (display.textContent === '0' || shouldResetScreen) {
    updateDisplay(number);
    shouldResetScreen = false;
  } else if (display.textContent.length < 14) {
    updateDisplay(display.textContent + number);
  }
}

function chooseOperator(operator) {
  if (currentOperator !== null && !shouldResetScreen) {
    evaluate();
  }
  firstOperand = display.textContent;
  currentOperator = operator;
  shouldResetScreen = true;
}

function appendDecimal() {
  if (shouldResetScreen) updateDisplay('0');
  if (!display.textContent.includes('.')) {
    updateDisplay(display.textContent + '.');
    shouldResetScreen = false;
  }
}

function clearCalculator() {
  firstOperand = '';
  secondOperand = '';
  currentOperator = null;
  shouldResetScreen = false;
  updateDisplay('0');
}

function backspace() {
  if (shouldResetScreen || display.textContent.length === 1) {
    updateDisplay('0');
    shouldResetScreen = false;
  } else {
    updateDisplay(display.textContent.slice(0, -1));
  }
}

function evaluate() {
  if (currentOperator === null || shouldResetScreen) return;
  secondOperand = display.textContent;
  const result = operate(currentOperator, firstOperand, secondOperand);
  updateDisplay(typeof result === "number" && !Number.isInteger(result) ? parseFloat(result.toFixed(7)) : result);
  currentOperator = null;
  shouldResetScreen = true;
}

// Button events
document.querySelectorAll('[data-number]').forEach(btn => btn.addEventListener('click', (e) => {
  appendNumber(e.target.getAttribute('data-number'));
}));

document.querySelectorAll('[data-action]').forEach(btn => {
  btn.addEventListener('click', (e) => {
    const action = e.target.getAttribute('data-action');
    if (['add','subtract','multiply','divide'].includes(action)) {
      chooseOperator(e.target.textContent);
    }
    if (action === 'equals') evaluate();
    if (action === 'decimal') appendDecimal();
    if (action === 'clear') clearCalculator();
    if (action === 'backspace') backspace();
  });
});

//Listening from keyboard
window.addEventListener('keydown', (e) => {
    if (e.key >= '0' && e.key <= '9') appendNumber(e.key);
    if (e.key === '.') appendDecimal();
    if (e.key === '+' || e.key === '-') chooseOperator(e.key);
    if (e.key === '*') chooseOperator('×');
    if (e.key === '/') chooseOperator('÷');
    if (e.key === 'Enter' || e.key === '=') evaluate();
    if (e.key === 'Backspace') backspace();
    if (e.key === 'Escape') clearCalculator();
  });
  