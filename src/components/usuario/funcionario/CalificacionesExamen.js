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
import { getCursadasExamenPendientes } from '../../../services/requests/examenService';
import Alerta from '../../../services/util/Alerta';

export default function CalificacionesExamen() {
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

	const handleChange = (event, newValue) => {
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

	const handleChangeAsignatura = (event, idAsignatura) => {
		getInfoCursadasPendientes(idAsignatura);
	};

	async function getInfoCursadasPendientes(idAsignatura) {
		// let result = await cursadasPendientes(user.jwtLogin);
		// setCursadasData(result[0].idCursada);
	}

	const handleChangeResultado = (event, newValue) => {
		console.log("Selected: ", newValue);
		setResultado(newValue);
	};

	const handleModificar = async (id) => {
		await cambiarResultadoCursada(id.idCursada, resultadoData, user.jwtLogin);
	};


	const handleSubmit = async (event) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		let idAsignatura = data.get('idasignatura');
		let anioLectivo = parseInt(data.get('aniolectivo'), 10);
		let result = await getCursadasExamenPendientes(idAsignatura, anioLectivo, user.jwtLogin); // !
		console.log("ACACursadas: ", result);
		setCursadasData(result);
	};

	const [year, setYear] = useState(new Date().getFullYear());
	const startYear = 2023;
	const endYear = new Date().getFullYear();
	const years = [];
	for (let i = startYear; i <= endYear; i++) {
		years.push(i);
	}

	const diasSemana = [
		{ value: 'APROBADO', label: 'Aprobado' },
		{ value: 'REPROBADO', label: 'Reprobado' },
		{ value: 'PENDIENTE', label: 'Pendiente' },
	];

	return (
		<Box component="form" sx={{ marginTop: 6, display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }} onSubmit={handleSubmit} >
			<Card sx={{ display: 'flex', alignSelf: 'center', }}>
				<Box sx={{ margin: 0.6, alignSelf: 'center' }}>
					<Typography sx={{ textAlign: 'center' }} variant="plain" color="primary" noWrap>Registro de calificaciones examen</Typography>
				</Box>
				<Alerta />
				<Divider />
				<Stack direction="column" sx={{ display: { xs: 'flex', md: 'flex' }, alignSelf: 'center' }}>
					<FormControl sx={{ display: { sm: 'flex', md: 'flex', width: '700px' }, gap: 0.8 }}>
						<Select size="sm" defaultValue="Seleccionar carrera" placeholder="Seleccionar carrera" id="idcarrera" name="idcarrera" onChange={handleChange}>
							{carreraData.map((carrera, index) => (
								<Option key={index} value={carrera.idCarrera}>{carrera.nombre}</Option>
							))}
						</Select>

						<Select size="sm" defaultValue="Seleccionar asignatura" placeholder="Seleccionar asignatura" id="idasignatura" name="idasignatura" onChange={handleChangeAsignatura} required>
							{Array.isArray(asignaturaData) && asignaturaData.map((asignatura, index) => (
								<Option key={index} value={asignatura.idAsignatura}>{asignatura.nombre}</Option>
							))}
						</Select>

						<Select size="sm" onChange={(event, newValue) => setYear(newValue)} placeholder="Año lectivo" id="aniolectivo" name="aniolectivo" required>{years.map((year) => (
							<Option key={year} value={year}>{year}</Option>
						))}
						</Select>
						<Stack direction="row" spacing={0.8} sx={{ marginTop: 1, justifyContent: 'right', zIndex: '1000' }}>
							<Button type="submit" fullWidth sx={{ mt: 1, mb: 1, border: 0.01, borderColor: '#3d3d3d' }} variant="soft">Buscar</Button>
							{/* <Button size="sm" variant="outlined" fullWidth color="neutral" href='/'>Cancelar</Button> */}
						</Stack>
						{/* <Button type="submit" fullWidth sx={{ mt: 1, mb: 2, border: 0.01, borderColor: '#3d3d3d' }} variant="soft">Buscar</Button> */}
						<section className="text-black body-font">
							<div>
								<Sheet variant="outlined"
									sx={{
										'--TableCell-height': '30px', '--TableHeader-height': 'calc(1 * var(--TableCell-height))',
										'--Table-firstColumnWidth': '120px', '--Table-lastColumnWidth': '90px', '--Table-lastColumnWidth2': '60px', '--Table-buttonColumnWidth': '75px',
										'--TableRow-hoverBackground': 'rgb(3, 202, 192, 0.30)',
										borderCollapse: 'separate', borderSpacing: '0', borderTopLeftRadius: '12px', borderTopRightRadius: '12px', borderBottomLeftRadius: '12px', borderBottomRightRadius: '12px', overflow: 'auto',
										background: (theme) =>
											`linear-gradient(to right, ${theme.vars.palette.background.surface} 30%, rgba(255, 255, 255, 0)),
        linear-gradient(to right, rgba(255, 255, 255, 0), ${theme.vars.palette.background.surface} 90%) 0 100%`,
										backgroundSize:
											'40px calc(100% - var(--TableCell-height)), 40px calc(100% - var(--TableCell-height)), 14px calc(100% - var(--TableCell-height)), 14px calc(100% - var(--TableCell-height))', backgroundRepeat: 'no-repeat',
										backgroundAttachment: 'local, local, scroll, scroll',
										backgroundPosition:
											'var(--Table-firstColumnWidth) var(--TableCell-height), calc(100% - var(--Table-lastColumnWidth)) var(--TableCell-height), var(--Table-firstColumnWidth) var(--TableCell-height), calc(100% - var(--Table-lastColumnWidth)) var(--TableCell-height)',
										backgroundColor: 'background.surface',
									}}>

									<Table hoverRow>
										<thead>
											<tr>
												<th style={{ width: 'var(--Table-firstColumnWidth)' }}>Nombre</th>
												<th style={{ width: 'var(--Table-lastColumnWidth)' }}>Id Cursada</th>
												<th style={{ width: 'var(--Table-lastColumnWidth)' }}>Resultado</th>
												<th aria-label="last" style={{ width: 'var(--Table-buttonColumnWidth)' }} />
											</tr>
										</thead>
										<tbody>
											{cursadasData.map((row) => (
												row.rol !== 'E' && (
													<tr key={row.idCursada}>
														<td>{row.nombreEstudiante} {row.apellidoEstudiante}</td>
														<td>{row.idCursada}</td>
														<td>
															<Select size="sm" defaultValue="Pendiente" placeholder="Pendiente" id="idresultado" name="idresultado" onChange={handleChangeResultado}>
																{diasSemana.map((resultado, index) => (
																	<Option key={index} value={resultado.value}>{resultado.label}</Option>
																))}
															</Select>
														</td>
														<td>
														</td>
													</tr>
												)
											))}
										</tbody>
									</Table>

									{/* onClick={() => handleModificar(row)		*/}
							</Sheet>
						</div>
									<Button size="sm" sx={{ mt: 0, mb: 0, border: 0.1, borderColor: '#3d3d3d' }} variant="soft">Guardar</Button>
					</section>
				</FormControl>

			</Stack>
		</Card>
		</Box >
	);
};

const timeSlots = Array.from(new Array(24 * 1)).map(
	(_, index) =>
		`${index < 20 ? '' : ''}${Math.floor(index / 1)
		}:00`,
);

