'use client';

import { Link, usePathname, useRouter } from '@/i18n/navigation';
import { useLocale } from 'next-intl';
import { Globe, House } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { SignButton } from './SignButton';
import { ErrorActiveButton } from '@/components/ErrorActiveButton';
import TestToast from '@/components/TestToast';
import { useTransition } from 'react';
import { useParams } from 'next/navigation';

type StaticPathname =
  | '/'
  | '/signin'
  | '/signup'
  | '/history'
  | '/variables'
  | '/rest-client';

export const Header = () => {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const locale = useLocale();
  const [isPending, startTransition] = useTransition();

  const handleSwitchLang = (value: string) => {
    startTransition(() => {
      const p = params as { method?: string; url?: string | string[] };
      if (pathname.startsWith('/rest-client') && p?.method) {
        const urlArr = p.url
          ? Array.isArray(p.url)
            ? p.url
            : [p.url]
          : undefined;
        router.replace(
          {
            pathname: '/rest-client/[method]/[[...url]]',
            params: { method: p.method, url: urlArr },
          },
          { locale: value }
        );
        return;
      }
      router.replace(pathname as StaticPathname, { locale: value });
    });
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-all duration-300">
      <div className="container flex h-16 items-center justify-between px-4">
        <Link className="flex items-center gap-4" href="/">
          <div className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <House size={24} />
            <span className="font-semibold">REST Client</span>
          </div>
        </Link>
        <ErrorActiveButton />
        <TestToast /> {/* Тестовая кнопка, потом убрать */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Globe size={16} />
            <Select
              value={locale}
              onValueChange={handleSwitchLang}
              disabled={isPending}
            >
              <SelectTrigger className="w-20" aria-disabled={isPending}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">EN</SelectItem>
                <SelectItem value="de">DE</SelectItem>
                <SelectItem value="ru">RU</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-2">
            <Link href="/signin">
              <SignButton role={'signin'} type={'button'} />
            </Link>
            <Link href="/signup">
              <SignButton role={'signup'} type={'button'} />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};
