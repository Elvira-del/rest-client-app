'use client';

import { useEffect, useState } from 'react';
import { useRouter } from '@/i18n/navigation';
import { useParams } from 'next/navigation';
import type { HttpMethod } from '@/types/types';
import { Input } from './ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Button } from './ui/button';
import { Send } from 'lucide-react';

const METHODS: HttpMethod[] = [
  'GET',
  'POST',
  'PUT',
  'DELETE',
  'PATCH',
  'HEAD',
  'OPTIONS',
];

function isHttpMethod(value: unknown): value is HttpMethod {
  return (
    typeof value === 'string' &&
    METHODS.includes(value.toUpperCase() as HttpMethod)
  );
}

export const MethodSelector = () => {
  const router = useRouter();
  const params = useParams<{ method?: string }>();

  const [method, setMethod] = useState<HttpMethod>('GET');

  useEffect(() => {
    const urlMethod = params.method?.toUpperCase();

    if (isHttpMethod(urlMethod)) {
      setMethod(urlMethod);
    } else {
      setMethod('GET');
    }
  }, [params.method]);

  const handleChangeMethod = (value: HttpMethod) => {
    const method = value.toUpperCase();
    if (!isHttpMethod(method)) return;
    setMethod(method);

    router.push({ pathname: '/rest-client/[method]', params: { method } });
  };

  return (
    <div className="flex gap-2">
      <Select value={method} onValueChange={handleChangeMethod}>
        <SelectTrigger className="w-32">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {METHODS.map((method) => (
            <SelectItem key={method} value={method}>
              {method}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Input className="flex-1" placeholder="https://api.example.com/users" />
      <Button>
        <Send className="h-4 w-4 mr-2" />
        Send
      </Button>
    </div>
  );
};
