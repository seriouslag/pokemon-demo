import { PokemonClient } from '../PokemonClient';

const pokemonApi = new PokemonClient({
  baseUrl: 'https://pokeapi.co/api',
});

const fetchPokemonListSuccess = (pokemon) => ({
  type: 'FETCH_POKEMON_LIST_SUCCESS',
  payload: pokemon,
});

const fetchPokemonListFailure = (error) => ({
  type: 'FETCH_POKEMON_LIST_FAILURE',
  payload: error,
});

const fetchPokemonListAction = (payload) => ({
  type: 'FETCH_POKEMON_LIST',
  payload,
});

const setPokemonAction = (payload) => ({
  type: 'SET_POKEMON',
  payload,
});

export const fetchPokemonList = (limit, offset) => async (dispatch) => {
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
    

    // map pokemon results
    const mappedPokemon = pokemonList.results.map((pokemon, index) => ({
      id: offset + index + 1,
      name: pokemon.name,
      img: '',
      isLoading: true,
      value: null,
    }));

    // set mapped pokemon
    dispatch(setPokemonAction(mappedPokemon));

    // map pokemon results to promises to fetch pokemon details
    const promises = mappedPokemon.map(async (pokemon, index) => {
      const pokeId = pokemon.id;
      // fetch pokemon details
      const pokemonDetail = await pokemonApi.pokemonRead({ name: pokemon.name });
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
      dispatch(setPokemonAction(newMappedPokemon));
    });
    // wait for all promises to resolve
    await Promise.all(promises);
  } catch (error) {
    dispatch(fetchPokemonListFailure(error));
  }
};

const setLimitAction = (limit) => ({
  type: 'POKEMON_SET_LIMIT',
  payload: limit,
});

const setOffsetAction = (offset) => ({
  type: 'POKEMON_SET_OFFSET',
  payload: offset,
});

export const setLimit = (limit) => (dispatch) => {
  dispatch(setLimitAction(limit));
};

export const setOffset = (offset) => (dispatch) => {
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
