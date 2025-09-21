'use client';

import { Plus, Trash2 } from 'lucide-react';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { useRestClientStore } from '@/store/useRestClientStore';

export const HeadersEditor = () => {
  const headers = useRestClientStore((state) => state.headers);
  const addHeader = useRestClientStore((state) => state.addHeader);
  const removeHeader = useRestClientStore((state) => state.removeHeader);
  const updateHeader = useRestClientStore((state) => state.updateHeader);

  return (
    <>
      <div className="flex items-center justify-between">
        <Label>Headers</Label>
        <Button variant="outline" size="sm" onClick={addHeader}>
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
                updateHeader(header.id, { key: event.target.value })
              }
            />
            <Input
              className="flex-1"
              placeholder="Value"
              value={header.value}
              onChange={(event) =>
                updateHeader(header.id, { value: event.target.value })
              }
            />
            <Button
              variant="outline"
              size="sm"
              onClick={() => removeHeader(header.id)}
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
