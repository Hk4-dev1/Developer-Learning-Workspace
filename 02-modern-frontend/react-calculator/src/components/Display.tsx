import React from 'react';
import './Display.css';
import { Operation } from './Calculator';

interface DisplayProps {
  value: string;
  operation: Operation | null;
  previousValue: string;
}

const Display: React.FC<DisplayProps> = ({ value, operation, previousValue }) => {
  return (
    <div className="display">
      {/* Previous value dan operation indicator */}
      <div className="display-history">
        {previousValue && operation && (
          <span>{previousValue} {operation}</span>
        )}
      </div>
      
      {/* Current value - main display */}
      <div className="display-current">
        {value}
      </div>
    </div>
  );
};

export default Display;
