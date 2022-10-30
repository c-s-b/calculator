# calculator

Basic web-based functional calculator ui

This application will recieve user input from an html calculator, process the equation using js and output the correct result. HTML and CSS are used to create the UI, and JS allows passing of data, manipulating of data, and output of data

Challenges:
1. I had great difficulty with clicking an operator button more than once and preventing the program from simply copying the same number from number1 to number2
    - in the end, I opted to navigate around this by resetting the currently stored number to null, which required me to return 0 when operations were attempted with null (ex. equal button was pressed multiple times in a row).
2. Attempting to avoid global variables has made it difficult to keep the code concise and readable.

TESTS: