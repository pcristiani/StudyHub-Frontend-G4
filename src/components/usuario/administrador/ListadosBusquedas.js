import React, { useState, useEffect, useContext } from 'react';

import { AuthContext } from '../../../context/AuthContext';
import { getUsuarios } from '../../../services/requests/usuarioService';
import PropTypes from 'prop-types';
import Box from '@mui/joy/Box';
import Table from '@mui/joy/Table';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import Stack from '@mui/joy/Stack';
import IconButton from '@mui/joy/IconButton';
import Link from '@mui/joy/Link';
import Tooltip from '@mui/joy/Tooltip';
import AccountCircleOutlined from '@mui/icons-material/AccountCircleOutlined';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { visuallyHidden } from '@mui/utils';
import { formatoCi } from '../../../services/util/formatoCi';
import Autocomplete, { createFilterOptions } from '@mui/joy/Autocomplete';
import AutocompleteOption from '@mui/joy/AutocompleteOption';
import { URI_FRONT, redirigir } from '../../../services/util/constants';
import PostAddOutlinedIcon from '@mui/icons-material/PostAddOutlined';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import InsertChartOutlinedIcon from '@mui/icons-material/InsertChartOutlined';
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
    numeric: false,
    disablePadding: false,
    label: 'Cédula',
  },
  {
    id: 'rol',
    numeric: false,
    disablePadding: false,
    label: 'Rol',
  },
  {
    id: 'usuario',
    numeric: false,
    disablePadding: false,
    label: '',
  }
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


const handleAdd = (idUsuario) => {
  console.log('Agregar usuario con ID:', idUsuario);
};

const handleModificar = (idUsuario) => {
  redirigir(URI_FRONT.infoUsuarioUri + `?id=${idUsuario}`);
}

