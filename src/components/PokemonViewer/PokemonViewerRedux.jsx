import { connect } from 'react-redux';
import PokemonViewer from './PokemonViewer';

const PokemonViewerRedux = ({
  pokemon,
  name,
}) => {

  const foundPokemon = pokemon.find((p) => p.name === name);

  return (
    <PokemonViewer pokemon={foundPokemon} isLoading={foundPokemon?.isLoading ?? false} />
  );
};

const mapState = (state) => ({
  pokemon: state.pokemon.pokemon,
});

const mapDispatch = (_dispatch) => ({
});

export default connect(mapState, mapDispatch)(PokemonViewerRedux);

