import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import Page from './page';

describe('Page', () => {
  it('should render with the title visible', () => {
    render(<Page />);
    expect(
      screen.getByRole('heading', { name: /hello, next\.js!/i })
    ).toBeInTheDocument();
  });
});
