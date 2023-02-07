import { useQueries, useQuery } from '@tanstack/react-query';
import { clientFromContext } from '@myapi/api-pokemon';
import { useState } from 'react';
import { PokemonHook } from './PokemonHook';

const keys = {
  getPokemonList: 'getPokemonList',
  getPokemonByName: 'getPokemonByName',
} as const;

export const useGetPokemonList = (limit: number, offset: number) => {
  return useQuery({
    queryKey: [keys.getPokemonList, limit, offset],
    queryFn: async () => {
      const pokemonApiContext = clientFromContext({ baseUrl: 'https://pokeapi.co/api' });

      const response = await pokemonApiContext.pokemon.pokemonList({ limit, offset });
      return response;
    },
  });
};

const fetchPokemonByName = async (name: string) => {
  const pokemonApiContext = clientFromContext({ baseUrl: 'https://pokeapi.co/api' });

  const response = await pokemonApiContext.pokemon.pokemonRead({ name });
  return response;
};

export const useGetPokemonByName = (name: string, enabled = true) => {
  return useQuery({
    queryKey: [keys.getPokemonByName, name],
    queryFn: () => fetchPokemonByName(name),
    enabled,
  });
};

export const useGetPokemonByNames = (names: string[], enabled = true) => {
  return useQueries({
    queries: [
      ...names.map((name) => ({
        queryKey: [keys.getPokemonByName, name],
        queryFn: () => fetchPokemonByName(name),
        enabled,
      })),
    ],
  });
};

export const usePokemonQuery = (props: {
  /** Limit of results to fetch */
  limit: number,
  /** Starting offset of hook */
  offset: number,
}): PokemonHook => {
  const [limit, setLimit] = useState(props.limit);
  const [offset, setOffset] = useState(props.offset);

  const { error, isLoading: getPokemonListIsLoading, data: pokemonList } = useGetPokemonList(limit, offset);

  const results = useGetPokemonByNames(pokemonList?.results.map((pokemon) => pokemon.name) ?? [], !!pokemonList);

  const pokemon = results.map((result, index) => {
    const { data: pokemon, isLoading } = result;

    if (pokemon) {
      return {
        id: pokemon.id,
        name: pokemon.name,
        img: pokemon.sprites.front_default ?? '../../public/no-image.png',
        isLoading,
      };
    }
    const foundPokemonName = pokemonList?.results[index].name ?? 'Error';
    return {
      id: offset + index + 1,
      name: foundPokemonName,
      img: '',
      isLoading,
    };
  }) ?? [];

  const onPageChange = async (newPage: number) => {
    setOffset(newPage * limit);
  };

  const page = offset / limit;

  const count = pokemonList?.count ?? 0;

  return {
    pokemon,
    isLoading: getPokemonListIsLoading || pokemon.some((pokemon) => pokemon.isLoading),
    error,
    onPageChange,
    setLimit,
    setOffset,
    count,
    page,
    offset,
    limit,
  };
};
