import React from 'react';
import { Type } from 'lucide-react';
import type { ImageState } from './RotatingLogo/types';

interface WebsiteInfoProps {
  websiteName: string;
  onWebsiteNameChange: (name: string) => void;
  previewLogo: ImageState;
  previewSpeed: number;
  isPaused: boolean;
}

export const WebsiteInfo: React.FC<WebsiteInfoProps> = ({
  websiteName,
  onWebsiteNameChange,
  previewLogo,
  previewSpeed,
  isPaused,
}) => {
  const [selectedFont, setSelectedFont] = React.useState('modern');

  const getFontClass = (font: string) => {
    switch (font) {
      case 'modern':
        return 'font-sans';
      case 'classic':
        return 'font-serif';
      case 'playful':
        return 'font-mono';
      case 'bold':
        return 'font-bold';
      default:
        return 'font-sans';
    }
  };

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

  const LogoPreview = ({ size = 'md' }: { size?: 'sm' | 'md' }) => (
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

  return (
    <div className="w-full max-w-md space-y-6">
      <div className="space-y-4">
        <label className="block">
          <div className="flex items-center gap-2 mb-2">
            <Type className="w-4 h-4" />
            <span className="text-sm font-medium text-gray-700">Website Name</span>
          </div>
          <input
            type="text"
            value={websiteName}
            onChange={(e) => onWebsiteNameChange(e.target.value)}
            placeholder="Enter your website name"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </label>
      </div>

      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="text-sm font-medium text-gray-900 mb-4">Live Preview</h3>
        
        {/* Header Preview */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm mb-6 overflow-hidden">
          <div className="p-4 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <LogoPreview size="sm" />
              <span className={`text-lg font-semibold text-gray-900 ${getFontClass(selectedFont)}`}>
                {websiteName || 'Website Name'}
              </span>
            </div>
          </div>
        </div>

        {/* Center Preview */}
        <div className="p-8 bg-white rounded-lg border border-gray-200 shadow-sm">
          <div className="flex flex-col items-center gap-6">
            <LogoPreview />
            <div className={`text-center ${getFontClass(selectedFont)}`}>
              {websiteName ? (
                <h2 className="text-2xl font-bold text-gray-900 break-words max-w-[200px]">
                  {websiteName}
                </h2>
              ) : (
                <p className="text-gray-400">Website name will appear here</p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="text-sm font-medium text-gray-900">Font Style</h3>
        <div className="grid grid-cols-2 gap-2">
          {[
            { key: 'modern', label: 'Modern', class: 'font-sans' },
            { key: 'classic', label: 'Classic', class: 'font-serif' },
            { key: 'playful', label: 'Playful', class: 'font-mono' },
            { key: 'bold', label: 'Bold', class: 'font-bold' },
          ].map(({ key, label, class: fontClass }) => (
            <button
              key={key}
              onClick={() => setSelectedFont(key)}
              className={`px-4 py-2 text-sm rounded-lg transition-all ${
                selectedFont === key
                  ? 'bg-blue-100 text-blue-700 ring-2 ring-blue-500 ring-opacity-50'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              } ${fontClass}`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="p-4 bg-blue-50 rounded-lg">
        <h4 className="text-sm font-medium text-blue-900 mb-2">Preview Tips</h4>
        <ul className="text-sm text-blue-700 space-y-1 list-disc list-inside">
          <li>Try different font styles to match your brand</li>
          <li>Adjust logo size and rotation speed</li>
          <li>Test various filters for the perfect look</li>
        </ul>
      </div>
    </div>
  );
};