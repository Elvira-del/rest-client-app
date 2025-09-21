import { vi, describe, expect, test } from 'vitest';
import '@testing-library/jest-dom';
import React, { type ComponentProps } from 'react';
import { render, screen } from '@testing-library/react';
import SignInPage from '@/app/[locale]/(auth)/signin/page';

vi.mock('next/navigation', () => {
  const push = vi.fn();
  const replace = vi.fn();
  const back = vi.fn();
  const prefetch = vi.fn();
  const refresh = vi.fn();
  const useRouter = () => ({ push, replace, back, prefetch, refresh });
  const usePathname = () => '/signup';
  const useSearchParams = () => new URLSearchParams();
  return { useRouter, usePathname, useSearchParams };
});

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
  useTranslations: (ns?: string) => {
    const dict: Record<string, Record<string, string>> = {
      Auth: {
        signinTitle: 'Sign In',
        signinSubtitle: 'Enter your credentials to access your account',
        email: 'Email',
        password: 'Password',
        signin: 'Submit',
        noAccount: "Don't have an account?",
        createAccount: 'Sign Up',
        'errors.invalidEmail': 'Invalid email',
        'errors.passWrong':
          'Password must be at least 8 characters with letter digit and spectial character',
        minPassword:
          'Minimum 8 characters with letter, digit and special character',
      },
    };
    return (key: string) => dict[ns!][key];
  },
}));

vi.mock('@/i18n/navigation', () => ({
  Link: (props: ComponentProps<'a'>) => <a {...props} />,
}));

describe('SignInPage', () => {
  test('renders title, subtitle, labels and submit button', () => {
    render(<SignInPage />);
    expect(
      screen.getByRole('heading', { name: /sign in/i })
    ).toBeInTheDocument();
    expect(
      screen.getByText(/enter your credentials to access your account/i)
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /submit/i })
    ).toBeInTheDocument();
  });

  test('renders footer prompt with link to /signup', () => {
    render(<SignInPage />);
    expect(
      screen.getByText(/don't have an account\?/i)
    ).toBeInTheDocument();
    const link = screen.getByRole('link', { name: /sign up/i });
    expect(link).toHaveAttribute('href', '/signup');
  });
});
