import { create } from "zustand";

export type FiltersType = {
  language: string;
  stars: string;
  created: string;
};

type RepoStore = {
  query: string;
  setQuery: (q: string) => void;
  filters: FiltersType;
  setFilters: (f: Partial<FiltersType>) => void;
  repos: any[];
  setRepos: (repos: any[]) => void;
  count: number;
  setCount: (c: number) => void;
  loading: boolean;
  setLoading: (l: boolean) => void;
  error: string;
  setError: (e: string) => void;
  page: number;
  setPage: (p: number) => void;
  cache: Map<string, any>;
  reset: () => void;
};

export const useRepoStore = create<RepoStore>((set, get) => ({
  query: "",
  setQuery: (q) => set({ query: q }),
  filters: { language: "", stars: "", created: "" },
  setFilters: (f) => set({ filters: { ...get().filters, ...f } }),
  repos: [],
  setRepos: (repos) => set({ repos }),
  count: 0,
  setCount: (c) => set({ count: c }),
  loading: false,
  setLoading: (l) => set({ loading: l }),
  error: "",
  setError: (e) => set({ error: e }),
  page: 1,
  setPage: (p) => set({ page: p }),
  cache: new Map(),
  reset: () =>
    set({
      query: "",
      filters: { language: "", stars: "", created: "" },
      repos: [],
      count: 0,
      loading: false,
      error: "",
      page: 1,
    }),
}));
