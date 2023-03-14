import { useGetPokemonByName } from '../../hooks/usePokemonQuery';
import PokemonViewer from './PokemonViewer';

type PokemonViewerQueryProps = {
  /** Name of Pokémon */
  name: string;
};

const PokemonViewerQuery: React.FC<PokemonViewerQueryProps> = ({ name }) => {
  const { isLoading, data: pokemon } = useGetPokemonByName(name);

  const mappedPokemon = pokemon ? {
    id: pokemon.id,
    name: pokemon.name,
    img: pokemon.sprites.front_default ?? '../../../public/no-image.webp',
    isLoading,
    value: pokemon,
  } : undefined;

  return (
    <PokemonViewer isLoading={isLoading} pokemon={mappedPokemon} />
  );
};

export default PokemonViewerQuery;
