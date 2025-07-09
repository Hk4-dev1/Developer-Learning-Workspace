// Calculator JavaScript - ChainSmoke Developer
// This is my first JavaScript project! 🚀

// Get the display element
const display = document.getElementById('display');

// Variable to track if we just calculated (for clearing on next number input)
let justCalculated = false;

/**
 * Add characters (numbers/operators) to the display
 * @param {string} value - The character to add
 */
function appendToDisplay(value) {
    // If we just calculated and user inputs a number, clear display first
    if (justCalculated && !isNaN(value)) {
        clearDisplay();
    }
    justCalculated = false;
    
    // If display shows "0" or "Error", replace it
    if (display.value === '0' || display.value === 'Error') {
        display.value = value;
    } else {
        // Add the new value to existing display
        display.value += value;
    }
    
    // Animate the button press effect
    animateDisplay();
}

/**
 * Clear the entire display
 */
function clearDisplay() {
    display.value = '0';
    justCalculated = false;
    animateDisplay();
}

/**
 * Delete the last character from display
 */
function deleteLast() {
    if (display.value.length > 1) {
        display.value = display.value.slice(0, -1);
    } else {
        display.value = '0';
    }
    justCalculated = false;
    animateDisplay();
}

/**
 * Calculate the result of the expression
 */
function calculateResult() {
    try {
        // Replace × with * for calculation
        let expression = display.value.replace(/×/g, '*');
        
        // Evaluate the expression safely
        let result = eval(expression);
        
        // Handle division by zero and other edge cases
        if (!isFinite(result)) {
            display.value = 'Error';
        } else {
            // Round to 8 decimal places to avoid floating point issues
            result = Math.round(result * 100000000) / 100000000;
            display.value = result.toString();
        }
        
        justCalculated = true;
        animateDisplay();
        
    } catch (error) {
        // If there's any error in calculation, show Error
        display.value = 'Error';
        justCalculated = true;
        animateDisplay();
    }
}

/**
 * Add a subtle animation to the display when it updates
 */
function animateDisplay() {
    display.style.transform = 'scale(0.98)';
    setTimeout(() => {
        display.style.transform = 'scale(1)';
    }, 100);
}

/**
 * Handle keyboard input for better user experience
 */
document.addEventListener('keydown', function(event) {
    const key = event.key;
    
    // Numbers 0-9
    if (key >= '0' && key <= '9') {
        appendToDisplay(key);
    }
    // Operators
    else if (key === '+') {
        appendToDisplay('+');
    }
    else if (key === '-') {
        appendToDisplay('-');
    }
    else if (key === '*') {
        appendToDisplay('*');
    }
    else if (key === '/') {
        event.preventDefault(); // Prevent browser search
        appendToDisplay('/');
    }
    // Decimal point
    else if (key === '.') {
        appendToDisplay('.');
    }
    // Enter or = for calculation
    else if (key === 'Enter' || key === '=') {
        event.preventDefault();
        calculateResult();
    }
    // Escape or C for clear
    else if (key === 'Escape' || key.toLowerCase() === 'c') {
        clearDisplay();
    }
    // Backspace for delete
    else if (key === 'Backspace') {
        event.preventDefault();
        deleteLast();
    }
});

/**
 * Initialize the calculator when page loads
 */
document.addEventListener('DOMContentLoaded', function() {
    console.log('🧮 Calculator App loaded successfully!');
    console.log('Made by ChainSmoke Developer - Learning JavaScript!');
    
    // Focus on the display (though it's readonly)
    display.focus();
    
    // Add transition effect to display
    display.style.transition = 'transform 0.1s ease';
});

/**
 * Fun function to show off JavaScript skills
 */
function showStats() {
    const totalButtons = document.querySelectorAll('.btn').length;
    const calculation = display.value;
    
    console.log(`
    📊 Calculator Stats:
    - Total buttons: ${totalButtons}
    - Current calculation: ${calculation}
    - Made with: HTML, CSS, JavaScript
    - Developer: ChainSmoke Developer
    - Status: Learning and building! 🚀
    `);
}

// Call stats function (check console!)
showStats();
