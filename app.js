// Cache DOM elements
const displayNumber = document.querySelector("#display__number span");
const displayOperator = document.querySelector("#display__operator");
const keypad = document.querySelector("#keypad");
const decimal = keypad.querySelector("#decimal");

// State variables
let currentNumber = "";
let firstOperand = "";
let operator = "";
let result = 0;
let decimalUsed = false;

keypad.addEventListener("click", (event) => {
  let target = event.target;

  if (target.classList.contains("number")) {
    handleNumber(target.id);
  }

  if (target.classList.contains("decimal")) {
    handleDecimal();
  }

  if (target.classList.contains("operator")) {
    handleOperator(target.id);
  }

  if (target.classList.contains("equal")) {
    handleEqual();
  }

  if (target.classList.contains("clear")) {
    hanndleClear();
  }

  if (target.classList.contains("backspace")) {
    handleBackspace();
  }
});

function handleNumber(value) {
  currentNumber += value;
  displayNumber.textContent = currentNumber;
}

function handleDecimal() {
  if (!decimalUsed) {
    currentNumber += ".";
    decimalUsed = true;
    displayNumber.textContent = currentNumber;
  }
}

function handleOperator(op) {
  if (firstOperand !== "") {
    if (currentNumber !== "") {
      result = operate(
        parseFloat(firstOperand),
        parseFloat(currentNumber),
        operator
      );
    }
    displayNumber.textContent = result;
    firstOperand = result.toString();
    currentNumber = "";
  } else {
    firstOperand = currentNumber;
    currentNumber = "";
  }
  operator = op;
  decimalUsed = false;
  displayOperator.textContent = op;
}

function handleEqual() {
  if (operator && firstOperand !== "" && currentNumber !== "") {
    result = operate(
      parseFloat(firstOperand),
      parseFloat(currentNumber),
      operator
    );
    displayNumber.textContent = result;
    displayOperator.textContent = "";
    // Reset the state for next operation
    firstOperand = result.toString();
    currentNumber = "";
    operator = "";
    decimalUsed = false;
  }
}

function hanndleClear() {
  currentNumber = "";
  firstOperand = "";
  operator = "";
  result = 0;
  decimalUsed = false;
  displayNumber.textContent = result;
  displayOperator.textContent = "";
}

function handleBackspace() {
  if (currentNumber) {
    currentNumber = currentNumber.slice(0, -1);
    if (currentNumber.indexOf(".") === -1) {
      decimalUsed = false;
    }
    if (!operator) {
      firstOperand = currentNumber;
    }
    displayNumber.textContent = currentNumber;
  }
}

function operate(a, b, op) {
  switch (op) {
    case "+":
      return roundToFiveDecimals(a + b);
    case "-":
      return roundToFiveDecimals(a - b);
    case "*":
      return roundToFiveDecimals(a * b);
    case "/":
      return b !== 0 ? roundToFiveDecimals(a / b) : "ERROR";
    // default:
    //   return "ERROR";
  }
}

function roundToFiveDecimals(num) {
  return Math.round(num * 100000) / 100000;
}
