import React from 'react';
import { RotateCw, Pause, Play, Rewind, FastForward } from 'lucide-react';
import { PresetSpeed } from './types';

interface SpeedControlProps {
  speed: number;
  isPaused: boolean;
  onSpeedChange: (speed: number) => void;
  onPauseToggle: () => void;
  presetSpeeds: Record<PresetSpeed, number>;
}

export const SpeedControl: React.FC<SpeedControlProps> = ({
  speed,
  isPaused,
  onSpeedChange,
  onPauseToggle,
  presetSpeeds,
}) => {
  const getSpeedPreset = (speed: number): PresetSpeed | null => {
    const preset = Object.entries(presetSpeeds).find(([_, value]) => value === speed);
    return preset ? (preset[0] as PresetSpeed) : null;
  };

  const currentPreset = getSpeedPreset(speed);

  return (
    <div className="w-full max-w-xs space-y-4">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
          <RotateCw className="w-4 h-4" />
          Rotation Speed
        </label>
        <div className="flex items-center gap-3">
          <button
            onClick={() => onSpeedChange(Math.max(1, speed - 1))}
            className="p-1.5 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Decrease speed"
          >
            <Rewind className="w-4 h-4 text-gray-600" />
          </button>
          <button
            onClick={onPauseToggle}
            className="p-1.5 rounded-full hover:bg-gray-100 transition-colors"
            aria-label={isPaused ? 'Resume rotation' : 'Pause rotation'}
          >
            {isPaused ? (
              <Play className="w-4 h-4 text-gray-600" />
            ) : (
              <Pause className="w-4 h-4 text-gray-600" />
            )}
          </button>
          <button
            onClick={() => onSpeedChange(Math.min(10, speed + 1))}
            className="p-1.5 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Increase speed"
          >
            <FastForward className="w-4 h-4 text-gray-600" />
          </button>
          <span className="text-sm text-gray-500 min-w-[2.5rem] text-right">
            {speed}x
          </span>
        </div>
      </div>
      
      <div className="space-y-2">
        <input
          type="range"
          min="1"
          max="10"
          value={speed}
          onChange={(e) => onSpeedChange(Number(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
        />
        
        <div className="flex justify-between gap-2">
          {Object.entries(presetSpeeds).map(([preset, value]) => (
            <button
              key={preset}
              onClick={() => onSpeedChange(value)}
              className={`px-3 py-1 text-xs rounded-full transition-colors ${
                currentPreset === preset
                  ? 'bg-blue-100 text-blue-700'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {preset.charAt(0).toUpperCase() + preset.slice(1)}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};