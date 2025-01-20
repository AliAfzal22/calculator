import { parseExpression } from "./parser.js";

const numberButtons = document.querySelectorAll(".number");
const operands = document.querySelectorAll(".operand");
const constants = document.querySelectorAll(".constant");
const del = document.querySelector("#del");
const clr = document.querySelector("#clr");
const solve = document.querySelector("#sol");

const display = document.querySelector(".display");
let displayText = ""
display.textContent = displayText;

//let func = document.querySelector("#f(x)=");
constants.forEach((button)=>{
  button.addEventListener("click", (event) => {
    displayText += `${event.target.id}`;
    display.textContent = displayText;
  });
})

numberButtons.forEach((button)=> {
    button.addEventListener("click", (event) => {
        displayText += `${event.target.id}`;
        display.textContent = displayText;
      });
})

operands.forEach((button)=> {
    button.addEventListener("click", (event) => {
        displayText += `${event.target.id}`;
        display.textContent = displayText;
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