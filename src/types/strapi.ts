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
  data: {
    id: number;
    attributes: {
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
    } & StrapiSystemFields;
  };
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
  coverImage: StrapiImage;
}

export interface Service {
  id: number;
  title: string;
  description: string;
  icon: StrapiImage;
  createdAt: string;
  updatedAt: string;
}
