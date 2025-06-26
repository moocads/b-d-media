import { useTranslations } from 'next-intl';
import Image from 'next/image';
import type { Client } from '@/types/strapi';


interface ClientsSectionProps {
  clients?: Client[];
}

export default function ClientsSection({ clients = [] }: ClientsSectionProps) {
  const t = useTranslations('HomePage.clients');

  return (
    <section className="py-[150px] text-white bg-[url('/images/client-section-bg.jpg')] bg-cover bg-center">
      <div className="container mx-auto px-4">
            <div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div className="col-span-1">
              <p className="text-white font-light text-lg">
            we served
          </p>
          <h2 className="mb-2 text-3xl md:text-6xl font-black uppercase text-white">
            {t('title')}
          </h2>
          </div>
          <div className="col-span-">
            <p className="text-white text-md font-light pt-[20px]">
            When establishing seamless connections between brands and consumers, we always support it with effective communication.
          </p>
          </div>
        </div>
<div className='max-w-4xl'>
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-4">
          {/* {clients.map((client) => (
              <div
                key={client.id}
                className="flex items-center justify-center rounded-lg bg-white p-4"
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
          } */}
      
          <div className="flex items-center justify-center rounded-lg bg-white/10 px-4 py-2 border-2 border-transparent hover:bg-white/20 hover:border-white transition-all duration-300 ">
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
            </div>
            </div>
  </div>
      </div>
    </section>
  );
}
