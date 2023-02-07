import { AppDispatch, RootState } from '../../store';
import { connect } from 'react-redux';
import PokemonViewer from './PokemonViewer';

type PokemonListReduxProps = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch> & {
  /** Name of pokemon */
  name: string;
};

const PokemonViewerRedux: React.FC<PokemonListReduxProps> = ({
  pokemon,
  name,
}) => {

  const foundPokemon = pokemon.find((p) => p.name === name);

  return (
    <PokemonViewer pokemon={foundPokemon} isLoading={foundPokemon?.isLoading ?? false} />
  );
};

const mapState = (state: RootState) => ({
  pokemon: state.pokemon.pokemon,
});

const mapDispatch = (_dispatch: AppDispatch) => ({
});

export default connect(mapState, mapDispatch)(PokemonViewerRedux);

