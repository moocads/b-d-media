import { useTranslations } from 'next-intl';
import Image from 'next/image';
import type { Client } from '@/types/strapi';


interface ClientsSectionProps {
  clients?: Client[];
}

export default function ClientsSection({ clients = [] }: ClientsSectionProps) {
  const t = useTranslations('HomePage.clients');

  return (
    <section className="py-[150px] text-white bg-[url('/images/client-section-bg.jpg')] bg-cover bg-no-repeat bg-fixed bg-center">
      <div className="container mx-auto px-4">
          <div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
           <div className="col-span-2">
              <p className="text-white text-lg">
            {t('subtitle')}
          </p>
          <h2 className="mb-4 mt-2 text-3xl md:text-6xl font-black uppercase text-white">
            {t('title')}
          </h2>
          </div>
          <div className="col-span-1">
            <p className="text-white text-md font-light pt-[20px]">
            {t('description')}
          </p>
          </div>
        </div>
<div className='max-w-full'>
        <div className="grid grid-cols-2 gap-8 md:grid-cols-6 lg:grid-cols-6">
   
          {clients.map((client) => (
              <div
                key={client.id}
                className="flex items-center justify-center rounded-lg bg-white/10 px-0 py-0 border-2 border-transparent hover:bg-white/20 hover:border-white transition-all duration-300"
              >
                <Image
                  src={client.logo?.url}
                  alt={client.name}
                  width={120}
                  height={80}
                  className="h-auto max-h-16 w-auto object-contain"
                />
              </div>
              
            ))
          }
      
          {/* <div className="flex items-center justify-center rounded-lg bg-white/10 px-4 py-2 border-2 border-transparent hover:bg-white/20 hover:border-white transition-all duration-300 ">
            <img src="/images/clients/boloni.png" className="h-auto max-h-16 w-auto object-contain" />
            </div>
            <div className="flex items-center justify-center rounded-lg bg-white/10 px-4 py-2 border-2 border-transparent hover:bg-white/20 hover:border-white transition-all duration-300 ">
            <img src="/images/clients/crrc.png" className="h-auto max-h-16 w-auto object-contain" />
            </div>
            <div className="flex items-center justify-center rounded-lg bg-white/10 px-4 py-2 border-2 border-transparent hover:bg-white/20 hover:border-white transition-all duration-300 ">
            <img src="/images/clients/h-logo.png" className="h-auto max-h-16 w-auto object-contain" />
            </div>
             <div className="flex items-center justify-center rounded-lg bg-white/10 px-4 py-2 border-2 border-transparent hover:bg-white/20 hover:border-white transition-all duration-300 ">
            <img src="/images/clients/microsoft.png" className="h-auto max-h-16 w-auto object-contain" />
            </div>
            <div className="flex items-center justify-center rounded-lg bg-white/10 px-4 py-2 border-2 border-transparent hover:bg-white/20 hover:border-white transition-all duration-300 ">
            <img src="/images/clients/ouhaojituan.png" className="h-auto max-h-16 w-auto object-contain" />
            </div>
            <div className="flex items-center justify-center rounded-lg bg-white/10 px-4 py-2 border-2 border-transparent hover:bg-white/20 hover:border-white transition-all duration-300 ">
            <img src="/images/clients/qingshangjituan.png" className="h-auto max-h-16 w-auto object-contain" />
            </div>
            <div className="flex items-center justify-center rounded-lg bg-white/10 px-4 py-2 border-2 border-transparent hover:bg-white/20 hover:border-white transition-all duration-300 ">
            <img src="/images/clients/yiqi.png" className="h-auto max-h-16 w-auto object-contain" />
            </div>
            <div className="flex items-center justify-center rounded-lg bg-white/10 px-4 py-2 border-2 border-transparent hover:bg-white/20 hover:border-white transition-all duration-300 ">
            <img src="/images/clients/hr-logo.png" className="h-auto max-h-16 w-auto object-contain" />
            </div>
            <div className="flex items-center justify-center rounded-lg bg-white/10 px-4 py-2 border-2 border-transparent hover:bg-white/20 hover:border-white transition-all duration-300 ">
            <img src="/images/clients/hr-logo.png" className="h-auto max-h-16 w-auto object-contain" />
            </div> */}
            </div>
  </div>
      </div>
    </section>
  );
}
