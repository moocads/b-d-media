import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import type { Service } from '@/types/strapi';

interface ServiceCardProps {
  title: string;
  imageUrl: string;
  alt: string;
}

function ServiceCard({ title, imageUrl, alt }: ServiceCardProps) {
  return (
    <div className="overflow-hidden rounded-tr-[30px] bg-white">
      <div className="relative h-64 w-full">
        <Image
          src={imageUrl}
          alt={alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="p-4">
        <h3 className="text-xl font-semibold">{title}</h3>
      </div>
    </div>
  );
}

interface ServicesSectionProps {
  services?: Service[];
}

export default function ServicesSection({ services = [] }: ServicesSectionProps) {
  const t = useTranslations('HomePage.services');
  
  // Fallback services if API fails
  const fallbackServices = [
    {
      id: 1,
      title: 'Brand Strategy',
      imageUrl: '/images/services/brand-strategy.jpg',
      alt: 'Brand Strategy Service'
    },
    {
      id: 2,
      title: 'Digital Marketing',
      imageUrl: '/images/services/digital-marketing.jpg',
      alt: 'Digital Marketing Service'
    },
    {
      id: 3,
      title: 'Production',
      imageUrl: '/images/services/production.jpg',
      alt: 'Production Service'
    }
  ];

  // Use API data if available, otherwise use fallback
  const displayServices = services.length > 0 
    ? services.map(service => ({
        id: service.id,
        title: service.title,
        imageUrl: service.icon?.url || '/images/placeholder.jpg',
        alt: service.title
      }))
    : fallbackServices;

  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div className="col-span-2">
              <p className="text-gray-700 text-lg">
            what we provide
          </p>
          <h2 className="mb-2 text-3xl md:text-6xl font-black uppercase text-black">
            {t('title')}
          </h2>
          </div>
          <div className="col-span-1">
            <p className="text-gray-700 text-md">
            When establishing seamless connections between brands and consumers, we always support it with effective communication.
          </p>
          <br />
          <Link href="/contact" className="bg-black rounded-full px-4 py-2 text-white text-sm mt-2">
            Learn More
          </Link>
          </div>
        </div>
        
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {displayServices.map((service) => (
            <ServiceCard
              key={service.id}
              title={service.title}
              imageUrl={service.imageUrl}
              alt={service.alt}
            />
          ))}
        </div>
        
        <div className="mt-8 text-center">
          <Link
            href="/services"
            className="inline-block rounded bg-black px-6 py-2 text-sm text-white"
          >
            {t('viewMore')}
          </Link>
        </div>
      </div>
    </section>
  );
}
