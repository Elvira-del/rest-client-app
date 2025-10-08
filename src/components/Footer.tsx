import { ExternalLink, Github } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const AUTHORS = [
  { name: 'Elvira-del', href: 'https://github.com/Elvira-del' },
  { name: 'KostyaKuk', href: 'https://github.com/KostyaKuk' },
  { name: 'oreopk', href: 'https://github.com/oreopk' },
];

const COURSE = {
  name: 'RS School • React Course',
  href: 'https://rs.school/courses/reactjs',
  logoSrc: '/rss-logo.svg',
  logoAlt: 'RS School logo',
};

export const Footer = () => {
  return (
    <footer className="border-t bg-background mt-auto">
      <div className="container flex items-center justify-center px-4 max-w-6xl mx-auto">
        <div className="flex items-center gap-6 text-sm text-muted-foreground py-2 md:py-4">
          <nav className="flex flex-col md:flex-row gap-2" aria-label="Authors">
            <ul className="contents">
              {AUTHORS.map((author) => (
                <li key={author.name}>
                  <Link
                    className="flex items-center gap-2 hover:text-foreground transition-colors"
                    href={author.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github size={16} aria-hidden />
                    <span>{author.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <span>•</span>
          <span>© 2025</span>
          <span>•</span>
          <Link
            className="flex items-center gap-2 hover:text-foreground transition-colors"
            href={COURSE.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Go to course page"
          >
            <Image
              src={COURSE.logoSrc}
              alt={COURSE.logoAlt}
              width={20}
              height={20}
            />
            <span>{COURSE.name}</span>
            <ExternalLink size={12} aria-hidden />
          </Link>
        </div>
      </div>
    </footer>
  );
};
