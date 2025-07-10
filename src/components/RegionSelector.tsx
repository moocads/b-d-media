'use client';

import { useState, useEffect } from 'react';
import { Globe, MapPin } from 'lucide-react';

export type Region = 'mainland-china' | 'hong-kong-taiwan' | 'overseas';

interface RegionSelectorProps {
  isOpen: boolean;
  onRegionSelect: (region: Region) => void;
}

const regions = [
  {
    id: 'mainland-china' as Region,
    name: '中国大陆',
    description: '中国内地用户',
    flag: '🇨🇳'
  },
  {
    id: 'hong-kong-taiwan' as Region,
    name: '港澳台地区',
    description: '香港、澳门、台湾地区用户',
    flag: '🇭🇰'
  },
  {
    id: 'overseas' as Region,
    name: '其他海外地区',
    description: '其他国家和地区用户',
    flag: '🌍'
  }
];

export default function RegionSelector({ isOpen, onRegionSelect }: RegionSelectorProps) {
  const [selectedRegion, setSelectedRegion] = useState<Region | null>(null);

  useEffect(() => {
    // 检查是否已经选择过区域
    const savedRegion = localStorage.getItem('user-region') as Region;
    if (savedRegion && regions.some(r => r.id === savedRegion)) {
      setSelectedRegion(savedRegion);
    }
  }, []);

  const handleRegionSelect = (region: Region) => {
    setSelectedRegion(region);
    localStorage.setItem('user-region', region);
    onRegionSelect(region);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4 shadow-xl">
        <div className="text-center mb-6">
          <div className="flex justify-center mb-4">
            <Globe className="w-12 h-12 text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">选择您所在的地区</h2>
          <p className="text-gray-600">我们将为您提供最适合的视频服务</p>
        </div>

        <div className="space-y-3">
          {regions.map((region) => (
            <button
              key={region.id}
              onClick={() => handleRegionSelect(region.id)}
              className={`w-full p-4 rounded-lg border-2 transition-all duration-200 text-left hover:shadow-md ${
                selectedRegion === region.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{region.flag}</span>
                <div>
                  <div className="font-semibold text-gray-900">{region.name}</div>
                  <div className="text-sm text-gray-600">{region.description}</div>
                </div>
              </div>
            </button>
          ))}
        </div>

        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            您可以在设置中随时更改此选择
          </p>
        </div>
      </div>
    </div>
  );
} 