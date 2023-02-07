import './App.css';
import PokemonListHooks from './components/PokemonList/PokemonListHooks';
import PokemonListRedux from './components/PokemonList/PokemonListRedux';
import PokemonListHooksQuery from './components/PokemonList/PokemonListHooksQuery';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import DialogPortal, { DialogService } from './components/DialogPortal';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnMount: false, // default: true
      refetchOnWindowFocus: false, // default: true
      refetchOnReconnect: false, // default: true
      staleTime: Number.POSITIVE_INFINITY, // default: 0
    },
  },
});

function App() {

  const dialogService = DialogService.getInstance();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <div className="flex flex-col justify-center">
          <h1 className='text-2xl'>React Query vs Redux vs Hooks</h1>
          <div className="container grid gap-4 lg:grid-cols-3">
            <div>
              <h1 className='text-lg'>Using Redux</h1>
              <PokemonListRedux />
            </div>
            <div>
              <h1 className='text-lg'>Using Hooks</h1>
              <PokemonListHooks />
            </div>
            <div>
              <h1 className='text-lg'>Using React Query</h1>
              <PokemonListHooksQuery />
            </div>
          </div>
        </div>
        <DialogPortal dialogService={dialogService} />
      </QueryClientProvider>
    </>
  );
}

export default App;

