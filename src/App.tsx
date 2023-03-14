import './App.css';
import PokemonListRedux from './components/PokemonList/PokemonListRedux';
import DialogPortal, { DialogService } from './components/DialogPortal';

const App: React.FC = () => {
  const dialogService = DialogService.getInstance();

  return (
    <>
      <div className="flex flex-col justify-center">
        <h1 className='text-2xl'>Pokémon API</h1>
        <div className="container grid gap-4 lg:grid-cols-1">
          <div>
            <h1 className='text-lg'>State is using Redux</h1>
            <PokemonListRedux />
          </div>
        </div>
      </div>
      <DialogPortal dialogService={dialogService} />
    </>
  );
};

export default App;

