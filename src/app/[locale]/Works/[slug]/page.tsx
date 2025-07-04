import { Locale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import PageLayout from '@/components/PageLayout';
import { strapi } from '@/lib/strapi';
import type { NewsArticle } from '@/types/strapi';

export default async function WorksDetailPage({ params }: { params: Promise<{ locale: Locale; slug: string }> }) {
  const { locale, slug } = await params;
  return <div>WorksDetailPage</div>;
}