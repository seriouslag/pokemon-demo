import { clientFromContext, ListResponse, Pokemon } from '@myapi/api-pokemon';
import { useEffect, useState } from 'react';
import { PokemonHook } from './PokemonHook';

/**
 * Hook to fetch Pokémon list and details
 */
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

  /**
   * Fetch list of Pokémon using limit and offset. The result will be mapped to a new array of pokemon
   * with the id, name, img, isLoading, and value properties. The Pokémon will be in a loading state until
   * the Pokémon details are fetched. In the loading state the img property will be an empty string and
   * the isLoading property will be true and the value property will be null. The Pokémon details will be
   * fetched in parallel and the mapped Pokémon array will be updated with the fetched details after each update.
   * @param limit - number of Pokémon to fetch
   * @param offset - offset of Pokémon to fetch
   */
  const fetchPokemonList = async (limit: number, offset: number) => {
    // reset loading state
    setIsLoading(true);
    setError(undefined);
    setOffset(offset);
    setLimit(limit);
    try {
      // fetch Pokémon list
      const pokemonList = await pokemonApiContext.pokemon.pokemonList({ limit, offset });
      // set Pokémon list
      setPokemonList(pokemonList);

      // map Pokémon results
      const mappedPokemon = pokemonList.results.map((pokemon, index) => ({
        id: offset + index + 1,
        name: pokemon.name,
        img: '',
        isLoading: true,
        value: null as Pokemon|null,
      }));

      // set mapped pokemon
      setPokemon(mappedPokemon);

      // map Pokémon results to promises to fetch Pokémon details
      const promises = mappedPokemon.map(async (pokemon, index) => {
        const pokeId = pokemon.id;
        // fetch Pokémon details
        const pokemonDetail = await pokemonApiContext.pokemon.pokemonRead({ name: pokemon.name });
        // find Pokémon in mapped pokemon
        // doing this to make sure the Pokémon is still in the list in case the user has changed the page
        const foundPokemon = mappedPokemon.findIndex((pokemon) => pokemon.id === pokeId);
        if (foundPokemon < 0) {
          return;
        }
        // create new mapped Pokémon array
        const newMappedPokemon = [...mappedPokemon];
        // update Pokémon details with fetched details
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
