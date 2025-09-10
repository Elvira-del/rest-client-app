import { Globe, House } from 'lucide-react';
import Link from 'next/link';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@components/ui/button';

export const Header = () => {
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
            <Select>
              <SelectTrigger className="w-20">
                <SelectValue placeholder="EN" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="english">EN</SelectItem>
                <SelectItem value="german">DE</SelectItem>
                <SelectItem value="russian">RU</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" type="button">
              Sign In
            </Button>
            <Button type="button">Sign Up</Button>
          </div>
        </div>
      </div>
    </header>
  );
};
