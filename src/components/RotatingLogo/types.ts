export type ImageFilter = 'none' | 'grayscale' | 'sepia' | 'blur' | 'brightness' | 'contrast' | 'hue-rotate';

export type PresetSpeed = 'slow' | 'medium' | 'fast';

export interface RotatingLogoProps {
  initialSpeed?: number;
  size?: number;
  className?: string;
  onImageChange?: (file: File) => void;
  onSpeedChange?: (speed: number) => void;
  onStateChange?: (state: Partial<ImageState>) => void;
  onPauseToggle?: () => void;
  maxFileSize?: number;
  defaultFilter?: ImageFilter;
  presetSpeeds?: Record<PresetSpeed, number>;
  imageState: ImageState;
  isPaused: boolean;
}

export interface ImageState {
  url: string;
  filter: ImageFilter;
  direction: 'clockwise' | 'counterclockwise';
  scale: number;
}