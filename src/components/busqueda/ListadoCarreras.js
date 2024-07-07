import React, { useState, useEffect, useContext } from 'react';

import { AuthContext } from '../../context/AuthContext';
import { getCarreras } from '../../services/requests/carreraService';
import PropTypes from 'prop-types';
import Box from '@mui/joy/Box';
import Table from '@mui/joy/Table';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import Stack from '@mui/joy/Stack';
import IconButton from '@mui/joy/IconButton';
import Link from '@mui/joy/Link';
import Tooltip from '@mui/joy/Tooltip';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { visuallyHidden } from '@mui/utils';
import Autocomplete, { createFilterOptions } from '@mui/joy/Autocomplete';
import AutocompleteOption from '@mui/joy/AutocompleteOption';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import PostAddOutlinedIcon from '@mui/icons-material/PostAddOutlined';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import { URI_FRONT, redirigir } from '../../services/util/constants';
import DriveFileRenameOutlineOutlinedIcon from '@mui/icons-material/DriveFileRenameOutlineOutlined';
import InsertChartOutlinedIcon from '@mui/icons-material/InsertChartOutlined';
import AccountCircleOutlined from '@mui/icons-material/AccountCircleOutlined';
const filters = createFilterOptions();

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: 'nombre',
    numeric: false,
    disablePadding: false,
    label: 'Nombre',
  },
  {
    id: 'descripcion',
    numeric: false,
    disablePadding: true,
    label: 'Duración',
  },
  {
    id: 'asignaturas',
    numeric: false,
    disablePadding: false,
    label: '',
  },
];

function EnhancedTableHead(props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <thead>
      <tr>
        {headCells.map((headCell) => {
          const active = orderBy === headCell.id;
          return (
            <th key={headCell.id} aria-sort={active ? { asc: 'ascending', desc: 'descending' }[order] : undefined}>
              <Link underline="none" color="neutral" textColor={active ? 'primary.plainColor' : undefined}
                component="button" onClick={createSortHandler(headCell.id)} fontWeight="lg"
                startDecorator={
                  headCell.numeric ? (
                    <ArrowDownwardIcon sx={{ opacity: active ? 1 : 0 }} />
                  ) : null
                }
                endDecorator={
                  !headCell.numeric ? (
                    <ArrowDownwardIcon sx={{ opacity: active ? 1 : 0 }} />
                  ) : null
                }
                sx={{
                  '& svg': { transition: '0.2s', transform: active && order === 'desc' ? 'rotate(0deg)' : 'rotate(180deg)', }, '&:hover': { '& svg': { opacity: 1 } },
                }}>
                {headCell.label}
                {active ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </Box>
                ) : null}
              </Link>
            </th>
          );
        })}
      </tr>
    </thead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const handleInfoCarreras = (idCarrera) => {
  console.log('Agregar carrera con ID:', idCarrera);
  redirigir(URI_FRONT.InfoCarrerasUri + `?id=${idCarrera}`);

};

const handleModificar = (idCarrera) => {
  redirigir(URI_FRONT.listadoAsignaturasUri + `?id=${idCarrera}`);
  //redirigir(URI_FRONT.listadoAsignaturasUri);

}

const handleAlta = () => {
  redirigir(URI_FRONT.altaFuncionarioCoordinadorUri);
}

function EnhancedTableToolbar(props) {
  const [anchorEl, setAnchorEl] = useState(null);
  const { numSelected, onFilter, selected } = props;
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', py: 1, pl: { sm: 2 }, pr: { xs: 1, sm: 1 }, bgcolor: numSelected > 0 ? 'background.body' : 'background.body', borderTopLeftRadius: 'var(--unstable_actionRadius)', borderTopRightRadius: 'var(--unstable_actionRadius)' }} >

      <Box sx={{ alignSelf: 'center' }}>
        {numSelected === 1 ? (
          <Typography level="body-sm" sx={{ textAlign: 'center' }} variant="plain" color="success" noWrap>Opciones habilitadas</Typography>
        ) : ''}
        {numSelected === 0 ? (
          <Typography level="label-md" sx={{ textAlign: 'center' }} variant="plain" color="primary" noWrap>Carreras</Typography>
        ) : ''}
        {numSelected > 1 ? (
          <Typography level="body-sm" sx={{ textAlign: 'center' }} variant="plain" color="danger" noWrap>Selecionar una carrera</Typography>
        ) : ''}
      </Box>

    </Box>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onFilter: PropTypes.func.isRequired,
  selected: PropTypes.array.isRequired,
};


