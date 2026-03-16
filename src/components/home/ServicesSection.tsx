'use client';

import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';

const LOCALE_TO_SUFFIX: Record<string, string> = {
  en: 'en',
  'zh-CN': 'cn',
  'zh-Hant': 'tr-cn',
  fr: 'fr',
};

const SERVICES = [
  { id: 1, titleKey: 'service1' as const },
  { id: 2, titleKey: 'service2' as const },
  { id: 3, titleKey: 'service3' as const },
];

function getServiceImagePath(index: number, localeSuffix: string) {
  return `/images/services/${String(index).padStart(2, '0')}-${localeSuffix}.webp`;
}

interface ServiceCardProps {
  title: string;
  imageUrl: string;
  alt: string;
}

function ServiceCard({ title, imageUrl, alt }: ServiceCardProps) {
  return (
    <div className="overflow-hidden rounded-tr-[30px] bg-white" aria-label={title}>
      <div className="relative h-64 w-full">
        <Image
          src={imageUrl}
          alt={alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="p-4">
        {/* <h3 className="text-xl font-semibold">{title}</h3> */}
      </div>
    </div>
  );
}

export default function ServicesSection() {
  const t = useTranslations('HomePage.services');
  const tButton = useTranslations('Button');
  const locale = useLocale();
  const suffix = LOCALE_TO_SUFFIX[locale] ?? 'en';

  const displayServices = SERVICES.map((s) => {
    const title = t(s.titleKey);
    return {
      id: s.id,
      title,
      imageUrl: getServiceImagePath(s.id, suffix),
      alt: title,
    };
  });

  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div className="col-span-2">
              <p className="text-gray-700 text-lg">
            {t('subtitle')}
          </p>
          <h2 className="mb-4 mt-2 text-3xl md:text-6xl font-black uppercase text-black" 
              dangerouslySetInnerHTML={{ __html: t('title') }}>
          </h2>
          </div>
          <div className="col-span-1">
            <p className="text-gray-700 text-md">
            {t('description')}
          </p>
          <br />
          <Link href="/contact" className="bg-black rounded-full px-4 py-2 text-white text-sm mt-2">
              {tButton('learnMore')}
          </Link>
          </div>
        </div>
        
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {displayServices.map((service) => (
            <ServiceCard
              key={service.id}
              title={service.title}
              imageUrl={service.imageUrl}
              alt={service.alt}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
