import React, { useState, useRef } from 'react';
import { Upload, RotateCw, Image as ImageIcon } from 'lucide-react';

interface RotatingLogoProps {
  initialSpeed?: number;
  size?: number;
}

export const RotatingLogo: React.FC<RotatingLogoProps> = ({
  initialSpeed = 5,
  size = 200
}) => {
  const [speed, setSpeed] = useState(initialSpeed);
  const [imageUrl, setImageUrl] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImageUrl(url);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-col items-center gap-6 p-8 bg-white rounded-xl shadow-lg">
      <div 
        className="relative group cursor-pointer"
        onClick={triggerFileInput}
        style={{
          width: size,
          height: size
        }}
      >
        {imageUrl ? (
          <img
            src={imageUrl}
            alt="Rotating Logo"
            className="w-full h-full object-cover rounded-full animate-spin"
            style={{
              animationDuration: `${20 - speed}s`,
              animationTimingFunction: 'linear',
              animationIterationCount: 'infinite'
            }}
          />
        ) : (
          <div 
            className="w-full h-full rounded-full border-4 border-dashed border-gray-300 flex items-center justify-center bg-gray-50 group-hover:bg-gray-100 transition-colors"
          >
            <div className="flex flex-col items-center gap-2 text-gray-500">
              <ImageIcon className="w-12 h-12" />
              <span className="text-sm font-medium">Click to upload image</span>
            </div>
          </div>
        )}
        
        <div className="absolute inset-0 rounded-full bg-black bg-opacity-0 group-hover:bg-opacity-30 flex items-center justify-center transition-opacity opacity-0 group-hover:opacity-100">
          <Upload className="w-8 h-8 text-white" />
        </div>
      </div>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />

      <div className="w-full max-w-xs space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
            <RotateCw className="w-4 h-4" />
            Rotation Speed
          </label>
          <span className="text-sm text-gray-500">{speed}x</span>
        </div>
        <input
          type="range"
          min="1"
          max="10"
          value={speed}
          onChange={(e) => setSpeed(Number(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
        />
      </div>
    </div>
  );
};