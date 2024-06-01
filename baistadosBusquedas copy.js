import React, { useState, useEffect, useContext } from 'react';
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
import Link from '@mui/joy/Link';
import Tooltip from '@mui/joy/Tooltip';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';

import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { visuallyHidden } from '@mui/utils';
// import Menu, { menuClasses } from '@mui/joy/Menu';
// import MenuItem from '@mui/joy/MenuItem';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import ListDivider from '@mui/joy/ListDivider';
import MoreVert from '@mui/icons-material/MoreVert';
import Edit from '@mui/icons-material/Edit';
import DeleteForever from '@mui/icons-material/DeleteForever';
import MenuButton from '@mui/joy/MenuButton';
import Dropdown from '@mui/joy/Dropdown';
import {  Menu, MenuItem } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { Anchor } from 'react-bootstrap';
function createData(nombre, calories, fat) {
	return { nombre, calories, fat };
}

const rows = [
	createData('Cupcake', 305, 3.7),
	createData('Donut', 452, 25.0),
	createData('Eclair', 262, 16.0),
	createData('Frozen yoghurt', 159, 6.0),
];

const DatosRol = [
	{ cod: 'C', rol: `Coordinador` },
	{ cod: 'F', rol: `Funcionario` },
	{ cod: 'A', rol: `Administrador` },
	{ cod: 'E', rol: `Estudiante` },
];

function labelDisplayedRows({ from, to, count }) {
	return `${from}–${to} de ${count !== -1 ? count : `more than ${to}`}`;
}

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
							{/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
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


function EnhancedTableToolbar(open, onOpen, ...props) {
	const [anchorEl, setAnchorEl] = useState(null);
	const [filter, setFilter] = useState('');
	const [asignaturasCarreraData, setAsignaturasCarreraData] = useState([]);
	const history = useNavigate();
	const [error, setError] = useState(null);
	const [value, setValue] = React.useState(null);
	const [dataBaja, setDataBaja] = useState([]);
	const { user } = useContext(AuthContext);

	useEffect(() => {
		const fetchCarreras = async () => {
			try {
				const result = await getUsuarios(user.jwtLogin);
				setAsignaturasCarreraData(result);
			} catch (error) {
				setError(error.message);
			}
		};
		fetchCarreras();
	}, [user]);

	useEffect(() => {
		if (asignaturasCarreraData) {
			console.log("Carreras: ", asignaturasCarreraData);
		}
	}, [asignaturasCarreraData]);


	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	
	const handleClose = () => {
		console.log("Click", open);
		setAnchorEl(null);
	};

	const handleFilter = (rol) => {

		setFilter(rol);
		handleClose();
	};

	const filteredUsers = filter ? asignaturasCarreraData.filter(user => user.rol === filter) : asignaturasCarreraData;


	const { numSelected } = props;
	const isOnButton = React.useRef(false);
	const internalOpen = React.useRef(open);

	const handleButtonKeyDown = (event) => {
		internalOpen.current = open;
		if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
			event.preventDefault();
			onOpen(event);
		}
	};

	return (
		<Box sx={{
			display: 'flex', alignItems: 'center', py: 1, pl: { sm: 2 }, pr: { xs: 1, sm: 1 },
			...(numSelected > 0 && { bgcolor: 'background.level1', }),
			borderTopLeftRadius: 'var(--unstable_actionRadius)',
			borderTopRightRadius: 'var(--unstable_actionRadius)',
		}}>
			{numSelected > 0 ? (
				<Typography sx={{ flex: '1 1 100%' }} component="div">
					{numSelected} selected
				</Typography>
			) : (
				<Typography level="body-lg" sx={{ flex: '1 1 100%' }} id="tableTitle" component="div">
					Usuarios
				</Typography>
			)}

			{numSelected > 0 ? (
				<Tooltip title="Delete">
					<IconButton size="sm" color="danger" variant="solid">
						<DeleteIcon />
					</IconButton>
				</Tooltip>
			) : (

				// <IconButton size="sm" variant="outlined" color="neutral">
				// 	<FilterListIcon />
				// </IconButton>
				<>
					<IconButton size="sm" variant="outlined" color="neutral" onClick={handleFilter}>
						<FilterListIcon />
					</IconButton>
					<Menu
						anchorEl={anchorEl}
						open={Boolean(anchorEl)}
						onClose={handleClose}
					>
							<MenuItem onClick={handleClose}>Filter Option 1</MenuItem>
							<MenuItem onClick={() => handleFilter('Coordinador')}>Editor</MenuItem>
						<MenuItem onClick={handleClose}>Filter Option 2</MenuItem>
						<MenuItem onClick={handleClose}>Filter Option 3</MenuItem>
					</Menu>
				</>


			)}
		</Box>
	);
}

