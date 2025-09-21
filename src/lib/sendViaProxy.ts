import { proxyFetch } from '@/utils/proxyFetch';
import type { SendRequestInput, SendResult } from '@/types/types';
import {
  headersRowsToObject,
  methodCanHaveBody,
  normalizeJsonOrNull,
} from './base64';

export async function sendViaProxy<T>(
  input: SendRequestInput
): Promise<SendResult<T>> {
  const url = input.endpoint.trim();
  if (!url) throw new Error('URL is required');

  const headers = headersRowsToObject(input.headers);

  let bodyObj;
  if (methodCanHaveBody(input.method) && input.body.trim()) {
    const compact = normalizeJsonOrNull(input.body);
    if (!compact) {
      throw new Error('Body is not valid JSON');
    }
    bodyObj = JSON.parse(compact);
    if (
      !Object.keys(headers).some((key) => key.toLowerCase() === 'content-type')
    ) {
      headers['Content-Type'] = 'application/json';
    }
  }

  const t0 = performance.now();
  const data = await proxyFetch(url, {
    method: input.method,
    headers,
    body: bodyObj,
  });
  const time = Math.round(performance.now() - t0);

  return { ...data, time };
}
