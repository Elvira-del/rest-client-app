'use client';

import { useRestClientStore } from '@/store/useRestClientStore';
import type { ChangeEvent } from 'react';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';

export const BodyEditor = () => {
  const body = useRestClientStore((state) => state.body);
  const setBody = useRestClientStore((state) => state.setBody);

  const handleChangeBody = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setBody(event.target.value);
  };

  console.info('BODY:', body);

  return (
    <div className="space-y-2">
      <Label>Body</Label>
      <Textarea
        className="min-h-[200px] font-mono"
        placeholder='{"key": "value"}'
        value={body}
        onChange={(event) => handleChangeBody(event)}
      />
      <div className="flex gap-2">
        <Button variant="outline" size="sm" disabled={!body}>
          Format JSON
        </Button>
      </div>
    </div>
  );
};
