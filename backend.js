const numberButtons = document.querySelectorAll(".number");
const operands = document.querySelectorAll(".operand");
const constants = document.querySelectorAll(".constant");
const X = document.querySelector("#func");
const del = document.querySelector("#del");
const clr = document.querySelector("#clr");
const solve = document.querySelector("#sol");

const display = document.querySelector(".display");
let displayText = ""
display.textContent = displayText;


X.addEventListener("click", () => {
  displayText += `Hello World!`;
  display.textContent = displayText;
})

constants.forEach((button)=>{
  button.addEventListener("click", (event) => {
    displayText += `${event.target.id}`;
    display.textContent = displayText;
  });
})

numberButtons.forEach((button)=> {
    button.addEventListener("click", (event) => {
        updateDisplay(event);
      });
})

operands.forEach((button)=> {
    button.addEventListener("click", (event) => {
        updateDisplay(event);
      });
})

del.addEventListener("click", () => {
    displayText = displayText.slice(0, -1); // Remove the last character
    display.textContent = displayText; 
  });

clr.addEventListener("click", () => {
    displayText = "";
    display.textContent = displayText;
  });

solve.addEventListener("click", () =>{
    displayText = parseExpression(displayText).toString();
    display.textContent = displayText;
});

function updateDisplay(event) {
  if (displayText.length < 20){
      displayText += `${event.target.id}`;
      display.textContent = displayText;
  }
}

function parseExpression(input) {
  let index = 0;
  const precision = 1e7; // Precision factor for rounding to 7 decimal places

  // Entry point for parsing
  function parseS() {
      return parseAdditionSubtraction(); // Start with the lowest precedence level
  }

  // Parse addition and subtraction
  function parseAdditionSubtraction() {
      let left = parseMultiplicationDivision(); // Parse higher precedence first

      while (index < input.length) {
          const operator = input[index];
          if (operator === "+" || operator === "-") {
              index++; // Move past the operator
              const right = parseMultiplicationDivision(); // Parse the right-hand side
              left = evaluate(left, operator, right); // Evaluate addition/subtraction
          } else {
              break;
          }
      }

      return left;
  }

  // Parse multiplication and division
  function parseMultiplicationDivision() {
      let left = parseExponentiation(); // Parse higher precedence first

      while (index < input.length) {
          const operator = input[index];
          if (operator === "*" || operator === "/") {
              index++; // Move past the operator
              const right = parseExponentiation(); // Parse the right-hand side
              left = evaluate(left, operator, right); // Evaluate multiplication/division
          } else {
              break;
          }
      }

      return left;
  }

  // Parse exponentiation (^)
  function parseExponentiation() {
      let left = parseFactor(); // Parse higher precedence first

      while (index < input.length) {
          const operator = input[index];
          if (operator === "^") {
              index++; // Move past the operator
              const right = parseFactor(); // Parse the right-hand side
              left = evaluate(left, operator, right); // Evaluate exponentiation
          } else {
              break;
          }
      }

      return left;
  }

  // Parse a factor (numbers, parentheses, functions, factorial)
  function parseFactor() {
      let value;

      // Parentheses or functions
      if (input[index] === "(") {
          index++; // Skip '('
          value = parseAdditionSubtraction(); // Parse the inner expression
          if (input[index] === ")") {
              index++; // Skip ')'
          } else {
              throw new Error("Unmatched parentheses");
          }
      } else if (input.startsWith("ln", index)) {
          index += 2; // Skip 'ln'
          if (input[index] === "(") {
              index++; // Skip '('
              const expr = parseAdditionSubtraction(); // Parse the argument
              if (input[index] === ")") {
                  index++; // Skip ')'
                  value = roundToPrecision(Math.log(expr)); // Evaluate ln
              } else {
                  throw new Error("Unmatched parentheses after ln");
              }
          }
      } else if (input.startsWith("Tan", index)) {
          index += 3; // Skip 'Tan'
          if (input[index] === "(") {
              index++;
              const expr = parseAdditionSubtraction();
              if (input[index] === ")") {
                  index++;
                  value = roundToPrecision(Math.tan(toRadians(expr))); // Evaluate Tan in degrees
              } else {
                  throw new Error("Unmatched parentheses after Tan");
              }
          }
      } else if (input.startsWith("Sin", index)) {
          index += 3; // Skip 'Sin'
          if (input[index] === "(") {
              index++;
              const expr = parseAdditionSubtraction();
              if (input[index] === ")") {
                  index++;
                  value = roundToPrecision(Math.sin(toRadians(expr))); // Evaluate Sin in degrees
              } else {
                  throw new Error("Unmatched parentheses after Sin");
              }
          }
      } else if (input.startsWith("Cos", index)) {
          index += 3; // Skip 'Cos'
          if (input[index] === "(") {
              index++;
              const expr = parseAdditionSubtraction();
              if (input[index] === ")") {
                  index++;
                  value = roundToPrecision(Math.cos(toRadians(expr))); // Evaluate Cos in degrees
              } else {
                  throw new Error("Unmatched parentheses after Cos");
              }
          }
      } else {
          // Parse numbers or constants
          value = parseNumberOrConstant();
      }

      // Handle factorial (!) after parsing the factor
      while (index < input.length && input[index] === "!") {
          index++; // Skip '!'
          value = factorial(value); // Evaluate factorial
      }

      return value;
  }

  // Parse a number or constants (N → any real number | π | e)
  function parseNumberOrConstant() {
      // Handle π and e
      if (input.startsWith("π", index)) {
          index += 1; // Skip "π"
          return roundToPrecision(Math.PI); // Return π with precision
      } else if (input.startsWith("e", index)) {
          index += 1; // Skip "e"
          return roundToPrecision(Math.E); // Return e with precision
      }

      // Parse a number (integer or real)
      let number = "";
      while (index < input.length && /[0-9.]/.test(input[index])) {
          number += input[index];
          index++;
      }
      if (number === "") throw new Error("Invalid number");
      return roundToPrecision(parseFloat(number)); // Parse as a float and apply precision
  }

  // Evaluate binary operations
  function evaluate(left, operator, right) {
      switch (operator) {
          case "+":
              return left + right;
          case "-":
              return left - right;
          case "*":
              return left * right;
          case "/":
              return roundToPrecision(left / right); // Precision for division
          case "^":
              return roundToPrecision(Math.pow(left, right)); // Precision for power
          default:
              throw new Error(`Invalid operator: ${operator}`);
      }
  }

  // Factorial function
  function factorial(n) {
      if (n < 0) throw new Error("Factorial not defined for negative numbers");
      if (!Number.isInteger(n)) throw new Error("Factorial is only defined for integers");
      if (n === 0 || n === 1) return 1;
      return n * factorial(n - 1);
  }

  // Convert degrees to radians
  function toRadians(degrees) {
      return (degrees * Math.PI) / 180;
  }

  // Round numbers to 7 decimal places
  function roundToPrecision(value) {
      return Math.round(value * precision) / precision;
  }

  return parseS(); // Start parsing and return the result
}