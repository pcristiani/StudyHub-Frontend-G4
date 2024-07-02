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
import Sheet from '@mui/joy/Sheet';
import Table from '@mui/joy/Table';
import { errors } from '../../../services/util/errors';
import { SelectProps } from '../../common/SelectProps';

export default function CalificacionesFinCurso() {
	const { user } = useContext(AuthContext);
	const [carreraData, setCarreraData] = useState([]);
	const [cursadasData, setCursadasData] = useState([]);
	const [asignaturaData, setAsignaturaData] = useState([]);
	const [error, setError] = useState(null);
	const [selectedCarrera, setSelectedCarrera] = useState('');
	const [selectedAsignatura, setSelectedAsignatura] = useState('');
	const [selectedAnio, setSelectedAnio] = useState('');

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

	// const handleSubmit = async (event) => {
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

	return (
		<Box component="form" sx={{ marginTop: 6, display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
			<Card sx={{ display: 'flex', alignSelf: 'center', }}>
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
									<Option key={years} value={year}>{year}</Option>
								))}
							</SelectProps>
						</Stack>

						<Divider sx={{ marginBottom: 1.5, marginTop: 1 }} />

						<section className="text-black body-font">
							<div>
								{cursadasData.length > 0 && (
									<Sheet variant="outlined"
										sx={{
											'--TableCell-height': '30px', '--TableHeader-height': 'calc(1 * var(--TableCell-height))',
											'--Table-firstColumnWidth': '130px', '--Table-lastColumnWidth': '80px', '--Table-lastColumnWidth2': '45px', '--Table-buttonColumnWidth': '45px', '--TableRow-hoverBackground': 'rgb(3, 202, 192, 0.30)',
											borderCollapse: 'separate', borderTopLeftRadius: '12px', borderTopRightRadius: '12px', borderBottomLeftRadius: '12px', borderBottomRightRadius: '12px', overflow: 'auto', cursor: 'pointer'
										}}>
										<Table hoverRow>
											<thead>
												<tr>
													<th style={{ width: 'var(--Table-firstColumnWidth)' }}>Nombre</th>
													<th style={{ width: 'var(--Table-lastColumnWidth)' }}>Calificacion</th>
													<th style={{ width: 'var(--Table-buttonColumnWidth)' }}></th>
												</tr>
											</thead>
											<tbody>
												{cursadasData.map((row) => (
													row.rol !== 'E' && (
														<tr key={row.idCursada}>
															<td>{row.nombreEstudiante} {row.apellidoEstudiante}	</td>
															<td>
																<Select size="sm" placeholder="0"   onChange={(event, newValue) => {
																		row.calificacion = newValue;
																	}}
																	id="idresultado" name="idresultado">{notas.map((nota) => (
																		<Option key={notas} value={nota}>{nota}</Option>
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
												))}
											</tbody>
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
					</FormControl>
				</Stack>
			</Card>
		</Box>
	);
};

