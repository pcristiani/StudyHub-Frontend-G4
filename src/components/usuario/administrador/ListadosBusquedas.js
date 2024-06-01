import React, { useState, useEffect, useContext } from 'react';

import { AuthContext } from '../../../context/AuthContext';
import { getUsuarios } from '../../../services/requests/usuarioService';

import PropTypes from 'prop-types';
import Box from '@mui/joy/Box';
import Table from '@mui/joy/Table';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import Checkbox from '@mui/joy/Checkbox';
import IconButton from '@mui/joy/IconButton';
import Link from '@mui/joy/Link';
import Tooltip from '@mui/joy/Tooltip';
import Button from '@mui/joy/Button';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { visuallyHidden } from '@mui/utils';
import { Menu, MenuItem } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import Autocomplete, { createFilterOptions } from '@mui/joy/Autocomplete';
import AutocompleteOption from '@mui/joy/AutocompleteOption';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { AdbOutlined, AddBox } from '@mui/icons-material';


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
    numeric: true,
    disablePadding: false,
    label: 'Nombre',
  },
  {
    id: 'cedula',
    numeric: true,
    disablePadding: true,
    label: 'Cédula',
  },
  {
    id: 'rol',
    numeric: false,
    disablePadding: true,
    label: 'Rol',
  },
  {
    id: 'opciones',
    numeric: false,
    disablePadding: false,
    label: '',
  }
];

function EnhancedTableHead(props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
    props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <thead>
      <tr>
        <th>
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            slotProps={{ input: { 'aria-label': 'select all desserts', }, }}
            sx={{ verticalAlign: 'sub' }}
          />
        </th>
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
                  '& svg': {
                    transition: '0.2s',
                    transform: active && order === 'desc' ? 'rotate(0deg)' : 'rotate(180deg)',
                  },
                  '&:hover': { '& svg': { opacity: 1 } },
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


function EnhancedTableToolbar(props) {
  const [anchorEl, setAnchorEl] = useState(null);
  const { numSelected, onFilter } = props;
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleAdd = () => {

    console.log('Agregar');
  }



  return (
    <Box sx={{ display: 'flex', alignItems: 'center', py: 1, pl: { sm: 2 }, pr: { xs: 1, sm: 1 }, bgcolor: numSelected > 0 ? 'background.level1' : 'transparent', borderTopLeftRadius: 'var(--unstable_actionRadius)', borderTopRightRadius: 'var(--unstable_actionRadius)' }}>
      {numSelected > 0 ? (
        <Typography sx={{ flex: '1 1 100%' }} component="div">{numSelected} seleccionado</Typography>
      ) : (
        <Typography level="body-lg" sx={{ flex: '1 1 100%' }} id="tableTitle" component="div">Usuarios</Typography>
      )}
      {numSelected > 0 ? (
        <>
          <Box sx={{ width: '100%', display: 'flex', justifyContent: 'flex-end', gap: 0.6 }}>


            <Tooltip title="Delete">
              <IconButton size="sm" color="danger" variant="solid" onClick={handleAdd}>
                <AddBox />
              </IconButton>
            </Tooltip>

            <Tooltip title="Add">
              <IconButton size="sm" color="primary" variant="solid">
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </>
      ) : (
        <>
          <IconButton size="sm" variant="outlined" color="neutral" onClick={handleClick}>
            <FilterListIcon />
          </IconButton>
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
            <MenuItem onClick={() => onFilter('C')}>Coordinador</MenuItem>
            <MenuItem onClick={() => onFilter('F')}>Funcionario</MenuItem>
            <MenuItem onClick={() => onFilter('A')}>Administrador</MenuItem>
            <MenuItem onClick={() => onFilter('E')}>Estudiante</MenuItem>
            <MenuItem onClick={() => onFilter('')}>Todos</MenuItem>
          </Menu>
        </>
      )}
    </Box>
  );
}


EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onFilter: PropTypes.func.isRequired,
};


