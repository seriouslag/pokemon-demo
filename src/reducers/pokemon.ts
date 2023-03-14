import { ListResponse, Pokemon } from '../api/pokemon/src/generated';
import { PokemonActionTypes } from '../actions/pokemon';
import { Constants } from '../Constants';

interface PokemonState {
  limit: number;
  offset: number;
  pokemonList: ListResponse|null;
  pokemon: {
    id: number;
    name: string;
    img: string;
    isLoading: boolean;
    value: Pokemon|null;
  }[];
  error: unknown|null;
  loading: boolean;
}

const initialState: PokemonState = {
  limit: Constants.DEFAULT_LIMIT,
  offset: Constants.DEFAULT_OFFSET,
  pokemonList: null,
  pokemon: [],
  error: null,
  loading: false,
};

export const pokemonReducer = (state = initialState, action: PokemonActionTypes) => {
  switch (action.type) {
    case 'FETCH_POKEMON_LIST':
      return {
        ...state,
        limit: action.payload.limit,
        offset: action.payload.offset,
        loading: true,
      };
    case 'FETCH_POKEMON_LIST_SUCCESS':
      return {
        ...state,
        pokemonList: action.payload,
        loading: false,
      };
    case 'SET_POKEMON':
      return {
        ...state,
        pokemon: action.payload,
      };
    case 'FETCH_POKEMON_LIST_FAILURE':
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};
