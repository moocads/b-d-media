import {Locale, useTranslations} from 'next-intl';
import {setRequestLocale} from 'next-intl/server';
import {use} from 'react';
import PageLayout from '@/components/PageLayout';

type Props = {
  params: Promise<{locale: Locale}>;
};

export default function AboutPage({params}: Props) {
  const {locale} = use(params);

  // Enable static rendering
  setRequestLocale(locale);

  const t = useTranslations('AboutPage');

  return (
    <PageLayout title={t('title') || 'About Us'}>
      <div className="max-w-3xl mx-auto">
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">{t('ourStory.title') || 'Our Story'}</h2>
          <p className="mb-4">
            {t('ourStory.description') || 
            'Founded in [YEAR], we have been dedicated to [MISSION]. Our journey began with a simple idea: [IDEA], and has since evolved into [CURRENT STATE].'}
          </p>
        </section>
        
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">{t('mission.title') || 'Our Mission'}</h2>
          <p className="mb-4">
            {t('mission.description') || 
            'We strive to [MISSION STATEMENT]. Our team is committed to delivering excellence in everything we do.'}
          </p>
        </section>
      </div>
    </PageLayout>
  );
}
