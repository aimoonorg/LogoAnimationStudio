import React from 'react';

interface FontSelectorProps {
  selectedFont: string;
  onFontSelect: (font: string) => void;
}

export const FontSelector: React.FC<FontSelectorProps> = ({
  selectedFont,
  onFontSelect,
}) => {
  const fonts = [
    { key: 'modern', label: 'Modern', class: 'font-sans' },
    { key: 'classic', label: 'Classic', class: 'font-serif' },
    { key: 'playful', label: 'Playful', class: 'font-mono' },
    { key: 'bold', label: 'Bold', class: 'font-bold' },
  ];

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-medium text-gray-900">Font Style</h3>
      <div className="grid grid-cols-2 gap-2">
        {fonts.map(({ key, label, class: fontClass }) => (
          <button
            key={key}
            onClick={() => onFontSelect(key)}
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
  );
};