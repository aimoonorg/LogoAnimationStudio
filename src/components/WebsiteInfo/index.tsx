import React, { useState } from 'react';
import { Type } from 'lucide-react';
import { PreviewSection } from './PreviewSection';
import { FontSelector } from './FontSelector';
import { LogoPreview } from './LogoPreview';
import type { ImageState } from '../RotatingLogo/types';

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
  const [selectedFont, setSelectedFont] = useState('modern');

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

  return (
    <div className="w-full max-w-md space-y-6">
      <div className="space-y-4">
        <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200">
          <LogoPreview
            previewLogo={previewLogo}
            previewSpeed={previewSpeed}
            isPaused={isPaused}
            size="sm"
          />
          <div className="flex-1">
            <label className="block">
              <div className="flex items-center gap-2 mb-1.5">
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
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="text-sm font-medium text-gray-900 mb-4">Live Preview</h3>
        <PreviewSection
          websiteName={websiteName}
          previewLogo={previewLogo}
          previewSpeed={previewSpeed}
          isPaused={isPaused}
          fontClass={getFontClass(selectedFont)}
        />
      </div>

      <FontSelector
        selectedFont={selectedFont}
        onFontSelect={setSelectedFont}
      />

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