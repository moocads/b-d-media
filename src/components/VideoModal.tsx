'use client';

import { X } from 'lucide-react';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoId: string;
  bilibiliId?: string;
  startTime?: number;
  isBilibili?: boolean;
}

export default function VideoModal({ isOpen, onClose, videoId, bilibiliId, startTime = 0, isBilibili = false }: VideoModalProps) {
  if (!isOpen) return null;

  const extractBvid = (value?: string): string | null => {
    if (!value) return null;
    const match = value.match(/BV[0-9A-Za-z]{10}/);
    return match?.[0] ?? null;
  };

  const bvid = extractBvid(bilibiliId);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-75"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative z-10 w-full max-w-4xl mx-4">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
        >
          <X size={24} />
        </button>
        
        {/* Video container */}
        <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
          {isBilibili && bvid ? (
            <iframe
              src={`https://player.bilibili.com/player.html?bvid=${bvid}&autoplay=1&high_quality=1`}
              className="absolute top-0 left-0 w-full h-full rounded-lg"
              allow="autoplay; fullscreen"
              allowFullScreen
            />
          ) : (
            <iframe
              src={`https://www.youtube.com/embed/${videoId}?start=${startTime}&autoplay=1&rel=0`}
              className="absolute top-0 left-0 w-full h-full rounded-lg"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          )}
        </div>
      </div>
    </div>
  );
} 