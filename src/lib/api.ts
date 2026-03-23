import { strapi } from './strapi';
import type { Client, NewsArticle, Service, StrapiImage, StrapiResponse, StrapiSystemFields, Team, Work } from '../types/strapi';
import { Locale } from 'next-intl';

/** Strapi 媒体字段可能是扁平 { url } 或 v4 关系格式 { data: { attributes: { url } } } */
type StrapiMediaField = StrapiImage | { data?: { attributes?: { url?: string } }; url?: string } | null | undefined;

export function getStrapiMediaUrl(media: StrapiMediaField): string | undefined {
  if (!media) return undefined;
  const url =
    (media as StrapiImage).url ??
    (media as { data?: { attributes?: { url?: string } } }).data?.attributes?.url;
  if (!url) return undefined;
  if (url.startsWith('http')) return url;
  const base = process.env.NEXT_PUBLIC_CMS_API_URL || 'https://bd-media-cms-3a632067a728.herokuapp.com';
  return `${base.replace(/\/$/, '')}${url.startsWith('/') ? url : `/${url}`}`;
}

// Define the structure of Strapi data items
interface StrapiDataItem<T> {
  id: number;
  attributes: T & StrapiSystemFields;
}

// Define the structure of Strapi response
interface StrapiApiResponse<T> {
  data: StrapiDataItem<T>[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    } & StrapiSystemFields;
  } & StrapiSystemFields;
}

/**
 * Fetch clients from Strapi CMS
 */
export async function getClients(locale: Locale): Promise<Client[]> {
  try {
    const response = await strapi.find<Client>('clients', {
      populate: ['logo'],
      sort: ['name:asc'],
      locale: locale as any,
    });
    
    // Map the response to our Client type
    return response.data;
  } catch (error) {
    console.error('Error fetching clients:', error);
    return [];
  }
}

/**
 * Fetch news articles from Strapi CMS
 */
export async function getNews(locale: Locale, limit = 3): Promise<NewsArticle[]> {
  try {
    const response = await strapi.find<NewsArticle>('blogs', {
      populate: ['image'],
      sort: ['publishedAt:desc'],
      pagination: {
        page: 1,
        pageSize: limit
      },
      locale: locale as any,
    });
    
    return response.data;
  } catch (error) {
    console.error('Error fetching news:', error);
    return [];
  }
}

/**
 * Fetch teams from Strapi CMS
 */
export async function getTeams(locale: Locale, limit = 30): Promise<Team[]> {
  try {
    const response = await strapi.find<Team>('teams', {
      populate: ['image'],
      pagination: {
        page: 1,
        pageSize: limit
      },
      locale: locale as any,
    });
    
    return response.data;
  } catch (error) {
    console.error('Error fetching teams:', error);
    return [];
  }
}

function workSlug(w: Work): string | null {
  const s = (w as Work & { slug?: string }).slug ?? (w as unknown as { attributes?: { slug?: string } }).attributes?.slug;
  return typeof s === 'string' && s.trim() ? s.trim() : null;
}

function pickVideoFields(from: Work): Pick<Work, 'videoId' | 'bilibiliId' | 'startTime'> {
  return {
    videoId: (from.videoId ?? '').trim(),
    bilibiliId: (from.bilibiliId ?? '').trim(),
    startTime: typeof from.startTime === 'number' ? from.startTime : 0,
  };
}

function mergeWorkVideoFromEn(target: Work, en: Work | undefined): Work {
  if (!en) return target;
  const t = pickVideoFields(target);
  const e = pickVideoFields(en);
  const videoId = t.videoId || e.videoId;
  const bilibiliId = t.bilibiliId || e.bilibiliId;
  const startTime = t.videoId ? target.startTime : e.videoId ? en.startTime : target.startTime;
  return {
    ...target,
    videoId,
    bilibiliId,
    startTime,
  };
}

/**
 * Fetch works from Strapi CMS
 * 法语：与英文共用 YouTube / B 站字段——若法语条目未填 videoId，会按 slug（或顺序）合并英文条目上的视频信息。
 */
export async function getWorks(locale: Locale, limit = 30): Promise<Work[]> {
  const pagination = { page: 1, pageSize: limit };
  const base = { populate: ['thumbnail'] as const, pagination };

  try {
    if (locale !== 'fr') {
      const response = await strapi.find<Work>('works', {
        ...base,
        locale: locale as any,
      });
      return response.data;
    }

    const [frRes, enRes] = await Promise.all([
      strapi.find<Work>('works', { ...base, locale: 'fr' as any }),
      strapi.find<Work>('works', { ...base, locale: 'en' as any }),
    ]);

    let frList = frRes.data ?? [];
    const enList = enRes.data ?? [];

    if (frList.length === 0 && enList.length > 0) {
      frList = enList;
    }

    const enBySlug = new Map<string, Work>();
    enList.forEach((w) => {
      const slug = workSlug(w);
      if (slug) enBySlug.set(slug, w);
    });

    return frList.map((w, index) => {
      const slug = workSlug(w);
      const en =
        (slug && enBySlug.get(slug)) ?? enList[index] ?? undefined;
      return mergeWorkVideoFromEn(w, en);
    });
  } catch (error) {
    console.error('Error fetching works:', error);
    return [];
  }
}
