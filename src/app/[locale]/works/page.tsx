import{ Locale } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import PageLayout from "@/components/PageLayout";
import VideoThumbnail from "@/components/VideoThumbnail";
import { getWorks } from '@/lib/api';
import { getBilibiliCoverUrl } from '@/lib/bilibili';
import { extractBvid } from '@/lib/bilibili-shared';

export default async function WorksPage({params}: {params: Promise<{locale: Locale}>}) {
  const {locale} = await params;
  setRequestLocale(locale);
  const works = await getWorks(locale);
  
  const t = await getTranslations('WorksPage');
  const messages = await getMessages();
  const workTitleBySlug =
    typeof (messages as { WorksPage?: { workTitleBySlug?: unknown } }).WorksPage?.workTitleBySlug ===
    'object'
      ? ((messages as { WorksPage: { workTitleBySlug: Record<string, string> } }).WorksPage
          .workTitleBySlug ?? {})
      : {};

  const displayTitle = (work: (typeof works)[number]) => {
    const slug = (work as { slug?: string }).slug;
    if (locale === 'fr' && slug && workTitleBySlug[slug]) return workTitleBySlug[slug];
    return work.title;
  };

  const isZh = locale.startsWith('zh');
  const biliCoverCache = new Map<string, string | null>();
  const resolveBiliCover = async (bvid: string) => {
    if (biliCoverCache.has(bvid)) return biliCoverCache.get(bvid) ?? undefined;
    const pic = await getBilibiliCoverUrl(bvid);
    biliCoverCache.set(bvid, pic);
    return pic ?? undefined;
  };

  const worksWithBiliCover = await Promise.all(
    works.map(async (work) => {
      if (!isZh) return { work, bilibiliCoverUrl: undefined as string | undefined };
      const bvid = extractBvid(work.bilibiliId);
      if (!bvid) return { work, bilibiliCoverUrl: undefined };
      const pic = await resolveBiliCover(bvid);
      return { work, bilibiliCoverUrl: pic };
    })
  );
  

  return (
    <PageLayout title={t('title')}>
      <div id="worksPage" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-5 ">
          <div className="col-span-3 content-center">
         <h1 className="text-3xl font-semibold leading-tight tracking-tight text-black md:text-5xl fade-in-left">
            {t('title')}
         </h1>
 
          <h4 className="text-xl text-black font-normal mt-[20px] fade-in-left-delayed">{t('subtitle')}</h4>
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
              Your browser does not support the video tag..
            </video>
            
            {/* Content overlay */}
            <div className="relative z-10 h-full">
              <img src="/images/about-mask.svg" alt="works" className="w-full h-full object-contain" />
            </div>
            </div>
        </div>
        </div>
        <div className="mt-20 border-t border-black-200"></div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-20">
          {worksWithBiliCover.map(({ work, bilibiliCoverUrl }) => (
            <div key={work.id} className="col-span-1">
            <VideoThumbnail
              videoId={work.videoId}
              bilibiliId={work.bilibiliId}
              thumbnailUrl={bilibiliCoverUrl}
              startTime={work.startTime}
              title={displayTitle(work)}
              description={work.description}
              className="w-full h-64"
            />
            <h3 className="text-xl md:text-2xl font-semibold leading-tight tracking-tight text-black fade-in-left mt-4">
              {displayTitle(work)}
            </h3>
          </div>
          ))}
                
        </div>
    </PageLayout>
  );
}