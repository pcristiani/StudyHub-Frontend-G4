import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';

import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Divider from '@mui/joy/Divider';
import FormControl from '@mui/joy/FormControl';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import Card from '@mui/joy/Card';
import Option from '@mui/joy/Option';

import Select from '@mui/joy/Select';

import { SelectProps } from '../../common/SelectProps';
import { Chip } from '@mui/joy';

import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext';
import { getCarrerasInscripto } from '../../../services/requests/carreraService';
import { getAsignaturasDeCarrera, getHorarios, inscripcionAsignatura } from '../../../services/requests/asignaturaService';
import { errors } from '../../../services/util/errors';

const diasSemana = [
	{ value: 'LUNES', label: 'Lunes' },
	{ value: 'MARTES', label: 'Martes' },
	{ value: 'MIERCOLES', label: 'Miércoles' },
	{ value: 'JUEVES', label: 'Jueves' },
	{ value: 'VIERNES', label: 'Viernes' },
	{ value: 'SABADO', label: 'Sábado' },
	{ value: 'DOMINGO', label: 'Domingo' },
];

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
				// const dias = horario.dtHorarioDias.map(dia => `${formatDiaSemana(horarios)} de ${dia.horaInicio} a ${dia.horaFin} (${horario.anio})`).join(', ');
				const dias = horario.dtHorarioDias.map(dia => `${dia.diaSemana} de ${dia.horaInicio} a ${dia.horaFin}`).join(', ');
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
		let idhorario = parseInt(data.get('idhorario'), 10);
		let idasignatura = parseInt(data.get('idasignatura'), 10);

		const response = await inscripcionAsignatura(user.id, idasignatura, idhorario, user.jwtLogin)
		let title = "Inscripcion realizada!\n\n";
		errors(title, response.data, response.status, true);
	};

	const [small, setSmall] = React.useState(false);

	return (
		<Box component="form" sx={{ marginTop: 6, display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }} onSubmit={handleSubmit}>
			<Card sx={{ display: 'flex', alignSelf: 'center', zIndex: '1000' }}>
				<Box sx={{ margin: 0.6, alignSelf: 'center' }}>
					<Typography sx={{ textAlign: 'center' }} variant="plain" color="primary" noWrap>Inscripción asignatura</Typography>
				</Box>
				<Divider />
				<Stack direction="column" sx={{ display: { xs: 'flex', md: 'flex' }, alignSelf: 'center' }}>
					<FormControl sx={{ display: { sm: 'flex', md: 'flex', width: '320px' }, gap: 0.8 }}>
						<SelectProps size="sm" placeholder="Seleccionar carrera" id="idcarrera" name="idcarrera" onChange={handleChange} required>
							{carreraData.map((carrera, index) => (
								<Option key={index} value={carrera.idCarrera}>{carrera.nombre}</Option>
							))}
						</SelectProps>
						<SelectProps size="sm" placeholder="Seleccionar asignatura" id="idasignatura" name="idasignatura" onChange={handleChangeAsignatura} required>
							{Array.isArray(asignaturaData) && asignaturaData.map((asignatura, index) => (
								<Option key={index} value={asignatura.idAsignatura}>{asignatura.nombre}</Option>
							))}
						</SelectProps>

						<SelectProps size="sm" placeholder="Seleccionar horario" id="idhorario" name="idhorario" onChange={handleValidateClick} required>
							{Array.isArray(horarioData) && horariosConsolidados.map((horario, index) => (
								<Option sx={{ maxWidth: '320px' }} key={index} value={horario.idHorarioAsignatura}>
									{`${horario.diasConsolidados}  (${horario.anio})`}
								</Option>
							))}
						</SelectProps>

					</FormControl>
					<Stack direction="row" spacing={0.8} sx={{ marginTop: 1, justifyContent: 'right', zIndex: '1000' }}>
						<Button size="sm" type="submit" fullWidth sx={{ mt: 1, mb: 3, border: 0.01, borderColor: '#3d3d3d' }} variant="soft">Guardar</Button>
						<Button size="sm" variant="outlined" fullWidth color="neutral" component={Link} to="/">Cancelar</Button>
					</Stack>
				</Stack>
			</Card>
		</Box>

	);
};

export function formatDiaSemana(diaSem) {
	let dsem = [];
	let result = [];

	if (diaSem !== null && diaSem !== undefined) {
		diaSem.map(horario => {
			dsem = horario.dtHorarioDias.map(diasem => diasem.diaSemana);
			diasSemana.map(dia => {
				if (dia.value === dsem[0] && dsem[0] !== null && dsem[0] !== undefined) {
					result.push(dia.label);
					console.log("DiaSem: ", result)
				}
			}
			);
		});
	}
	return result;
}