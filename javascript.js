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
}