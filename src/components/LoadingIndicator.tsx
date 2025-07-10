'use client';

import { useRegion } from '@/contexts/RegionContext';

export default function LoadingIndicator() {
  const { isLoading } = useRegion();

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-white bg-opacity-90">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">正在检测视频服务可用性...</p>
      </div>
    </div>
  );
} 