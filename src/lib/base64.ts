import type { HeaderRow } from '@/types/types';

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
