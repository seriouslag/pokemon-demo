import { DataGrid } from '@mui/x-data-grid';
import { Skeleton } from '@mui/material';
import { getPokemonCount, getPokemonPage } from '../../selectors/pokemon';
import { fetchPokemonList, setLimit } from '../../actions/pokemon';
import { connect } from 'react-redux';
import { useEffect } from 'react';
import { DialogService } from '../DialogPortal';
import PokemonViewerRedux from '../PokemonViewer/PokemonViewerRedux';

const PokemonListRedux = ({
  isLoading,
  pokemon,
  error,
  page,
  limit,
  onPageChange,
  count,
  fetchPokemonList,
  setLimit,
}) => {

  useEffect(() => {
    fetchPokemonList(limit, page * limit);
  }, []);

  const columns = [
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
        onPageChange={(newPage) => onPageChange(newPage, limit)}
        onPageSizeChange={(newPageSize) => setLimit(newPageSize)}
        disableSelectionOnClick
        onRowClick={(params) => {
          DialogService.getInstance().setDialog({
            type: 'openModal',
            title: `${params.row.name} Details`,
            modal: <PokemonViewerRedux name={params.row.name} />,
          });
        }}
      />
    </div>
  );
};

const mapState = (state) => ({
  isLoading: state.pokemon.loading,
  pokemon: state.pokemon.pokemon,
  error: state.pokemon.error,
  offset: state.pokemon.offset,
  limit: state.pokemon.limit,
  page: getPokemonPage(state),
  count: getPokemonCount(state),
});

const mapDispatch = (dispatch) => ({
  fetchPokemonList: (limit, offset) => dispatch(fetchPokemonList(limit, offset)),
  setLimit: (limit) => dispatch(setLimit(limit)),
  onPageChange: (newPage, limit) => dispatch(fetchPokemonList(limit, newPage * limit)),
});

export default connect(mapState, mapDispatch)(PokemonListRedux);

