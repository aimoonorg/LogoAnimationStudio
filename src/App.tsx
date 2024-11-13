import React, { useState } from 'react';
import { RotatingLogo } from './components/RotatingLogo';
import { ImageIcon, Layout, Settings } from 'lucide-react';
import { TabPanel } from './components/TabPanel';
import { WebsiteInfo } from './components/WebsiteInfo';
import type { ImageState } from './components/RotatingLogo/types';

function App() {
  const [activeTab, setActiveTab] = useState<'preview' | 'settings'>('preview');
  const [websiteName, setWebsiteName] = useState('');
  const [logoState, setLogoState] = useState<ImageState>({
    url: '',
    filter: 'none',
    direction: 'clockwise',
    scale: 1,
  });
  const [speed, setSpeed] = useState(5);
  const [isPaused, setIsPaused] = useState(false);

  const handleImageChange = (file: File) => {
    const url = URL.createObjectURL(file);
    setLogoState(prev => ({ ...prev, url }));
  };

  const handleSpeedChange = (newSpeed: number) => {
    setSpeed(newSpeed);
  };

  const handleStateChange = (newState: Partial<ImageState>) => {
    setLogoState(prev => ({ ...prev, ...newState }));
  };

  const handlePauseToggle = () => {
    setIsPaused(prev => !prev);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2 flex items-center justify-center gap-2">
            <ImageIcon className="w-8 h-8" />
            Logo Animation Studio
          </h1>
          <p className="text-gray-600">
            Create beautiful rotating logos for your website
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="border-b border-gray-200">
            <div className="flex gap-1 px-4">
              <button
                onClick={() => setActiveTab('preview')}
                className={`px-4 py-3 inline-flex items-center gap-2 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'preview'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Layout className="w-4 h-4" />
                Preview
              </button>
              <button
                onClick={() => setActiveTab('settings')}
                className={`px-4 py-3 inline-flex items-center gap-2 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'settings'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Settings className="w-4 h-4" />
                Settings
              </button>
            </div>
          </div>

          <TabPanel active={activeTab === 'preview'}>
            <div className="grid grid-cols-2 gap-8 p-6">
              <div className="flex items-center justify-center">
                <RotatingLogo
                  initialSpeed={speed}
                  size={300}
                  maxFileSize={5}
                  onImageChange={handleImageChange}
                  onSpeedChange={handleSpeedChange}
                  onStateChange={handleStateChange}
                  onPauseToggle={handlePauseToggle}
                  imageState={logoState}
                  isPaused={isPaused}
                />
              </div>
              <div className="flex items-center justify-center">
                <WebsiteInfo
                  websiteName={websiteName}
                  onWebsiteNameChange={setWebsiteName}
                  previewLogo={logoState}
                  previewSpeed={speed}
                  isPaused={isPaused}
                />
              </div>
            </div>
          </TabPanel>

          <TabPanel active={activeTab === 'settings'}>
            <div className="p-6 space-y-6">
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Export Settings</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">Animation Speed</span>
                    <span className="text-sm font-medium text-gray-900">{speed}x</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">Image Size</span>
                    <span className="text-sm font-medium text-gray-900">300px</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">Format</span>
                    <span className="text-sm font-medium text-gray-900">PNG</span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Advanced Options</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">Auto-play on load</span>
                    <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-blue-600">
                      <span className="translate-x-6 inline-block h-4 w-4 rounded-full bg-white transition"></span>
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">Smooth edges</span>
                    <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-blue-600">
                      <span className="translate-x-6 inline-block h-4 w-4 rounded-full bg-white transition"></span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </TabPanel>
        </div>
      </div>
    </div>
  );
}

export default App;