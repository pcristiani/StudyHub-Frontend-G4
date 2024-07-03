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
import { cambiarResultadoExamen, getExamenesAsignaturaPorAnio, getCursadasExamen } from '../../../services/requests/examenService';
import IconButton from '@mui/joy/IconButton';
import Tooltip from '@mui/joy/Tooltip';
import { getAsignaturasDeCarrera } from '../../../services/requests/asignaturaService';
import { errors } from '../../../services/util/errors';
import Sheet from '@mui/joy/Sheet';
import Table from '@mui/joy/Table';
import { Save } from '@mui/icons-material';
import { SelectProps } from '../../common/SelectProps';


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
	const [resultadoData, setResultadoData] = useState([]);


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
		if (newValue !== null && newValue !== undefined && newValue !== '') {
			setSelectedCarrera(newValue);
			initAsignatura(newValue);
		}
	};

	async function initAsignatura(selecIdCarrera) {
		if (selecIdCarrera !== null && selecIdCarrera !== undefined && selecIdCarrera !== '') {
			let result = await getAsignaturasDeCarrera(selecIdCarrera, user.jwtLogin);
			setAsignaturaData(result);
		}
	}

	const handleChangeAsignatura = (event, newValue) => {
		if (newValue !== null && newValue !== undefined && newValue !== '') {
			setSelectedAsignatura(newValue);
			//	handleSubmit(newValue);
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
		handleChangePeriodo();
		if (idAsignatura !== null && idAsignatura !== undefined && idAsignatura !== '' && anioLectivo !== null && anioLectivo !== undefined && anioLectivo !== '') {
			let resul = await getExamenesAsignaturaPorAnio(idAsignatura, anioLectivo, user.jwtLogin);
			setUsuarioData([]);
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

	const handleModificar = async (row) => {
		let cursadaExam = row.idCursadaExamen;
		if (cursadaExam !== null && cursadaExam !== undefined && resultadoData !== null && resultadoData !== undefined) {
			let result = await cambiarResultadoExamen(cursadaExam, resultadoData, user.jwtLogin);
			let title = "¡Calificación exitosa!\n\n";
			errors(title, '', result.status, false);
		}
	};

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
		const month = String(fechaExamen.getMonth() + 1).padStart(2, '0'); // Los meses empiezan en 0
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
		<Box component="form" sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }} >
			<Card sx={{ display: 'flex', alignSelf: 'center', }}>
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
									<Option key={year} value={year}>{year}</Option>
								))}
							</SelectProps>
							<SelectProps sx={{ width: '100%' }} size="sm" placeholder="Seleccionar fecha" id="idperiodo" name="idperiodo" onChange={handleChangePeriodo}>
								{Array.isArray(cursadasData) && cursadasData.map((cursada, index) => (
									<Option fullWidth key={index} value={cursada.idExamen}>{formatFecha(cursada.fechaHora)}</Option>
								))}
							</SelectProps>
						</Stack>

						<Divider sx={{ marginBottom: 1.5, marginTop: 1 }} />

						<section className="text-black body-font">
							<div>
								{usuarioData.length > 0 && (
									<Sheet variant="outlined"
										sx={{'--TableCell-height': '30px', '--TableHeader-height': 'calc(1 * var(--TableCell-height))',
											'--Table-firstColumnWidth': '130px', '--Table-lastColumnWidth': '80px', '--Table-buttonColumnWidth': '45px', '--TableRow-hoverBackground': 'rgb(3, 202, 192, 0.30)', borderCollapse: 'separate', borderTopLeftRadius: '12px', borderTopRightRadius: '12px', borderBottomLeftRadius: '12px', borderBottomRightRadius: '12px', overflow: 'auto', cursor: 'pointer'
										}}>
										<Table aria-labelledby="tableTitle" hoverRow
											sx={{'& thead th:nth-child(1)': { width: '40%', }, '& thead th:nth-child(2)': { width: '65%', }, '& tr > *:nth-child(n+3)': { width: '12%', textAlign: 'center' }, maxWidth: '400px'}}>

											<thead>
												<tr>
													<th style={{ width: 'var(--Table-firstColumnWidth)' }}>Nombre</th>
													<th style={{ width: 'var(--Table-lastColumnWidth)' }}>Calificación</th>
													<th aria-label="last" style={{ width: 'var(--Table-buttonColumnWidth)' }} />
												</tr>
											</thead>

											<tbody>
												{usuarioData.slice(0, 5).map((row) => ( // Aquí limitamos a 5 items
													<tr key={row.idExamen}>
														<td>{row.nombreEstudiante} {row.apellidoEstudiante}</td>
														<td>
															<SelectProps size="sm" placeholder={row.calificacion} onChange={(event, newValue) => setResultadoData(newValue)} id="idresultado" name="idresultado">{notas.map((nota) => (
																<Option key={nota} value={nota}>{nota}</Option>
															))}
															</SelectProps>
														</td>
														<td>
															<Tooltip title="Guardar calificación">
																<IconButton size="sm" sx={{ alignItems: 'right' }} variant="plain" color="neutral" onClick={() => handleModificar(row)}>
																	<Save size="sw"></Save>
																</IconButton>
															</Tooltip>
														</td>
													</tr>
												))}
											</tbody>
										</Table>
									</Sheet>
								)}
								{usuarioData.length === 0 && (
									<Box sx={{ margin: 0, alignSelf: 'center' }}>
										<Typography level="body-sm" sx={{ textAlign: 'center' }} variant="plain" color="warning" noWrap>
											No hay alumnos inscriptos</Typography>
									</Box>
								)}
							</div>
						</section>
					</FormControl>
				</Stack>
			</Card >
		</Box >
	);
};

const timeSlots = Array.from(new Array(24 * 1)).map(
	(_, index) =>
		`${index < 20 ? '' : ''}${Math.floor(index / 1)
		}:00`,
);
