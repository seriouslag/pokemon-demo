import { useQueries, useQuery } from '@tanstack/react-query';
import { clientFromContext, ListResponse } from '@myapi/api-pokemon';
import { useState } from 'react';
import { PokemonHook } from './PokemonHook';

const keys = {
  getPokemonList: 'getPokemonList',
  getPokemonByName: 'getPokemonByName',
} as const;

/**
 * Fetch list of Pokémon using limit and offset.
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
 * Fetch Pokémon by name.
 */
export const useGetPokemonByName = (name: string, enabled = true) => {
  return useQuery({
    queryKey: [keys.getPokemonByName, name],
    queryFn: () => fetchPokemonByName(name),
    enabled,
  });
};

/**
 * Fetch Pokémon by name in parallel.
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
 * Fetch list of Pokémon using limit and offset. The result will be mapped to a new array of pokemon
 * with the id, name, img, isLoading, and value properties. The Pokémon will be in a loading state until
 * the Pokémon details are fetched. In the loading state the img property will be an empty string and
 * the isLoading property will be true and the value property will be null. The Pokémon details will be
 * fetched in parallel and the mapped Pokémon array will be updated with the fetched details after each update.
 */
export const usePokemonQuery = (props: {
  /** Limit of results to fetch */
  limit: number,
  /** Starting offset of hook */
  offset: number,
}): PokemonHook => {
  const [limit, setLimit] = useState(props.limit);
  const [offset, setOffset] = useState(props.offset);
  const [pokemonList, setPokemonList] = useState<ListResponse|null>(null);

  const { error, isLoading: getPokemonListIsLoading, data: pokemonListData } = useGetPokemonList(limit, offset);

  // update pokemon list if the data changes
  if (pokemonListData && pokemonListData !== pokemonList) {
    setPokemonList(pokemonListData);
  }

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
