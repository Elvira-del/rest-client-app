import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import VariablesPage from '@/app/[locale]/(private)/variables/page';
import '@testing-library/jest-dom';
import { vi } from 'vitest';

vi.mock('next-intl', () => ({
  useTranslations: (ns?: string) => {
    const dict: Record<string, Record<string, string>> = {
      VariablesPage: {
        title: 'Variables',
        subtitlePart1: 'You can define variables',
        subtitlePart2: 'and reuse them as',
        addVariable: 'Add variable',
        key: 'Key',
        value: 'Value',
        description: 'Description',
        keyPlaceholder: 'Enter key',
        valuePlaceholder: 'Enter value',
        descriptionPlaceholder: 'Enter description',
        noVariables: 'No variables yet',
        yourVariables: 'Your variables',
        edit: 'Edit',
        howToUsePart1: 'Use',
        howToUsePart2: 'anywhere.',
        howToUsePart3: 'For example',
        howToUsePart4: 'to call API.',
      },
    };
    return (key: string) => dict[ns!][key];
  },
}));

describe('VariablesPage', () => {
  test('render title and inputs', () => {
    render(<VariablesPage />);
    expect(
      screen.getByRole('heading', { name: /variables/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/no variables yet/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/enter key/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/enter value/i)).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/enter description/i)
    ).toBeInTheDocument();
  });

  test('button unabled disabled', async () => {
    const user = userEvent.setup();
    render(<VariablesPage />);
    const keyInput = screen.getByLabelText(/key/i) as HTMLInputElement;
    const valueInput = screen.getByLabelText(/value/i) as HTMLInputElement;
    const addBtn = screen.getByRole('button', { name: /add variable/i });

    expect(addBtn).toBeDisabled();

    await user.type(keyInput, 'API_STARWARS_URL');
    expect(addBtn).toBeDisabled();

    await user.type(valueInput, 'https://swapi.dev/api/');
    expect(addBtn).toBeEnabled();
  });

  test('add variables', async () => {
    const user = userEvent.setup();
    render(<VariablesPage />);
    const keyInput = screen.getByLabelText(/key/i) as HTMLInputElement;
    const valueInput = screen.getByLabelText(/value/i) as HTMLInputElement;
    const descInput = screen.getByLabelText(/description/i) as HTMLInputElement;
    const addBtn = screen.getByRole('button', { name: /add variable/i });

    await user.type(keyInput, 'API_STARWARS_URL');
    await user.type(valueInput, 'https://swapi.dev/api/');
    await user.type(descInput, 'url_api_starwars');
    await user.click(addBtn);

    expect(keyInput).toHaveValue('');
    expect(valueInput).toHaveValue('');
    expect(descInput).toHaveValue('');

    expect(screen.queryByText(/no variables yet/i)).not.toBeInTheDocument();
    expect(screen.getByText(/your variables/i)).toBeInTheDocument();

    expect(screen.getByText('{{API_STARWARS_URL}}')).toBeInTheDocument();
    expect(screen.getByText('https://swapi.dev/api/')).toBeInTheDocument();
    expect(screen.getByText(/url_api_starwars/i)).toBeInTheDocument();
  });

  test('counter variables', async () => {
    const user = userEvent.setup();
    render(<VariablesPage />);
    const keyInput = screen.getByLabelText(/key/i) as HTMLInputElement;
    const valueInput = screen.getByLabelText(/value/i) as HTMLInputElement;
    const addBtn = screen.getByRole('button', { name: /add variable/i });

    await user.type(keyInput, 'A');
    await user.type(valueInput, '1');
    await user.click(addBtn);

    await user.type(keyInput, 'B');
    await user.type(valueInput, '2');
    await user.click(addBtn);

    expect(screen.getByText(/your variables/i)).toHaveTextContent(
      'Your variables (2)'
    );
  });

  test('edit variables', async () => {
    const user = userEvent.setup();
    render(<VariablesPage />);
    const keyInput = screen.getByLabelText(/key/i) as HTMLInputElement;
    const valueInput = screen.getByLabelText(/value/i) as HTMLInputElement;
    const descInput = screen.getByLabelText(/description/i) as HTMLInputElement;
    const addBtn = screen.getByRole('button', { name: /add variable/i });

    await user.type(keyInput, 'A');
    await user.type(valueInput, '1');
    await user.type(descInput, 'test');
    await user.click(addBtn);

    const editBtn = screen.getByRole('button', { name: /edit/i });
    await user.click(editBtn);

    expect(keyInput).toHaveValue('A');
    expect(valueInput).toHaveValue('1');
    expect(descInput).toHaveValue('test');

    expect(screen.queryByText('{{A}}')).not.toBeInTheDocument();
  });
});
