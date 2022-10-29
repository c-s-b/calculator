function add( ...numbers ) {
    let sum = 0;
    numbers.forEach( number => sum += number );
    return sum;
};

function subtract( ...numbers ) {
    const difference = numbers.reduce( (previousNumber, nextNumber) => 
        previousNumber - nextNumber );
    return difference;
};

function multiply( ...numbers ) {
    let product = 1;
    for( const number of numbers ) product = product * number;
    return product;
};

function divide( ...numbers ) {
    const quotient = numbers.reduce((previousNumber, nextNumber) =>
        previousNumber/nextNumber );
    return quotient;
};
//number parameters default to null to avoid NaN output
function operate( number1 = null, operator , number2 = null ) {
    switch(operator) {
        case "+": 
            return add( number1, number2 );   
        case "-":
            return subtract( number1, number2 );
        case "*":
            return multiply( number1, number2 );
        case "/":
            return divide( number1, number2 );
        default:
            return number1;
    };
    
}


function clickAButton (previousResult = 0) {
    const numberButton = [...document.querySelectorAll(".number-button")];
    const operatorButton = [...document.querySelectorAll(".operator-button")];
    const equalsButton = document.querySelector(".equals");
    const display = document.querySelector(".result");
    const clearButton = document.querySelector(".clear");
    const backspaceButton = document.querySelector(".backspace");
    const decimalButton = document.querySelector(".decimal");
    let incompleteNumber = [];
    let operation = [];
    let number = previousResult;

    clearButton.addEventListener("click", () => clear());

    backspaceButton.addEventListener("click", () => backspace(number))

    numberButton.forEach(button => button.addEventListener("click", () => {
        incompleteNumber.push(button.textContent); //textContent is the number listed on each button
        number = parseFloat(incompleteNumber.join(""));
        display.textContent = number;
    }));

    
    operatorButton.forEach(button => button.addEventListener("click", () => {
        operation.push(number);
        if(operation.length < 2 ) operation.push(button.textContent); //textContent is the operator listed on each button
        incompleteNumber = [];
    }));

    equalsButton.addEventListener("click", () => {
        operation.push(number);
        operation = [displayResult(operation)];
        incompleteNumber = [];
    });  

}

function displayResult(operation) {
    result = operate(operation[0], operation[1], operation[2]);
    document.querySelector(".result").textContent = result;
    clickAButton(result);
}

function clear() {
    document.querySelector(".result").textContent = 0;
    clickAButton(0);
}

function backspace(number) {
    const display = document.querySelector(".result");
    let newNumber = 0;
    const removeLastDigit = Array.from(String(number));
    removeLastDigit.pop();

    if(removeLastDigit.length > 0){
    newNumber = parseFloat(removeLastDigit.join(""));
    } //prevents function from returning NaN

    display.textContent = newNumber;
    clickAButton(newNumber);
}


clickAButton();