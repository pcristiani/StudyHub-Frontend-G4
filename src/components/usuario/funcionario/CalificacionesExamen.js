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
import { cambiarResultadoExamen, getExamenesAsignaturaPorAnio, getCursadasExamen } from '../../../services/requests/examenService';
import Input from '@mui/joy/Input';

import { getAsignaturasDeCarrera } from '../../../services/requests/asignaturaService';
import { errors } from '../../../services/util/errors';
import Sheet from '@mui/joy/Sheet';
import Table from '@mui/joy/Table';
import { Save } from '@mui/icons-material';

export default function CalificacionesExamen() {
	const { user } = useContext(AuthContext);
	const history = useNavigate();
	const [carreraData, setCarreraData] = useState([]);
	const [cursadasData, setCursadasData] = useState([]);
	const [asignaturaData, setAsignaturaData] = useState([]);
	const [error, setError] = useState(null);

	const [selectedCarrera, setSelectedCarrera] = useState('');
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
		if (idAsignatura !== null && idAsignatura !== undefined) {
			getInfoCursadasPendientes(idAsignatura);
		}
	};

	async function getInfoCursadasPendientes(idAsignatura) {
		// let result = await getCursadasPendientes(user.jwtLogin);
		let result = await getExamenesAsignaturaPorAnio(idAsignatura, 2024, user.jwtLogin);
		setCursadasData(result);
	}


	const handleModificar = async (id) => {
		console.log("ID: ", id, "Resultado: ", resultadoData);
		let result = await cambiarResultadoExamen(id.idCursada, resultadoData, user.jwtLogin);
		if (result.status === 200) {
			let title = "¡Inscripto a examen!\n\n";
			errors(title, result.data, result.status);
			history('/novedades');
		} else {
			errors(result.data, result.data, result.status);
		}
	};


	const handleSubmit = async (event) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		let idAsignatura = data.get('idasignatura');
		let anioLectivo = 2024;
		let idPeriodo = data.get('idperiodo');
		// let anioLectivo = parseInt(data.get('aniolectivo'), 10);

		let result = await getExamenesAsignaturaPorAnio(idAsignatura, anioLectivo, user.jwtLogin);
		setResultadoData(result);
		if (cursadasData.idExamen !== null && cursadasData.idExamen !== undefined) {
			let result = await getCursadasExamen(cursadasData.idExamen, user.jwtLogin);
			// setCursadasData(result);
			console.log("idAsignatura: ", idAsignatura, "anioLectivo: ", cursadasData, "idPeriodo: ", resultadoData);
		}
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


	return (
		<Box component="form" sx={{ marginTop: 6, display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }} onSubmit={handleSubmit}>
			<Card sx={{ display: 'flex', alignSelf: 'center', }}>
				<Box sx={{ margin: 0.6, alignSelf: 'center' }}>
					<Typography sx={{ textAlign: 'center' }} variant="plain" color="primary" noWrap>Registro de calificaciones examen</Typography>
				</Box>
				<Divider />
				<Stack direction="column" sx={{ display: { xs: 'flex', md: 'flex' }, alignSelf: 'center' }}>
					<FormControl sx={{ display: { sm: 'flex', md: 'flex', width: '450px' }, gap: 0.8 }}>
						<Select size="sm" defaultValue="Seleccionar carrera" placeholder="Seleccionar carrera" id="idcarrera" name="idcarrera" onChange={handleChange}>
							{carreraData.map((carrera, index) => (
								<Option key={index} value={carrera.idCarrera}>{carrera.nombre}</Option>
							))}
						</Select>

						<Select size="sm" defaultValue="Seleccionar asignatura" placeholder="Seleccionar asignatura" id="idasignatura" name="idasignatura" onChange={handleChangeAsignatura}>
							{Array.isArray(asignaturaData) && asignaturaData.map((asignatura, index) => (
								<Option key={index} value={asignatura.idAsignatura}>{asignatura.nombre}</Option>
							))}
						</Select>

						<Stack direction="row" spacing={0.8} sx={{ marginBottom: 0.6, justifyContent: 'right', zIndex: '1000' }}>
							<Button type="submit" fullWidth sx={{ mt: 1, mb: 1, border: 0.01, borderColor: '#3d3d3d' }} variant="soft">Buscar</Button>
						</Stack>
						<Divider />

						<section className="text-black body-font">
							<div>
								<Sheet variant="outlined"
									sx={{
										'--TableCell-height': '30px', '--TableHeader-height': 'calc(1 * var(--TableCell-height))',
										'--Table-firstColumnWidth': '120px', '--Table-lastColumnWidth': '120px', '--Table-lastColumnWidth2': '50px', '--Table-buttonColumnWidth': '70px', '--TableRow-hoverBackground': 'rgb(3, 202, 192, 0.30)',
										borderCollapse: 'separate', borderTopLeftRadius: '12px', borderTopRightRadius: '12px', borderBottomLeftRadius: '12px', borderBottomRightRadius: '12px', overflow: 'auto',
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
											{resultadoData.map((row) => (
												<tr key={row.idExamen}>
													<td>{row.nombre} {row.apellidoEstudiante}</td>
													<td>{row.asignatura}</td>
													<td>
														<Input size="sm" type="number" id="calificacion" name="calificacion" placeholder="0" />
													</td>
													{/* <td>
														<Button size="sm" sx={{ mt: 0, mb: 0, border: 0.1, borderColor: '#3d3d3d' }} variant="soft" onClick={() => ('row')}>Guardar</Button>
													</td> */}
													<td>
														<Button size="sm" sx={{ border: 0, borderColor: '#3d3d3d', alignItems: 'right' }} variant="plain" color='neutral'
															onClick={() => handleModificar(row.idCursada)} >
															<Save size="sw">	</Save>
														</Button>
													</td>
												</tr>
											)
											)}
										</tbody>
									</Table>
									{/* onClick={() => handleModificar(row)		*/}
								</Sheet>
							</div>
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



{/* <Select size="sm" defaultValue="Pendiente" placeholder="Pendiente" id="idresultado" name="idresultado" >
															{cursadasData.map((resultado, index) => (
																<Option key={index} value={resultado.idExamen}>{resultado.periodoExamen}</Option>
															))}
														</Select> */}


{/* <Select size="sm" defaultValue="Seleccionar periodo" placeholder="Seleccionar periodo" id="idperiodo" name="idperiodo">
							{cursadasData.map((resultado, index) => (
								<Option key={index} value={resultado.idExamen}>{resultado.periodoExamen}</Option>
							))}
						</Select> */}


// {/* <tbody>


// const handleChangeResultado = async (event, newValue) => {
// const data = new FormData(event.currentTarget);
// let idAsignatura = data.get('idasignatura');
// let anioLectivo = parseInt(data.get('aniolectivo'), 10);
// let idPeriodo = data.get('idperiodo');
// if (newValue !== null && newValue !== undefined) {
// 	let result = await getCursadasExamen(newValue, user.jwtLogin);
// 	setResultadoData(result);
// }
// };

{/* 
						<Select size="sm" onChange={(event, newValue) => setYear(newValue)} placeholder="Año lectivo" id="aniolectivo" name="aniolectivo" required>{years.map((year) => (
							<Option key={year} value={year}>{year}</Option>
						))}
						</Select> */}


{/* <Select size="sm" defaultValue="Seleccionar asignatura" placeholder="Seleccionar asignatura" id="idexamen" name="idexamen">
							{Array.isArray(fechaData) && fechaData.map((f, index) => (
								<Option key={index} value={f.idExamen}>{f.periodoExamen} - {formatFecha(f.fechaHora)}</Option>
							))}
						</Select> */}
{/* <Button size="sm" variant="outlined" fullWidth color="neutral" href='/'>Cancelar</Button> */ }
{/* <Button type="submit" fullWidth sx={{ mt: 1, mb: 2, border: 0.01, borderColor: '#3d3d3d' }} variant="soft">Buscar</Button> */ }