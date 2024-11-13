import React, { useState, useRef, useCallback } from 'react';
import { ImageUploader } from './ImageUploader';
import { SpeedControl } from './SpeedControl';
import { ImageFilters } from './ImageFilters';
import { DirectionControl } from './DirectionControl';
import type { RotatingLogoProps, ImageState, ImageFilter, PresetSpeed } from './types';

const DEFAULT_PRESET_SPEEDS: Record<PresetSpeed, number> = {
  slow: 2,
  medium: 5,
  fast: 8,
};

export const RotatingLogo: React.FC<RotatingLogoProps> = ({
  initialSpeed = DEFAULT_PRESET_SPEEDS.medium,
  size = 200,
  className = '',
  onImageChange,
  onSpeedChange,
  maxFileSize = 5,
  defaultFilter = 'none',
  presetSpeeds = DEFAULT_PRESET_SPEEDS,
}) => {
  const [speed, setSpeed] = useState(initialSpeed);
  const [imageState, setImageState] = useState<ImageState>({
    url: '',
    filter: defaultFilter,
    direction: 'clockwise',
    scale: 1,
  });
  const [isPaused, setIsPaused] = useState(false);
  const [error, setError] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > maxFileSize * 1024 * 1024) {
        setError(`File size must be less than ${maxFileSize}MB`);
        return;
      }

      if (!file.type.startsWith('image/')) {
        setError('Please upload an image file');
        return;
      }

      const url = URL.createObjectURL(file);
      setImageState(prev => ({ ...prev, url }));
      setError('');
      onImageChange?.(file);
    }
  }, [maxFileSize, onImageChange]);

  const handleSpeedChange = useCallback((newSpeed: number) => {
    setSpeed(newSpeed);
    onSpeedChange?.(newSpeed);
  }, [onSpeedChange]);

  const handleFilterChange = useCallback((filter: ImageFilter) => {
    setImageState(prev => ({ ...prev, filter }));
  }, []);

  const handleDirectionChange = useCallback((direction: 'clockwise' | 'counterclockwise') => {
    setImageState(prev => ({ ...prev, direction }));
  }, []);

  const handleScaleChange = useCallback((scale: number) => {
    setImageState(prev => ({ ...prev, scale }));
  }, []);

  const triggerFileInput = useCallback(() => {
    setError('');
    fileInputRef.current?.click();
  }, []);

  const togglePause = useCallback(() => {
    setIsPaused(prev => !prev);
  }, []);

  const rotationStyle: React.CSSProperties = {
    animationDuration: `${20 - speed}s`,
    animationTimingFunction: 'linear',
    animationIterationCount: 'infinite',
    animationPlayState: isPaused ? 'paused' : 'running',
    animationDirection: imageState.direction === 'counterclockwise' ? 'reverse' : 'normal',
  };

  return (
    <div className={`flex flex-col items-center gap-8 p-8 bg-white rounded-xl shadow-lg ${className}`}>
      <ImageUploader
        imageUrl={imageState.url}
        size={size}
        onClick={triggerFileInput}
        rotationStyle={rotationStyle}
        filter={imageState.filter}
        error={error}
        scale={imageState.scale}
        onScaleChange={handleScaleChange}
      />

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />

      <div className="w-full space-y-6">
        <SpeedControl
          speed={speed}
          isPaused={isPaused}
          onSpeedChange={handleSpeedChange}
          onPauseToggle={togglePause}
          presetSpeeds={presetSpeeds}
        />

        <div className="flex items-center justify-between">
          <DirectionControl
            direction={imageState.direction}
            onDirectionChange={handleDirectionChange}
          />
          <ImageFilters
            currentFilter={imageState.filter}
            onFilterChange={handleFilterChange}
          />
        </div>
      </div>
    </div>
  );
};

export type { RotatingLogoProps } from './types';