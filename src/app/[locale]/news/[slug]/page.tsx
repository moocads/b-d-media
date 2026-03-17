import { Locale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import PageLayout from '@/components/PageLayout';
import { strapi } from '@/lib/strapi';
import type { NewsArticle } from '@/types/strapi';

// Function to fetch a single post from Strapi by slug
async function getPostBySlug(slug: string, locale: Locale): Promise<NewsArticle | null> {
  try {
    const response = await strapi.find<NewsArticle>('blogs', {
      filters: {
        slug: {
          $eq: slug,
        },
      },
      populate: '*',
      locale: locale as any,
    });

    if (response.data && response.data.length > 0) {
      return response.data[0];
    }
    return null;
  } catch (error) {
    console.error('Error fetching post from Strapi:', error);
    return null;
  }
}

export default async function NewsDetailPage({ params }: { params: Promise<{ locale: Locale; slug: string }> }) {
  const { locale, slug } = await params;
  // Enable static rendering
  setRequestLocale(locale);

  const t = await getTranslations('NewsDetail');
  const post = await getPostBySlug(slug, locale);

  // If post not found, show 404
  if (!post) {
    notFound();
  }

  // Strapi 富文本在某些版本中会返回「blocks」数组，需要手动提取文本
  const contentValue: any = (post as any).content;
  const contentText =
    Array.isArray(contentValue)
      ? contentValue
          .map((block: any) =>
            (block.children || [])
              .map((child: any) => child.text ?? '')
              .join('')
          )
          .join('\n\n')
      : (contentValue || '');

  // Format the date：优先使用 release_date，空则不显示
  const releaseDate = (post as any).release_date as string | null | undefined;
  const dateSource = releaseDate || post.createdAt;
  const formattedDate = dateSource
    ? new Date(dateSource).toLocaleDateString(locale, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : null;

  return (
    <PageLayout title={post.title}>
      <article className="max-w-3xl mx-auto">
        {/* Back button */}
        <Link
          href={`/${locale}/news`}
          className="inline-flex items-center mb-8 bg-black rounded-full px-4 py-2 text-white text-sm mt-2"
        >
          ← {t('backToNews')}
        </Link>

        {/* Post header */}
        <header className="mb-8">
          <h1 className="text-4xl text-black font-bold mb-4">{post.title}</h1>
          {formattedDate && <p className="text-gray-500">{formattedDate}</p>}
        </header>

        {/* Featured image */}
        {post.image && (
          <div className="mb-8">
            <img
              src={post.image?.url}
              alt={post.title}
              className="w-full h-auto rounded-lg"
            />
          </div>
        )}

        {/* Post summary as lead-in */}


        {/* Post content */}
        <div className="prose prose-lg max-w-none">
          {contentText && (
            <div className="text-md font-light mb-6 text-gray-700 whitespace-pre-line">
              {contentText}
            </div>
          )}
        </div>
      </article>
    </PageLayout>
  );
}
