function add( number1 , number2 ) {
    let sum = number1 + number2;
    return sum;
};

function subtract( number1 , number2 ) {
    const difference =  number1 - number2;
    return difference;
};

function multiply( number1 , number2 ) {
    let product =  number1 * number2;
    return product;
};

function divide( number1 , number2 ) {
    const quotient =  number1 / number2;
    if(quotient === Infinity || isNaN(quotient)) {
        alert("stop f*&^ing dividing by zero");
        return 0;
    }
    return quotient;
};
//number parameters default to null to avoid NaN output
function operate( number1, operator, number2) {
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
            return 0;
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

    clearButton.addEventListener("click", () => {
        incompleteNumber = [];
        operation = {};
        currentNumber = 0;
        displayNumber(currentNumber);
    });

    document.addEventListener("keyup", (e) => {
        if(e.key == "Delete") {
            incompleteNumber = [];
            operation = {};
            currentNumber = 0;
            displayNumber(currentNumber);
        };
    });

    backspaceButton.addEventListener("click", () => {
        currentNumber = backspace(currentNumber)
        incompleteNumber = [];
        if(currentNumber === 0) clear();
    });

    document.addEventListener("keyup", (e) => {
        if(e.key == "Backspace") {
            currentNumber = backspace(currentNumber)
            incompleteNumber = [];
            if(currentNumber === 0) clear();
        };
    });

       
    numberButton.forEach(button => {
        button.addEventListener("click", () => {  
            incompleteNumber.push(button.textContent);
            currentNumber = parseFloat(incompleteNumber.join(""));
            displayNumber(currentNumber);   
        });
        document.addEventListener("keyup", (e) => {  
            if(e.key == button.textContent){
                incompleteNumber.push(button.textContent);
                currentNumber = parseFloat(incompleteNumber.join(""));
                displayNumber(currentNumber);  
        }});  
    });

    decimalButton.addEventListener("click", () => {
        if (incompleteNumber.length === 0) {
            incompleteNumber.push(0);
        }
        incompleteNumber.push(decimalButton.textContent); //textContent = "."
        currentNumber = parseFloat(incompleteNumber.join(""));
        displayNumber(currentNumber);    
    }, {once : true})

    operatorButton.forEach(button => {
        button.addEventListener("click", () => {  
            if(!operation.number1){
                operation.number1 = currentNumber;        
                operation.operator = button.textContent     
                incompleteNumber = [];//erases the stored keypresses prior to the operator
                currentNumber = null; //will set number2 to null if  consecutive operators are clicked
            } else if(currentNumber === null) {
                operation.operator = button.textContent;//prevents using the same number twice after consecutive operators
            } else {
                operation.number2 = currentNumber;
                result = getResult(operation);
                displayNumber(result)
                operation = {};
                operation.operator = button.textContent;
                operation.number1 = result;
                incompleteNumber = [];  //erases the stored keypresses prior to the operator
                currentNumber = null; //will set number2 to null if consecutive operators are clicked
            } 
        });
        document.addEventListener("keyup", (e) => {  
            if(e.key == button.textContent){ 
                if(!operation.number1){
                    operation.number1 = currentNumber;        
                    operation.operator = button.textContent     
                    incompleteNumber = [];//erases the stored keypresses prior to the operator
                    currentNumber = null; //will set number2 to null if  consecutive operators are clicked
                } else if(currentNumber === null) {
                    operation.operator = button.textContent;//prevents using the same number twice after consecutive operators
                } else {
                    operation.number2 = currentNumber;
                    result = getResult(operation);
                    displayNumber(result)
                    operation = {};
                    operation.operator = button.textContent;
                    operation.number1 = result;
                    incompleteNumber = [];  //erases the stored keypresses prior to the operator
                    currentNumber = null; //will set number2 to null if consecutive operators are clicked
                }
            };
        });
    });

    equalsButton.addEventListener("click", () => {
        if(currentNumber === null) {
            displayNumber(operation.number1);
        } else {
            operation.number2 = currentNumber;
            result = getResult(operation);
            displayNumber(result);
            operation = {};
            currentNumber = result;
            incompleteNumber = [];//erases the stored keypresses prior to the operator
        }
    }); 
    document.addEventListener("keyup", (e) => {
        if(e.key == "=" || e.key == "Enter") {
            if(currentNumber === null) {
                displayNumber(operation.number1);
            } else {
                operation.number2 = currentNumber;
                result = getResult(operation);
                displayNumber(result);
                operation = {};
                currentNumber = result;
                incompleteNumber = [];//erases the stored keypresses prior to the operator
            };
        };
    }); 


}


function displayNumber(currentNumber) {
    const display = document.querySelector(".result");
    const numOfDigits = String(currentNumber).length;
    console.log(numOfDigits);
    if (numOfDigits > 8) {
        let roundedNumber = String(currentNumber).slice(0, 9);
        display.textContent = parseFloat(roundedNumber);
        alert("this number did not fit entirely into calculator screen");
    } else {
        display.textContent = parseFloat(currentNumber);
    };
}

function getResult(operation) {
    let result = operate(operation.number1, operation.operator, operation.number2);
    return result;
}

function clear() {
    document.querySelector(".result").textContent = 0;
    clickAButton(0);
    return;
}

function backspace(currentNumber) {
    let newNumber;
    const removeLastDigit = Array.from(String(currentNumber));
    removeLastDigit.pop();

    if(removeLastDigit.length > 0){
    newNumber = parseFloat(removeLastDigit.join(""));
    } else newNumber = 0;//prevents function from returning NaN
    displayNumber(newNumber);
    return newNumber;
}

clickAButton();