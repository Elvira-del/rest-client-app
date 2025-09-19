'use client';

import { type ChangeEvent } from 'react';
import { useRouter } from '@/i18n/navigation';
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
import { headersToQuery, toBase64Url } from '@/lib/base64';
import { useRestClientStore } from '@/store/useRestClientStore';

const METHODS: HttpMethod[] = [
  'GET',
  'POST',
  'PUT',
  'DELETE',
  'PATCH',
  'HEAD',
  'OPTIONS',
];

export const MethodEndpointBar = () => {
  const router = useRouter();

  const method = useRestClientStore((state) => state.method);
  const endpoint = useRestClientStore((state) => state.endpoint);
  const setMethod = useRestClientStore((state) => state.setMethod);
  const setEndpoint = useRestClientStore((state) => state.setEndpoint);

  const handleChangeMethod = (value: string) => {
    const method = value.toUpperCase() as HttpMethod;
    if (!METHODS.includes(method)) return;
    setMethod(method);
  };

  const handleChangeEndpoint = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const endpointTrimmed = value.trim();
    setEndpoint(endpointTrimmed);
  };

  const handleSubmitURL = () => {
    // TODO - getData from store
    // encode url
    // const encodedURL = encode(data)
    // router.replace(url)
    // send request
    const { method, endpoint, headers, body } = useRestClientStore.getState();
    const encodedEndpoint = toBase64Url(endpoint);
    const encodedBody = toBase64Url(JSON.stringify(JSON.parse(body)));
    const query = headersToQuery(headers);

    router.replace({
      pathname: '/rest-client/[method]/[[...url]]',
      params: { method, url: [encodedEndpoint, encodedBody] },
      query,
    });
  };

  console.info('METHOD:', method);
  console.info('ENDPOINT:', endpoint);

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
        onChange={handleChangeEndpoint}
      />
      <Button onClick={handleSubmitURL}>
        <Send className="h-4 w-4 mr-2" />
        Send
      </Button>
    </div>
  );
};
