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

export const Header = () => {
  const locale = useLocale();

  const pathname = usePathname();
  const router = useRouter();

  const handleSwitchLang = (value: string) => {
    router.replace(pathname, { locale: value });
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

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Globe size={16} />
            <Select value={locale} onValueChange={handleSwitchLang}>
              <SelectTrigger className="w-20">
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
            <SignButton role={'signin'} type={'button'} />
            <SignButton role={'signup'} type={'button'} />
          </div>
        </div>
      </div>
    </header>
  );
};
