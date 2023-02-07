export class PokemonClient {
  constructor(options) {
    this.options = options;
  }


  async pokemonList({ limit, offset }) {
    const response = await fetch(`${this.options.baseUrl}/v2/pokemon?limit=${limit}&offset=${offset}`);
    const data = await response.json();
    return data;
  }

  async pokemonRead({ name }) {
    const response = await fetch(`${this.options.baseUrl}/v2/pokemon/${name}`);
    const data = await response.json();
    return data;
  }
}