export default function ListadoCarreras() {
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('idCarrera');
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [filter, setFilter] = useState('');

  const [carrerasData, setCarrerasData] = useState([]);
  const { user } = useContext(AuthContext);
  const [value, setValue] = useState(null);

  useEffect(() => {
    async function fetchCarreras() {
      const carreras = await getCarreras(user.jwtLogin);
      if (carreras !== undefined) {
        setCarrerasData(carreras);
      }
    }
    fetchCarreras();
  }, []);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = carrerasData.map((n) => n.idCarrera);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, idCarrera) => {
    const selectedIndex = selected.indexOf(idCarrera);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, idCarrera);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
  };


  const handleChangePage = (newPage) => setPage(newPage);
  const isSelected = (idUsuario) => selected.indexOf(idUsuario) !== -1;
  const handleFilter = (nombre) => setFilter(nombre);
  const filteredUsers = filter ? carrerasData.filter((user) => user.nombre === filter) : carrerasData;
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - filteredUsers.length) : 0;

  const handleAutocompleteChange = (event, newValue) => {
    setValue(newValue);
    setFilter(newValue ? newValue.nombre : '');
  };
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const loading = open && options.length === 0;
  return (
    <>
      <Stack direction="row" sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', }} spacing={2}>
        <Autocomplete
          sx={{ display: 'flex', alignItems: 'center', width: '100%', maxWidth: '520px' }}
          placeholder="Filtrar por carrera"
          autoSelect={true}
          autoHighlight={true}
          getOptionLabel={(option) => option.nombre}
          options={filteredUsers}
          onChange={handleAutocompleteChange}
          value={value}
          filterOptions={(options, params) => {
            const filtered = filters(options, params);
            const { inputValue } = params;
            const isExisting = options.some((option) => inputValue === option.nombre);
            if (inputValue !== '' && !isExisting) {
              filtered.push({ nombre: inputValue });
            }
            return filtered;
          }}
          renderOption={(props, option) => (
            <AutocompleteOption {...props} key={option.nombre}>
              {option.nombre}
            </AutocompleteOption>
          )}
        />
      </Stack>
      <Stack direction="row" sx={{ marginTop: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', }} spacing={2}>
        <Sheet variant="outlined" sx={{ boxShadow: 'sm', borderRadius: 'sm', minHeight: '10vh', maxWidth: '520px' }}>
          <EnhancedTableToolbar numSelected={selected.length} onFilter={handleFilter} selected={selected} />

          <Table aria-labelledby="tableTitle" hoverRow
            sx={{
              cursor: 'pointer',
              '--TableRow-hoverBackground': 'rgb(3, 87, 4, 0.20)',
              '--TableCell-headBackground': 'transparent',
              borderCollapse: 'separate', borderSpacing: '0', borderTopLeftRadius: '10px', borderTopRightRadius: '10px', borderBottomLeftRadius: '10px', borderBottomRightRadius: '10px', overflow: 'auto',
              '& thead th:nth-child(1)': { width: '68%', },
              '& thead th:nth-child(2)': { width: '15%' },
              '& tr > *:nth-child(n+3)': { width: '11%', textAlign: 'center' },
            }}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={carrerasData.length}
            />
            <tbody>
              {stableSort(filteredUsers, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((carrera, index) => {
                  const isItemSelected = isSelected(carrera.idCarrera);
                  const labelId = `enhanced-table-checkbox-${index}`;
                  return (
                    <tr
                      //   onClick={() => handleModificar(carrera.idCarrera)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={carrera.idCarrera}
                      selected={isItemSelected}
                    // style={
                    //   isItemSelected ? { backgroundColor: 'var(--TableRow-selectedBackground)' } : { backgroundColor: 'var(--TableRow-hoverBackground)' }
                    // }
                    >

                      <th id={labelId} scope="row" onClick={() => handleInfoCarreras(carrera.idCarrera)}>
                        {carrera.nombre}
                      </th>
                      <td onClick={() => handleInfoCarreras(carrera.idCarrera)}> {carrera.duracion} años</td>
                                            <td onClick={() => handleModificar(carrera.idCarrera)}>
                        <IconButton size="sm" variant="plain" color="success">
                          <ChevronRightRoundedIcon onClick={() => handleModificar(carrera.idCarrera)} />
                        </IconButton>
                      </td>
                    </tr>
                  );
                })}
              {emptyRows > 0 && (
                <tr style={{ height: 63 * emptyRows }}>
                  <td colSpan={3} />
                </tr>
              )}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={3}>
                  <Box sx={{ width: '100%', display: 'flex', alignItems: 'right', justifyContent: 'flex-end' }}>
                    <Box sx={{ width: '20%', display: 'flex', gap: 0.5, justifyContent: 'flex-end' }}>
                      <IconButton size="sm" color="neutral"
                        variant="outlined" disabled={page === 0}
                        onClick={() => handleChangePage(page - 1)}
                        sx={{ bgcolor: 'background.surface' }}>
                        <KeyboardArrowLeftIcon />
                      </IconButton>
                      <IconButton size="sm" color="neutral" variant="outlined"
                        disabled={carrerasData.length !== -1 ? page >= Math.ceil(carrerasData.length / rowsPerPage) - 1 : false}
                        onClick={() => handleChangePage(page + 1)}
                        sx={{ bgcolor: 'background.surface' }}>
                        <KeyboardArrowRightIcon />
                      </IconButton>
                    </Box>
                  </Box>
                </td>
              </tr>
            </tfoot>
          </Table>
        </Sheet>
      </Stack>
    </>

  );
}




// export default function GitHubTooltip() {
//   return (
//     <Tooltip
//       placement="top-end"
//       variant="outlined"
//       arrow
//       title={
//         <Box
//           sx={{
//             display: 'flex',
//             flexDirection: 'column',
//             maxWidth: 320,
//             justifyContent: 'center',
//             p: 1,
//           }}
//         >
//           <Typography
//             fontSize="sm"
//             textColor="grey"
//             startDecorator={
//               <Link
//                 underline="always"
//                 href="#common-examples"
//                 color="neutral"
//                 fontSize="sm"
//               >
//                 mui/material-ui
//               </Link>
//             }
//           >
//             on Feb 25
//           </Typography>
//           <Box sx={{ display: 'flex', gap: 1, width: '100%', mt: 1 }}>
//             <AdjustIcon color="success" />
//             <div>
//               <Typography fontWeight="lg" fontSize="sm">
//                 [system] grey is no more recognized as color with the sx prop
//               </Typography>
//               <Typography textColor="text.secondary" fontSize="sm" sx={{ mb: 1 }}>
//                 Duplicates I have searched the existing issues Latest version I have
//                 tested the …
//               </Typography>
//               <Chip size="sm" color="danger" sx={{ fontWeight: 'lg' }}>
//                 bug 🐛
//               </Chip>
//               <Chip size="sm" color="primary" sx={{ ml: 1, fontWeight: 'lg' }}>
//                 package: system
//               </Chip>
//             </div>
//           </Box>
//         </Box>
//       }
//     >
//       <Link
//         href="#common-examples"
//         underline="none"
//         startDecorator={<AdjustIcon color="success" />}
//         sx={{ fontWeight: 'lg' }}
//       >
//         [system] grey is no more recognized as color with the sx prop
//       </Link>
//     </Tooltip>
//   );
// }