export default function TableSortAndSelection() {
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('nombre');
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [filter, setFilter] = useState('');
  const [filter2, setFilter2] = useState('');

  const [asignaturasCarreraData, setAsignaturasCarreraData] = useState([]);
  const { user } = useContext(AuthContext);
  const [value, setValue] = React.useState(null);

  useEffect(() => {
    const fetchCarreras = async () => {
      try {
        const result = await getUsuarios(user.jwtLogin);
        setAsignaturasCarreraData(result);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCarreras();
  }, [user]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = asignaturasCarreraData.map((n) => n.idUsuario);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, idUsuario) => {
    const selectedIndex = selected.indexOf(idUsuario);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, idUsuario);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    setSelected(newSelected);
  };


  const handleChangePage = (newPage) => setPage(newPage);
  const isSelected = (nombre) => selected.indexOf(nombre) !== -1;
  const handleFilter = (nombre) => setFilter(nombre);
  const filteredUsers = filter ? asignaturasCarreraData.filter((user) => user.nombre === filter) : asignaturasCarreraData;
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - filteredUsers.length) : 0;

  const handleAutocompleteChange = (event, newValue) => {
    setValue(newValue);
    setFilter(newValue ? newValue.nombre : '');
  };


  return (
    <Sheet variant="outlined" sx={{ width: '100%', boxShadow: 'sm', borderRadius: 'sm', minHeight: '20vh', maxWidth: '600px' }}>
      <EnhancedTableToolbar numSelected={selected.length} onFilter={handleFilter} />
      <Table aria-labelledby="tableTitle" hoverRow
        sx={{
          '--TableCell-headBackground': 'transparent',
          '--TableCell-selectedBackground': (theme) => theme.vars.palette.success.softBg,
          '& thead th:nth-child(1)': { width: '40px', },
          '& thead th:nth-child(2)': { width: '30%', },
          '& tr > *:nth-child(n+3)': { textAlign: 'right' },
        }}>
        <EnhancedTableHead
          numSelected={selected.length}
          order={order}
          orderBy={orderBy}
          onSelectAllClick={handleSelectAllClick}
          onRequestSort={handleRequestSort}
          rowCount={asignaturasCarreraData.length} />
        <tbody>
          {stableSort(filteredUsers, getComparator(order, orderBy))
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row, index) => {
              const isItemSelected = isSelected(row.idUsuario);
              const labelId = `enhanced-table-checkbox-${index}`;

              return (
                <tr onClick={(event) => handleClick(event, row.idUsuario)} role="checkbox"
                  aria-checked={isItemSelected} tabIndex={-1} key={row.idUsuario} selected={isItemSelected}>
                  <th scope="row">
                    <Checkbox
                      checked={isItemSelected}
                      slotProps={{ input: { 'aria-labelledby': labelId, }, }}
                      sx={{ verticalAlign: 'top' }} />
                  </th>
                  <th id={labelId} scope="row">
                    {row.nombre} {row.apellido}
                  </th>
                  <td>{row.cedula}</td>
                  <td>{row.rol === "F" ? 'Funcionario' : row.rol === "C" ? 'Coordinador' : row.rol === "E" ? 'Estudiante' : row.rol === "A" ? 'Administrador' : ''}</td>
                  <td>
                    <Box sx={{ display: 'flex-end', gap: 0 }}>
                      <Button size="small" variant="plain" color="primary">
                        {/* </Button> 'onClick={() => handleModificar(row.idUsuario)}'> */}
                        <Tooltip title="Ver más" variant="plain" color="primary">
                          <OpenInNewIcon />
                        </Tooltip>
                      </Button>
                    </Box>
                  </td>
                </tr>
              );
            })}
          {emptyRows > 0 && (
            <tr style={{ height: 53 * emptyRows }}>
              <td colSpan={5} />
            </tr>
          )}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={5}>
              <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'flex', }}>
                <Autocomplete
                  sx={{ width: '100%' }}
                  placeholder="Filtrar por nombre"
                  options={filteredUsers}
                  getOptionLabel={(option) => option.nombre}
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
                      {option.nombre} {option.apellido}
                    </AutocompleteOption>
                  )}
                />
                <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'flex-end', }}>
                  <IconButton size="sm" color="neutral" variant="outlined" disabled={page === 0}
                    onClick={() => handleChangePage(page - 1)} sx={{ bgcolor: 'background.surface' }}>
                    <KeyboardArrowLeftIcon />
                  </IconButton>
                  <IconButton size="sm" color="neutral" variant="outlined"
                    disabled={asignaturasCarreraData.length !== -1 ? page >= Math.ceil(asignaturasCarreraData.length / rowsPerPage) - 1 : false}
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
  );
}
