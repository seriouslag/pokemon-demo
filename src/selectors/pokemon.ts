import { RootState } from '../store';

export const getPokemonPage = (state: RootState) => state.pokemon.offset / state.pokemon.limit;
export const getPokemonCount = (state: RootState) => state.pokemon.pokemonList?.count ?? 0;
