import { vi, describe, expect, test } from 'vitest';
import '@testing-library/jest-dom';
import React, { type ComponentProps } from 'react';
import { render, screen } from '@testing-library/react';
import SignUpPage from '@/app/[locale]/(auth)/signup/page';

vi.mock('next-intl', () => ({
  useTranslations: (ns?: string) => {
    const dict: Record<string, Record<string, string>> = {
      Auth: {
        signUpTitle: 'Sign Up',
        signUpSubtitle: 'Create a new account to get started',
        email: 'Email',
        password: 'Password',
        signin: 'Submit',
        haveAccount: 'Do you already have an account?',
        signinAccount: 'Sign In',
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

vi.mock('@hookform/resolvers/zod', () => ({
  zodResolver: () => () => ({ values: {}, errors: {} }),
}));


describe('SignUpPage', () => {
  test('renders title, subtitle, labels and submit button', () => {
    render(<SignUpPage />);
    expect(screen.getByRole('heading', { name: /sign up/i })).toBeInTheDocument();
    expect(
      screen.getByText(/create a new account to get started/i)
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
  });

  test('renders footer prompt with link to /signin', () => {
    render(<SignUpPage />);
    expect(
      screen.getByText(/do you already have an account\?/i)
    ).toBeInTheDocument();
    const link = screen.getByRole('link', { name: /sign in/i });
    expect(link).toHaveAttribute('href', '/signin');
  });
});
