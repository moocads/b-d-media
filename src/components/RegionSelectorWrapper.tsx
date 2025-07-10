'use client';

import { useState, useEffect } from 'react';
import RegionSelector from './RegionSelector';
import { useRegion } from '@/contexts/RegionContext';

export default function RegionSelectorWrapper() {
  const [showSelector, setShowSelector] = useState(false);
  const { region } = useRegion();

  useEffect(() => {
    // 检查是否已经选择过区域
    const savedRegion = localStorage.getItem('user-region');
    if (!savedRegion) {
      // 如果没有选择过，显示选择器
      setShowSelector(true);
    }
  }, []);

  const handleRegionSelect = (selectedRegion: string) => {
    setShowSelector(false);
  };

  return (
    <RegionSelector
      isOpen={showSelector}
      onRegionSelect={handleRegionSelect}
    />
  );
} 