'use client';

import { useState } from 'react';
import { Play } from 'lucide-react';
import Image from 'next/image';
import { useLocale } from 'next-intl';
import VideoModal from './VideoModal';

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
  className = "" 
}: VideoThumbnailProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const locale = useLocale();

  const extractBvid = (value?: string): string | null => {
    if (!value) return null;
    const match = value.match(/BV[0-9A-Za-z]{10}/);
    return match?.[0] ?? null;
  };

  const bvid = extractBvid(bilibiliId);

  // 中文用 B 站，其他语言用 YouTube
  const isBilibili = locale.startsWith('zh') && !!bvid;

  // 缩略图：优先 CMS thumbnailUrl；中文且用 B 站时可用 B 站图，否则 YouTube 默认
  const ytDefault = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  const ytFallback = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

  const xDefaultCandidates = isBilibili
    ? [
        `https://i0.hdslb.com/bfs/archive/${bvid}.webp`,
        `https://i1.hdslb.com/bfs/archive/${bvid}.webp`,
        `https://i0.hdslb.com/bfs/archive/${bvid}.jpg`,
        `https://i1.hdslb.com/bfs/archive/${bvid}.jpg`,
      ]
    : [];

  const defaultThumbnail = thumbnailUrl || (isBilibili ? xDefaultCandidates[0] : ytDefault) || ytDefault;
  const fallbackThumbnail = isBilibili ? (xDefaultCandidates[1] || xDefaultCandidates[0]) : ytFallback;

  const handleClick = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <div 
        className={`relative cursor-pointer group overflow-hidden rounded-lg ${className}`}
        onClick={handleClick}
      >
        {/* Thumbnail */}
        <div className="relative w-full h-full">
          <Image
            src={thumbnailUrl || defaultThumbnail}
            alt={title || "Video thumbnail"}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              // 如果高清缩略图加载失败，依次尝试其它候选（webp/jpg, i0/i1）
              if (isBilibili) {
                const candidates = xDefaultCandidates;
                const attempt = Number(target.getAttribute('data-bili-attempt') || '0');
                const next = candidates[attempt + 1] || fallbackThumbnail;
                target.setAttribute('data-bili-attempt', String(attempt + 1));
                if (next && target.src !== next) target.src = next;
                return;
              }

              // YouTube fallback
              if (target.src !== fallbackThumbnail) {
                target.src = fallbackThumbnail;
              }
            }}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          
          {/* Play button overlay */}
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 group-hover:bg-opacity-40 transition-all duration-300">
            <div className="w-16 h-16 bg-white bg-opacity-90 rounded-full flex items-center justify-center group-hover:bg-opacity-100 transition-all duration-300">
              <Play className="w-8 h-8 text-black ml-1" fill="black" />
            </div>
          </div>
        </div>
      </div>

      {/* Video Modal：中文用 B 站，其他语言用 YouTube */}
      <VideoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        videoId={videoId}
        bilibiliId={bvid ?? undefined}
       
        startTime={startTime}
        isBilibili={isBilibili}
      />
    </>
  );
} 