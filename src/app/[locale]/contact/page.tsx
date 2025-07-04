import { Locale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import PageLayout from '@/components/PageLayout';
import ContactForm from '@/components/ContactForm';

export default async function ContactPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  // Enable static rendering
  setRequestLocale(locale);

  const t = await getTranslations('ContactPage');

  return (
    <PageLayout title={t('title') || 'Contact Us'}>
      <div className="max-w-3xl mx-auto">
        <section className="mb-8">
          <h1 className="text-2xl text-black font-bold mb-4">{t('getInTouch') || 'Get in Touch'}</h1>
          <p className="mb-6 text-black font-normal">
            {t('contactIntro') ||
              'Have questions or want to learn more? Fill out the form below and our team will get back to you as soon as possible.'}
          </p>

          <ContactForm
            translations={{
              name: t('form.name'),
              namePlaceholder: t('form.namePlaceholder'),
              email: t('form.email'),
              emailPlaceholder: t('form.emailPlaceholder'),
              message: t('form.message'),
              messagePlaceholder: t('form.messagePlaceholder'),
              submit: t('form.submit'),
              // Using string literals for these since they're not recognized by the type system yet
              successMessage: t.raw('form.successMessage'),
              errorMessage: t.raw('form.errorMessage')
            }}
          />
        </section>

        
      </div>
    </PageLayout>
  );
}
