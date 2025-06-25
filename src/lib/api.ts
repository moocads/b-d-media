import { strapi } from './strapi';
import type { Client, NewsArticle, Service, StrapiResponse, StrapiSystemFields } from '../types/strapi';

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
export async function getClients(): Promise<Client[]> {
  try {
    const response = await strapi.find<Client>('clients', {
      populate: ['logo'],
      sort: ['name:asc']
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
export async function getNews(limit = 3): Promise<NewsArticle[]> {
  try {
    const response = await strapi.find<NewsArticle>('blogs', {
      populate: ['image'],
      sort: ['publishedAt:desc'],
      pagination: {
        page: 1,
        pageSize: limit
      }
    });
    
    return response.data;
  } catch (error) {
    console.error('Error fetching news:', error);
    return [];
  }
}

/**
 * Fetch services from Strapi CMS
 */
export async function getServices(): Promise<Service[]> {
  try {
    const response = await strapi.find<Service>('services', {
      populate: ['icon'],
      sort: ['id:asc']
    });
    
    return response.data;
  } catch (error) {
    console.error('Error fetching services:', error);
    return [];
  }
}