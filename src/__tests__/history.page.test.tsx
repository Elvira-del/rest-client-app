import { render, screen } from '@testing-library/react';
import HistoryPage from '@/app/[locale]/(private)/history/page';
import { vi } from 'vitest';
vi.mock('next-intl', () => ({
  useTranslations: (ns?: string) => {
    const dict: Record<string, Record<string, string>> = {
      HistoryPage: {
        title: 'History',
        descriptionCount: ' items in history',
        descriptionEmpty: 'No history yet',
        clearHistory: 'Clear history',
        noRequests: 'There are no requests yet.',
        goToClient: 'Open REST Client',
      },
    };
    return (key: string) => dict[ns!][key];
  },
}));

describe('HistoryPage', () => {
  test('renders title and description with items count', () => {
    render(<HistoryPage />);
    expect(screen.getByText('3 items in history')).toBeInTheDocument();
  });

  test('renders clear history button', () => {
    render(<HistoryPage />);
    expect(
      screen.getByRole('button', { name: /clear history/i })
    ).toBeInTheDocument();
  });

  test('renders list of three history items', () => {
    render(<HistoryPage />);
    expect(
      screen.getByText('https://swapi.dev/api/people/1/')
    ).toBeInTheDocument();
    expect(
      screen.getByText('https://swapi.dev/api/people/2/')
    ).toBeInTheDocument();
    expect(
      screen.getByText('https://swapi.dev/api/people/3/')
    ).toBeInTheDocument();
  });

  test('renders navigation button with link to /rest-client', () => {
    render(<HistoryPage />);
    const goBtn = screen.getByRole('button', { name: /open rest client/i });
    const link = goBtn.closest('a');
    expect(link).toHaveAttribute('href', '/rest-client');
  });
});
