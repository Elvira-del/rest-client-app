import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en', 'ru', 'de'],
  defaultLocale: 'en',
  localeDetection: false,
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
    '/rest-client': {
      en: '/rest-client',
      ru: '/rest-client',
      de: '/rest-client',
    },
    '/rest-client/[method]': {
      en: '/rest-client/[method]',
      ru: '/rest-client/[method]',
      de: '/rest-client/[method]',
    },
    '/rest-client/[method]/[url]': {
      en: '/rest-client/[method]/[url]',
      ru: '/rest-client/[method]/[url]',
      de: '/rest-client/[method]/[url]',
    },
    '/rest-client/[method]/[[...url]]': {
      en: '/rest-client/[method]/[[...url]]',
      ru: '/rest-client/[method]/[[...url]]',
      de: '/rest-client/[method]/[[...url]]',
    },
    '/history': {
      en: '/history',
      ru: '/history',
      de: '/history',
    },
    '/variables': {
      en: '/variables',
      ru: '/variables',
      de: '/variables',
    },
  },
});
