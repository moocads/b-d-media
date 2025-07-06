import { Locale } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { use } from 'react';
import { routing } from '@/i18n/routing';
import HeroSection from '@/components/home/HeroSection';
import ServicesSection from '@/components/home/ServicesSection';
import Connecting from '@/components/home/Connecting';
import VideoDivider from '@/components/home/VideoDivider';
import ClientsSection from '@/components/home/ClientsSection';
import NewsSection from '@/components/home/NewsSection';
import { getClients, getNews } from '@/lib/api';
import { mockServices } from '@/lib/mockData';

export default async function IndexPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  // Enable static rendering
  setRequestLocale(locale);
  
  // Fetch data from Strapi API
  const [clients, news] = await Promise.all([
    getClients(locale),
    getNews(locale)
  ]);

  return (
    <main>
      <HeroSection />
      <ServicesSection services={mockServices} />
      <ClientsSection clients={clients} />
      <Connecting />
      <VideoDivider />
      <NewsSection newsArticles={news} />
    </main>
  );
}

// Generate static params for static rendering
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}
