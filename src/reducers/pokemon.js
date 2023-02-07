const initialState = {
  limit: 100,
  offset: 0,
  pokemonList: null,
  pokemon: [],
  error: null,
  loading: false,
};

export const pokemonReducer = (state = initialState, action) => {
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
