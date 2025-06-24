import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import type { NewsArticle } from '@/types/strapi';

interface NewsCardProps {
  title: string;
  date: string;
  imageUrl: string;
  slug: string;
}

function NewsCard({ title, date, imageUrl, slug }: NewsCardProps) {
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  return (
    <div className="overflow-hidden rounded-lg bg-white shadow-md">
      <div className="relative h-48 w-full">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="p-4">
        <h3 className="mb-2 text-lg font-semibold">
          <Link href={`/news/${slug}`} className="hover:text-yellow-600">
            {title}
          </Link>
        </h3>
        <p className="text-sm text-gray-500">{formattedDate}</p>
      </div>
    </div>
  );
}

interface NewsSectionProps {
  articles?: NewsArticle[];
}

export default function NewsSection({ articles = [] }: NewsSectionProps) {
  const t = useTranslations('HomePage.news');

  // Fallback news if API fails
  const fallbackNews = [
    {
      id: 1,
      title: 'This is a title for this news...',
      date: '2025-06-01',
      imageUrl: '/images/news/news-1.jpg',
      slug: 'news-1'
    },
    {
      id: 2,
      title: 'This is a title for this news...',
      date: '2025-05-15',
      imageUrl: '/images/news/news-2.jpg',
      slug: 'news-2'
    },
    {
      id: 3,
      title: 'This is a title for this news...',
      date: '2025-05-01',
      imageUrl: '/images/news/news-3.jpg',
      slug: 'news-3'
    }
  ];

  // Use API data if available, otherwise use fallback
  const displayNews = articles.length > 0
    ? articles.map(article => ({
        id: article.id,
        title: article.title,
        date: article.publishedAt,
        imageUrl: article.coverImage.data?.attributes.url || '/images/placeholder.jpg',
        slug: article.slug
      }))
    : fallbackNews;

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
          {displayNews.map((news) => (
            <NewsCard
              key={news.id}
              title={news.title}
              date={news.date}
              imageUrl={news.imageUrl}
              slug={news.slug}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
