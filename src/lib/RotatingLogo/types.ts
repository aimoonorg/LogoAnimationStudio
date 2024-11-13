export type ImageFilter = 'none' | 'grayscale' | 'sepia' | 'blur' | 'brightness' | 'contrast' | 'hue-rotate';

export interface ImageState {
  url: string;
  filter: ImageFilter;
  direction: 'clockwise' | 'counterclockwise';
  scale: number;
}