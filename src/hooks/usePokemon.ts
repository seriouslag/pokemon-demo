import { clientFromContext, ListResponse, Pokemon } from '@myapi/api-pokemon';
import { useEffect, useState } from 'react';
import { PokemonHook } from './PokemonHook';

export const usePokemon = (props: {
  /** Limit of results to fetch */
  limit: number,
  /** Starting offset of hook */
  offset: number,
}): PokemonHook => {
  const pokemonApiContext = clientFromContext({ baseUrl: 'https://pokeapi.co/api' });

  const [pokemonList, setPokemonList] = useState<ListResponse>();
  const [isLoading, setIsLoading] = useState(false);
  const [limit, setLimit] = useState(props.limit);
  const [offset, setOffset] = useState(props.offset);
  const [error, setError] = useState<unknown>();

  const [pokemon, setPokemon] = useState<{
    id: number;
    name: string;
    img: string;
    isLoading: boolean;
    value: Pokemon|null;
  }[]>([]);

  const fetchPokemonList = async (limit: number, offset: number) => {
    // reset loading state
    setIsLoading(true);
    setError(undefined);
    setOffset(offset);
    setLimit(limit);
    try {
      // fetch pokemon list
      const pokemonList = await pokemonApiContext.pokemon.pokemonList({ limit, offset });
      // set pokemon list
      setPokemonList(pokemonList);

      // map pokemon results
      const mappedPokemon = pokemonList.results.map((pokemon, index) => ({
        id: offset + index + 1,
        name: pokemon.name,
        img: '',
        isLoading: true,
        value: null as Pokemon|null,
      }));

      // set mapped pokemon
      setPokemon(mappedPokemon);

      // map pokemon results to promises to fetch pokemon details
      const promises = mappedPokemon.map(async (pokemon, index) => {
        const pokeId = pokemon.id;
        // fetch pokemon details
        const pokemonDetail = await pokemonApiContext.pokemon.pokemonRead({ name: pokemon.name });
        // find pokemon in mapped pokemon
        // doing this to make sure the pokemon is still in the list in case the user has changed the page
        const foundPokemon = mappedPokemon.findIndex((pokemon) => pokemon.id === pokeId);
        if (foundPokemon < 0) {
          return;
        }
        // create new mapped pokemon array
        const newMappedPokemon = [...mappedPokemon];
        // update pokemon details with fetched details
        newMappedPokemon[index].img = pokemonDetail.sprites.front_default ?? '../../public/no-image.webp';
        newMappedPokemon[index].isLoading = false;
        newMappedPokemon[index].value = pokemonDetail;
        // update state with new mapped pokemon
        setPokemon(newMappedPokemon);
      });
      // wait for all promises to resolve
      await Promise.all(promises);
    } catch (e) {
      setError(e);
    } finally {
      setIsLoading(false);
    }
  };

  const onPageChange = async (newPage: number) => {
    await fetchPokemonList(limit, newPage * limit);
  };

  useEffect(() => {
    if (!pokemonList && !isLoading) {
      fetchPokemonList(limit, offset);
    }
  }, []);

  const page = offset / limit;

  const count = pokemonList?.count ?? 0;

  return {
    pokemon,
    isLoading,
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
