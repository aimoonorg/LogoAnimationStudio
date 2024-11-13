import React from 'react';
import { ImageFilter } from './types';
import { Palette } from 'lucide-react';

interface ImageFiltersProps {
  currentFilter: ImageFilter;
  onFilterChange: (filter: ImageFilter) => void;
}

export const ImageFilters: React.FC<ImageFiltersProps> = ({
  currentFilter,
  onFilterChange,
}) => {
  const filters: ImageFilter[] = ['none', 'grayscale', 'sepia', 'blur', 'brightness', 'contrast', 'hue-rotate'];

  return (
    <div className="w-full max-w-xs space-y-2">
      <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
        <Palette className="w-4 h-4" />
        Image Filter
      </label>
      <div className="flex flex-wrap gap-2">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => onFilterChange(filter)}
            className={`px-3 py-1.5 text-sm rounded-full transition-colors ${
              currentFilter === filter
                ? 'bg-blue-100 text-blue-700'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {filter.split('-').map(word => 
              word.charAt(0).toUpperCase() + word.slice(1)
            ).join(' ')}
          </button>
        ))}
      </div>
    </div>
  );
};