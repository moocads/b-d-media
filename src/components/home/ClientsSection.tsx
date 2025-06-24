import { useTranslations } from 'next-intl';
import Image from 'next/image';
import type { Client } from '@/types/strapi';

interface ClientsSectionProps {
  clients?: Client[];
}

export default function ClientsSection({ clients = [] }: ClientsSectionProps) {
  const t = useTranslations('HomePage.clients');

  return (
    <section className="bg-gray-900 py-16 text-white">
      <div className="container mx-auto px-4">
        <div className="mb-12">
          <h2 className="mb-2 text-3xl font-bold uppercase">
            {t('title')}
          </h2>
          <div className="h-1 w-20 bg-yellow-400"></div>
          <p className="mt-4 max-w-2xl text-gray-300">
            {t('description')}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-5">
          {clients.length > 0 ? (
            clients.map((client) => (
              <div
                key={client.id}
                className="flex items-center justify-center rounded-lg bg-white p-4"
              >
                <Image
                  src={client.logo.data.attributes.url}
                  alt={client.name}
                  width={120}
                  height={80}
                  className="h-auto max-h-16 w-auto object-contain"
                />
              </div>
            ))
          ) : (
            // Fallback placeholders if no clients from API
            Array.from({ length: 10 }).map((_, index) => (
              <div
                key={index}
                className="flex items-center justify-center rounded-lg bg-white p-4"
              >
                <div className="h-12 w-24 animate-pulse bg-gray-200"></div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
