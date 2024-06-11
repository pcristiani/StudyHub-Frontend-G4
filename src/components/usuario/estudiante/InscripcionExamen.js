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
import { getCarrerasInscripto } from '../../../services/requests/carreraService';
import { getAsignaturasNoAprobadas } from '../../../services/requests/asignaturaService';
import { getExamenesAsignatura, inscripcionExamen } from '../../../services/requests/examenService';

export default function InscripcionExamen() {
	const { user } = useContext(AuthContext);
	const history = useNavigate();
	const [error, setError] = useState(null);
	const [fechaData, setFechaData] = useState([]);

	const [carreraData, setCarreraData] = useState([]);
	const [asignaturaNoAprobadaData, setAsignaturaNoAprobadasData] = useState([]);


	useEffect(() => {
		const fetchCarreras = async () => {
			try {
				const result = await getCarrerasInscripto(user.id, user.jwtLogin);
				setCarreraData(result);
			} catch (error) {
				setError(error.message);
			}
		};
		fetchCarreras();
	}, [user]);

	useEffect(() => {
		if (carreraData) {
			console.log("Carreras: ", carreraData);
		}
	}, [carreraData]);


	///
	const handleChange = (event, newValue) => {
		getInfoAsignaturasDeEstudiante(newValue);
	};

	async function getInfoAsignaturasDeEstudiante(idEstudiante) {
		let result = await getAsignaturasNoAprobadas(user.id, user.jwtLogin);
		setAsignaturaNoAprobadasData(result);
	}

	const handleChangeAsignatura = async (event, newValue) => {
		if (newValue !== null && newValue !== undefined && newValue !== "") {
			let result = await getExamenesAsignatura(newValue, user.jwtLogin);
			getInfoExamenDate(result);
		}
	};

	async function getInfoExamenDate(fechaExamen) {
		setFechaData(fechaExamen);
	}

	const handleSubmit = async (event) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		let idExamen = data.get('idexamen');
		let intIdExamen = parseInt(idExamen, 10);

		let result = await inscripcionExamen(user.id, intIdExamen, user.jwtLogin);
	};

	return (
		<Box component="form" sx={{ marginTop: 6, display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }} onSubmit={handleSubmit} >
			<Card sx={{ display: 'flex', alignSelf: 'center', }}>
				<Box sx={{ margin: 0.6, alignSelf: 'center' }}>
					<Typography sx={{ textAlign: 'center' }} variant="plain" color="primary" noWrap>Inscripción examen</Typography>
				</Box>
				<Divider />
				<Stack direction="column" sx={{ display: { xs: 'flex', md: 'flex' }, alignSelf: 'center' }}>
					<FormControl sx={{ display: { sm: 'flex', md: 'flex', width: '350px' }, gap: 0.8 }}>
						<Select size="sm" defaultValue="Seleccionar carrera" placeholder="Seleccionar carrera" id="idcarrera" name="idcarrera" onChange={handleChange}>
							{carreraData.map((carrera, index) => (
								<Option key={index} value={carrera.idCarrera}>{carrera.nombre}</Option>
							))}
						</Select>

						<Select size="sm" defaultValue="Seleccionar asignatura" placeholder="Seleccionar asignatura" id="idasignatura" name="idasignatura" onChange={handleChangeAsignatura}>
							{Array.isArray(asignaturaNoAprobadaData) && asignaturaNoAprobadaData.map((asignatura, index) => (
								<Option key={index} value={asignatura.idAsignatura}>{asignatura.nombre}</Option>
							))}
						</Select>
						<Divider />

						<Select size="sm" defaultValue="Seleccionar asignatura" placeholder="Seleccionar asignatura" id="idexamen" name="idexamen" >
							{Array.isArray(fechaData) && fechaData.map((f, index) => (
								<Option key={index} value={f.idExamen}>{f.idExamen}</Option>
							))}
						</Select>


						{/* <ListItem nested>
						</ListItem> */}
						{/* {Array.isArray(horarioData) && horarioData.map((horario, index) => (

							<List sx={{ fontSize: 16 }}>
								<IconButton aria-label="save" size="sm" key={index} value={horario.value}>
									<TodayRoundedIcon sx={{ fontSize: 20 }} />
									<ListItemDecorator>
										{horario.diaSem} {horario.horaInicio} a {horario.horaFin}  y {horario.diaSem2} {horario.horaInicio2} a {horario.horaFin2}
									</ListItemDecorator>
								</IconButton>
							</List>

						))} */}

					</FormControl>

					<Stack direction="row" spacing={0.8} sx={{ marginTop: 1, justifyContent: 'right', zIndex: '1000' }}>
						<Button type="submit" fullWidth sx={{ mt: 1, mb: 3, border: 0.01, borderColor: '#3d3d3d' }} variant="soft">Guardar</Button>
						<Button size="sm" variant="outlined" fullWidth color="neutral" href='/'>Cancelar</Button>
					</Stack>
				</Stack>
			</Card>
		</Box>

	);
};
