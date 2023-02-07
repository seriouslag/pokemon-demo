import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { connect, ConnectedProps, TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { PokemonActions } from './actions/pokemon';
import { pokemonReducer } from './reducers/pokemon';

export const createBaseStore = <
  T extends Parameters<typeof configureStore>[0]['reducer'],
>(reducers: T) => {
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

const mapState = (state: RootState) => state;

const mapDispatch = {
  ...PokemonActions,
};

export const connector = connect(mapState, mapDispatch);

export type PropsFromRedux = ConnectedProps<typeof connector>;

const reducers = combineReducers({
  pokemon: pokemonReducer,
});

export const createStore = () => createBaseStore(reducers);

export type RootState = ReturnType<typeof reducers>;

export type AppDispatch = ReturnType<typeof createStore>['dispatch'];

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
