import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import messages from '../messages/en.json';

import HomePage from './[locale]/page';

describe('HomePage', () => {
  it('should render with the title visible', () => {
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <HomePage />
      </NextIntlClientProvider>
    );
    expect(
      screen.getByRole('heading', { name: /main page/i })
    ).toBeInTheDocument();
  });
});
