import React from 'react';
import type { ImageState } from './types';

interface RotatingLogoProps {
  imageUrl: string;
  size?: number | string;
  speed?: number;
  filter?: ImageState['filter'];
  direction?: 'clockwise' | 'counterclockwise';
  scale?: number;
  isPaused?: boolean;
  className?: string;
}

export const RotatingLogo: React.FC<RotatingLogoProps> = ({
  imageUrl,
  size = '2rem',
  speed = 5,
  filter = 'none',
  direction = 'clockwise',
  scale = 1,
  isPaused = false,
  className = '',
}) => {
  const sizeStyle = typeof size === 'number' ? `${size}px` : size;

  const rotationStyle: React.CSSProperties = {
    width: sizeStyle,
    height: sizeStyle,
    animationDuration: `${20 - speed}s`,
    animationTimingFunction: 'linear',
    animationIterationCount: 'infinite',
    animationPlayState: isPaused ? 'paused' : 'running',
    animationDirection: direction === 'counterclockwise' ? 'reverse' : 'normal',
    transform: `scale(${scale})`,
  };

  const getFilterStyle = (): React.CSSProperties => {
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
    <div 
      className={`rotating-logo ${className}`}
      style={{ width: sizeStyle, height: sizeStyle }}
    >
      <img
        src={imageUrl}
        alt="Rotating Logo"
        className="w-full h-full object-cover rounded-full animate-spin"
        style={{
          ...rotationStyle,
          ...getFilterStyle(),
        }}
      />
      <style jsx>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .rotating-logo img {
          animation: spin linear infinite;
        }
      `}</style>
    </div>
  );
};