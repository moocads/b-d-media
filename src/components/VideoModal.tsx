'use client';

import { X } from 'lucide-react';
import { useLocale } from 'next-intl';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoId: string;
  bilibiliId?: string; // 这里存放新片场的嵌入链接或 ID
  startTime?: number;
}

export default function VideoModal({ isOpen, onClose, videoId, bilibiliId, startTime = 0 }: VideoModalProps) {
  const locale = useLocale();
  const isChinese = locale.startsWith('zh');

  // 新片场：如果是中文语言且有 bilibiliId，就优先使用新片场播放器
  const hasXpc = !!bilibiliId;
  const useXpc = isChinese && hasXpc;

  // 将 bilibiliId 视为新片场的嵌入链接；如果只存了 ID，则拼一个通用的 player 链接
  const xpcSrc = bilibiliId
    ? bilibiliId.startsWith('http')
      ? bilibiliId
      : `https://player.xinpianchang.com/?mid=${bilibiliId}`
    : '';

  if (!isOpen) return null;

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
          {useXpc && xpcSrc ? (
            <iframe
              src={xpcSrc}
              className="absolute top-0 left-0 w-full h-full rounded-lg"
              allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
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