import { vi, describe, expect, test, beforeEach } from 'vitest';
import '@testing-library/jest-dom';
import React, { type ComponentProps } from 'react';
import { render, screen } from '@testing-library/react';
import { Header } from '@/components/Header';

const replaceMock = vi.fn();
vi.mock('@/lib/firebase/firebase', () => {
  const auth = {
    currentUser: null,
    onAuthStateChanged: vi.fn((cb) => {
      cb(null);
      return () => {};
    }),
    signOut: vi.fn(),
  };
  const db = {};
  return { auth, db };
});

vi.mock('next-intl', () => ({
  useLocale: () => 'en',
  useTranslations: (ns?: string) => {
    const dict: Record<string, Record<string, string>> = {
      SignButton: {
        signin: 'Sign In',
        signup: 'Sign Up',
      },
    };
    return (key: string) => dict[ns!][key];
  },
}));

vi.mock('@/i18n/navigation', () => {
  type LinkProps = ComponentProps<'a'>;
  const Link = (props: LinkProps) => <a {...props} />;
  const usePathname = () => '/signin';
  const useRouter = () => ({ replace: replaceMock });
  return { Link, usePathname, useRouter };
});

beforeEach(() => replaceMock.mockClear());

describe('Header', () => {
  test('renders brand and auth links', () => {
    render(<Header />);

    expect(screen.getByRole('link', { name: /rest client/i })).toHaveAttribute(
      'href',
      '/'
    );

    expect(screen.getByRole('link', { name: /sign in/i })).toHaveAttribute(
      'href',
      '/signin'
    );
    expect(screen.getByRole('link', { name: /sign up/i })).toHaveAttribute(
      'href',
      '/signup'
    );
  });
});
