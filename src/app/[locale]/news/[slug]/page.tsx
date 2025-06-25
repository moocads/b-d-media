import { Locale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import PageLayout from '@/components/PageLayout';
import { strapi } from '@/lib/strapi';

// Define the type for a single post from Strapi
interface Post {
  id: number;
  title: string;
  summary: string;
  content: string;
  slug: string;
  createdAt: string;
  image?: {
    url: string;
  };
}

// Function to fetch a single post from Strapi by slug
async function getPostBySlug(slug: string, locale: string): Promise<Post | null> {
  try {
    const response = await strapi.find('blogs', {
      filters: {
        slug: {
          $eq: slug,
        },
      },
      populate: '*',
      locale: locale as any,
    });
    
    if (response.data && response.data.length > 0) {
      return response.data[0] as Post;
    }
    return null;
  } catch (error) {
    console.error('Error fetching post from Strapi:', error);
    return null;
  }
}

interface Props {
  params: {
    locale: Locale;
    slug: string;
  };
}

export default async function NewsDetailPage({ params: { locale, slug } }: Props) {
  // Enable static rendering
  setRequestLocale(locale);

  const t = await getTranslations('NewsDetail');
  const post = await getPostBySlug(slug, locale);

  // If post not found, show 404
  if (!post) {
    notFound();
  }

  // Format the date
  const formattedDate = new Date(post.createdAt).toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <PageLayout title={post.title}>
      <article className="max-w-3xl mx-auto">
        {/* Back button */}
        <Link 
          href={`/${locale}/news`}
          className="inline-flex items-center mb-8 text-blue-600 hover:underline"
        >
          ← {t('backToNews')}
        </Link>

        {/* Post header */}
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
          <p className="text-gray-500">{formattedDate}</p>
        </header>

        {/* Featured image */}
        {post.image?.url && (
          <div className="mb-8">
            <img 
              src={post.image.url}
              alt={post.title}
              className="w-full h-auto rounded-lg"
            />
          </div>
        )}

        {/* Post summary as lead-in */}
        <div className="text-xl font-medium mb-6 text-gray-700">
          {post.summary}
        </div>

        {/* Post content */}
        <div 
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>
    </PageLayout>
  );
}
