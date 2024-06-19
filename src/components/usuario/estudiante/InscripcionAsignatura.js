import React, { useState, useEffect, useContext } from 'react';

import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Divider from '@mui/joy/Divider';
import FormControl from '@mui/joy/FormControl';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import Card from '@mui/joy/Card';
import Option from '@mui/joy/Option';
import { SelectProps } from '../../common/SelectProps';

import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext';
import { getCarrerasInscripto } from '../../../services/requests/carreraService';
import { getAsignaturasDeCarrera, getHorarios, inscripcionAsignatura } from '../../../services/requests/asignaturaService';
import { errors } from '../../../services/util/errors';


export default function InscripcionAsignatura() {
	const { user } = useContext(AuthContext);
	const history = useNavigate();
	const [error, setError] = useState(null);
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
				}
			});
		}
	}

	const consolidarHorarios = (horarios) => {
		if (horarios === null || horarios === undefined) {
			return [];
		} else {
			return horarios.map(horario => {
				const dias = horario.dtHorarioDias.map(dia => `${dia.diaSemana}: ${dia.horaInicio} a ${dia.horaFin}`).join(', ');
				return {
					...horario,
					diasConsolidados: dias
				};
			});
		}
	};

	const horariosConsolidados = consolidarHorarios(horarioData);
	const handleValidateClick = (event, newValue) => {
		console.log("ID HORARIO ", newValue);
	};


	///
	const handleSubmit = async (event) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		// let idasignatura = data.get('idasignatura');
		// let idhorario = data.get('idhorario');
		let idhorario = parseInt(data.get('idhorario'), 10);
		let idasignatura = parseInt(data.get('idasignatura'), 10);

		const response = await inscripcionAsignatura(user.id, idasignatura, idhorario, user.jwtLogin)
		console.log("Response: ", response);
		if (response.status === 200) {
			let title = "Inscripcion realizada!\n\n";
			errors(title, response.data, response.status);
			history('/novedades');
		} else {
			errors(response.data, response.data, response.status);
		}
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
					<FormControl sx={{ display: { sm: 'flex', md: 'flex', width: '380px' }, gap: 0.8 }}>
						<SelectProps size="sm" defaultValue="Seleccionar carrera" placeholder="Seleccionar carrera" id="idcarrera" name="idcarrera" onChange={handleChange}>
							{carreraData.map((carrera, index) => (
								<Option key={index} value={carrera.idCarrera}>{carrera.nombre}</Option>
							))}
						</SelectProps>
						<SelectProps size="sm" defaultValue="Seleccionar asignatura" placeholder="Seleccionar asignatura" id="idasignatura" name="idasignatura" onChange={handleChangeAsignatura}>
							{Array.isArray(asignaturaData) && asignaturaData.map((asignatura, index) => (
								<Option key={index} value={asignatura.idAsignatura}>{asignatura.nombre}</Option>
							))}
						</SelectProps>
						<Divider />

						<SelectProps size="sm" defaultValue="Seleccionar horario" placeholder="Seleccionar horario" id="idhorario" name="idhorario" onChange={handleValidateClick} width="150px">
							{Array.isArray(horarioData) && horariosConsolidados.map((horario, index) => (
								<Option key={index} value={horario.idHorarioAsignatura}>
									{`${horario.idHorarioAsignatura} - ${horario.diasConsolidados}`}
								</Option>
							))}
						</SelectProps>
					</FormControl>

					<Stack direction="row" spacing={0.8} sx={{ marginTop: 1, justifyContent: 'right', zIndex: '1000' }}>
						<Button size="sm" type="submit" fullWidth sx={{ mt: 1, mb: 3, border: 0.01, borderColor: '#3d3d3d' }} variant="soft">Guardar</Button>
						<Button size="sm" variant="outlined" fullWidth color="neutral" href='/'>Cancelar</Button>
					</Stack>
				</Stack>
			</Card>
		</Box>

	);
};
