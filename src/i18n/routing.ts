import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en', 'ru', 'de'],
  defaultLocale: 'en',
  pathnames: {
    '/': '/',
    '/signin': {
      en: '/signin',
      ru: '/signin',
      de: '/signin',
    },
    '/signup': {
      en: '/signup',
      ru: '/signup',
      de: '/signup',
    },
  },
});
