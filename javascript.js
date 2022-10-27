function add(...numbers) {
    let sum = 0;
    numbers.forEach(number => sum += number);
    return sum;
};

function subtract(...numbers) {
    const difference = numbers.reduce((previousNumber, nextNumber) => 
        previousNumber - nextNumber);
    return difference;
}