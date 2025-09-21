import { vi, describe, expect, test } from 'vitest';
import '@testing-library/jest-dom';
import React, { type ComponentProps } from 'react';
import { render, screen } from '@testing-library/react';
import { MainAfterAuth } from '@/components/MainAfterAuth';

vi.mock('next-intl', () => ({
  useTranslations: (ns?: string) => (key: string, values?: Record<string, string>) => {
    const dict: Record<string, Record<string, string>> = {
      MainAfterAuth: {
        title: `Welcome back, ${values?.username}!`,
        description: 'Choose an option to get started',
        'rest-client.title': 'REST Client',
        'rest-client.description': 'Make HTTP requests and test APIs',
        'rest-client.button': 'Open REST Client',
        'history.title': 'History',
        'history.description': 'View your request history',
        'history.button': 'View History',
        'variables.title': 'Variables',
        'variables.description': 'Manage your environment variables',
        'variables.button': 'Manage Variables',
      },
    };
    return dict[ns!][key];
  },
}));

vi.mock('@/i18n/navigation', () => {
  type LinkProps = ComponentProps<'a'>;
  const Link = (props: LinkProps) => <a {...props} />;
  return { Link };
});

describe('MainAfterAuth', () => {
  test('renders welcome header with username and description', () => {
    render(<MainAfterAuth />);
    expect(
      screen.getByText(/choose an option to get started/i)
    ).toBeInTheDocument();
  });

  test('renders REST Client card with button linking to /rest-client', () => {
    render(<MainAfterAuth />);;
    const btn = screen.getByRole('button', { name: /open rest client/i });
    const link = btn.closest('a');
    expect(link).toHaveAttribute('href', '/rest-client');
  });

  test('renders History card with button linking to /history', () => {
    render(<MainAfterAuth />);
    const btn = screen.getByRole('button', { name: /view history/i });
    const link = btn.closest('a');
    expect(link).toHaveAttribute('href', '/history');
  });

});
