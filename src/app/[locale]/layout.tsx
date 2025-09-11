import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';

import '../globals.css';

export const metadata: Metadata = {
  title: 'Lightweight Postman analog',
  description: 'Lightweight Postman analog',
};

export default async function RootLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const messages = await getMessages();
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Header />
          <div id="root">{children}</div>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
