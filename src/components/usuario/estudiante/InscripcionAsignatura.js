import React, { useState, useEffect, useContext } from 'react';

import swal from 'sweetalert';
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
import { getAsignaturasDeCarrera, getHorarios } from '../../../services/requests/asignaturaService';



export default function InscripcionAsignatura() {
	const { user } = useContext(AuthContext);
	const history = useNavigate();
	const [error, setError] = useState(null);

	// const [selectedCarrera, setSelectedCarrera] = useState([]);

	const [carreraData, setCarreraData] = useState([]);
	const [asignaturaData, setAsignaturaData] = useState([]);
	const [horarioData, setHorarioData] = useState([]);

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
			//	console.log("Carreras: ", carreraData);
		}
	}, [carreraData]);


	///
	const handleChange = (event, newValue) => {
		// setSelectedCarrera(newValue);
		getInfoAsignaturasDeCarrera(newValue);
	};

	async function getInfoAsignaturasDeCarrera(idCarreraSeleccionada) {
		if (idCarreraSeleccionada !== null) {
			let result = await getAsignaturasDeCarrera(idCarreraSeleccionada, user.jwtLogin);
			setAsignaturaData(result);
		}
	}


	const handleChangeAsignatura = (event, newValue) => {
		if (newValue !== null) {
			getInfoHorario(newValue);
		}
	};



	async function getInfoHorario(newValue) {

		if (newValue !== null) {
			let result = await getHorarios(newValue, user.jwtLogin);

			if (horarioData !== null && horarioData !== undefined && horarioData.length > 0) {
				setHorarioData([]);
			}
			result.forEach(item => {
				if (item !== null && item !== undefined) {
					setHorarioData(prev => [...prev, item]);
					// if (item.dtHorarioDias.length > 1) {
					// 	for (let i = 0; i < item.dtHorarioDias.length; i++) {
					// 		setHorarioData(prev => [...prev, item.dtHorarioDias[i]]);
					// 	}
					// } else {
					// }
				}
			});
		}
	}

	// const handleValidateClick = (event) => {
	const handleValidateClick = (event, newValue) => {

		console.log("Selasdas", newValue);
		// event.preventDefault();
		// const data = new FormData(event.currentTarget);
		// let idhorario = data.get('idhorario');
		// console.log("Selected s: ", idhorario);
	};


	///
	const handleSubmit = async (event) => {

		event.preventDefault();
		const data = new FormData(event.currentTarget);
		let idhorario = data.get('idhorario');
		console.log("Sesss: ", idhorario);

	};

	const [small, setSmall] = React.useState(false);
	return (
		<Box component="form" sx={{ marginTop: 6, display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }} onSubmit={handleSubmit}>
			<Card sx={{ display: 'flex', alignSelf: 'center', }}>
				<Box sx={{ margin: 0.6, alignSelf: 'center' }}>
					<Typography sx={{ textAlign: 'center' }} variant="plain" color="primary" noWrap>Inscripción asignatura</Typography>
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
							{Array.isArray(asignaturaData) && asignaturaData.map((asignatura, index) => (
								<Option key={index} value={asignatura.idAsignatura}>{asignatura.nombre}</Option>
							))}
						</Select>
						<Divider />

						{/* <Select size="sm" defaultValue="Seleccionar idhorario" placeholder="Seleccionar horario" id="idhorario" name="idhorario" onChange={handleValidateClick}>
							{Array.isArray(horarioData) && horarioData.map((horario, index) => (
								<Option key={index} value={horario.idHorarioAsignatura}>{horario.dtHorarioDias[0].diaSemana}</Option>
							))}
						</Select> */}
						{/* <Select size="sm" defaultValue="" placeholder="Seleccionar horario" id="idhorario" name="idhorario" width="150px">
							{Array.isArray(horarioData) && horarioData.map((horario, index) => (
								horario.dtHorarioDias.map((dia, diaIndex) => (
									<option key={`${index}-${diaIndex}`} value={horario.idHorarioAsignatura}>
										{`Asignatura ${horario.idAsignatura} - ${dia.diaSemana} ${dia.horaInicio} - ${dia.horaFin}`}
									</option>
								))
							))}
						</Select> */}
						{/* <Divider /> */}

						<Select size="sm" defaultValue="Seleccionar horario" placeholder="Seleccionar horario" id="idhorario" name="idhorario" onChange={handleValidateClick}>
							{/* <List sx={{ fontSize: 16 }} id="idhorario" name="idhorario" > */}
							{Array.isArray(horarioData) && horarioData.map((horario, index) => (

								<Option key={index} value={horario.idHorarioAsignatura} >
									{horario.dtHorarioDias[0].diaSemana}: {horario.dtHorarioDias[0].horaInicio} a {horario.dtHorarioDias[0].horaFin}
								</Option>

							))}
							{/* </List> */}

						</Select>


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
