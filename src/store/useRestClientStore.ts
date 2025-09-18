import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';
import type { HeaderRow, HttpMethod, RestDraft } from '@/types/types';

type RestClientState = RestDraft & {
  setMethod: (method: HttpMethod) => void;
  setEndpoint: (endpoint: string) => void;
  setBody: (body: string) => void;

  addHeader: () => void;
  removeHeader: (id: string) => void;
  updateHeader: (
    id: string,
    patch: Partial<Pick<HeaderRow, 'key' | 'value'>>
  ) => void;

  hydrate: (patch: Partial<RestDraft>) => void;

  reset: () => void;
};

const initial: RestDraft = {
  method: 'GET',
  endpoint: '',
  headers: [{ id: uuidv4(), key: '', value: '' }],
  body: '',
};

export const useRestClientStore = create<RestClientState>()((set) => ({
  ...initial,

  setMethod: (method) => set({ method }),
  setEndpoint: (endpoint) => set({ endpoint }),
  setBody: (body) => set({ body }),

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

  hydrate: (patch) => set((state) => ({ ...state, ...patch })),

  reset: () => set({ ...initial }),
}));
