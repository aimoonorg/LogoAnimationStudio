import React from 'react';
import { Upload, Image as ImageIcon, AlertCircle, ZoomIn, ZoomOut } from 'lucide-react';
import { ImageFilter } from './types';

interface ImageUploaderProps {
  imageUrl: string;
  size: number;
  onClick: () => void;
  rotationStyle: React.CSSProperties;
  filter: ImageFilter;
  error?: string;
  scale: number;
  onScaleChange: (scale: number) => void;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  imageUrl,
  size,
  onClick,
  rotationStyle,
  filter,
  error,
  scale,
  onScaleChange,
}) => {
  const getFilterStyle = (filter: ImageFilter): React.CSSProperties => {
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
    <div className="relative">
      <div 
        className="relative group"
        style={{ width: size, height: size }}
      >
        {imageUrl ? (
          <div className="relative">
            <img
              src={imageUrl}
              alt="Rotating Logo"
              className="w-full h-full object-cover rounded-full animate-spin"
              style={{ 
                ...rotationStyle, 
                ...getFilterStyle(filter),
                transform: `scale(${scale})`,
                transition: 'transform 0.3s ease'
              }}
            />
            <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 flex items-center gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onScaleChange(Math.max(0.5, scale - 0.1));
                }}
                className="p-1.5 rounded-full hover:bg-gray-100 transition-colors"
                aria-label="Zoom out"
              >
                <ZoomOut className="w-4 h-4 text-gray-600" />
              </button>
              <span className="text-sm text-gray-500 min-w-[3rem] text-center">
                {(scale * 100).toFixed(0)}%
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onScaleChange(Math.min(2, scale + 0.1));
                }}
                className="p-1.5 rounded-full hover:bg-gray-100 transition-colors"
                aria-label="Zoom in"
              >
                <ZoomIn className="w-4 h-4 text-gray-600" />
              </button>
            </div>
          </div>
        ) : (
          <div 
            className="w-full h-full rounded-full border-4 border-dashed border-gray-300 flex items-center justify-center bg-gray-50 group-hover:bg-gray-100 transition-colors cursor-pointer"
            onClick={onClick}
          >
            <div className="flex flex-col items-center gap-2 text-gray-500">
              <ImageIcon className="w-12 h-12" />
              <span className="text-sm font-medium">Click to upload image</span>
            </div>
          </div>
        )}
        
        {imageUrl && (
          <div 
            className="absolute inset-0 rounded-full bg-black bg-opacity-0 group-hover:bg-opacity-30 flex items-center justify-center transition-opacity opacity-0 group-hover:opacity-100 cursor-pointer"
            onClick={onClick}
          >
            <Upload className="w-8 h-8 text-white" />
          </div>
        )}
      </div>
      
      {error && (
        <div className="absolute -bottom-20 left-0 right-0 flex items-center justify-center text-red-500 text-sm gap-1">
          <AlertCircle className="w-4 h-4" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};