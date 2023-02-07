import { Pokemon } from '@myapi/api-pokemon';

export type PokemonHook = {
  pokemon: Array<{
    id: number;
    name: string;
    img: string;
    isLoading: boolean;
    value: Pokemon|null;
  }>;
  isLoading: boolean;
  error: unknown | undefined;
  onPageChange: (newPage: number) => Promise<void>;
  setLimit: (limit: number) => void;
  setOffset: (offset: number) => void;
  count: number;
  page: number;
  offset: number;
  limit: number;
};
