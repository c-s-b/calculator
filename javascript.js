function add( number1 , number2 ) {
    return number1 + number2;
};

function subtract( number1 , number2 ) {
    return  number1 - number2;
};

function multiply( number1 , number2 ) {
    return number1 * number2;

};

function divide( number1 , number2 ) {
    if(!number1 || !number2) {
        alert("stop f*&^ing dividing by zero");
    }
    return number1 / number2;;
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
            currentNumber = incompleteNumber.join("");
            displayNumber(currentNumber);   
        });
        document.addEventListener("keyup", (e) => {  
            if(e.key == button.textContent){
                incompleteNumber.push(button.textContent);
                currentNumber = incompleteNumber.join("");
                displayNumber(currentNumber);  
        }});  
    });

    decimalButton.addEventListener("click", () => {
        if (incompleteNumber.length === 0) {
            incompleteNumber.push(0);
            currentNumber = incompleteNumber.join("");
            displayNumber(currentNumber);
        }
        if (!incompleteNumber.includes(".")){
        incompleteNumber.push(decimalButton.textContent); //textContent = "."
        currentNumber = incompleteNumber.join("");
        displayNumber(currentNumber);
        }
        
    });

    operatorButton.forEach(button => {
        button.addEventListener("click", () => {  
            changeButtonColor();
            if(operation.number1 === null){
                operation.number1 = currentNumber;        
                operation.operator = button.textContent     
                incompleteNumber = [];//erases the stored keypresses prior to the operator
                currentNumber = null; //will set number2 to null if  consecutive operators are clicked
                console.log(operation);
            } else if(currentNumber === null) {
                operation.operator = button.textContent;//prevents using the same number twice after consecutive operators
                console.log(operation);
            } else {
                operation.number2 = currentNumber;
                result = getResult(operation);
                displayNumber(result)
                operation = {};
                operation.operator = button.textContent;
                operation.number1 = result;
                incompleteNumber = [];  //erases the stored keypresses prior to the operator
                currentNumber = null; //will set number2 to null if consecutive operators are clicked
                console.log(operation);
            } 
        });
        document.addEventListener("keyup", (e) => {  
            if(e.key == button.textContent){ 
                changeButtonColor ();
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
        changeBackground();
    }); 
    document.addEventListener("keyup", (e) => {
        if(e.key == "=" || e.key == "Enter") {
            if(currentNumber === null) {
                displayNumber(operation.number1);
            } else {
                operation.number2 = currentNumber();
                result = getResult(operation);
                displayNumber(result);
                operation = {};
                currentNumber = result;
                incompleteNumber = [];//erases the stored keypresses prior to the operator
            };
            changeBackground();
        };
    }); 


}


function displayNumber(currentNumber) {
    const display = document.querySelector(".result");
    const numOfDigits = String(currentNumber).length;
    if (numOfDigits > 8) {
        let roundedNumber = String(currentNumber).slice(0, 9);
        if(roundedNumber.charAt(roundedNumber.length-1) >= 5) {
            roundedNumber = Math.ceil(roundedNumber*1000)/1000;
        } else {
            roundedNumber = Math.floor(roundedNumber*1000)/1000;
        }
        display.textContent = roundedNumber;
        console.log(currentNumber);
    } else if (isNaN(currentNumber) || !currentNumber) {
        display.textContent = 0;
        console.log(currentNumber);
    } else {
        display.textContent = currentNumber;
        console.log(currentNumber);
    };
}

function getResult(operation) {
    let result = operate(parseFloat(operation.number1), operation.operator, parseFloat(operation.number2));
    return result;
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

function changeBackground (){
    const background = document.querySelector("body");
    background.style.backgroundColor = `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`;
}

function playSound () {
    const buttons = [...document.querySelectorAll("button")];
    const sound = document.getElementById("beep");
    keyPressArray = ["1","2","3","4","5","6","7","8","9","0","=","+","-","*","/","Enter","Backspace","Delete"];

    buttons.forEach(button => {
        button.addEventListener( "mousedown", () => {
            sound.playbackRate = 3.0;
            sound.play();
        });
    });

    document.addEventListener("keydown", (e) => {
        if(keyPressArray.includes(e.key)) {
            sound.playbackRate = 3.0;
            sound.play();
        };
    });
}

function changeButtonColor () {
    const numberButton = [...document.querySelectorAll(".number-button")];
    const operatorButton = [...document.querySelectorAll(".operator-button")];
    const equalButton = [...document.querySelectorAll(".lower-button")];
    const eraseButton = [...document.querySelectorAll(".erase-button")];
    operatorButtonColor = `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`
    numberButtonColor = `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`
    equalButtonColor = `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`
    eraseButtonColor = `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`
    
    numberButton.forEach(button => button.style.backgroundColor = numberButtonColor);
    operatorButton.forEach(button => button.style.backgroundColor = operatorButtonColor);
    equalButton.forEach(button => button.style.backgroundColor = equalButtonColor);
    eraseButton.forEach(button => button.style.backgroundColor = eraseButtonColor);
}

clickAButton();
playSound();