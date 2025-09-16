'use client';

import { useEffect, useState, type ChangeEvent } from 'react';
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
import { fromBase64Url, toBase64Url } from '@/lib/base64';

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

export const MethodEndpointBar = () => {
  const router = useRouter();
  const params = useParams<{ method?: string; url?: string[] }>();

  const [method, setMethod] = useState<HttpMethod>('GET');
  const [endpoint, setEndpoint] = useState('');

  useEffect(() => {
    const urlMethod = params.method?.toUpperCase();
    if (isHttpMethod(urlMethod)) {
      setMethod(urlMethod);
    } else {
      setMethod('GET');
    }

    const urlEndpoint = params.url?.[0];
    if (urlEndpoint) {
      try {
        setEndpoint(fromBase64Url(urlEndpoint));
      } catch {
        setEndpoint('');
      }
    } else {
      setEndpoint('');
    }
  }, [params.method, params.url]);

  const handleChangeMethod = (value: HttpMethod) => {
    const method = value.toUpperCase();
    if (!isHttpMethod(method)) return;
    setMethod(method);

    const existEndpoint = params.url;
    router.replace({
      pathname: '/rest-client/[method]/[[...url]]',
      params: { method, url: existEndpoint },
    });
  };

  const handleChangeEndpoint = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setEndpoint(value);
  };

  const handleSubmitEndpoint = () => {
    const endpointTrimmed = endpoint.trim();
    const encodedEndpoint = toBase64Url(endpointTrimmed);

    router.replace({
      pathname: '/rest-client/[method]/[[...url]]',
      params: { method, url: [encodedEndpoint] },
    });
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
      <Input
        className="flex-1"
        type="text"
        placeholder="https://api.example.com/users"
        value={endpoint}
        onChange={(event) => handleChangeEndpoint(event)}
      />
      <Button onClick={handleSubmitEndpoint}>
        <Send className="h-4 w-4 mr-2" />
        Send
      </Button>
    </div>
  );
};
