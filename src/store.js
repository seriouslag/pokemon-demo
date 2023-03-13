import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { connect, useDispatch, useSelector } from 'react-redux';
import { PokemonActions } from './actions/pokemon';
import { pokemonReducer } from './reducers/pokemon';

export const createBaseStore = (reducers) => {
  if (!reducers) throw new Error('No reducers were provided.');
  return configureStore({
    reducer: reducers,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        immutableCheck: false,
        serializableCheck: false,
      }).concat([
        // middleware would go here
      ]),
  });
};

const mapState = (state) => state;

const mapDispatch = {
  ...PokemonActions,
};

export const connector = connect(mapState, mapDispatch);

const reducers = combineReducers({
  // add additional reducers here
  pokemon: pokemonReducer,
});

export const createStore = () => createBaseStore(reducers);

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch;
export const useAppSelector = useSelector;
