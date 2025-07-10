import React, { useState } from 'react';
import Display from './Display';
import ButtonGrid from './ButtonGrid';
import './Calculator.css';

// Type definitions untuk calculator operations
export type Operation = '+' | '-' | '*' | '/' | '=';

interface CalculatorState {
  currentValue: string;
  previousValue: string;
  operation: Operation | null;
  waitingForNewValue: boolean;
}

const Calculator: React.FC = () => {
  // State management dengan useState hook
  const [state, setState] = useState<CalculatorState>({
    currentValue: '0',
    previousValue: '',
    operation: null,
    waitingForNewValue: false,
  });

  // Function untuk handle input angka
  const handleNumber = (num: string) => {
    if (state.waitingForNewValue) {
      setState({
        ...state,
        currentValue: num,
        waitingForNewValue: false,
      });
    } else {
      setState({
        ...state,
        currentValue: state.currentValue === '0' ? num : state.currentValue + num,
      });
    }
  };

  // Function untuk handle operations (+, -, *, /)
  const handleOperation = (nextOperation: Operation) => {
    if (state.previousValue === '') {
      setState({
        ...state,
        previousValue: state.currentValue,
        operation: nextOperation,
        waitingForNewValue: true,
      });
    } else if (state.operation) {
      const currentValue = parseFloat(state.currentValue);
      const previousValue = parseFloat(state.previousValue);
      const result = calculate(previousValue, currentValue, state.operation);

      setState({
        ...state,
        currentValue: String(result),
        previousValue: String(result),
        operation: nextOperation,
        waitingForNewValue: true,
      });
    }
  };

  // Function untuk handle equals
  const handleEquals = () => {
    if (state.operation && state.previousValue !== '') {
      const currentValue = parseFloat(state.currentValue);
      const previousValue = parseFloat(state.previousValue);
      const result = calculate(previousValue, currentValue, state.operation);

      setState({
        ...state,
        currentValue: String(result),
        previousValue: '',
        operation: null,
        waitingForNewValue: true,
      });
    }
  };

  // Function untuk clear/reset calculator
  const handleClear = () => {
    setState({
      currentValue: '0',
      previousValue: '',
      operation: null,
      waitingForNewValue: false,
    });
  };

  // Function untuk handle decimal point
  const handleDecimal = () => {
    if (!state.currentValue.includes('.')) {
      setState({
        ...state,
        currentValue: state.currentValue + '.',
      });
    }
  };

  // Helper function untuk melakukan kalkulasi
  const calculate = (firstValue: number, secondValue: number, operation: Operation): number => {
    switch (operation) {
      case '+':
        return firstValue + secondValue;
      case '-':
        return firstValue - secondValue;
      case '*':
        return firstValue * secondValue;
      case '/':
        return secondValue !== 0 ? firstValue / secondValue : 0;
      default:
        return secondValue;
    }
  };

  return (
    <div className="calculator">
      <Display 
        value={state.currentValue}
        operation={state.operation}
        previousValue={state.previousValue}
      />
      <ButtonGrid
        onNumber={handleNumber}
        onOperation={handleOperation}
        onEquals={handleEquals}
        onClear={handleClear}
        onDecimal={handleDecimal}
      />
    </div>
  );
};

export default Calculator;
