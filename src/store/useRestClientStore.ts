import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';
import type {
  HeaderRow,
  HttpMethod,
  RequestResponse,
  RestDraft,
} from '@/types/types';

type RestClientState = RestDraft & {
  setMethod: (method: HttpMethod) => void;
  setEndpoint: (endpoint: string) => void;
  setBody: (body: string) => void;
  setResponse: (response: RequestResponse) => void;

  addHeader: () => void;
  removeHeader: (id: string) => void;
  updateHeader: (
    id: string,
    patch: Partial<Pick<HeaderRow, 'key' | 'value'>>
  ) => void;
  clearResponse: () => void;

  hydrate: (patch: Partial<RestDraft>) => void;

  reset: () => void;
};

const initial: RestDraft = {
  method: 'GET',
  endpoint: '',
  headers: [{ id: uuidv4(), key: '', value: '' }],
  body: '',
  response: null,
};

export const useRestClientStore = create<RestClientState>()((set) => ({
  ...initial,

  setMethod: (method) => set({ method }),
  setEndpoint: (endpoint) => set({ endpoint }),
  setBody: (body) => set({ body }),
  setResponse: (response) => set({ response }),

  addHeader: () =>
    set((state) => ({
      headers: [...state.headers, { id: uuidv4(), key: '', value: '' }],
    })),

  removeHeader: (id) =>
    set((state) => {
      const next = state.headers.filter((header) => header.id !== id);
      return {
        headers: next.length ? next : [{ id: uuidv4(), key: '', value: '' }],
      };
    }),

  updateHeader: (id, patch) =>
    set((state) => ({
      headers: state.headers.map((header) =>
        header.id === id ? { ...header, ...patch } : header
      ),
    })),

  clearResponse: () => set({ response: null }),

  hydrate: (patch) => set((state) => ({ ...state, ...patch })),

  reset: () => set({ ...initial }),
}));
