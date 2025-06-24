import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function HeroSection() {
  const t = useTranslations('HomePage.hero');

  return (
    <section className="relative min-h-[500px] w-full bg-gradient-to-b from-yellow-100 to-yellow-300 py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl">
          <h1 className="mb-6 text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
            {t('title')}
          </h1>
          <Link
            href="/contact"
            className="inline-block rounded-full bg-white px-8 py-3 font-medium text-gray-800 shadow-md transition hover:bg-gray-100"
          >
            {t('cta')}
          </Link>
        </div>
      </div>
      {/* Background image elements - semi-transparent lemon slices */}
      <div className="absolute inset-0 -z-10 overflow-hidden opacity-70">
        <div className="absolute -right-20 -top-20 h-[400px] w-[400px] rounded-full bg-yellow-200"></div>
        <div className="absolute -bottom-40 -left-20 h-[300px] w-[300px] rounded-full bg-yellow-200"></div>
      </div>
    </section>
  );
}
