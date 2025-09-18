'use client';

import { useRestClientStore } from '@/store/useRestClientStore';
import type { ChangeEvent } from 'react';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { toast } from 'sonner';

export const BodyEditor = () => {
  const body = useRestClientStore((state) => state.body);
  const setBody = useRestClientStore((state) => state.setBody);

  const handleChangeBody = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setBody(event.target.value);
  };

  const handleFormatJson = () => {
    try {
      const obj = JSON.parse(body);
      setBody(JSON.stringify(obj, null, 2));
      toast.success('Body formatted');
    } catch {
      toast.error('Body is not valid JSON', {
        description: 'Please enter a valid JSON before formatting.',
      });
    }
  };

  console.info('BODY:', body);

  return (
    <div className="space-y-2">
      <Label>Body</Label>
      <Textarea
        className="min-h-[200px] font-mono"
        placeholder='{"title":"fakeTitle","userId":1,"body":"fakeMessage"}'
        value={body}
        onChange={(event) => handleChangeBody(event)}
      />
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          disabled={!body.trim()}
          onClick={handleFormatJson}
        >
          Format JSON
        </Button>
      </div>
    </div>
  );
};
