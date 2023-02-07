import './App.css';
import PokemonListHooks from './components/PokemonList/PokemonListHooks';
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
          <h1 className='text-2xl'>Pokemon API</h1>
          <div className="container grid gap-4 lg:grid-cols-1">
            <div>
              <h1 className='text-lg'>State is using a hook</h1>
              <PokemonListHooks />
            </div>
          </div>
        </div>
        <DialogPortal dialogService={dialogService} />
      </QueryClientProvider>
    </>
  );
}

export default App;

