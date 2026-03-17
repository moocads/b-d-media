import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import type { NewsArticle } from '@/types/strapi';

function NewsCard({ news, locale }: { news: NewsArticle; locale: string }) {
  // 优先使用 release_date，空的话不显示日期
  const releaseDate = (news as any).release_date as string | null | undefined;
  const formattedDate = releaseDate
    ? new Date(releaseDate).toLocaleDateString(locale, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    : null;

  return (
    <div className="overflow-hidden rounded-tr-[30px] bg-white">
      <div className="relative h-64  w-full">
        <Image
          src={news.image?.url}
          alt={news.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="p-4">
        <h3 className="mb-2 text-md font-medium">
          <Link href={`/news/${news.slug}`} className="hover:text-gray-400">
            {news.title}
          </Link>
        </h3>
        {formattedDate && (
          <p className="text-sm text-gray-500">{formattedDate}</p>
        )}
      </div>
    </div>
  );
}

export default function NewsSection({ newsArticles = [] }: { newsArticles: NewsArticle[] }) {
  const t = useTranslations('HomePage.news');
  const locale = useLocale();

  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4">
          <div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                   <div className="col-span-2">
              <p className="text-gray-700 text-lg">
            {t('subtitle')}
          </p>
          <h2 className="mb-4 mt-2 text-3xl md:text-6xl font-black uppercase text-black leading-8">
            <div dangerouslySetInnerHTML={{ __html: t('title') }} />
          </h2>
          </div>
          <div className="col-span-1">
            <p className="text-gray-700 text-md">
            {t('description')}
          </p>
          <br />
          <Link href="/news" className="bg-black rounded-full px-4 py-2 text-white text-sm mt-2">
            {t('readMore')}
          </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {newsArticles.map((news) => (
            <NewsCard
              key={news.id}
              news={news}
              locale={locale}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
