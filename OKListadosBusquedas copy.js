import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext';
import { getUsuarios } from '../../../services/requests/usuarioService';

import PropTypes from 'prop-types';
import Box from '@mui/joy/Box';
import Table from '@mui/joy/Table';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import Checkbox from '@mui/joy/Checkbox';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import IconButton from '@mui/joy/IconButton';
import Tooltip from '@mui/joy/Tooltip';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';

import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { visuallyHidden } from '@mui/utils';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import ListDivider from '@mui/joy/ListDivider';
import MoreVert from '@mui/icons-material/MoreVert';
import Edit from '@mui/icons-material/Edit';
import DeleteForever from '@mui/icons-material/DeleteForever';
import { Menu, MenuItem } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';

const headCells = [
  { id: 'nombre', numeric: true, disablePadding: false, label: 'Nombre' },
  { id: 'cedula', numeric: true, disablePadding: true, label: 'Cédula' },
  { id: 'rol', numeric: false, disablePadding: true, label: 'Rol' }
];

function EnhancedTableHead(props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = (property) => (event) => onRequestSort(event, property);

  return (
    <thead>
      <tr>
        <th>
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            slotProps={{ input: { 'aria-label': 'select all desserts' } }}
            sx={{ verticalAlign: 'sub' }}
          />
        </th>
        {headCells.map((headCell) => (
          <th key={headCell.id} aria-sort={orderBy === headCell.id ? (order === 'asc' ? 'ascending' : 'descending') : undefined}>
            <Typography
              component="button"
              onClick={createSortHandler(headCell.id)}
              sx={{ fontWeight: 'lg', display: 'flex', alignItems: 'center', cursor: 'pointer' }}
            >
              {headCell.label}
              <ArrowDownwardIcon sx={{ opacity: orderBy === headCell.id ? 1 : 0, transition: '0.2s', transform: orderBy === headCell.id && order === 'desc' ? 'rotate(0deg)' : 'rotate(180deg)' }} />
            </Typography>
          </th>
        ))}
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
  const { numSelected, onFilter } = props;
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', py: 1, pl: { sm: 2 }, pr: { xs: 1, sm: 1 }, bgcolor: numSelected > 0 ? 'background.level1' : 'transparent', borderTopLeftRadius: 'var(--unstable_actionRadius)', borderTopRightRadius: 'var(--unstable_actionRadius)' }}>
      {numSelected > 0 ? (
        <Typography sx={{ flex: '1 1 100%' }} component="div">{numSelected} selected</Typography>
      ) : (
        <Typography level="body-lg" sx={{ flex: '1 1 100%' }} id="tableTitle" component="div">Usuarios</Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton size="sm" color="danger" variant="solid">
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <>
          <IconButton size="sm" variant="outlined" color="neutral" onClick={handleClick}>
            <FilterListIcon />
          </IconButton>
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
            <MenuItem onClick={() => onFilter('Coordinador')}>Coordinador</MenuItem>
            <MenuItem onClick={() => onFilter('Funcionario')}>Funcionario</MenuItem>
            <MenuItem onClick={() => onFilter('Administrador')}>Administrador</MenuItem>
            <MenuItem onClick={() => onFilter('Estudiante')}>Estudiante</MenuItem>
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
  const [asignaturasCarreraData, setAsignaturasCarreraData] = useState([]);

  const { user } = useContext(AuthContext);

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
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
  };

  const handleChangePage = (newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => setRowsPerPage(parseInt(event.target.value, 10));

  const isSelected = (nombre) => selected.indexOf(nombre) !== -1;

  const handleFilter = (rol) => setFilter(rol);

  const filteredUsers = filter ? asignaturasCarreraData.filter((user) => user.rol === filter) : asignaturasCarreraData;

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - filteredUsers.length) : 0;

  return (
    <Sheet variant="outlined" sx={{ width: '100%', boxShadow: 'sm', borderRadius: 'sm', minHeight: '20vh', maxWidth: '600px' }}>
      <EnhancedTableToolbar numSelected={selected.length} onFilter={handleFilter} />
      <Table aria-labelledby="tableTitle" hoverRow sx={{ '--TableCell-headBackground': (theme) => theme.vars.palette.background.level1, '--Table-headerUnderlineThickness': '1px', '--TableRow-hoverBackground': (theme) => theme.vars.palette.background.level1 }}>
        <EnhancedTableHead numSelected={selected.length} order={order} orderBy={orderBy} onSelectAllClick={handleSelectAllClick} onRequestSort={handleRequestSort} rowCount={filteredUsers.length} />
        <tbody>
          {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
            const isItemSelected = isSelected(row.idUsuario);
            const labelId = `enhanced-table-checkbox-${index}`;

            return (
              <tr key={row.idUsuario} onClick={(event) => handleClick(event, row.idUsuario)} aria-checked={isItemSelected} tabIndex={-1} role="checkbox" selected={isItemSelected}>
                <td>
                  <Checkbox color={isItemSelected ? 'primary' : 'neutral'} checked={isItemSelected} slotProps={{ input: { 'aria-labelledby': labelId } }} sx={{ verticalAlign: 'sub' }} />
                </td>
                <td>{row.nombre}</td>
                <td>{row.cedula}</td>
                <td>{row.rol}</td>
              </tr>
            );
          })}
          {emptyRows > 0 && (
            <tr style={{ height: 53 * emptyRows }}>
              <td colSpan={6} />
            </tr>
          )}
        </tbody>
      </Table>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, justifyContent: 'flex-end', p: 2 }}>
        <FormControl orientation="horizontal" size="sm">
          <FormLabel>Rows per page:</FormLabel>
          <Select onChange={handleChangeRowsPerPage} value={rowsPerPage}>
            {[5, 10, 25].map((rows) => (
              <Option key={rows} value={rows}>
                {rows}
              </Option>
            ))}
          </Select>
        </FormControl>
        <Typography textAlign="center" sx={{ minWidth: 80 }}>{`Page: ${page + 1} of ${Math.ceil(filteredUsers.length / rowsPerPage)}`}</Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <IconButton size="sm" color="neutral" variant="outlined" onClick={() => handleChangePage(Math.max(page - 1, 0))} disabled={page === 0}>
            <KeyboardArrowLeftIcon />
          </IconButton>
          <IconButton size="sm" color="neutral" variant="outlined" onClick={() => handleChangePage(Math.min(page + 1, Math.ceil(filteredUsers.length / rowsPerPage) - 1))} disabled={page >= Math.ceil(filteredUsers.length / rowsPerPage) - 1}>
            <KeyboardArrowRightIcon />
          </IconButton>
        </Box>
      </Box>
    </Sheet>
  );
}
