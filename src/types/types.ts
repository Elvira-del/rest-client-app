export type HttpMethod =
  | 'GET'
  | 'POST'
  | 'PUT'
  | 'DELETE'
  | 'PATCH'
  | 'HEAD'
  | 'OPTIONS';

export type HeaderRow = {
  id: string;
  key: string;
  value: string;
};

export type RequestResponse = {
  status?: number;
  statusText?: string;
  headers: Record<string, string>;
  body: string;
  time: number;
};

export type RestDraft = {
  method: HttpMethod;
  endpoint: string;
  headers: HeaderRow[];
  body: string;
  response: RequestResponse | null;
};

export type SendRequestInput = {
  method: HttpMethod;
  endpoint: string;
  headers: HeaderRow[];
  body: string;
};

export type ProxyResponse<T = unknown> = {
  status: number;
  statusText: string;
  headers: Record<string, string>;
  data: T;
};

export type SendResult<T = unknown> = ProxyResponse<T> & { time: number };
