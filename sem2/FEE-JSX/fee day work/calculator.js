// calculator.js - Interactive version using readline
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function askQuestion(query) {
    return new Promise(resolve => rl.question(query, resolve));
}

async function calculator() {
    console.log("=== INTERACTIVE CALCULATOR ===\n");
    
    const num1 = await askQuestion("Enter first number: ");
    const num2 = await askQuestion("Enter second number: ");
    
    let a = parseFloat(num1);
    let b = parseFloat(num2);
    
    console.log("\n=== RESULTS ===");
    console.log(`${a} + ${b} = ${a + b}`);
    console.log(`${a} - ${b} = ${a - b}`);
    console.log(`${a} × ${b} = ${a * b}`);
    
    if (b !== 0) {
        console.log(`${a} ÷ ${b} = ${a / b}`);
        console.log(`${a} % ${b} = ${a % b}`);
    } else {
        console.log(`${a} ÷ ${b} = Error: Division by zero`);
        console.log(`${a} % ${b} = Error: Division by zero`);
    }
    
    rl.close();
}

calculator();