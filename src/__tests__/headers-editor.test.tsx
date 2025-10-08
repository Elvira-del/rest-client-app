import { describe, expect, test, vi } from 'vitest';
import '@testing-library/jest-dom';
import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import { HeadersEditor } from '@/components/HeadersEditor';

vi.mock('next-intl', () => ({
  useTranslations: (ns?: string) => {
    const dict: Record<string, Record<string, string>> = {
      HeadersEditor: {
        label: 'Headers',
        add: 'Add Header',
        keyPlaceholder: 'Key',
        valuePlaceholder: 'Value',
      },
    };
    return (key: string) => dict[ns!][key];
  },
}));

describe('HeadersEditor', () => {
  test('renders initial row and delete is disabled when only one', () => {
    render(<HeadersEditor />);
    const keyInputs = screen.getAllByPlaceholderText('Key');
    const valueInputs = screen.getAllByPlaceholderText('Value');
    expect(keyInputs).toHaveLength(1);
    expect(valueInputs).toHaveLength(1);
    const deleteBtn = screen.getByRole('button', { name: '' });
    expect(deleteBtn).toBeDisabled();
  });

  test('add a header row', async () => {
    const user = userEvent.setup();
    render(<HeadersEditor />);
    const addBtn = screen.getByRole('button', { name: /add header/i });
    await user.click(addBtn);
    const deleteButtons = screen.getAllByRole('button', { name: '' });
    deleteButtons.forEach((b) => expect(b).not.toBeDisabled());
  });

  test('updates key and value inputs via store', async () => {
    const user = userEvent.setup();
    render(<HeadersEditor />);
    const [keyInput] = screen.getAllByPlaceholderText(
      'Key'
    ) as HTMLInputElement[];
    const [valueInput] = screen.getAllByPlaceholderText(
      'Value'
    ) as HTMLInputElement[];
    await user.type(keyInput, 'Content-Type');
    await user.type(valueInput, 'application/json');
    expect(keyInput).toHaveValue('Content-Type');
    expect(valueInput).toHaveValue('application/json');
  });

  test('removes a header row', async () => {
    const user = userEvent.setup();
    render(<HeadersEditor />);
    const addBtn = screen.getByRole('button', { name: /add header/i });
    await user.click(addBtn);
    const deleteButtons = screen.getAllByRole('button', { name: '' });
    await user.click(deleteButtons[0]);
  });
});
