import type { HeaderRow, HttpMethod } from '@/types/types';

export function toBase64Url(str: string) {
  const bytes = new TextEncoder().encode(str);
  const bin = String.fromCharCode(...bytes);
  const b64 = btoa(bin);
  return b64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
}

export function fromBase64Url(str: string) {
  const b64 = str.replace(/-/g, '+').replace(/_/g, '/');
  const padded = b64.padEnd(Math.ceil(b64.length / 4) * 4, '=');
  const bin = atob(padded);
  const bytes = new Uint8Array([...bin].map((c) => c.charCodeAt(0)));
  return new TextDecoder().decode(bytes);
}

export function headersToQuery(
  headers: HeaderRow[]
): Record<string, string | string[]> {
  const out: Record<string, string | string[]> = {};
  headers
    .filter((header) => header.key.trim().length)
    .forEach((header) => {
      const key = header.key.trim();
      if (key in out) {
        const cur = out[key];
        if (Array.isArray(cur)) cur.push(header.value);
        else out[key] = [cur, header.value];
      } else {
        out[key] = header.value;
      }
    });
  return out;
}

const METHODS_WITHOUT_BODY: ReadonlyArray<HttpMethod> = ['GET', 'HEAD'];

export function methodCanHaveBody(method: HttpMethod): boolean {
  return !METHODS_WITHOUT_BODY.includes(method.toUpperCase() as HttpMethod);
}

export function bodyToBase64Url(body: string, method: HttpMethod) {
  if (!methodCanHaveBody(method)) return undefined;
  const trimmed = body.trim();
  if (!trimmed) return undefined;
  try {
    const json = JSON.parse(trimmed);
    const normalized = JSON.stringify(json);
    return toBase64Url(normalized);
  } catch {
    return undefined;
  }
}

export function normalizeJsonOrNull(input: string): string | null {
  const trimmed = input.trim();
  if (!trimmed) return null;
  try {
    return JSON.stringify(JSON.parse(trimmed));
  } catch {
    return null;
  }
}

export function headersRowsToObject(rows: HeaderRow[]): Record<string, string> {
  const out: Record<string, string> = {};
  for (const row of rows) {
    const key = row.key.trim();
    if (!key) continue;
    out[key] = row.value;
  }
  return out;
}
