import{ Locale } from 'next-intl';
import PageLayout from "@/components/PageLayout";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Link from 'next/link';
import {strapi} from '@/lib/strapi';

export default async function WorksPage({params}: {params: Promise<{locale: Locale}>}) {
  const {locale} = await params;
  setRequestLocale(locale);
  const t = await getTranslations('WorksPage');
  

  return (
    <PageLayout title="Works">
<div id="worksPage" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-5 ">
          <div className="col-span-3 content-center">
         <h1 className="text-3xl font-semibold leading-tight tracking-tight text-black md:text-5xl fade-in-left">
     {t('title')}
         </h1>
 
          <h4 className="text-xl text-black font-normal mt-[20px] fade-in-left-delayed">{t('subtitle')}</h4>
                    <br />
                    <br />
          <p className="text-black font-light fade-in-up">{t('description_01')}</p>
          <br />
          <p className="text-black font-light fade-in-up">{t('description_02')}</p>
          </div>

          <div className="relative bg-white col-span-4 p-0 h-full rounded-lg overflow-hidden flex justify-center">
            <div className="w-4/5 h-full relative rounded-lg overflow-hidden">
            {/* Video Background */}
            <video 
              className="absolute inset-0 w-full h-full object-cover z-0"
              autoPlay 
              muted 
              loop 
              playsInline
            >
              <source src="/videos/hotel-demo.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            
            {/* Content overlay */}
            <div className="relative z-10 h-full">
              <img src="/images/about-mask.svg" alt="works" className="w-full h-full object-contain" />
            </div>
            </div>
        </div>
        </div>
    </PageLayout>
  );
}