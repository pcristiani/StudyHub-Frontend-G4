import React, { useState, useEffect, useContext } from 'react';

import { AuthContext } from '../../../context/AuthContext';
import { getResumenActivida } from '../../../services/requests/usuarioService';
import PropTypes from 'prop-types';
import Box from '@mui/joy/Box';
import Table from '@mui/joy/Table';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import Stack from '@mui/joy/Stack';
import IconButton from '@mui/joy/IconButton';
import Link from '@mui/joy/Link';
import Menu from '@mui/joy/Menu';
import MenuItem from '@mui/joy/MenuItem';
import FilterListIcon from '@mui/icons-material/FilterList';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { visuallyHidden } from '@mui/utils';
import { createFilterOptions } from '@mui/joy/Autocomplete';
import { useLocation } from 'react-router-dom';
import { errors } from '../../../services/util/errors';
import { useNavigate } from 'react-router-dom';
import Dropdown from '@mui/joy/Dropdown';
import { formatFecha } from '../../../services/util/formatoFecha';

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
    id: 'accion',
    numeric: false,
    disablePadding: false,
    label: 'Acción',
  },
  {
    id: 'fechahora',
    numeric: false,
    disablePadding: false,
    label: 'FechaHora',
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

function EnhancedTableToolbar(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { numSelected, onFilter, selected } = props;
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };


  return (
    <Box sx={{ display: 'flex', alignItems: 'center', py: 0.8, pl: { sm: 2 }, pr: { xs: 1, sm: 1 }, bgcolor: numSelected > 0 ? 'background.body' : 'background.body', borderTopLeftRadius: 'var(--unstable_actionRadius)', borderTopRightRadius: 'var(--unstable_actionRadius)' }} >
      <Box sx={{ alignSelf: 'center' }}>
        <Typography level="body-sm" sx={{ textAlign: 'center' }} variant="plain" color="primary" noWrap>Resumen de Actividades</Typography>
      </Box>
      <>
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'flex-end', gap: 0.5 }}>
          <Dropdown>
            <IconButton size="sm" variant="outlined" color="neutral" onClick={handleClick}>
              <FilterListIcon />
            </IconButton>
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose} >
              <MenuItem onClick={() => { onFilter('Cambiar Resultado de Cursada'); handleClose(); }}>Cambiar Resultado de Cursada</MenuItem>
              <MenuItem onClick={() => { onFilter('Cierre de sesion'); handleClose(); }}>Cierre de sesion</MenuItem>
              <MenuItem onClick={() => { onFilter('Inicio de sesion'); handleClose(); }}>Inicio de sesion</MenuItem>
              <MenuItem onClick={() => { onFilter('Inscripción a Examen'); handleClose(); }}>Inscripción a Examen</MenuItem>
              <MenuItem onClick={() => { onFilter('Inscripción en Asignatura'); handleClose(); }}>Inscripción en Asignatura</MenuItem>
              <MenuItem onClick={() => { onFilter('Registro de Asignatura a Período de Examen'); handleClose(); }}>Registro a Período de Examen</MenuItem>
              <MenuItem onClick={() => { onFilter(''); handleClose(); }}>Mostrar todo</MenuItem>
            </Menu>
          </Dropdown>
        </Box>
      </>
    </Box>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onFilter: PropTypes.func.isRequired,
  selected: PropTypes.array.isRequired,
};

export function ResumenActividad() {
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('accion');
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [filter, setFilter] = useState('');
  const history = useNavigate();

  const [actividadData, setActividadData] = useState([]);
  const { user } = useContext(AuthContext);
  const [value, setValue] = useState(null);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const idU = queryParams.get('id');


  useEffect(() => {
    async function fetchActividad() {
      const actividad = await getResumenActivida(idU, user.jwtLogin);
      if (actividad.status === 200) {
        setActividadData(actividad.data);
      } else {
        errors(actividad.data, actividad.data, actividad.status);
        history('/dashboard-admin?id=l');
      }
    }
    fetchActividad();
  }, []);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = actividadData.map((n) => n.idUsuario);
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
  const handleFilter = (accion) => setFilter(accion);
  const filteredUsers = filter ? actividadData.filter((user) => user.accion === filter) : actividadData;
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - filteredUsers.length) : 0;

  const handleAutocompleteChange = (event, newValue) => {
    setValue(newValue);
    setFilter(newValue ? newValue.accion : '');
  };

  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const loading = open && options.length === 0;

  return (
    <>
      <Stack direction="row" sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', }} spacing={2}>
        <Sheet variant="outlined" sx={{ boxShadow: 'sm', borderRadius: 'sm', minHeight: '10vh', maxWidth: '520px' }}>
          <EnhancedTableToolbar numSelected={selected.length} onFilter={handleFilter} selected={selected} />
          <Table aria-labelledby="tableTitle" hoverRow
            sx={{
              '--TableCell-headBackground': 'transparent', 'cursor': 'pointer',
              '--TableCell-selectedBackground': (theme) =>
                theme.vars.palette.success.softBg,
              '& thead th:nth-child(1)': { width: '48%', },
              '& thead th:nth-child(2)': { width: '25%', },
              '& tr > *:nth-child(n+3)': { width: '15%', textAlign: 'center' },
            }}>
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={actividadData.length}
            />
            <tbody>
              {stableSort(filteredUsers, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((actividad, index) => {
                  const isItemSelected = isSelected(actividad.idUsuario);
                  const labelId = `enhanced-table-checkbox-${index}`;
                  return (
                    <tr
                      onClick={(event) => handleClick(event, actividad.idUsuario)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={actividad.idUsuario}
                      selected={isItemSelected}>
                      <th id={labelId} scope="row">
                        {actividad.accion}
                      </th>
                      <td>{formatFecha(actividad.fechaHora)}</td>
                    </tr>
                  );
                })}
              {emptyRows > 0 && (
                <tr style={{ height: 63 * emptyRows }}>
                  <td colSpan={2} />
                </tr>
              )}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={2}>
                  <Box sx={{ width: '100%', display: 'flex', alignItems: 'right', justifyContent: 'flex-end' }}>
                    <Box sx={{ width: '20%', display: 'flex', gap: 0.5, justifyContent: 'flex-end' }}>
                      <IconButton size="sm" color="neutral"
                        variant="outlined" disabled={page === 0}
                        onClick={() => handleChangePage(page - 1)}
                        sx={{ bgcolor: 'background.surface' }}>
                        <KeyboardArrowLeftIcon />
                      </IconButton>
                      <IconButton size="sm" color="neutral" variant="outlined"
                        disabled={actividadData.length !== -1 ? page >= Math.ceil(actividadData.length / rowsPerPage) - 1 : false}
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

// function formatFecha(data) {
//   let fechaExamen = new Date(data);
//   const year = fechaExamen.getFullYear();
//   const month = String(fechaExamen.getMonth() + 1).padStart(2, '0'); // Los meses empiezan en 0
//   const day = String(fechaExamen.getDate()).padStart(2, '0');
//   const hours = String(fechaExamen.getHours()).padStart(2, '0');
//   const minutes = String(fechaExamen.getMinutes()).padStart(2, '0');
//   return `${day}/${month}/${year} - ${hours}:${minutes} hs`;
// }