import { Pokemon } from '@myapi/api-pokemon';

type PokemonViewerProps = {
  pokemon: {
    id: number;
    name: string;
    img: string;
    isLoading: boolean;
    value: Pokemon|null;
  }|undefined;
  isLoading: boolean;
};

const PokemonViewer: React.FC<PokemonViewerProps> = ({ pokemon, isLoading }) => {

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const value = pokemon?.value;

  if (value) {
    return (
      <>
        <div className="w-full max-w-sm">
          <div className="flex flex-col items-center pb-10">
            <img className="w-24 h-24 mb-3 rounded-full shadow-lg" src={value.sprites.front_default ?? '../../../public/no-image.webp'} alt={`${value.name} image`} />
            <h5 className="mb-1 text-xl font-medium">{value.name}</h5><h6 className="text-lg"> # {value.id}</h6>
            <span className="text-sm">Base Experience: {value.base_experience}</span>
            <span className="text-sm">Height: {value.height}</span>
            <span className="text-sm">Weight: {value.weight}</span>
          </div>
        </div>
      </>
    );
  }

  return <div>Something went wrong</div>;
};

export default PokemonViewer;
