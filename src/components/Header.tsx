'use client';

import { Link, usePathname, useRouter } from '@/i18n/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { Globe, House, LogOut, User } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { SignButton } from './SignButton';
import { ErrorActiveButton } from '@/components/ErrorActiveButton';
import { auth } from '@/lib/firebase/firebase';
import { signOut } from 'firebase/auth';
import { useAuth } from '@/lib/hooks/useAith';
import { useTransition } from 'react';
import { useParams } from 'next/navigation';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

type StaticPathname =
  | '/'
  | '/signin'
  | '/signup'
  | '/history'
  | '/variables'
  | '/rest-client';

export const Header = () => {
  const t = useTranslations('Header');

  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const locale = useLocale();
  const [isPending, startTransition] = useTransition();
  const { user, loading } = useAuth();

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

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      router.push('/signin');
    } catch (error) {
      console.error('Sign-out error:', error);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-all duration-300">
      <div className="container flex h-16 items-center justify-between px-4 max-w-6xl mx-auto">
        <Link className="flex items-center gap-4" href="/">
          <div className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <House size={24} />
            <span className="font-semibold">REST Client</span>
          </div>
        </Link>
        <ErrorActiveButton />
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
            {!loading && !user && (
              <>
                <Link href="/signin">
                  <SignButton role={'signin'} type={'button'} />
                </Link>
                <Link href="/signup">
                  <SignButton role={'signup'} type={'button'} />
                </Link>
              </>
            )}
            {!loading && user && (
              // <SignButton
              //   role={'signout'}
              //   type={'button'}
              //   onClick={handleSignOut}
              // />
              <div className="flex items-center gap-2">
                <Link href="/">
                  <SignButton role={'mainpage'} type={'button'} />
                </Link>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <User className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem disabled>{user.email}</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleSignOut}>
                      <LogOut className="h-4 w-4 mr-2" />
                      {t('signout')}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
