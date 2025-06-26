import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function HeroSection() {
  const t = useTranslations('HomePage.hero');

  return (
 <section className="relative h-[80vh] bg-cover bg-center" style={{ backgroundImage: 'url(/your-banner.jpg)' }}>
  <div className="absolute inset-0 bg-black/40" />
  <div className="relative z-10 h-full flex items-end">
    <div className="container mx-auto px-4">
      <div className="max-w-3xl pb-16">
        <h1 className="text-4xl text-white font-bold leading-tight md:text-5xl lg:text-6xl">
          {t('title')}
        </h1>
        <br />
        <Link
          href="/contact"
          className="inline-block rounded-full bg-white px-8 py-3 font-medium text-gray-800 shadow-md transition hover:bg-gray-100"
        >
          {t('cta')}
        </Link>
      </div>
    </div>
  </div>
      {/* Background image elements - semi-transparent lemon slices */}
      <div className="absolute inset-0 -z-10 overflow-hidden opacity-100 ">
          {/* <img src="/images/lemon-bg.jpg" alt="hero-bg-1" className="w-full h-full object-cover" /> */}
          <video src="/videos/hotel-demo.mp4" autoPlay loop muted className="w-full h-full object-cover" poster="/images/hero-video-poster.png"/>
      </div>
    </section>
  );
}
