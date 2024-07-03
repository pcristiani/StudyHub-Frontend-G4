import React, { useState, useEffect, useContext } from 'react';
import Box from '@mui/joy/Box';
import IconButton from '@mui/joy/IconButton';
import Tooltip from '@mui/joy/Tooltip';
import Divider from '@mui/joy/Divider';
import FormControl from '@mui/joy/FormControl';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import Card from '@mui/joy/Card';
import Option from '@mui/joy/Option';
import Select from '@mui/joy/Select';
import { AuthContext } from '../../../context/AuthContext';
import { getCarreras } from '../../../services/requests/carreraService';
import { getAsignaturasDeCarrera, getCursadasPendientes, cambiarResultadoCursada } from '../../../services/requests/asignaturaService';
import Save from '@mui/icons-material/Save';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import Sheet from '@mui/joy/Sheet';
import Table from '@mui/joy/Table';
import { errors } from '../../../services/util/errors';
import { SelectProps } from '../../../components/common/SelectProps';
import PropTypes from 'prop-types';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import Link from '@mui/joy/Link';
import Autocomplete, { createFilterOptions } from '@mui/joy/Autocomplete';
import { visuallyHidden } from '@mui/utils';



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


export default function CalificacionesFinCurso() {
	const { user } = useContext(AuthContext);
	const [carreraData, setCarreraData] = useState([]);
	const [cursadasData, setCursadasData] = useState([]);
	const [asignaturaData, setAsignaturaData] = useState([]);
	const [error, setError] = useState(null);
	const [selectedCarrera, setSelectedCarrera] = useState('');
	const [selectedAsignatura, setSelectedAsignatura] = useState('');
	const [selectedAnio, setSelectedAnio] = useState('');
	const [order, setOrder] = useState('asc');
	const [orderBy, setOrderBy] = useState('idCursada');
	const [selected, setSelected] = useState([]);
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(5);
	const [filter, setFilter] = useState('');

	const [carrerasData, setCarrerasData] = useState([]);
	const [value, setValue] = useState(null);

	useEffect(() => {
		const fetchCarreras = async () => {
			try {
				const result = await getCarreras(user.jwtLogin);
				setCarreraData(result);
			} catch (error) {
				setError(error.message);
			}
		};
		fetchCarreras();
	}, [user]);

	useEffect(() => {
		if (carreraData) {
			// console.log("Carreras: ", carreraData);
		}
	}, [carreraData]);

	const handleChangeCarrera = (event, newValue) => {
		setSelectedCarrera(newValue);
		if (newValue !== null) {
			initAsignatura(newValue);
		}
	};

	async function initAsignatura(selectIdCarrera) {
		if (selectIdCarrera !== null && selectIdCarrera !== undefined && selectIdCarrera !== '') {
			let result = await getAsignaturasDeCarrera(selectIdCarrera, user.jwtLogin);
			setAsignaturaData(result);
			setCursadasData([]);
		}
	}

	// const eandleSubmit = async (event) => {
	// 	event.preventDefault();
	// 	const data = new FormData(event.currentTarget);
	// 	let idAsignatura = data.get('idasignatura');
	// 	let anioLectivo = parseInt(data.get('aniolectivo'), 10);

	// 	const resp = await getCursadasPendientes(idAsignatura, anioLectivo, user.jwtLogin);
	// 	if (resp.data.length === 0) {
	// 		let title = "Todos los estudiantes estan calificados!\n\n";
	// 		errors('', title, 400);
	// 	}

	// 	setCursadasData(resp.data);
	// };

	const handleChangeAnio = (event, newValue) => {
		// setSelectedAnio(newValue);
		// initPeriodo(newValue);
		if (newValue !== null && newValue !== undefined) {
			setSelectedAnio(newValue);
			initEstudiantesExamen(newValue);
		}
	};


	const handleChangeAsignatura = (event, newValue) => {
		if (newValue !== null && newValue !== undefined && newValue !== '') {
			setSelectedAsignatura(newValue);
			setCursadasData([]);
		}
	};


	async function initEstudiantesExamen(newValue) {
		let idAsignatura = selectedAsignatura;
		let anioLectivo = newValue;
		//handleChangePeriodo();
		if (idAsignatura !== null && idAsignatura !== undefined && idAsignatura !== '' && anioLectivo !== null && anioLectivo !== undefined && anioLectivo !== '') {
			const resul = await getCursadasPendientes(idAsignatura, anioLectivo, user.jwtLogin);
			setCursadasData([]);
			setCursadasData(resul.data);
		}
	};


	const handleModificar = async (idCursada, calificacion) => {
		if (idCursada !== null && idCursada !== undefined && calificacion !== null && calificacion !== undefined && calificacion !== 0) {
			const result = await cambiarResultadoCursada(idCursada, calificacion, user.jwtLogin);
			let title = "¡Calificación exitosa!\n\n";
			errors(title, result.data, result.status, false);
		}
	};

	const [year, setYear] = useState(new Date().getFullYear());
	const startYear = 2023;
	const endYear = new Date().getFullYear() + 1;
	const years = [];
	for (let i = startYear; i <= endYear; i++) {
		years.push(i);
	}

	const notas = [];
	for (let i = 1; i <= 12; i++) {
		notas.push(i);
	}
	const headCells = [
		{
			id: 'nombre',
			numeric: false,
			disablePadding: false,
			label: 'Nombre',
		},
		{
			id: 'calificacion',
			numeric: false,
			disablePadding: false,
			label: 'Calificación',
		},
		{
			id: '',
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
						<Typography level="body-sm" sx={{ textAlign: 'center' }} variant="plain" color="neutral" noWrap>Seleccionar carrera</Typography>
					) : ''}
					{numSelected > 1 ? (
						<Typography level="body-sm" sx={{ textAlign: 'center' }} variant="plain" color="danger" noWrap>Selecionar una carrera</Typography>
					) : ''}
				</Box>

				{numSelected === 1 ? (
					<>
						<Box sx={{ width: '100%', display: 'flex', justifyContent: 'flex-end', gap: 0.5 }}>
						</Box>
					</>
				) : (
					<>
						<Box sx={{ width: '100%', display: 'flex', justifyContent: 'flex-end', gap: 0.5 }}>						</Box>
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


	const handleRequestSort = (event, property) => {
		const isAsc = orderBy === property && order === 'asc';
		setOrder(isAsc ? 'desc' : 'asc');
		setOrderBy(property);
	};

	const handleSelectAllClick = (event) => {
		if (event.target.checked) {
			const newSelected = carrerasData.map((n) => n.idCursada);
			setSelected(newSelected);
			return;
		}
		setSelected([]);
	};

	const handleClick = (event, idCursada) => {
		const selectedIndex = selected.indexOf(idCursada);
		let newSelected = [];

		if (selectedIndex === -1) {
			newSelected = newSelected.concat(selected, idCursada);
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
	const isSelected = (idCursada) => selected.indexOf(idCursada) !== -1;
	const handleFilter = (nombreEstudiante) => setFilter(nombreEstudiante);
	const filteredUsers = filter ? cursadasData.filter((user) => user.nombreEstudiante === filter) : cursadasData;
	const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - filteredUsers.length) : 0;


	const handleAutocompleteChange = (event, newValue) => {
		setValue(newValue);
		setFilter(newValue ? newValue.nombreEstudiante : '');
	};
	const [open, setOpen] = React.useState(false);
	const [options, setOptions] = React.useState([]);
	const loading = open && options.length === 0;

	return (
		<Stack sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', width: '100%', alignItems: 'center' }}>
			<Card sx={{ display: 'flex', alignSelf: 'center', maxWidth: '620px' }}>
				<Box sx={{ margin: 0.6, alignSelf: 'center' }}>
					<Typography sx={{ textAlign: 'center' }} variant="plain" color="primary" noWrap>Registro de calificaciones de fin de curso</Typography>
				</Box>
				<Divider />
				<Stack direction="column" sx={{ display: { xs: 'flex', md: 'flex' }, alignSelf: 'center' }}>
					<FormControl sx={{ display: { sm: 'flex', md: 'flex', width: '340px' }, gap: 0.8 }}>
						<SelectProps size="sm" placeholder="Seleccionar carrera" id="idcarrera" name="idcarrera" onChange={handleChangeCarrera}>
							{carreraData.map((carrera, index) => (
								<Option key={index} value={carrera.idCarrera}>{carrera.nombre}</Option>
							))}
						</SelectProps>

						<SelectProps size="sm" placeholder="Seleccionar asignatura" id="idasignatura" name="idasignatura" required onChange={handleChangeAsignatura}>
							{Array.isArray(asignaturaData) && asignaturaData.map((asignatura, index) => (
								<Option key={index} value={asignatura.idAsignatura}>{asignatura.nombre}</Option>
							))}
						</SelectProps>

						<Stack direction="row" spacing={0.8} sx={{ justifyContent: 'right', zIndex: '1000' }}>
							<SelectProps size="sm" placeholder="Año lectivo" id="aniolectivo" name="aniolectivo" sx={{ width: '100%' }} required onChange={handleChangeAnio}>
								{years.map((year) => (
									<Option key={year} value={year}>{year}</Option>
								))}
							</SelectProps>
						</Stack>
					</FormControl>
				</Stack>
			</Card>

			<Divider sx={{ marginBottom: 2, marginTop: 1.5 }} />


			<section className="text-black body-font">
				<div>
					{cursadasData.length > 0 && (
						<Sheet variant="outlined"
							sx={{
								'--TableCell-height': '30px', '--TableHeader-height': 'calc(1 * var(--TableCell-height))',
								'--Table-firstColumnWidth': '130px', '--Table-lastColumnWidth': '80px', '--Table-lastColumnWidth2': '65px', '--Table-buttonColumnWidth': '45px', '--TableRow-hoverBackground': 'rgb(3, 202, 192, 0.30)',
								borderCollapse: 'separate', borderTopLeftRadius: '12px', borderTopRightRadius: '12px', borderBottomLeftRadius: '12px', borderBottomRightRadius: '12px', overflow: 'auto', cursor: 'pointer', maxWidth: '450px'
							}}>
							{/* <EnhancedTableToolbar numSelected={selected.length} onFilter={handleFilter} selected={selected} /> */}
							<Table hoverRow sx={{
								'--TableCell-headBackground': 'transparent',
								'--TableCell-selectedBackground': (theme) =>
									theme.vars.palette.success.softBg,
								'& thead th:nth-child(1)': { width: '50%', },
								'& thead th:nth-child(2)': { width: '20%', },
								'& tr > *:nth-child(n+3)': { width: '15%', textAlign: 'center' },
							}}>
								{/* <thead>
												<tr>
													<th style={{ width: 'var(--Table-firstColumnWidth)' }}>Nombre</th>
													<th style={{ width: 'var(--Table-lastColumnWidth)' }}>Calificacion</th>
													<th style={{ width: 'var(--Table-buttonColumnWidth)' }}></th>
												</tr>
											</thead> */}
								{/* <tbody>
												{stableSort(filteredUsers, getComparator(order, orderBy))
													.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
													.map((row, index) => {
														const labelId = `enhanced-table-checkbox-${index}`;

														const isItemSelected = isSelected(usuario.idUsuario);
														// {cursadasData.slice(0, 5).map((row) => (
														// 	row.rol !== 'E' && (

														<tr key={row.idCursada}>
															<td>{row.nombreEstudiante} {row.apellidoEstudiante}</td>
															<td>
																<Select size="sm" placeholder="0"   onChange={(event, newValue) => {
																		row.calificacion = newValue;
																	}}
																	id="idresultado" name="idresultado">{notas.map((nota) => (
																		<Option key={nota} value={nota}>{nota}</Option>
																	))}
																</Select>
															</td>
															<td>
																<Tooltip title="Guardar calificación">
																	<IconButton size="sm" sx={{ alignItems: 'right' }} variant="plain" color="neutral" onClick={() => handleModificar(row.idCursada, row.calificacion)}>
																		<Save size="sw"></Save>
																	</IconButton>
																</Tooltip>
															</td>
														</tr>
													)
													)}
													
												))}
												{emptyRows > 0 && (
													<tr style={{ height: 63 * emptyRows }}>
														<td colSpan={3} />
													</tr>
												)}
											</tbody> */}
								<EnhancedTableHead
									numSelected={selected.length}
									order={order}
									orderBy={orderBy}
									onSelectAllClick={handleSelectAllClick}
									onRequestSort={handleRequestSort}
									rowCount={cursadasData.length}
								/>
								<tbody>
									{stableSort(filteredUsers, getComparator(order, orderBy))
										.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
										.map((usuario, index) => {
											const isItemSelected = isSelected(usuario.idCursada);
											const labelId = `enhanced-table-checkbox-${index}`;

											return (
												<tr
													onClick={(event) => handleClick(event, usuario.idCursada)}
													role="checkbox"
													aria-checked={isItemSelected}
													tabIndex={-1}
													key={usuario.idCursada}
													selected={isItemSelected}
													style={
														isItemSelected
															? { '--TableCell-dataBackground': 'var(--TableCell-selectedBackground)', '--TableCell-headBackground': 'var(--TableCell-selectedBackground)', 'cursor': 'pointer' }
															: { 'cursor': 'pointer' }}>
													<th id={labelId} scope="row">
														{usuario.nombreEstudiante} {usuario.apellidoEstudiante}
													</th>
													<td>
														<Select size="sm" placeholder="0" onChange={(event, newValue) => setResultado(newValue)}
															id="idresultado" name="idresultado">{notas.map((nota) => (
																<Option key={nota} value={nota}>{nota}</Option>
															))}
														</Select>
													</td>

													<td>
														<Tooltip title="Guardar calificación">
															<IconButton size="sm" sx={{ alignItems: 'right' }} variant="plain" color="neutral" onClick={() => handleModificar(usuario.idCursada)}>
																<Save size="sw"></Save>
															</IconButton>
														</Tooltip>
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
														disabled={cursadasData.length !== -1 ? page >= Math.ceil(cursadasData.length / rowsPerPage) - 1 : false}
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
					)}
					{cursadasData.length === 0 && (
						<Box sx={{ margin: 0, alignSelf: 'center' }}>
							<Typography level="body-sm" sx={{ textAlign: 'center' }} variant="plain" color="warning" noWrap>
								No hay alumnos inscriptos</Typography>
						</Box>
					)}
				</div>
			</section>
		</Stack>
	);
};
