import { CancelablePromise, PokemonClient } from './generated';
import { v4 } from 'uuid';
import { request as __request } from './generated/core/request';
import { ApiRequestOptions } from './generated/core/ApiRequestOptions';
import { FetchHttpRequest } from './generated/core/FetchHttpRequest';
export * from './generated';

export const clientFromContext = (
  context: {
		readonly baseUrl?: string;
	} = (window as any).runtime,
) => {
  return new PokemonClient(
    {
      BASE: `${context.baseUrl}`,
    },
  );
};
