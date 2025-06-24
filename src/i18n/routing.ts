import {defineRouting} from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en', 'zh-CN'],
  defaultLocale: 'en',
  pathnames: {
    '/': '/',
    '/about': '/about',
    '/blog': '/blog',
    '/contact': '/contact'
  }
});
