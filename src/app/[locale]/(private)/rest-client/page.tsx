import { redirect } from '@/i18n/navigation';
import { getLocale } from 'next-intl/server';

export default async function RestClientRootPage() {
  const locale = await getLocale();

  redirect({
    href: {
      pathname: '/rest-client/[method]/[[...url]]',
      params: { method: 'GET', url: [] },
    },
    locale,
  });
}
