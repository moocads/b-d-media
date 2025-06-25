import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import type { NewsArticle } from '@/types/strapi';

function NewsCard({news}: {news: NewsArticle}) {
  const formattedDate = new Date(news.publishedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  return (
    <div className="overflow-hidden rounded-lg bg-white shadow-md">
      <div className="relative h-48 w-full">
        <Image
          src={news.image.url}
          alt={news.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="p-4">
        <h3 className="mb-2 text-lg font-semibold">
          <Link href={`/news/${news.slug}`} className="hover:text-yellow-600">
            {news.title}
          </Link>
        </h3>
        <p className="text-sm text-gray-500">{formattedDate}</p>
      </div>
    </div>
  );
}

export default function NewsSection({ newsArticles = [] }: { newsArticles: NewsArticle[] }) {
  const t = useTranslations('HomePage.news');

  return (
    <section className="bg-gray-100 py-16">
      <div className="container mx-auto px-4">
        <div className="mb-12">
          <h2 className="mb-2 text-3xl font-bold uppercase">
            {t('title')}
          </h2>
          <div className="h-1 w-20 bg-yellow-400"></div>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {newsArticles.map((news) => (
            <NewsCard
              key={news.id}
              news={news}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
