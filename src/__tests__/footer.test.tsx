import { describe, expect, test } from 'vitest';
import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';
import { Footer } from '@/components/Footer';

describe('Footer', () => {
  test('renders author links with correct href and attributes', () => {
    render(<Footer />);
    const authors = [
      { name: 'Elvira-del', href: 'https://github.com/Elvira-del' },
      { name: 'KostyaKuk', href: 'https://github.com/KostyaKuk' },
      { name: 'oreopk', href: 'https://github.com/oreopk' },
    ];
    authors.forEach(({ name, href }) => {
      const link = screen.getByRole('link', { name });
      expect(link).toHaveAttribute('href', href);
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    });
  });

  test('renders copyright year', () => {
    render(<Footer />);
    expect(screen.getByText('© 2025')).toBeInTheDocument();
  });

  test('renders course link with image and external icon', () => {
    render(<Footer />);
    const courseLink = screen.getByRole('link', { name: /go to course page/i });
    expect(courseLink).toHaveAttribute('href', 'https://rs.school/courses/reactjs');
    expect(courseLink).toHaveAttribute('target', '_blank');
    expect(courseLink).toHaveAttribute('rel', 'noopener noreferrer');
    const logo = screen.getByAltText('RS School logo') as HTMLImageElement;
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('src', '/rss-logo.svg');
    expect(screen.getByText('RS School • React Course')).toBeInTheDocument();
  });
});
