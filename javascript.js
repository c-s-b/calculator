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