import {notFound} from 'next/navigation';
import {Locale, hasLocale, NextIntlClientProvider} from 'next-intl';
import {getTranslations, setRequestLocale} from 'next-intl/server';
import {ReactNode} from 'react';
import {clsx} from 'clsx';
import {Inter} from 'next/font/google';
import {routing} from '@/i18n/routing';
import Navigation from '@/components/Navigation';
import {RegionProvider} from '@/contexts/RegionContext';
import LoadingIndicator from '@/components/LoadingIndicator';
import './styles.css';
import Footer from '@/components/Footer';

type Props = Readonly<{
  children: ReactNode;
  params: Promise<{locale: string}>;
}>;

const inter = Inter({subsets: ['latin']});

// Next.js will invalidate the cache when a
// request comes in, at most once every 60 seconds.
export const revalidate = 60

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

export async function generateMetadata(props: Omit<Props, 'children'>) {
  const {locale} = await props.params;

  const t = await getTranslations({locale: locale as Locale, namespace: 'LocaleLayout'});

  return {
    title: t('title')
  };
}

export default async function LocaleLayout({children, params}: Props) {
  // Ensure that the incoming `locale` is valid
  const {locale} = await params;
  const validLocale = locale as Locale;
  if (!hasLocale(routing.locales, validLocale)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(validLocale);

  return (
    <html className="h-full" lang={validLocale}>
       <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "B&D Media",
              "alternateName": "B&D Media Global Creative Agency",
              "url": "https://b-d-media.com/en",
              "logo": "https://b-d-media.com/en/logo.png",
              "description": "B&D Media is an independent global creative agency founded in Toronto and developed in Beijing, specializing in strategic consulting, creative storytelling, and digital technology for brand growth.",
              "foundingDate": "2004",
              "foundingLocation": "Toronto, Canada",
              "address": [
                {
                  "@type": "PostalAddress",
                  "addressLocality": "Toronto",
                  "addressCountry": "CA"
                },
                {
                  "@type": "PostalAddress",
                  "addressLocality": "Beijing",
                  "addressCountry": "CN"
                }
              ],
              "areaServed": ["North America", "Asia", "Global"],
              "brand": {
                "@type": "Brand",
                "name": "B&D Media",
                "url": "https://b-d-media.com/en"
              }
            })
          }}
        />
      </head>
      <body className={clsx(inter.className, 'flex h-full flex-col')}>
        <RegionProvider>
          <NextIntlClientProvider>
            <LoadingIndicator />
            <Navigation />
            {children}
          </NextIntlClientProvider>
        </RegionProvider>
        <Footer />
      </body>
    </html>
  );
}
