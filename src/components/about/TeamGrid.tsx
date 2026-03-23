'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { X } from 'lucide-react';

export type TeamCardData = {
  id: number;
  name: string;
  role: string;
  description: string;
  imageUrl?: string;
};

export default function TeamGrid({ teams }: { teams: TeamCardData[] }) {
  const t = useTranslations('AboutPage.team');
  const [openId, setOpenId] = useState<number | null>(null);
  const selected = teams.find((x) => x.id === openId) ?? null;

  useEffect(() => {
    if (!selected) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpenId(null);
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [selected]);

  return (
    <>
      <div className="grid grid-cols-1 gap-16 md:grid-cols-3">
        {teams.map((team) => (
          <div key={team.id} className="col-span-1">
            <div className="overflow-hidden">
              {team.imageUrl ? (
                <img
                  src={team.imageUrl}
                  alt={team.name}
                  className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                />
              ) : (
                <div className="aspect-[4/5] w-full bg-gray-200" />
              )}
            </div>
            <h3 className="fade-in-left mt-4 text-2xl font-semibold leading-tight tracking-tight text-black md:text-5xl">
              {team.name}
            </h3>
            <p className="mb-2 font-light text-black">{team.role}</p>
            <p className="mb-4 line-clamp-2 whitespace-pre-line font-light text-black">
              {team.description}
            </p>
            <button
              type="button"
              onClick={() => setOpenId(team.id)}
              className="rounded-full bg-black px-4 py-2 text-sm text-white transition-opacity hover:opacity-90"
            >
              {t('readMore')}
            </button>
          </div>
        ))}
      </div>

      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/60"
            aria-hidden
            onClick={() => setOpenId(null)}
          />
          <div
            className="relative z-10 max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-lg bg-white shadow-xl"
            role="dialog"
            aria-modal="true"
            aria-labelledby={`team-modal-title-${selected.id}`}
          >
            <button
              type="button"
              onClick={() => setOpenId(null)}
              className="absolute right-4 top-4 z-20 rounded-full p-2 text-black hover:bg-gray-100"
              aria-label="Close"
            >
              <X size={22} />
            </button>

            <div className="grid grid-cols-1 gap-6 p-6 pt-14 md:grid-cols-2 md:pt-6">
              <div className="order-1 w-full overflow-hidden rounded-lg md:order-1">
                {selected.imageUrl ? (
                  <img
                    src={selected.imageUrl}
                    alt=""
                    className="max-h-[45vh] w-full object-cover md:max-h-[min(70vh,520px)] md:min-h-[280px] md:aspect-[3/4]"
                  />
                ) : (
                  <div className="aspect-[3/4] w-full bg-gray-200" />
                )}
              </div>
              <div className="order-2 flex flex-col gap-3 md:order-2 md:justify-center">
                <h2
                  id={`team-modal-title-${selected.id}`}
                  className="text-2xl font-semibold text-black md:text-4xl"
                >
                  {selected.name}
                </h2>
                <p className="text-lg font-medium text-gray-800">{selected.role}</p>
                <p className="whitespace-pre-line font-light leading-relaxed text-black">
                  {selected.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
