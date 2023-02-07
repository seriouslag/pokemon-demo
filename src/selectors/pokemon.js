export const getPokemonPage = (state) => state.pokemon.offset / state.pokemon.limit;
export const getPokemonCount = (state) => state.pokemon.pokemonList?.count ?? 0;
