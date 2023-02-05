import { useEffect, useState } from 'react'
import './App.css'
import { clientFromContext, ListResponse } from '@myapi/api-pokemon';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Skeleton } from '@mui/material';

function App() {

  const pokemonApiContext = clientFromContext({ baseUrl: 'https://pokeapi.co/api' });

  const [pokemonList, setPokemonList] = useState<ListResponse>();
  const [isLoading, setIsLoading] = useState(false);
  const [limit, setLimit] = useState(100);
  const [offset, setOffset] = useState(100);
  const [error, setError] = useState<unknown>();

  const [pokemon, setPokemon] = useState<{
    id: number;
    name: string;
    img: string;
    isLoading: boolean;
  }[]>([]);

  const fetchPokemonList = async (limit: number, offset: number) => {
    setIsLoading(true);
    setError(undefined);
    setOffset(offset);
    setLimit(limit);
    try {
      const pokemonList = await pokemonApiContext.pokemon.pokemonList({ limit, offset });
      setPokemonList(pokemonList);

      const poke = pokemonList.results.map((pokemon, index) => ({
        id: offset + index + 1,
        name: pokemon.name,
        img: '',
        isLoading: true
      }));

      setPokemon(poke);

      const promises = poke.map(async (pokemon, index) => {
        const pokeId = pokemon.id;
        const pokemonDetail = await pokemonApiContext.pokemon.pokemonRead({ name: pokemon.name });
        const foundPokemon = poke.findIndex((pokemon) => pokemon.id === pokeId);
        if (foundPokemon < 0) {
          return;
        } 
        const newPokemon = [...poke];
        newPokemon[index].img = pokemonDetail.sprites.front_default ?? '';
        newPokemon[index].isLoading = false;
        setPokemon(newPokemon);
      });
      await Promise.all(promises);
    } catch (e) {
      setError(e);
    } finally {
      setIsLoading(false);
    }
  };

  const onPageChange = async (newPage: number) => {
    await fetchPokemonList(limit, newPage * limit);
  };

  useEffect(() => {
    if (!pokemonList && !isLoading) {
      console.log('fetching', isLoading);
      fetchPokemonList(limit, offset);
    }
  }, []);

  useEffect(() => {
    console.log('pokemon', pokemon)
  }, [pokemon]);

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Name', width: 130 },
    { field: 'img', headerName: 'Image', width: 100, renderCell: (params) => {
      if (!params.value) {
        return <Skeleton variant="rectangular" width={100} height={100} />
      }
      return <img src={params.value} alt={params.row.name} />
    }
     }
  ];

  const rowCount = pokemonList?.count ?? 0;

  if (error) {
    return <div>Something went wrong</div>
  }

  return (
    <div className="App">
      <div style={{ height: 600}}>
        <DataGrid
          rowHeight={100}
          rows={pokemon}
          rowCount={rowCount}
          columns={columns}
          page={offset / limit}
          pageSize={limit}
          pagination={true}
          paginationMode={'server'}
          loading={isLoading}
          onPageChange={(newPage) => onPageChange(newPage)}
          onPageSizeChange={(newPageSize) => setLimit(newPageSize)}
          disableSelectionOnClick
        />
      </div>
    </div>
  )
}

export default App
