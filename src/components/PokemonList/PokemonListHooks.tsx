import { DataGrid, GridColDef, GridRowParams } from '@mui/x-data-grid';
import { Skeleton } from '@mui/material';
import { usePokemon } from '../../hooks/usePokemon';
import { DialogService } from '../DialogPortal';
import PokemonViewer from '../PokemonViewer/PokemonViewer';
import { Pokemon } from '@myapi/api-pokemon';

const PokemonListHooks: React.FC = () => {

  const {
    isLoading,
    pokemon,
    error,
    page,
    limit,
    onPageChange,
    setLimit,
    count,
  } = usePokemon({
    limit: 100,
    offset: 0,
  });

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Name', width: 130 },
    {
      field: 'img', headerName: 'Image', width: 100, renderCell: (params) => {
        if (!params.value) {
          return <Skeleton variant="rectangular" width={100} height={100} />;
        }
        return <img src={params.value} alt={params.row.name} width={100} height={100} />;
      },
    }
  ];

  if (error) {
    return <div>Something went wrong</div>;
  }

  return (
    <div style={{ height: 600 }}>
      <DataGrid
        rowHeight={100}
        rows={pokemon}
        rowCount={count}
        columns={columns}
        page={page}
        pageSize={limit}
        pagination={true}
        paginationMode={'server'}
        loading={isLoading}
        onPageChange={(newPage) => onPageChange(newPage)}
        onPageSizeChange={(newPageSize) => setLimit(newPageSize)}
        disableSelectionOnClick
        onRowClick={(params: GridRowParams<{
          id: number;
          name: string;
          img: string;
          isLoading: boolean;
          value: Pokemon;
        }>) => {
          const foundPokemon = pokemon.find((p) => p.id === params.row.id);
          DialogService.getInstance().setDialog({
            type: 'openModal',
            title: `${params.row.name} Details`,
            modal: <PokemonViewer pokemon={foundPokemon} isLoading={false} />,
          });
        }}
      />
    </div>
  );
};

export default PokemonListHooks;
