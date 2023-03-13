/**
 * PokemonClient is a client for the Pokemon API.
 * @param options - Options for the client.
 */
export class PokemonClient {
  /**
   * PokemonClient is a client for the Pokemon API.
   * @param options - Options for the client.
   */
  constructor(options) {
    this.options = options;
  }

  /** Fetch list of pokemon */
  async pokemonList({ limit, offset }) {
    const response = await fetch(`${this.options.baseUrl}/v2/pokemon?limit=${limit}&offset=${offset}`);
    const data = await response.json();
    return data;
  }

  /** Fetch details of a pokemon by pokemon name or ID */
  async pokemonRead({ name }) {
    const response = await fetch(`${this.options.baseUrl}/v2/pokemon/${name}`);
    const data = await response.json();
    return data;
  }
}
