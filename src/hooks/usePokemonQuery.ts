import { useQueries, useQuery } from '@tanstack/react-query';
import { clientFromContext } from '@myapi/api-pokemon';
import { useState } from 'react';
import { PokemonHook } from './PokemonHook';

const keys = {
  getPokemonList: 'getPokemonList',
  getPokemonByName: 'getPokemonByName',
} as const;

/**
 * Fetch list of pokemon using limit and offset.
 */
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

/**
 * Fetch pokemon by name.
 */
export const useGetPokemonByName = (name: string, enabled = true) => {
  return useQuery({
    queryKey: [keys.getPokemonByName, name],
    queryFn: () => fetchPokemonByName(name),
    enabled,
  });
};

/**
 * Fetch pokemon by name in parallel.
 */
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

/**
 * Fetch list of pokemon using limit and offset. The result will be mapped to a new array of pokemon
 * with the id, name, img, isLoading, and value properties. The pokemon will be in a loading state until
 * the pokemon details are fetched. In the loading state the img property will be an empty string and
 * the isLoading property will be true and the value property will be null. The pokemon details will be
 * fetched in parallel and the mapped pokemon array will be updated with the fetched details after each update.
 */
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
        value: pokemon,
      };
    }
    const foundPokemonName = pokemonList?.results[index].name ?? 'Error';
    return {
      id: offset + index + 1,
      name: foundPokemonName,
      img: '',
      isLoading,
      value: null,
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