const handleActividades = (idUsuario) => {
  redirigir(URI_FRONT.resumenActividadUri + `?id=${idUsuario}`);
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
    <Box sx={{ display: 'flex', alignItems: 'center', py: 0.8, pl: { sm: 2 }, pr: { xs: 1, sm: 1 }, bgcolor: numSelected > 0 ? 'background.body' : 'background.body', borderTopLeftRadius: 'var(--unstable_actionRadius)', borderTopRightRadius: 'var(--unstable_actionRadius)' }} >

      <Box sx={{ alignSelf: 'center' }}>
        {numSelected === 1 ? (
          <Typography level="body-sm" sx={{ textAlign: 'center' }} variant="plain" color="success" noWrap>Opciones habilitadas</Typography>
        ) : ''}
        {numSelected === 0 ? (
          <Typography level="body-sm" sx={{ textAlign: 'center' }} variant="plain" color="neutral" noWrap>Seleccionar usuario</Typography>
        ) : ''}
        {numSelected > 1 ? (
          <Typography level="body-sm" sx={{ textAlign: 'center' }} variant="plain" color="danger" noWrap>Selecionar un usuario</Typography>
        ) : ''}
      </Box>

      {numSelected === 1 ? (
        <>
          <Box sx={{ width: '100%', display: 'flex', justifyContent: 'flex-end', gap: 0.5 }}>

            <Tooltip title="Alta funcionario/coordinador">
              <IconButton size="sm" variant="outlined" color="success" onClick={handleAlta}>

                <AddBoxOutlinedIcon />
              </IconButton>
            </Tooltip>

            <Tooltip title="Información">
              <IconButton size="sm" variant="outlined" color="success" onClick={() => handleModificar(selected[0])}>
                <DriveFileRenameOutlineOutlinedIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </>
      ) : (
        <>
          <Box sx={{ width: '100%', display: 'flex', justifyContent: 'flex-end', gap: 0.5 }}>
            <Tooltip title="Alta funcionario/coordinador">
              <IconButton size="sm" variant="outlined" color="neutral" onClick={() => handleAlta} disabled>

                <AddBoxOutlinedIcon />
              </IconButton>
            </Tooltip>

            <Tooltip title="Información">
              <IconButton size="sm" variant="outlined" color="neutral" onClick={() => handleModificar(selected[0])} disabled>
                <DriveFileRenameOutlineOutlinedIcon />
              </IconButton>
            </Tooltip>
          </Box>
          {/* <IconButton size="sm" variant="outlined" color="neutral" onClick={handleClick}>
            <FilterListIcon />
          </IconButton>
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
            <MenuItem onClick={() => onFilter('La duración de la carrera será de 2 años')}>2 años de duración</MenuItem>
            <MenuItem onClick={() => onFilter('La duración de la carrera será de 3 años')}>3 años de duración</MenuItem>
            <MenuItem onClick={() => onFilter('La duración de la carrera será de 4 años')}>4 años de duración</MenuItem>
            <MenuItem onClick={() => onFilter('')}>Todas las carreras</MenuItem>
          </Menu> */}
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



///

export default function ListadosBusquedas() {
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('idUsuario');
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [filter, setFilter] = useState('');

  const [usuariosData, setUsuariosData] = useState([]);
  const { user } = useContext(AuthContext);
  const [value, setValue] = useState(null);

  useEffect(() => {
    async function fetchUsuarios() {
      const usuarios = await getUsuarios(user.jwtLogin);
      if (usuarios !== undefined) {
        setUsuariosData(usuarios);
      }
    }
    fetchUsuarios();
  }, []);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = usuariosData.map((n) => n.idUsuario);
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
        selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
  };


  const handleChangePage = (newPage) => setPage(newPage);
  const isSelected = (idUsuario) => selected.indexOf(idUsuario) !== -1;
  const handleFilter = (nombre) => setFilter(nombre);
  const filteredUsers = filter ? usuariosData.filter((user) => user.nombre === filter) : usuariosData;
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
      <Stack sx={{ marginTop: 3, display: 'flex', flexDirection: 'column', width: '100%', alignItems: 'center' }}>
        <Autocomplete
          sx={{ display: 'flex', alignItems: 'center', width: '100%', maxWidth: '550px', zIndex: '1000' }}
          placeholder="Filtrar por usuario"
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
              {option.nombre} {option.apellido}
            </AutocompleteOption>
          )}
        />
      </Stack>
      <Stack direction="row" sx={{ marginTop: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', }} spacing={2}>
        <Sheet variant="outlined" sx={{ boxShadow: 'sm', borderRadius: 'sm', minHeight: '10vh', maxWidth: '550px', zIndex: '1000' }}>
          <EnhancedTableToolbar numSelected={selected.length} onFilter={handleFilter} selected={selected} />

          <Table aria-labelledby="tableTitle" hoverRow
            sx={{
              '--TableCell-headBackground': 'transparent',
              '--TableCell-selectedBackground': (theme) =>
                theme.vars.palette.success.softBg,
              '& thead th:nth-child(1)': { width: '40%', }, '& thead th:nth-child(2)': { width: '20%', }, '& tr > *:nth-child(n+3)': { width: '20%', textAlign: 'center' }, zIndex: '1000'
            }}>
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={usuariosData.length}
            />
            <tbody>
              {stableSort(filteredUsers, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((usuario, index) => {
                  const isItemSelected = isSelected(usuario.idUsuario);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <tr
                      onClick={(event) => handleClick(event, usuario.idUsuario)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={usuario.idUsuario}
                      selected={isItemSelected}
                      style={
                        isItemSelected
                          ? { '--TableCell-dataBackground': 'var(--TableCell-selectedBackground)', '--TableCell-headBackground': 'var(--TableCell-selectedBackground)', 'cursor': 'pointer' }
                          : { 'cursor': 'pointer' }
                      }>
                      <th id={labelId} scope="row">
                        {usuario.nombre} {usuario.apellido}
                      </th>
                      <td>{formatoCi(usuario.cedula)}</td>
                      <td>{usuario.rol === "F" ? 'Funcionario' : usuario.rol === "C" ? 'Coordinador' : usuario.rol === "E" ? 'Estudiante' : usuario.rol === "A" ? 'Administrador' : ''}
                      </td>
                      <td>
                        <Tooltip title="Resumen de actividad">
                          <IconButton size="sm" variant="plain" color="primary" onClick={() => handleActividades(usuario.idUsuario)}>
                            <InsertChartOutlinedIcon />
                          </IconButton>
                        </Tooltip>

                        <Tooltip title="Información">
                          <IconButton size="sm" variant="plain" color="primary" onClick={() => handleModificar(usuario.idUsuario)}>
                            <AccountCircleOutlined />
                          </IconButton>
                        </Tooltip>
                      </td>
                    </tr>
                  );
                })}
              {emptyRows > 0 && (
                <tr style={{ height: 63 * emptyRows }}>
                  <td colSpan={6} />
                </tr>
              )}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={6}>
                  <Box sx={{ width: '100%', display: 'flex', alignItems: 'right', justifyContent: 'flex-end' }}>
                    <Box sx={{ width: '20%', display: 'flex', gap: 0.5, justifyContent: 'flex-end' }}>
                      <IconButton size="sm" color="neutral"
                        variant="outlined" disabled={page === 0}
                        onClick={() => handleChangePage(page - 1)}
                        sx={{ bgcolor: 'background.surface' }}>
                        <KeyboardArrowLeftIcon />
                      </IconButton>
                      <IconButton size="sm" color="neutral" variant="outlined"
                        disabled={usuariosData.length !== -1 ? page >= Math.ceil(usuariosData.length / rowsPerPage) - 1 : false}
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
