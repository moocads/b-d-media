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
    <>
      <PageLayout title={t('title') || 'About Us'}>
        <h4 className="text-xl text-black font-bold mt-[20px]">{t('subtitle') || 'About Us'}</h4>
        <div className="max-w-3xl mx-auto mt-[100px]">
          <div className="mb-8">
            <p className="mb-4 font-light text-black">
              {t('ourStory.description') || 
              'Founded in [YEAR], we have been dedicated to [MISSION]. Our journey began with a simple idea: [IDEA], and has since evolved into [CURRENT STATE].'}
            </p>
          </div>
          
          <div className="mb-8">
            <h2 className="text-2xl text-black font-bold mb-4">{t('mission.title') || 'Our Mission'}</h2>
            <p className="mb-4 font-light text-black">
              {t('mission.description') || 
              'In the era of information overload, mere exposure is no longer enough. We believe that content that resonates with consumers on an emotional level is the key to lasting brand impact. Therefore, we focus not only on the reach of our messages but also on their depth—ensuring that every piece of information hits its target audience with measurable business value.'}
            </p>
          </div>
        </div>
      </PageLayout>

      {/* Full-width video section outside of PageLayout */}
      <section className="relative bg-black py-[30px] px-[30px]">
        {/* Video Background */}
        <video 
          className="absolute inset-0 w-full h-full object-cover z-0 opacity-50"
          autoPlay 
          muted 
          loop 
          playsInline
        >
          <source src="/videos/about-video-bg.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        {/* Content overlay */}
        <div className="relative z-10 container mx-auto">
          <br />
        
          <h2 className="text-2xl text-white font-bold mb-4 text-center">{t('advantage.title') || 'Our Advantage'}</h2>
    
          <br />
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <h2 className="text-xl text-white font-bold mb-4">{t('advantage.advantage1_title') || 'Our Advantage'}</h2>
              <p className="mb-4 font-light text-white">
                {t('advantage.advantage1_description') || 'Based on the North American marketing methodology, combined with the characteristics of the Chinese market, providing customized communication strategies.'}
              </p>
            </div>
            <div className="text-center">
              <h2 className="text-xl text-white font-bold mb-4">{t('advantage.advantage2_title') || 'Our Advantage'}</h2>
              <p className="mb-4 font-light text-white">
                {t('advantage.advantage2_description') || 'Based on the North American marketing methodology, combined with the characteristics of the Chinese market, providing customized communication strategies.'}
              </p>
            </div>
            <div className="text-center">
              <h2 className="text-xl text-white font-bold mb-4">{t('advantage.advantage3_title') || 'Our Advantage'}</h2>
              <p className="mb-4 font-light text-white">
                {t('advantage.advantage3_description') || 'Based on the North American marketing methodology, combined with the characteristics of the Chinese market, providing customized communication strategies.'}
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
