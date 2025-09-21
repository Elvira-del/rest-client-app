import { vi, describe, test, expect } from 'vitest';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import NotFound from '@/app/[locale]/not-found';
import type { ComponentProps } from 'react';

vi.mock('next-intl/server', () => ({
  getTranslations: async (ns?: string) => {
    const dict: Record<string, Record<string, string>> = {
      NotFound: {
        title: '404 - Page not found',
        description: 'The page you’re looking for doesn’t exist.',
        backHome: 'Go home',
      },
    };
    return (key: string) => dict[ns!][key];
  },
}));

vi.mock('@/i18n/navigation', () => ({
  Link: (props: ComponentProps<'a'>) => <a {...props} />,
}));

describe('NotFound page', () => {
  test('renders title and description', async () => {
    const ui = await NotFound();
    render(ui);
    expect(screen.getByText(/404 - page not found/i)).toBeInTheDocument();
    expect(screen.getByText(/the page you’re looking for doesn’t exist\./i)).toBeInTheDocument();
  });

  test('renders link button to home', async () => {
    const ui = await NotFound();
    render(ui);
    const link = screen.getByRole('link', { name: /go home/i });
    expect(link).toHaveAttribute('href', '/');
  });
});
