import { Locale } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { use } from 'react';
import HeroSection from '@/components/home/HeroSection';
import ServicesSection from '@/components/home/ServicesSection';
import ClientsSection from '@/components/home/ClientsSection';
import NewsSection from '@/components/home/NewsSection';
import { getClients, getNews, getServices } from '@/lib/api';
// Keep mockData import as fallback
import { mockClients, mockNews, mockServices } from '@/lib/mockData';

type Props = {
  params: Promise<{ locale: Locale }>;
};

export default function IndexPage({ params }: Props) {
  const { locale } = use(params);

  // Enable static rendering
  setRequestLocale(locale);
  
  // Fetch data from Strapi API
  const [clients, services, articles] = [mockClients, mockServices, mockNews]

  return (
    <main>
      <HeroSection />
      <ServicesSection services={services} />
      <ClientsSection clients={clients} />
      <NewsSection articles={articles} />
    </main>
  );
}

// Generate static params for static rendering
export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'zh' }];
}