EnhancedTableToolbar.propTypes = {
	numSelected: PropTypes.number.isRequired,
};

export default function TableSortAndSelection() {
	const [order, setOrder] = React.useState('asc');
	const [orderBy, setOrderBy] = React.useState('calories');
	const [selected, setSelected] = React.useState([]);
	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(5);

	const [open, setOpen] = React.useState(true);

	const { user } = useContext(AuthContext);
	const [asignaturasCarreraData, setAsignaturasCarreraData] = useState([]);
	const history = useNavigate();
	const [error, setError] = useState(null);
	const [value, setValue] = React.useState(null);
	const [dataBaja, setDataBaja] = useState([]);

	useEffect(() => {
		const fetchCarreras = async () => {
			try {
				const result = await getUsuarios(user.jwtLogin);
				setAsignaturasCarreraData(result);
			} catch (error) {
				setError(error.message);
			}
		};
		fetchCarreras();
	}, [user]);

	useEffect(() => {
		if (asignaturasCarreraData) {
			console.log("Carreras: ", asignaturasCarreraData);
		}
	}, [asignaturasCarreraData]);

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

	const handleChangePage = (newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event, newValue) => {
		setRowsPerPage(parseInt(newValue.toString(), 10));
		setPage(0);
	};

	const getLabelDisplayedRowsTo = () => {
		if (asignaturasCarreraData.length === -1) {
			return (page + 1) * rowsPerPage;
		}
		return rowsPerPage === -1 ? asignaturasCarreraData.length : Math.min(asignaturasCarreraData.length, (page + 1) * rowsPerPage);
	};

	const isSelected = (nombre) => selected.indexOf(nombre) !== -1;

	// Evite un salto de diseño cuando llegue a la última página con filas vacías.
	const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - asignaturasCarreraData.length) : 0;

	return (
		<Sheet variant="outlined" sx={{ width: '100%', boxShadow: 'sm', borderRadius: 'sm', minHeight: '20vh', maxWidth: '600px' }}>

			<EnhancedTableToolbar numSelected={selected.length} />
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
					rowCount={asignaturasCarreraData.length}
				/>
				<tbody>
					{stableSort(asignaturasCarreraData, getComparator(order, orderBy))
						.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
						.map((row, index) => {
							const isItemSelected = isSelected(row.idUsuario);
							const labelId = `enhanced-table-checkbox-${index}`;

							return (
								<tr onClick={(event) => handleClick(event, row.idUsuario)} role="checkbox"
									aria-checked={isItemSelected} tabIndex={-1} key={row.idUsuario} selected={isItemSelected}
									style={
										isItemSelected
											? {
												'--TableCell-dataBackground': 'var(--TableCell-selectedBackground)',
												'--TableCell-headBackground': 'var(--TableCell-selectedBackground)',
											}
											: {}
									}								>
									<th scope="row">
										<Checkbox
											checked={isItemSelected}
											slotProps={{ input: { 'aria-labelledby': labelId, }, }}
											sx={{ verticalAlign: 'top' }} />
									</th>
									<th id={labelId} scope="row">
										{row.nombre}
										{/* //{row.apellido} */}
									</th>
									<td>{row.cedula}</td>
									<td>{row.rol === "F" ? 'Funcionario' : row.rol === "C" ? 'Coordinador' : row.rol === "E" ? 'Estudiante' : ''}</td>

									{/* <td>{row.rol}</td> */}
								</tr>
							);
						})}
					{emptyRows > 0 && (
						<tr
							style={{
								height: `calc(${emptyRows} * 40px)`,
								'--TableRow-hoverBackground': 'transparent',
							}}>
							<td colSpan={4} aria-hidden />
						</tr>
					)}
				</tbody>
				<tfoot>
					<tr>
						<td colSpan={4}>
							<Box sx={{ display: 'flex', alignItems: 'center', gap: 2, justifyContent: 'flex-end', }}>
								<FormControl orientation="horizontal" size="sm">
									<FormLabel>Filas por página:</FormLabel>
									<Select onChange={handleChangeRowsPerPage} value={rowsPerPage}>
										<Option value={5}>5</Option>
										<Option value={10}>10</Option>
										<Option value={25}>25</Option>
									</Select>
								</FormControl>
								<Typography textAlign="center" sx={{ minWidth: 80 }}>
									{labelDisplayedRows({
										from: asignaturasCarreraData.length === 0 ? 0 : page * rowsPerPage + 1,
										to: getLabelDisplayedRowsTo(),
										count: asignaturasCarreraData.length === -1 ? -1 : asignaturasCarreraData.length,
									})}
								</Typography>
								<Box sx={{ display: 'flex', gap: 1 }}>
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
