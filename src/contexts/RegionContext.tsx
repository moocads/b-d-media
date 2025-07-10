'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Region } from '@/components/RegionSelector';
import { detectWithFallback, DetectionResult } from '@/lib/ipDetection';

interface RegionContextType {
  region: Region | null;
  setRegion: (region: Region) => void;
  detectionResult: DetectionResult | null;
  isLoading: boolean;
  recommendedPlatform: 'youtube' | 'bilibili';
}

const RegionContext = createContext<RegionContextType | undefined>(undefined);

export function RegionProvider({ children }: { children: ReactNode }) {
  const [region, setRegionState] = useState<Region | null>(null);
  const [detectionResult, setDetectionResult] = useState<DetectionResult | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 从localStorage读取保存的区域
    const savedRegion = localStorage.getItem('user-region') as Region;
    if (savedRegion) {
      setRegionState(savedRegion);
      setIsLoading(false);
    } else {
      // 如果没有保存的区域，进行YouTube可访问性检测
      detectWithFallback()
        .then((result) => {
          setDetectionResult(result);
          
          // 根据检测结果设置默认区域
          const defaultRegion: Region = 'overseas'; // 默认海外
          setRegionState(defaultRegion);
          localStorage.setItem('user-region', defaultRegion);
        })
        .catch((error) => {
          console.error('Auto-detection failed:', error);
          // 出错时默认设置为海外
          setRegionState('overseas');
          localStorage.setItem('user-region', 'overseas');
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, []);

  const setRegion = (newRegion: Region) => {
    setRegionState(newRegion);
    localStorage.setItem('user-region', newRegion);
  };
  
  // 推荐平台：优先使用检测结果，如果没有则默认YouTube
  const recommendedPlatform = detectionResult?.recommendedPlatform || 'youtube';

  return (
    <RegionContext.Provider value={{
      region,
      setRegion,
      detectionResult,
      isLoading,
      recommendedPlatform
    }}>
      {children}
    </RegionContext.Provider>
  );
}

export function useRegion() {
  const context = useContext(RegionContext);
  if (context === undefined) {
    throw new Error('useRegion must be used within a RegionProvider');
  }
  return context;
} 