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

export type RestDraft = {
  method: HttpMethod;
  endpoint: string;
  headers: HeaderRow[];
  body: string;
};
