export type ListResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Array<{
    name: string;
    url: string;
  }>;
};

export type Pokemon = {
  abilities: any[];
  base_experience: number;
  forms: any[]
  game_indices: any[];
  height: number;
  held_items: any[];
  id: number;
  is_default: boolean;
  location_area_encounters: string;
  moves: any[];
  name: string;
  order: number;
  species: {
    name: string;
    url: string;
  };
  sprites: any;
  stats: any[];
  types: any[];
  weight: number;
};

/**
 * PokemonClient is a client for the Pokémon API.
 * @param options - Options for the client.
 */
export class PokemonClient {
  /**
   * PokemonClient is a client for the Pokémon API.
   * @param options - Options for the client.
   */
  constructor(private options: {
    readonly baseUrl: string;
  }) { }

  /** Fetch list of Pokémon */
  async pokemonList({ limit, offset }: { limit: number; offset: number }): Promise<ListResponse> {
    const response = await fetch(`${this.options.baseUrl}/v2/pokemon?limit=${limit}&offset=${offset}`);
    const data = await response.json();
    return data;
  }

  /** Fetch details of a Pokémon by Pokémon name or ID */
  async pokemonRead({ name }: { name: string }): Promise<Pokemon> {
    const response = await fetch(`${this.options.baseUrl}/v2/pokemon/${name}`);
    const data = await response.json();
    return data;
  }
}
