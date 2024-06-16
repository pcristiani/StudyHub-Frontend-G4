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
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { visuallyHidden } from '@mui/utils';
import { Menu, MenuItem } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { formatoCi } from '../../../services/util/formatoCi';
import FilterListIcon from '@mui/icons-material/FilterList';
import Autocomplete, { createFilterOptions } from '@mui/joy/Autocomplete';
import AutocompleteOption from '@mui/joy/AutocompleteOption';
import { AddBox } from '@mui/icons-material';
import { URI_FRONT, redirigir } from '../../../services/util/constants';
import ToggleOffOutlinedIcon from '@mui/icons-material/ToggleOffOutlined';
import ToggleOnOutlinedIcon from '@mui/icons-material/ToggleOnOutlined';
import Button from '@mui/joy/Button';
import DriveFileRenameOutlineOutlinedIcon from '@mui/icons-material/DriveFileRenameOutlineOutlined';

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
    id: 'cedula',
    numeric: true,
    disablePadding: false,
    label: 'Cédula',
  },
  {
    id: 'rol',
    numeric: false,
    disablePadding: false,
    label: 'Rol',
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
        <th>
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount} onChange={onSelectAllClick}
            slotProps={{ input: { 'aria-label': 'select all desserts' } }} sx={{ verticalAlign: 'sub' }}
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

const handleAdd = (idUsuario) => {
  console.log('Agregar usuario con ID:', idUsuario);
};

const handleModificar = (idUsuario) => {
  redirigir(URI_FRONT.modificarFuncionarioUri + `?id=${idUsuario}`);
}

const handleAlta = () => {
  redirigir(URI_FRONT.altaFuncionarioCoordinadorUri);
}

function EnhancedTableToolbar(props) {
  const [anchorEl, setAnchorEl] = useState(null);
  const { numSelected, onFilter, selected } = props;
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  console.log("s: ", anchorEl);
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', py: 0.8, pl: { sm: 2 }, pr: { xs: 1, sm: 1 }, bgcolor: numSelected > 0 ? 'background.level1' : 'transparent', borderTopLeftRadius: 'var(--unstable_actionRadius)', borderTopRightRadius: 'var(--unstable_actionRadius)' }}>
      {numSelected > 0 ? (
        <Typography sx={{ flex: '1 1 100%' }} component="div">{numSelected} seleccionado</Typography>
      ) : (
        <Typography level="body-lg" sx={{ flex: '1 1 100%' }} id="tableTitle" component="div">Usuarios</Typography>
      )}
      {numSelected > 0 ? (
        <>
          <Box sx={{ width: '100%', display: 'flex', justifyContent: 'flex-end', gap: 0.5 }}>
            <Tooltip title="Alta funcionario/coordinador">
              <IconButton size="sm" color="neutral" variant="outlined" onClick={() => handleAlta()}>
                <AddBox />
              </IconButton>
            </Tooltip>

            <Tooltip title="Modificar">
              <IconButton size="sm" variant="outlined" color="neutral" onClick={() => handleModificar(selected[0])}>
                <DriveFileRenameOutlineOutlinedIcon />
              </IconButton>
            </Tooltip>

            <Tooltip title="Borrar">
              <IconButton size="sm" variant="outlined" color="neutral" onClick={() => handleAdd(selected[0])}>
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
  selected: PropTypes.array.isRequired,
};

export default function ListadosBusquedas() {
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('nombre');
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [filter, setFilter] = useState('');

  const [asignaturasCarreraData, setAsignaturasCarreraData] = useState([]);
  const { user } = useContext(AuthContext);
  const [value, setValue] = useState(null);

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
    console.log("newSelected: ", newSelected);
  };

  const handleChangePage = (newPage) => setPage(newPage);
  const isSelected = (idUsuario) => selected.indexOf(idUsuario) !== -1;
  const handleFilter = (nombre) => setFilter(nombre);
  const filteredUsers = filter ? asignaturasCarreraData.filter((user) => user.nombre === filter) : asignaturasCarreraData;
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - filteredUsers.length) : 0;

  const handleAutocompleteChange = (event, newValue) => {
    setValue(newValue);
    setFilter(newValue ? newValue.nombre : '');
  };

  return (
    <Sheet variant="outlined" sx={{ marginTop: 6, boxShadow: 'sm', borderRadius: 'sm', minHeight: '10vh', maxWidth: '600px' }}>
      <EnhancedTableToolbar numSelected={selected.length} onFilter={handleFilter} selected={selected} />
      <Table aria-labelledby="tableTitle" hoverRow
        sx={{
          '--TableCell-headBackground': 'transparent', '--TableCell-selectedBackground': (theme) => theme.vars.palette.success.softBg,
          '& thead th:nth-child(1)': { width: '40px' }, '& thead th:nth-child(2)': { width: '35%' },
        }}>
        <EnhancedTableHead
          numSelected={selected.length}
          order={order}
          orderBy={orderBy}
          onSelectAllClick={handleSelectAllClick}
          onRequestSort={handleRequestSort}
          rowCount={asignaturasCarreraData.length}
        />
        <tbody>
          {stableSort(filteredUsers, getComparator(order, orderBy))
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row, index) => {
              const isItemSelected = isSelected(row.idUsuario);
              const labelId = `enhanced-table-checkbox-${index}`;

              return (
                <tr
                  onClick={(event) => handleClick(event, row.idUsuario)}
                  role="checkbox"
                  aria-checked={isItemSelected}
                  tabIndex={-1}
                  key={row.idUsuario}
                  selected={isItemSelected}
                >
                  <th scope="row">
                    <Checkbox
                      checked={isItemSelected}
                      slotProps={{ input: { 'aria-labelledby': labelId } }}
                      sx={{ verticalAlign: 'top' }}
                    />
                  </th>
                  <th id={labelId} scope="row">
                    {row.nombre} {row.apellido}
                  </th>
                  <td>{formatoCi(row.cedula)}</td>
                  <td>{row.rol === "F" ? 'Funcionario' : row.rol === "C" ? 'Coordinador' : row.rol === "E" ? 'Estudiante' : row.rol === "A" ? 'Administrador' : ''}</td>
                </tr>
              );
            })}
          {emptyRows > 0 && (
            <tr style={{ height: 63 * emptyRows }}>
              <td colSpan={4} />
            </tr>
          )}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={4}>
              <Box sx={{ width: '100%', display: 'flex', alignItems: 'center' }}>
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
                <Box sx={{ width: '20%', display: 'flex', alignItems: 'center', gap: 0.5, justifyContent: 'flex-end' }}>
                  <IconButton size="sm" color="neutral"
                    variant="outlined" disabled={page === 0}
                    onClick={() => handleChangePage(page - 1)}
                    sx={{ bgcolor: 'background.surface' }}>
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
