import React from 'react';
import { LogoPreview } from './LogoPreview';
import type { ImageState } from '../RotatingLogo/types';

interface PreviewSectionProps {
  websiteName: string;
  previewLogo: ImageState;
  previewSpeed: number;
  isPaused: boolean;
  fontClass: string;
}

export const PreviewSection: React.FC<PreviewSectionProps> = ({
  websiteName,
  previewLogo,
  previewSpeed,
  isPaused,
  fontClass,
}) => {
  return (
    <div className="space-y-6">
      {/* Header Preview */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-4">
          <div className="flex items-center gap-3">
            <LogoPreview
              previewLogo={previewLogo}
              previewSpeed={previewSpeed}
              isPaused={isPaused}
              size="sm"
            />
            <span className={`text-lg font-semibold text-gray-900 ${fontClass}`}>
              {websiteName || 'Website Name'}
            </span>
          </div>
        </div>
      </div>

      {/* Center Preview */}
      <div className="p-8 bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="flex flex-col items-center gap-6">
          <LogoPreview
            previewLogo={previewLogo}
            previewSpeed={previewSpeed}
            isPaused={isPaused}
          />
          <div className={`text-center ${fontClass}`}>
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
  );
};