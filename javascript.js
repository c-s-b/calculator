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
            return "Oops, Missing Something!";
    };
    
}

function clickAButton () {
    const numberButton = [...document.querySelectorAll(".number-button")];
    const operatorButton = [...document.querySelectorAll(".operator-button")];
    const equals = document.querySelector(".equals");
    const display = document.querySelector(".result");
    let incompleteNumber = [];
    let operation = [];
    let number = 0;

    numberButton.forEach(button => button.addEventListener("click", () => {
        incompleteNumber.push(button.textContent); //textContent is the number listed on each button
        number = parseInt(incompleteNumber.join(""));
        display.textContent = number;
    }));

    operatorButton.forEach(button => button.addEventListener("click", () => {
        operation.push(number);
        if(operation.length < 2 ) operation.push(button.textContent); //textContent is the operator listed on each button
        console.log(operation);
        number = 0;
        incompleteNumber = [];
    }));

    equals.addEventListener("click", () => {
        operation.push(number);
        operation = [displayResult(operation)];
        console.log(operation);
        number = 0;
        incompleteNumber = [];
    });
}

function displayResult(operation) {
    result = operate(operation[0], operation[1], operation[2]);
    document.querySelector(".result").textContent = result;
    return result;
}


clickAButton();