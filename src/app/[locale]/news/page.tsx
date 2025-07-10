import { Locale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import Link from 'next/link';
import PageLayout from '@/components/PageLayout';
import { strapi } from '@/lib/strapi';

// Define the type for a single post from Strapi
interface Post {
  id: number;
  title: string;
  summary: string;
  slug: string;
  createdAt: string;
  image?: {
    url: string;
  };
}

// Function to fetch data from Strapi
async function getPosts(locale: string): Promise<Post[]> {
  try {
    // Assuming the collection API ID is 'blogs'
    const response = await strapi.find('blogs', {
      populate: '*',
      locale: locale as any,
      sort: 'createdAt:desc',
    });
    return response.data as Post[];
  } catch (error) {
    console.error('Error fetching posts from Strapi:', error);
    return []; // Return an empty array on error
  }
}

export default async function NewsPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  // Enable static rendering
  setRequestLocale(locale);

  const t = await getTranslations('NewsPage');
  const posts = await getPosts(locale);

  return (
    <PageLayout title={t('title')}>
 
         <h1 className="text-3xl font-semibold leading-tight tracking-tight text-black md:text-5xl fade-in-left">
            {t('title')}
         </h1>
 
          <h4 className="text-xl text-black font-normal mt-[20px] fade-in-left-delayed">{t('subtitle')}</h4>
                    <br />
                    <br />

        {posts.length === 0 ? (
          <p>No posts found.</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => {
              const imageUrl = post.image?.url;
              return (
                <div key={post.id} className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  {imageUrl ? (
                    <img src={imageUrl} alt={post.title} className="h-48 w-full object-cover" />
                  ) : (
                    <div className="h-48 bg-gray-200"></div>
                  )}
                  <div className="p-4">
                    <p className="text-sm text-gray-500 mb-2">
                      {new Date(post.createdAt).toLocaleDateString(locale, {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                    <h2 className="text-xl font-medium mb-2 text-black">{post.title}</h2>
                    <p className="text-gray-600 mb-4">{post.summary}</p>
                    <Link
                      href={`/${locale}/news/${post.slug}`}
                      className="font-medium hover:underline rounded-full px-4 py-2 bg-black-100 text-white"
                    >
                      {t('readMore')} →
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}

    </PageLayout>
  );
}
