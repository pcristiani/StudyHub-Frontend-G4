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
	const [calificaciones, setCalificaciones] = useState({});

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

	const handleChangeAnio = (event, newValue) => {
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
		if (idAsignatura !== null && idAsignatura !== undefined && idAsignatura !== '' && anioLectivo !== null && anioLectivo !== undefined && anioLectivo !== '') {
			const resul = await getCursadasPendientes(idAsignatura, anioLectivo, user.jwtLogin);
			setCursadasData([]);
			setCursadasData(resul.data);
		}
	}

	const handleCalificacionChange = (idCursada, calificacion) => {
		setCalificaciones(prevState => ({
			...prevState,
			[idCursada]: calificacion
		}));
	};

	const handleGuardarTodas = async () => {
		const promises = Object.entries(calificaciones).map(([idCursada, calificacion]) => {
			if (calificacion !== null && calificacion !== undefined && calificacion !== 0) {
				return cambiarResultadoCursada(idCursada, calificacion, user.jwtLogin);
			}
			return Promise.resolve();
		});

		try {
			const results = await Promise.all(promises);
			results.forEach(result => {
				if (result && result.status === 200) {
					let title = "¡Calificación exitosa!\n\n";
					errors(title, result.data, result.status, false);
				}
			});
		} catch (error) {
			console.error("Error saving calificaciones: ", error);
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
			<Card sx={{ display: 'flex', alignSelf: 'center', zIndex: '1000' }}>
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

						<Divider sx={{ marginBottom: 0.5, marginTop: 0.5 }} />

						<section className="text-black body-font">
							<div>
								{cursadasData.length > 0 && (
									<Sheet
										sx={{
											'--TableCell-height': '20px', '--TableHeader-height': 'calc(1 * var(--TableCell-height))',
											maxHeight: 220, overflow: 'auto', background: 'none', msOverflowStyle: 'none',
											scrollbarWidth: 'none', '--Table-lastColumnWidth': '130px',
										}}>
										{/* <Table stickyHeader> */}
										<Table sx={{ '::-webkit-scrollbar': { display: 'none' } }}>
											<thead>
												<tr>
													<th style={{}}>Nombre</th>
													<th style={{ width: 'var(--Table-lastColumnWidth)', textAlign: 'center' }}>Calificación</th>
												</tr>
											</thead>
											<tbody>
												{/* {cursadasData.slice(0, 5).map((row) => ( */}
												{cursadasData.map((row) => (
													row.rol !== 'E' && (
														<tr key={row.idCursada}>
															<td>{row.nombreEstudiante} {row.apellidoEstudiante}</td>
															<td>
																<Select size="sm" placeholder={row.calificacion} onChange={(event, newValue) => handleCalificacionChange(row.idCursada, newValue)} id="idresultado" name="idresultado">
																	{notas.map((nota) => (
																		<Option key={nota} value={nota}>{nota}</Option>
																	))}
																</Select>
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
											No hay alumnos inscriptos
										</Typography>
									</Box>
								)}
							</div>
						</section>
					</FormControl>
				</Stack>
				{cursadasData.length > 0 && (
					<Box sx={{ marginTop: 0.5, textAlign: 'center' }}>
						<IconButton size="sm" variant="plain" color="primary" sx={{ mt: 0, mb: 1, border: 0.001, borderColor: '#4e4e4e' }} onClick={handleGuardarTodas}>
							<Save size="sw" />
							<Typography variant="plain" color="primary" px={1}>Guardar calificaciones</Typography>
						</IconButton>
					</Box>
				)}
			</Card>
		</Box>
	);
}
