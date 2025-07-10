import React from 'react';
import './Button.css';

type ButtonType = 'number' | 'operation' | 'equals' | 'clear' | 'function';

interface ButtonProps {
  value: string;
  onClick: () => void;
  type: ButtonType;
  className?: string;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ 
  value, 
  onClick, 
  type, 
  className = '', 
  disabled = false 
}) => {
  return (
    <button
      className={`calculator-button ${type} ${className}`}
      onClick={onClick}
      disabled={disabled}
      aria-label={`${value} button`}
    >
      {value}
    </button>
  );
};

export default Button;
