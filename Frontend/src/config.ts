import {Pathnames, LocalePrefix} from 'next-intl/routing';

export const defaultLocale = 'vi' as const;
export const locales = ['en', 'vi'] as const;

export const pathnames: Pathnames<typeof locales> = {
  '/': '/',
  '/pathnames': {
    en: '/pathnames',
    vi: '/pfadnamen'
  }
};

export const localePrefix: LocalePrefix<typeof locales> = 'always';

export const port = process.env.PORT || 3000;
export const host = process.env.VERCEL_URL
  ? `http://localhost:3030`
  : `http://localhost:3030`;
