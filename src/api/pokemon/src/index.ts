import { PokemonClient } from './generated';
export * from './generated';

/**
 * This function creates a new PokemonClient instance using the baseUrl from the context.
 */
export const clientFromContext = (
  context: {
		readonly baseUrl?: string;
	},
) => {
  return new PokemonClient(
    {
      BASE: `${context.baseUrl}`,
    },
  );
};
