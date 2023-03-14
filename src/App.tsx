import './App.css';
import PokemonListHooks from './components/PokemonList/PokemonListHooks';
import PokemonListRedux from './components/PokemonList/PokemonListRedux';
import PokemonListHooksQuery from './components/PokemonList/PokemonListHooksQuery';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
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

const ColumnWrapper: React.FC<{
  height?: number;
  minWidth?: number;
  children: React.ReactNode
}> = ({ height = 600, minWidth = 350, children }) => {
  return <div style={{ height, minWidth }}>{children}</div>;
};

const App: React.FC = () => {
  const dialogService = DialogService.getInstance();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <div className="flex flex-col justify-center">
          <h1 className='text-2xl'>React Query vs Redux vs Hooks</h1>
          <div className="container grid gap-4 lg:grid-cols-3">
            <div>
              <h1 className='text-lg'>Using Redux</h1>
              <ColumnWrapper>
                <PokemonListRedux />
              </ColumnWrapper>
            </div>
            <div>
              <h1 className='text-lg'>Using Hooks</h1>
              <ColumnWrapper>
                <PokemonListHooks />
              </ColumnWrapper>
            </div>
            <div>
              <h1 className='text-lg'>Using React Query</h1>
              <ColumnWrapper>
                <PokemonListHooksQuery />
              </ColumnWrapper>
            </div>
          </div>
        </div>
        <DialogPortal dialogService={dialogService} />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
};

export default App;

