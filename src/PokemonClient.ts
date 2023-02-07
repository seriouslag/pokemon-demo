import { ListResponse, Pokemon } from './api/pokemon/src/generated';

export class PokemonClient {
  constructor(private options: {
    readonly baseUrl: string;
  }) { }

  async pokemonList({ limit, offset }: { limit: number; offset: number }): Promise<ListResponse> {
    const response = await fetch(`${this.options.baseUrl}/v2/pokemon?limit=${limit}&offset=${offset}`);
    const data = await response.json();
    return data;
  }

  async pokemonRead({ name }: { name: string }): Promise<Pokemon> {
    const response = await fetch(`${this.options.baseUrl}/v2/pokemon/${name}`);
    const data = await response.json();
    return data;
  }
}
