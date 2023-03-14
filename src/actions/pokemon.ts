import { ListResponse, Pokemon } from '../api/pokemon/src/generated';
import { PokemonClient } from '../PokemonClient';
import { AppDispatch } from '../store';

const pokemonApi = new PokemonClient({
  baseUrl: 'https://pokeapi.co/api',
});

const fetchPokemonListSuccess = (pokemon: ListResponse) => ({
  type: 'FETCH_POKEMON_LIST_SUCCESS',
  payload: pokemon,
} as const);

const fetchPokemonListFailure = (error: unknown) => ({
  type: 'FETCH_POKEMON_LIST_FAILURE',
  payload: error,
} as const);

const fetchPokemonListAction = (payload: {
  offset: number;
  limit: number;
}) => ({
  type: 'FETCH_POKEMON_LIST',
  payload,
} as const);

const setPokemonAction = (payload: {
  id: number;
  name: string;
  img: string;
  isLoading: boolean;
  value: Pokemon|null;
}[]) => ({
  type: 'SET_POKEMON',
  payload,
} as const);

export const fetchPokemonList = (limit: number, offset: number) => async (dispatch: AppDispatch) => {
  try {
    const pokemonList = await pokemonApi.pokemonList({
      limit,
      offset,
    });
    // save the offset and limit if the page change was a success
    dispatch(fetchPokemonListAction({
      limit,
      offset,
    }));
    dispatch(fetchPokemonListSuccess(pokemonList));
    

    // map Pokémon results
    const mappedPokemon = pokemonList.results.map((pokemon, index) => ({
      id: offset + index + 1,
      name: pokemon.name,
      img: '',
      isLoading: true,
      value: null as Pokemon|null,
    }));

    // set mapped pokemon
    dispatch(setPokemonAction(mappedPokemon));

    // map Pokémon results to promises to fetch Pokémon details
    const promises = mappedPokemon.map(async (pokemon, index) => {
      const pokeId = pokemon.id;
      // fetch Pokémon details
      const pokemonDetail = await pokemonApi.pokemonRead({ name: pokemon.name });
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
      dispatch(setPokemonAction(newMappedPokemon));
    });
    // wait for all promises to resolve
    await Promise.all(promises);
  } catch (error) {
    dispatch(fetchPokemonListFailure(error));
  }
};

const setLimitAction = (limit: number) => ({
  type: 'POKEMON_SET_LIMIT',
  payload: limit,
} as const);

const setOffsetAction = (offset: number) => ({
  type: 'POKEMON_SET_OFFSET',
  payload: offset,
} as const);

export const setLimit = (limit: number) => (dispatch: AppDispatch) => {
  dispatch(setLimitAction(limit));
};

export const setOffset = (offset: number) => (dispatch: AppDispatch) => {
  dispatch(setOffsetAction(offset));
};

export const PokemonActions = {
  fetchPokemonListAction,
  fetchPokemonListSuccess,
  fetchPokemonListFailure,
  setLimitAction,
  setOffsetAction,
  setPokemonAction,
};

export type PokemonActionTypes = ReturnType<typeof PokemonActions[keyof typeof PokemonActions]>;
