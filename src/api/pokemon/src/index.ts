import { PokemonClient } from './generated';
export * from './generated';

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
