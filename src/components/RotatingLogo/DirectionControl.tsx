import React from 'react';
import { RotateCcw, RotateCw } from 'lucide-react';

interface DirectionControlProps {
  direction: 'clockwise' | 'counterclockwise';
  onDirectionChange: (direction: 'clockwise' | 'counterclockwise') => void;
}

export const DirectionControl: React.FC<DirectionControlProps> = ({
  direction,
  onDirectionChange,
}) => {
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => onDirectionChange('clockwise')}
        className={`p-2 rounded-full transition-colors ${
          direction === 'clockwise'
            ? 'bg-blue-100 text-blue-700'
            : 'text-gray-500 hover:bg-gray-100'
        }`}
        aria-label="Rotate clockwise"
      >
        <RotateCw className="w-4 h-4" />
      </button>
      <button
        onClick={() => onDirectionChange('counterclockwise')}
        className={`p-2 rounded-full transition-colors ${
          direction === 'counterclockwise'
            ? 'bg-blue-100 text-blue-700'
            : 'text-gray-500 hover:bg-gray-100'
        }`}
        aria-label="Rotate counterclockwise"
      >
        <RotateCcw className="w-4 h-4" />
      </button>
    </div>
  );
};