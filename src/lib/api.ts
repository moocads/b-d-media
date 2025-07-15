import { strapi } from './strapi';
import type { Client, NewsArticle, Service, StrapiResponse, StrapiSystemFields, Team, Work } from '../types/strapi';
import { Locale } from 'next-intl';

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

/**
 * Fetch works from Strapi CMS
 */
export async function getWorks(locale: Locale, limit = 30): Promise<Work[]> {
  try {
    const response = await strapi.find<Work>('works', {
      populate: ['thumbnail'],
      pagination: {
        page: 1,
        pageSize: limit
      },
      locale: locale as any,
    });
    
    return response.data;
  } catch (error) {
    console.error('Error fetching works:', error);
    return [];
  }
}
