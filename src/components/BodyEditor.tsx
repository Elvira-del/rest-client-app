'use client';

import { useRestClientStore } from '@/store/useRestClientStore';
import type { ChangeEvent } from 'react';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { toast } from 'sonner';
import { useTranslations } from 'next-intl';

export const BodyEditor = () => {
  const t = useTranslations('BodyEditor');

  const body = useRestClientStore((state) => state.body);
  const setBody = useRestClientStore((state) => state.setBody);

  const handleChangeBody = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setBody(event.target.value);
  };

  const handleFormatJson = () => {
    try {
      const obj = JSON.parse(body.trim());
      setBody(JSON.stringify(obj, null, 2));
      toast.success(t('toast.formatted'));
    } catch {
      toast.error(t('toast.invalidTitle'), {
        description: t('toast.invalidDesc'),
      });
    }
  };

  return (
    <div className="space-y-2">
      <Label>{t('label')}</Label>
      <Textarea
        className="min-h-[200px] font-mono"
        placeholder={t.raw('placeholder')}
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
          {t('format')}
        </Button>
      </div>
    </div>
  );
};
