import {defineRouting} from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en', 'zh-CN', 'zh-Hant', 'fr'],
  defaultLocale: 'en',
  pathnames: {
    '/': '/',
    '/about': '/about',
    '/news': '/news',
    '/works': '/works',
    '/contact': '/contact'
  }
});
