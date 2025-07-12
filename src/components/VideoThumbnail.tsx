'use client';

import { useState } from 'react';
import { Play } from 'lucide-react';
import VideoModal from './VideoModal';
import { useRegion } from '@/contexts/RegionContext';

interface VideoThumbnailProps {
  videoId: string;
  bilibiliId?: string;
  thumbnailUrl?: string;
  startTime?: number;
  title?: string;
  description?: string;
  className?: string;
}

export default function VideoThumbnail({ 
  videoId, 
  bilibiliId,
  thumbnailUrl, 
  startTime = 0, 
  title,
  description,
  className = "" 
}: VideoThumbnailProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { recommendedPlatform, isLoading } = useRegion();

  // 根据推荐平台选择不同的视频平台
  const isBilibili = recommendedPlatform === 'bilibili' && bilibiliId;
  
  // 如果没有提供缩略图URL，根据平台使用默认缩略图
  const defaultThumbnail = isBilibili 
    ? `https://i0.hdslb.com/bfs/archive/${bilibiliId}.jpg`
    : `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  const fallbackThumbnail = isBilibili
    ? `https://i0.hdslb.com/bfs/archive/${bilibiliId}.jpg`
    : `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

  return (
    <>
      <div 
        className={`relative cursor-pointer group overflow-hidden rounded-lg ${className}`}
        onClick={() => setIsModalOpen(true)}
      >
        {/* Thumbnail */}
        <div className="relative w-full h-full">
          <img
            src={thumbnailUrl || defaultThumbnail}
            alt={title || "Video thumbnail"}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            onError={(e) => {
              // 如果高清缩略图加载失败，使用标准缩略图
              const target = e.target as HTMLImageElement;
              if (target.src !== fallbackThumbnail) {
                target.src = fallbackThumbnail;
              }
            }}
          />
          
          {/* Play button overlay */}
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 group-hover:bg-opacity-40 transition-all duration-300">
            <div className="w-16 h-16 bg-white bg-opacity-90 rounded-full flex items-center justify-center group-hover:bg-opacity-100 transition-all duration-300">
              <Play className="w-8 h-8 text-black ml-1" fill="black" />
            </div>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      <VideoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        videoId={videoId}
        bilibiliId={bilibiliId}
        startTime={startTime}
        isBilibili={!!isBilibili}
      />
    </>
  );
} 