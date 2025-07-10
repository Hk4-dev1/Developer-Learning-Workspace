import React from 'react';
import Button from './Button';
import './ButtonGrid.css';
import { Operation } from './Calculator';

interface ButtonGridProps {
  onNumber: (num: string) => void;
  onOperation: (operation: Operation) => void;
  onEquals: () => void;
  onClear: () => void;
  onDecimal: () => void;
}

const ButtonGrid: React.FC<ButtonGridProps> = ({
  onNumber,
  onOperation,
  onEquals,
  onClear,
  onDecimal,
}) => {
  return (
    <div className="button-grid">
      {/* Row 1: Clear dan Operations */}
      <Button value="C" onClick={onClear} type="clear" />
      <Button value="±" onClick={() => {}} type="function" disabled />
      <Button value="%" onClick={() => {}} type="function" disabled />
      <Button value="÷" onClick={() => onOperation('/')} type="operation" />

      {/* Row 2: Numbers 7-9 dan multiplication */}
      <Button value="7" onClick={() => onNumber('7')} type="number" />
      <Button value="8" onClick={() => onNumber('8')} type="number" />
      <Button value="9" onClick={() => onNumber('9')} type="number" />
      <Button value="×" onClick={() => onOperation('*')} type="operation" />

      {/* Row 3: Numbers 4-6 dan subtraction */}
      <Button value="4" onClick={() => onNumber('4')} type="number" />
      <Button value="5" onClick={() => onNumber('5')} type="number" />
      <Button value="6" onClick={() => onNumber('6')} type="number" />
      <Button value="−" onClick={() => onOperation('-')} type="operation" />

      {/* Row 4: Numbers 1-3 dan addition */}
      <Button value="1" onClick={() => onNumber('1')} type="number" />
      <Button value="2" onClick={() => onNumber('2')} type="number" />
      <Button value="3" onClick={() => onNumber('3')} type="number" />
      <Button value="+" onClick={() => onOperation('+')} type="operation" />

      {/* Row 5: Zero, decimal, dan equals */}
      <Button value="0" onClick={() => onNumber('0')} type="number" className="zero" />
      <Button value="." onClick={onDecimal} type="number" />
      <Button value="=" onClick={onEquals} type="equals" />
    </div>
  );
};

export default ButtonGrid;
