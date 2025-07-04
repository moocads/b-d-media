
'use client';

import { useTranslations } from 'next-intl';
import { useRef } from 'react';

export default function Connecting() {
  const t = useTranslations('HomePage.connecting');
  const circleRef = useRef(null);

  return (
    <section className="bg-gray-100 pt-[100px] relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="mb-12">
          <div className="text-center">
            <h2 className="text-3xl text-[#031615] font-black">
              {t('title')}
            </h2>
            <p className="mt-6 text-lg font-light w-2/3 mx-auto">
              {t('description')}
            </p>
          </div>
        </div>
      </div>



    {/* 发光动画圆圈：z-0 放低层级 */}
  <img
    src="/images/sun.png"
    alt="motion circle"
    className="absolute md:w-[550px] md:h-[550px] w-20 h-20 animate-arc-move z-0 pointer-events-none md:top-[50%] top-[100%] left-0 mix-blend-multiply"

  />

  {/* Bridge 图片：z-10 放高层级盖住圆圈 */}
  <div className="relative z-10 flex justify-center">
    <img
      src="/images/bridge.png"
      alt="connecting"
      className="w-full h-full object-cover mb-[-2px]"
    />
  </div>
    </section>
  );
}