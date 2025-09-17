'use client';

import { useState } from 'react';
import type { HeaderRow } from '@/types/types';
import { v4 as uuidv4 } from 'uuid';
import { Plus, Trash2 } from 'lucide-react';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Input } from './ui/input';

export const HeadersEditor = () => {
  const [headers, setHeaders] = useState<HeaderRow[]>([
    { id: '1', key: '', value: '' },
  ]);

  const handleAddHeader = () => {
    setHeaders((prev) => [...prev, { id: uuidv4(), key: '', value: '' }]);
  };

  const handleRemoveHeader = (id: string) => {
    setHeaders(headers.filter((header) => header.id !== id));
  };

  const handleUpdateHeader = (
    id: string,
    field: 'key' | 'value',
    value: string
  ) => {
    setHeaders(
      headers.map((header) =>
        header.id === id ? { ...header, [field]: value } : header
      )
    );
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <Label>Headers</Label>
        <Button variant="outline" size="sm" onClick={handleAddHeader}>
          <Plus className="h-4 w-4 mr-2" />
          Add Header
        </Button>
      </div>
      <div className="space-y-2">
        {headers.map((header) => (
          <div key={header.id} className="flex gap-2 items-center">
            <Input
              className="flex-1"
              placeholder="Key"
              value={header.key}
              onChange={(event) =>
                handleUpdateHeader(header.id, 'key', event.target.value)
              }
            />
            <Input
              className="flex-1"
              placeholder="Value"
              value={header.value}
              onChange={(event) =>
                handleUpdateHeader(header.id, 'value', event.target.value)
              }
            />
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleRemoveHeader(header.id)}
              disabled={headers.length === 1}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
    </>
  );
};
