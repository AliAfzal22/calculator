// Import the parser (assuming you have parseExpression function defined in 'parser.js')
import { parseExpression } from './parser';

// Test 1: Basic Arithmetic Operations
console.assert(parseExpression("1+2") === 3, "Test 1 Failed");
console.assert(parseExpression("5-3") === 2, "Test 2 Failed");
console.assert(parseExpression("4*2") === 8, "Test 3 Failed");
console.assert(parseExpression("8/4") === 2, "Test 4 Failed");
console.assert(parseExpression("2^3") === 8, "Test 5 Failed");

// Test 2: Parentheses for BODMAS Rule
console.assert(parseExpression("(1+2)*3") === 9, "Test 6 Failed");
console.assert(parseExpression("2*(3+4)") === 14, "Test 7 Failed");
console.assert(parseExpression("(2+3)^2") === 25, "Test 8 Failed");
console.assert(parseExpression("2^(1+1)") === 4, "Test 9 Failed");

// Test 3: Factorials
console.assert(parseExpression("3!") === 6, "Test 10 Failed");
console.assert(parseExpression("5!") === 120, "Test 11 Failed");
console.assert(parseExpression("1!") === 1, "Test 12 Failed");
console.assert(parseExpression("0!") === 1, "Test 13 Failed");
console.assert(parseExpression("(3+2)!") === 120, "Test 14 Failed");

// Test 4: Trigonometric Functions
console.assert(parseExpression("Sin(90)") === 1, "Test 15 Failed"); // Sin in degrees
console.assert(parseExpression("Cos(0)") === 1, "Test 16 Failed");
console.assert(parseExpression("Tan(45)") === 1, "Test 17 Failed");
console.assert(parseExpression("Sin(180)") === 0, "Test 18 Failed");
console.assert(parseExpression("Cos(180)") === -1, "Test 19 Failed");

// Test 5: Logarithms
console.assert(parseExpression("ln(euler)") === 1, "Test 20 Failed");
console.assert(parseExpression("ln(1)") === 0, "Test 21 Failed");
console.assert(parseExpression("ln(euler^2)") === 2, "Test 22 Failed");
console.assert(parseExpression("ln(10)") === Math.log(10), "Test 23 Failed");

// Test 6: Constants
console.assert(parseExpression("pi") === Math.PI, "Test 24 Failed");
console.assert(parseExpression("euler") === Math.E, "Test 25 Failed");
console.assert(parseExpression("2*pi") === 2 * Math.PI, "Test 26 Failed");
console.assert(parseExpression("pi^2") === Math.pow(Math.PI, 2), "Test 27 Failed");
console.assert(parseExpression("euler*pi") === Math.E * Math.PI, "Test 28 Failed");

// Test 7: Combined Operations
console.assert(parseExpression("2+3*4") === 14, "Test 29 Failed"); // BODMAS
console.assert(parseExpression("3*4+2") === 14, "Test 30 Failed"); // BODMAS
console.assert(parseExpression("(2+3)*(4+5)") === 45, "Test 31 Failed");
console.assert(parseExpression("Sin(90) + Cos(0) + 5!") === 122, "Test 32 Failed");
console.assert(parseExpression("3! + ln(euler)") === 7, "Test 33 Failed");

// Test 8: Nested Parentheses
console.assert(parseExpression("((2+3)*4)+5") === 25, "Test 34 Failed");
console.assert(parseExpression("(1+(2*(3+4)))") === 15, "Test 35 Failed");
console.assert(parseExpression("(2+(3*(4+(5*(6)))))") === 128, "Test 36 Failed");

// Test 9: Edge Cases
console.assert(parseExpression("0") === 0, "Test 37 Failed");
console.assert(parseExpression("1") === 1, "Test 38 Failed");
console.assert(parseExpression("10+0") === 10, "Test 39 Failed");
console.assert(parseExpression("0*100") === 0, "Test 40 Failed");
console.assert(parseExpression("10/0") === Infinity, "Test 41 Failed"); // Division by zero
console.assert(parseExpression("-5+10") === 5, "Test 42 Failed");
console.assert(parseExpression("2^(-3)") === 0.125, "Test 43 Failed");
console.assert(parseExpression("-2^2") === -4, "Test 44 Failed"); // Unary operator precedence

// Test 10: Invalid Expressions
try {
    parseExpression("+1");
    console.assert(false, "Test 45 Failed"); // Should throw an error
} catch (e) {
    console.assert(true, "Test 45 Passed");
}

try {
    parseExpression("2++2");
    console.assert(false, "Test 46 Failed"); // Should throw an error
} catch (e) {
    console.assert(true, "Test 46 Passed");
}

try {
    parseExpression("2*(3+)");
    console.assert(false, "Test 47 Failed"); // Should throw an error
} catch (e) {
    console.assert(true, "Test 47 Passed");
}

try {
    parseExpression("ln()");
    console.assert(false, "Test 48 Failed"); // Should throw an error
} catch (e) {
    console.assert(true, "Test 48 Passed");
}

try {
    parseExpression("()");
    console.assert(false, "Test 49 Failed"); // Should throw an error
} catch (e) {
    console.assert(true, "Test 49 Passed");
}