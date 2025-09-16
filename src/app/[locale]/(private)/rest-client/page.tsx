import { redirect } from '@/i18n/navigation';

export default function RestClientRootPage() {
  redirect({
    href: {
      pathname: '/rest-client/[method]',
      params: { method: 'GET' },
    },
    locale: 'en',
  });
}
