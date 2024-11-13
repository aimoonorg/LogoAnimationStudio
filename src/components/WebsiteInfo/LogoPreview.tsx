import React from 'react';
import { Type } from 'lucide-react';
import type { ImageState } from '../RotatingLogo/types';

interface LogoPreviewProps {
  previewLogo: ImageState;
  previewSpeed: number;
  isPaused: boolean;
  size?: 'sm' | 'md';
}

export const LogoPreview: React.FC<LogoPreviewProps> = ({
  previewLogo,
  previewSpeed,
  isPaused,
  size = 'md'
}) => {
  const rotationStyle: React.CSSProperties = {
    animationDuration: `${20 - previewSpeed}s`,
    animationTimingFunction: 'linear',
    animationIterationCount: 'infinite',
    animationPlayState: isPaused ? 'paused' : 'running',
    animationDirection: previewLogo.direction === 'counterclockwise' ? 'reverse' : 'normal',
  };

  const getFilterStyle = (filter: ImageState['filter']): React.CSSProperties => {
    switch (filter) {
      case 'grayscale':
        return { filter: 'grayscale(1)' };
      case 'sepia':
        return { filter: 'sepia(1)' };
      case 'blur':
        return { filter: 'blur(1px)' };
      case 'brightness':
        return { filter: 'brightness(1.2)' };
      case 'contrast':
        return { filter: 'contrast(1.2)' };
      case 'hue-rotate':
        return { filter: 'hue-rotate(90deg)' };
      default:
        return {};
    }
  };

  return (
    <div className={`relative ${size === 'sm' ? 'w-8 h-8' : 'w-24 h-24'}`}>
      {previewLogo.url ? (
        <img
          src={previewLogo.url}
          alt="Logo Preview"
          className="w-full h-full object-cover rounded-full animate-spin"
          style={{
            ...rotationStyle,
            ...getFilterStyle(previewLogo.filter),
            transform: `scale(${previewLogo.scale})`,
          }}
        />
      ) : (
        <div className="w-full h-full rounded-full bg-gray-100 flex items-center justify-center">
          <Type className={`${size === 'sm' ? 'w-4 h-4' : 'w-8 h-8'} text-gray-400`} />
        </div>
      )}
    </div>
  );
};