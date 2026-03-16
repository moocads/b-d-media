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
import { getNews, getClients } from '@/lib/api';

export default async function IndexPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  // Enable static rendering
  setRequestLocale(locale);
  
  // Fetch data from Strapi API
  const [news, clients] = await Promise.all([
    getNews(locale),
    getClients(locale),
  ]);

  return (
    <main>
      <HeroSection />
      <ServicesSection />
      <ClientsSection clients={clients} />
      <Connecting />
      <VideoDivider />
      <NewsSection newsArticles={news} />
    </main>
  );
}
