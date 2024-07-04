import React, { useState, useEffect, useContext } from 'react';
import Box from '@mui/joy/Box';
import Divider from '@mui/joy/Divider';
import FormControl from '@mui/joy/FormControl';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import Card from '@mui/joy/Card';
import Option from '@mui/joy/Option';
import { AuthContext } from '../../../context/AuthContext';
import { getCarreras } from '../../../services/requests/carreraService';
import PropTypes from 'prop-types';
import Table from '@mui/joy/Table';
import Sheet from '@mui/joy/Sheet';
import IconButton from '@mui/joy/IconButton';
import Link from '@mui/joy/Link';
import Tooltip from '@mui/joy/Tooltip';
import { cambiarResultadoExamen, getExamenesAsignaturaPorAnio, getCursadasExamen } from '../../../services/requests/examenService';
import { getAsignaturasDeCarreraConExamen } from '../../../services/requests/asignaturaService';
import { errors } from '../../../services/util/errors';
import { Save } from '@mui/icons-material';
import { SelectProps } from '../../common/SelectProps';
import PostAddOutlinedIcon from '@mui/icons-material/PostAddOutlined';

// 15.0

export default function CalificacionesExamen() {
	const { user } = useContext(AuthContext);
	const [carreraData, setCarreraData] = useState([]);
	const [cursadasData, setCursadasData] = useState([]);
	const [asignaturaData, setAsignaturaData] = useState([]);
	const [usuarioData, setUsuarioData] = useState([]);
	const [error, setError] = useState(null);
	const [selectedCarrera, setSelectedCarrera] = useState('');
	const [selectedAsignatura, setSelectedAsignatura] = useState('');
	const [selectedAnio, setSelectedAnio] = useState('');
	const [calificaciones, setCalificaciones] = useState({});


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
							<Tooltip title="Ver información">
								{/* <IconButton size="sm" variant="outlined" color="success" onClick={() => handleInfoCarreras(selected[0])}>
									<PostAddOutlinedIcon />
								</IconButton> */}
							</Tooltip>
						</Box>
					</>
				) : (
					<>
						<Box sx={{ width: '100%', display: 'flex', justifyContent: 'flex-end', gap: 0.5 }}>
							<Tooltip title="Ver información">
								<IconButton size="sm" variant="outlined" color="neutral" disabled>
									<PostAddOutlinedIcon />
								</IconButton>
							</Tooltip>

						</Box>

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


	const handleChangeCarrera = (event, newValue) => {
		if (newValue !== null && newValue !== undefined && newValue !== '') {
			setSelectedCarrera(newValue);
			initAsignatura(newValue);
		}
	};

	async function initAsignatura(selecIdCarrera) {
		if (selecIdCarrera !== null && selecIdCarrera !== undefined && selecIdCarrera !== '') {
			let result = await getAsignaturasDeCarreraConExamen(selecIdCarrera, user.jwtLogin);
			setAsignaturaData(result.body);
		}
	}

	const handleChangeAsignatura = (event, newValue) => {
		setUsuarioData([]);
		if (newValue !== null && newValue !== undefined && newValue !== '') {
			setSelectedAsignatura(newValue);
		}
	};

	const handleChangeAnio = (event, newValue) => {
		if (newValue !== null && newValue !== undefined) {
			setSelectedAnio(newValue);
			initPeriodo(newValue);
		}
	};

	async function initPeriodo(newValue) {
		let idAsignatura = selectedAsignatura;
		let anioLectivo = newValue;
		setUsuarioData([]);
		handleChangePeriodo();
		if (idAsignatura !== null && idAsignatura !== undefined && idAsignatura !== '' && anioLectivo !== null && anioLectivo !== undefined && anioLectivo !== '') {
			let resul = await getExamenesAsignaturaPorAnio(idAsignatura, anioLectivo, user.jwtLogin);
			setCursadasData(resul.data);
		}
	};

	const handleChangePeriodo = (event, idExamen) => {
		if (idExamen !== null && idExamen !== undefined && idExamen !== '') {
			setUsuarioData([]);
			getInfoUsuarios(idExamen);
		}
	};

	async function getInfoUsuarios(idExamen) {
		if (idExamen !== null && idExamen !== undefined && idExamen !== '') {
			let result = await getCursadasExamen(idExamen, user.jwtLogin);
			setUsuarioData(result);
		}
	}

	const handleCalificacionChange = (idCursadaExamen, newValue) => {
		setCalificaciones((prevCalificaciones) => ({
			...prevCalificaciones,
			[idCursadaExamen]: newValue,
		}));
	};

	const handleGuardarTodas = async () => {
		for (const [idCursadaExamen, calificacion] of Object.entries(calificaciones)) {
			if (calificacion !== null && calificacion !== undefined && calificacion !== 0) {
				let result = await cambiarResultadoExamen(idCursadaExamen, calificacion, user.jwtLogin);
				let title = "¡Calificación exitosa!\n\n";
				errors(title, '', result.status, false);
			}
		}
	};


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


	const [year, setYear] = useState(new Date().getFullYear());
	const startYear = 2023;
	const endYear = new Date().getFullYear() + 1;
	const years = [];
	for (let i = startYear; i <= endYear; i++) {
		years.push(i);
	}

	function formatFecha(data) {
		let fechaExamen = new Date(data);
		const year = fechaExamen.getFullYear();
		const month = String(fechaExamen.getMonth() + 1).padStart(2, '0');
		const day = String(fechaExamen.getDate()).padStart(2, '0');
		const hours = String(fechaExamen.getHours()).padStart(2, '0');
		const minutes = String(fechaExamen.getMinutes()).padStart(2, '0');
		const seconds = String(fechaExamen.getSeconds()).padStart(2, '0');
		return `${day}/${month}/${year} - ${hours}:${minutes} hs`;
	}

	const notas = [];
	for (let i = 1; i <= 12; i++) {
		notas.push(i);
	}


	return (
		<Box component="form" sx={{ marginTop: 6, display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }} >
			<Card sx={{ display: 'flex', alignSelf: 'center', zIndex: '1000', height: '100%' }}>
				<Box sx={{ margin: 0.6, alignSelf: 'center' }}>
					<Typography sx={{ textAlign: 'center' }} variant="plain" color="primary" noWrap>Registro de calificaciones de examen</Typography>
				</Box>
				<Divider />
				<Stack direction="column" sx={{ display: { xs: 'flex', md: 'flex' }, alignSelf: 'center' }}>
					<FormControl sx={{ display: { sm: 'flex', md: 'flex', width: '340px' }, gap: 0.8 }}>
						<SelectProps size="sm" placeholder="Seleccionar carrera" id="idcarrera" name="idcarrera" onChange={handleChangeCarrera}>
							{carreraData.map((carrera, index) => (
								<Option key={index} value={carrera.idCarrera}>{carrera.nombre}</Option>
							))}
						</SelectProps>

						<SelectProps size="sm" placeholder="Seleccionar asignatura" id="idasignatura" name="idasignatura" onChange={handleChangeAsignatura}>
							{Array.isArray(asignaturaData) && asignaturaData.map((asignatura, index) => (
								<Option key={index} value={asignatura.idAsignatura}>{asignatura.nombre}</Option>
							))}
						</SelectProps>

						<Stack direction="row" spacing={0.8} sx={{ zIndex: '1000', width: '100%' }}>
							<SelectProps size="sm" placeholder="Año lectivo" id="aniolectivo" name="aniolectivo" sx={{ width: '60%' }} required onChange={handleChangeAnio}>
								{years.map((year) => (
									<Option key={years} value={year}>{year}</Option>
								))}
							</SelectProps>
							<SelectProps sx={{ width: '100%' }} size="sm" placeholder="Seleccionar fecha" id="idperiodo" name="idperiodo" onChange={handleChangePeriodo}>
								{Array.isArray(cursadasData) && cursadasData.map((cursada, index) => (
									<Option fullWidth key={index} value={cursada.idExamen}>{formatFecha(cursada.fechaHora)}</Option>
								))}
							</SelectProps>
						</Stack>

						<Divider sx={{ marginBottom: 0.5, marginTop: 0.5 }} />

						<section className="text-black body-font">
							<div>
								{usuarioData.length > 0 && (
									<Sheet
										sx={{
											'--TableCell-height': '20px', '--TableHeader-height': 'calc(1 * var(--TableCell-height))',
											maxHeight: 220, overflow: 'auto', background: 'none', msOverflowStyle: 'none',
											scrollbarWidth: 'none', '--Table-lastColumnWidth': '130px',
										}}>
										<Table sx={{ '::-webkit-scrollbar': { display: 'none' } }}>
											<thead>
												<tr>
													<th style={{}}>Nombre</th>
													<th style={{ width: 'var(--Table-lastColumnWidth)', textAlign: 'center' }}>Calificación</th>

												</tr>
											</thead>

											<tbody>
												{usuarioData.map((row) => (
													<tr key={row.idExamen}>
														<td>{row.nombreEstudiante} {row.apellidoEstudiante}</td>
														<td>
															<SelectProps size="sm" placeholder={row.calificacion} onChange={(event, newValue) => handleCalificacionChange(row.idCursadaExamen, newValue)}>
																{notas.map((nota) => (
																	<Option key={nota} value={nota}>{nota}</Option>
																))}
															</SelectProps>
														</td>
													</tr>
												))}
											</tbody>
											{/*  */}

										</Table>
									</Sheet>
								)}
								{usuarioData.length === 0 && (
									<Box sx={{ margin: 0, alignSelf: 'center' }}>
										<Typography level="body-sm" sx={{ textAlign: 'center' }} variant="plain" color="warning" noWrap>
											No hay alumnos inscriptos
										</Typography>
									</Box>
								)}
							</div>
						</section>

					</FormControl>
				</Stack>
				{usuarioData.length > 0 && (
					<Box sx={{ marginTop: 0.5, textAlign: 'center' }}>
						<IconButton size="sm" variant="plain" color="primary" sx={{  mt: 0, mb: 1, border: 0.001, borderColor: '#4e4e4e' }} onClick={handleGuardarTodas}>
							<Save size="sw" />
							<Typography variant="plain" color="primary" px={1}>Guardar calificaciones</Typography>
						</IconButton>
					</Box>
				)}
			</Card>
		</Box>
	);
}
