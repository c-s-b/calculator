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
function operate( number1, operator , number2) {
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


function clickAButton () {
    const numberButton = [...document.querySelectorAll(".number-button")];
    const operatorButton = [...document.querySelectorAll(".operator-button")];
    const equalsButton = document.querySelector(".equals");
    const clearButton = document.querySelector(".clear");
    const backspaceButton = document.querySelector(".backspace");
    const decimalButton = document.querySelector(".decimal");
    let incompleteNumber = [];
    let operation = {};
    let currentNumber = 0;
    let result;

    clearButton.addEventListener("click", () => clear());

    backspaceButton.addEventListener("click", () => backspace(currentNumber))

    numberButton.forEach(button => button.addEventListener("click", () => {
        incompleteNumber.push(button.textContent);
        currentNumber = parseFloat(incompleteNumber.join(""));
        displayNumber(currentNumber);     
    }));

    decimalButton.addEventListener("click", () => {
        incompleteNumber.push(decimalButton.textContent); //textContent = "."
        currentNumber = parseFloat(incompleteNumber.join(""));
        displayNumber(currentNumber);    
    }, {once : true})

    operatorButton.forEach(button => button.addEventListener("click", () => {  
        if(!operation.number1){
            operation.number1 = currentNumber;        
            operation.operator = button.textContent     
            incompleteNumber = [];//erases the stored keypresses prior to the operator
            currentNumber = null; //will set number2 to null if multiple cosecutive operators are clicked
        } else {
            operation.number2 = currentNumber;
            result = getResult(operation);
            displayNumber(result)
            operation = {};
            operation.operator = button.textContent;
            operation.number1 = result;
            incompleteNumber = [];  //erases the stored keypresses prior to the operator
            currentNumber = null; //will set number2 to null if multiple cosecutive operators are clicked
        }

    }));

    equalsButton.addEventListener("click", () => {
        operation.number2 = currentNumber;
        result = getResult(operation);
        displayNumber(result);
        operation = {};
        operation.number1 = result;
        incompleteNumber = [];//erases the stored keypresses prior to the operator
        console.log(result);
    });  

}

function displayNumber(currentNumber) {
    const display = document.querySelector(".result");
    display.textContent = currentNumber;
}

function getResult(operation) {
    if(operation.number2 !== null)  { //prevents getResult from evaluating same number twice
    let result = operate(operation.number1, operation.operator, operation.number2);
    return result;
    } else {
        return operation.number1;
    };
}

function clear() {
    document.querySelector(".result").textContent = 0;
    clickAButton(0);
    return;
}

function backspace(currentNumber) {
    const display = document.querySelector(".result");
    let newNumber = 0;
    const removeLastDigit = Array.from(String(currentNumber));
    removeLastDigit.pop();

    if(removeLastDigit.length > 0){
    newNumber = parseFloat(removeLastDigit.join(""));
    } //prevents function from returning NaN

    display.textContent = newNumber;
    clickAButton(newNumber);
    return;
}


clickAButton();