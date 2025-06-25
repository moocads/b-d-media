import { Locale } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { use } from 'react';
import HeroSection from '@/components/home/HeroSection';
import ServicesSection from '@/components/home/ServicesSection';
import ClientsSection from '@/components/home/ClientsSection';
import NewsSection from '@/components/home/NewsSection';
import { getClients, getNews } from '@/lib/api';
import { mockServices } from '@/lib/mockData';

export default async function IndexPage({ params: { locale } }: { params: { locale: Locale } }) {
  // Enable static rendering
  setRequestLocale(locale);
  
  // Fetch data from Strapi API
  const [clients, news] = await Promise.all([
    getClients(),
    getNews()
  ]);

  return (
    <main>
      <HeroSection />
      <ServicesSection services={mockServices} />
      <ClientsSection clients={clients} />
      <NewsSection newsArticles={news} />
    </main>
  );
}

// Generate static params for static rendering
export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'zh' }];
}
