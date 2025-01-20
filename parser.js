export function parseExpression(input) {
    let index = 0;
    const precision = 1e7; // Precision factor for rounding to 7 decimal places

    // Entry point for parsing
    function parseS() {
        return parseX(); // Start parsing from X
    }

    // Recursive parsing of X
    function parseX() {
        // Handle parentheses and functions first (high precedence)
        if (input[index] === "(") {
            index++; // Skip '('
            const expr = parseX(); // Parse the inner expression
            if (input[index] === ")") {
                index++; // Skip ')'
                return expr;
            } else {
                throw new Error("Unmatched parentheses");
            }
        } else if (input.startsWith("ln", index)) {
            index += 2; // Skip 'ln'
            if (input[index] === "(") {
                index++; // Skip '('
                const expr = parseX(); // Parse the argument
                if (input[index] === ")") {
                    index++; // Skip ')'
                    return roundToPrecision(Math.log(expr)); // Evaluate ln
                } else {
                    throw new Error("Unmatched parentheses after ln");
                }
            }
        } else if (input.startsWith("Tan", index)) {
            index += 3; // Skip 'Tan'
            if (input[index] === "(") {
                index++;
                const expr = parseX();
                if (input[index] === ")") {
                    index++;
                    return roundToPrecision(Math.tan(toRadians(expr))); // Evaluate Tan in degrees
                } else {
                    throw new Error("Unmatched parentheses after Tan");
                }
            }
        } else if (input.startsWith("Sin", index)) {
            index += 3; // Skip 'Sin'
            if (input[index] === "(") {
                index++;
                const expr = parseX();
                if (input[index] === ")") {
                    index++;
                    return roundToPrecision(Math.sin(toRadians(expr))); // Evaluate Sin in degrees
                } else {
                    throw new Error("Unmatched parentheses after Sin");
                }
            }
        } else if (input.startsWith("Cos", index)) {
            index += 3; // Skip 'Cos'
            if (input[index] === "(") {
                index++;
                const expr = parseX();
                if (input[index] === ")") {
                    index++;
                    return roundToPrecision(Math.cos(toRadians(expr))); // Evaluate Cos in degrees
                } else {
                    throw new Error("Unmatched parentheses after Cos");
                }
            }
        }

        // Parse numbers, pi, or e
        let left = parseN();

        // Handle factorial (!) immediately after a number
        while (input[index] === "!") {
            index++; // Skip '!'
            left = factorial(left); // Compute the factorial
        }

        // Handle binary operations
        while (index < input.length) {
            const operator = input[index]; // Get the operator
            if ("+-*/^".includes(operator)) {
                index++; // Move past the operator
                const right = parseX(); // Parse the right-hand side recursively
                left = evaluate(left, operator, right); // Evaluate the expression
            } else {
                break; // Exit if no valid operator
            }
        }

        return roundToPrecision(left); // Apply precision fix before returning the result
    }

    // Parse a number or constants (N → any real number | π | e)
    function parseN() {
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