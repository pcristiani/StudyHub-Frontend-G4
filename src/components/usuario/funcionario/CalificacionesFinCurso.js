import React, { useState, useEffect, useContext } from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Divider from '@mui/joy/Divider';
import FormControl from '@mui/joy/FormControl';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import Card from '@mui/joy/Card';
import Option from '@mui/joy/Option';
import Select from '@mui/joy/Select';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext';
import { getCarreras } from '../../../services/requests/carreraService';
import { getAsignaturasDeCarrera, cursadasPendientes, cambiarResultadoCursada } from '../../../services/requests/asignaturaService';

import Sheet from '@mui/joy/Sheet';
import Table from '@mui/joy/Table';
import { Input } from '@mui/joy';

export default function CalificacionesFinCurso() {
	const { user } = useContext(AuthContext);
	const history = useNavigate();
	const [carreraData, setCarreraData] = useState([]);
	const [cursadasData, setCursadasData] = useState([]);
	const [asignaturaData, setAsignaturaData] = useState([]);
	const [error, setError] = useState(null);
	const [selectedCarrera, setSelectedCarrera] = useState('');
	const [resultadoData, setResultado] = useState('');

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
		console.log("Selected: ", newValue);
		setSelectedCarrera(newValue);
		if (newValue !== null) {
			getInfoCarrera(newValue);
		}
	};

	async function getInfoCarrera(selectedCarrera) {
		let result = await getAsignaturasDeCarrera(selectedCarrera, user.jwtLogin);
		setAsignaturaData(result);
	}

	// const handleChangeAsignatura = (event, idAsignatura) => {
	// 	// selectedCarrera
	// 	// setAsignaturaData(idAsignatura);
	// };

	// async function getInfoCursadasPendientes(idAsignatura) {
	// 	// let result = await cursadasPendientes(user.jwtLogin);
	// 	// setCursadasData(result[0].idCursada);
	// }

	// const [cursadasData, setCursadasData] = useState(null);

	const handleSubmit = async (event) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		let idAsignatura = data.get('idasignatura');
		let anioLectivo = parseInt(data.get('aniolectivo'), 10);
		console.log("IdAsignatura: ", idAsignatura, "AnioLectivo: ", anioLectivo);
		// let result2 = null; 
		const result2 = await cursadasPendientes(idAsignatura, anioLectivo, user.jwtLogin);
		console.log("CursadasPendientes: ", result2);

		console.log("cursadasData: ", cursadasData);

		// if (result2 && result2.length > 0) {
		setCursadasData(result2);
		// } else {
		// 		setCursadasData(null);
		// }
	};


	// const handleChangeResultado = (event, newValue) => {
	// 	console.log("Selected: ", newValue);
	// 	// setResultado(newValue);
	// };

	const handleModificar = async (idCursada) => {
		// event.preventDefault();
		// const data = new FormData(event.currentTarget);
		// // let idAsignatura = data.get('idasignatura');
		// let idResultado = parseInt(data.get('idresultado'), 10);

		// console.log("IdAsignatura: ", id, "idResultado: ", idResultado);
		console.log("Id: ", idCursada, resultadoData,);
		const result = await cambiarResultadoCursada(idCursada, resultadoData, user.jwtLogin);
		console.log("CursadasPendientes: ", result);
	};


	// const handleSubmit = async (event) => {
	// 	event.preventDefault();
	// 	const data = new FormData(event.currentTarget);
	// 	let idAsignatura = data.get('idasignatura');
	// 	let anioLectivo = parseInt(data.get('aniolectivo'), 10);
	// 	let result = await cursadasPendientes(idAsignatura, anioLectivo, user.jwtLogin);
	// 	console.log("CursadasPendientes: ", result);
	// 	// setCursadasData(null);
	// 	if (cursadasData > 0) {
	// 		// setCursadasData(null);
	// 	} else {
	// 		setCursadasData(result);
	// 	}

	// };

	const [year, setYear] = useState(new Date().getFullYear());
	const startYear = 2023;
	const endYear = new Date().getFullYear();
	const years = [];
	for (let i = startYear; i <= endYear; i++) {
		years.push(i);
	}

	// const [year, setYear] = useState(new Date().getFullYear());
	// const startYear = 2023;
	// const endYear = 12;//new Date().getFullYear() + 1;
	// const [year, setYear] = useState(new Date().getFullYear());
	const notas = [];
	for (let i = 1; i <= 12; i++) {
		notas.push(i);
	}

	const diasSemana = [
		{ value: 1, label: '1' },
		{ value: 2, label: '2' },
		{ value: 3, label: '3' },
	];

	return (
		<Box component="form" sx={{ marginTop: 6, display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }} onSubmit={handleSubmit}>
			<Card sx={{ display: 'flex', alignSelf: 'center', }}>
				<Box sx={{ margin: 0.6, alignSelf: 'center' }}>
					<Typography sx={{ textAlign: 'center' }} variant="plain" color="primary" noWrap>Registro de calificaciones de fin de curso</Typography>
				</Box>
				<Divider />
				<Stack direction="column" sx={{ display: { xs: 'flex', md: 'flex' }, alignSelf: 'center' }}>
					<FormControl sx={{ display: { sm: 'flex', md: 'flex', width: '820px' }, gap: 0.8 }}>
						<Select size="sm" defaultValue="Seleccionar carrera" placeholder="Seleccionar carrera" id="idcarrera" name="idcarrera" onChange={handleChangeCarrera} >
							{carreraData.map((carrera, index) => (
								<Option key={index} value={carrera.idCarrera}>{carrera.nombre}</Option>
							))}
						</Select>
						{/* onChange={handleChangeAsignatura} */}
						<Select size="sm" placeholder="Seleccionar asignatura" id="idasignatura" name="idasignatura" required>
							{Array.isArray(asignaturaData) && asignaturaData.map((asignatura, index) => (
								<Option key={index} value={asignatura.idAsignatura}>{asignatura.nombre}</Option>
							))}
						</Select>

						<Stack direction="row" spacing={0.8} sx={{ justifyContent: 'right', zIndex: '1000' }}>
							<Select size="sm" sx={{ width: "600px", zIndex: '1000' }} onChange={(event, newValue) => setYear(newValue)}
								placeholder="Año lectivo" id="aniolectivo" name="aniolectivo" required>
								{years.map((year) => (
									<Option key={year} value={year} >{year}</Option>
								))}
							</Select>
							<Button fullWidth size="sm" type="submit" sx={{ mt: 1, mb: 2, border: 0.01, borderColor: '#3d3d3d' }} variant="soft">Buscar</Button>

						</Stack>
						<Divider sx={{ marginBottom: 1.5, marginTop: 1 }} />
						<section className="text-black body-font">
							<div>
								<Sheet variant="outlined"
									sx={{
										'--TableCell-height': '30px', '--TableHeader-height': 'calc(1 * var(--TableCell-height))',
										'--Table-firstColumnWidth': '120px', '--Table-lastColumnWidth': '90px', '--Table-lastColumnWidth2': '60px', '--Table-buttonColumnWidth': '75px', '--TableRow-hoverBackground': 'rgb(3, 202, 192, 0.30)',
										borderCollapse: 'separate', borderTopLeftRadius: '12px', borderTopRightRadius: '12px', borderBottomLeftRadius: '12px', borderBottomRightRadius: '12px', overflow: 'auto',
									}}>

									<Table hoverRow>
										<thead>
											<tr>
												<th style={{ width: 'var(--Table-firstColumnWidth)' }}>Nombre</th>
												<th style={{ width: 'var(--Table-lastColumnWidth)' }}>Id Cursada</th>
												<th style={{ width: 'var(--Table-lastColumnWidth)' }}>Calificacion</th>
												<th style={{ width: 'var(--Table-lastColumnWidth)' }}></th>
											</tr>
										</thead>
										<tbody>
											{cursadasData.map((row) => (
												row.rol !== 'E' && (
													<tr key={row.idCursada}>
														<td>{row.nombreEstudiante} {row.apellidoEstudiante}</td>
														<td>{row.idCursada}</td>
														{/* <td>
															<Select size="sm" placeholder="Pendiente" id="idresultado" name="idresultado" onChange={handleChangeResultado}>
																{diasSemana.map((resultado, index) => (
																	<Input key={index} value={resultado.value}>{resultado.label}</Input>
																))}
															</Select>
														</td> */}
														<td>
															<Select size="sm" onChange={(event, newValue) => setResultado(newValue)} placeholder="Calificación" id="idresultado" name="idresultado">{notas.map((nota) => (
																<Option key={notas} value={nota}>{nota}</Option>
															))}
															</Select>
														</td>
														<td>	<Button size="sm" sx={{ mt: 0, mb: 0, border: 0.1, borderColor: '#3d3d3d', alignSelf: 'center' }} variant="outlined"
															onClick={() => handleModificar(row.idCursada)}
														>Guardar</Button>	</td>
													</tr>
												)
											))}
										</tbody>
									</Table>
								</Sheet>
							</div>
						</section>
					</FormControl>

				</Stack>
			</Card>
		</Box>
	);
};

const timeSlots = Array.from(new Array(24 * 1)).map(
	(_, index) =>
		`${index < 20 ? '' : ''}${Math.floor(index / 1)
		}:00`,
);

