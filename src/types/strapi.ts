export interface StrapiSystemFields {
  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string;
}

export interface StrapiResponse<T> {
  data: T[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface StrapiPagination {
  page: number;
  pageSize: number;
}

export interface StrapiImage {
    id: number;
    name: string;
    alternativeText: string;
    caption?: string | null;
    width: number;
    height: number;
    formats: {
        thumbnail: {
          url: string;
        };
        small: {
          url: string;
        };
        medium: {
          url: string;
        };
        large: {
          url: string;
        };
      };
      url: string;
}

export interface Client {
  id: number;
  name: string;
  logo: StrapiImage;
  website: string;
  createdAt: string;
  updatedAt: string;
}

export interface NewsArticle {
  id: number;
  title: string;
  slug: string;
  summary: string;
  content: string;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
  image: StrapiImage;
}

export interface Service {
  id: number;
  title: string;
  description: string;
  icon: StrapiImage;
  createdAt: string;
  updatedAt: string;
}

export interface Team {
  id: number;
  name: string;
  role: string;
  description: string;
  image: StrapiImage;
  createdAt: string;
  updatedAt: string;
}

export interface Work {
  id: number;
  title: string;
  description: string;
  thumbnail: StrapiImage;
  videoId: string;
  bilibiliId: string;
  startTime: number;
  createdAt: string;
  updatedAt: string;
}
