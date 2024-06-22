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
import { SelectProps } from '../../common/SelectProps';

import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext';
import { getCarrerasInscripto } from '../../../services/requests/carreraService';
import { getAsignaturasNoAprobadas } from '../../../services/requests/asignaturaService';
import { getAsignaturasConExamenPendiente, getExamenesAsignatura, inscripcionExamen } from '../../../services/requests/examenService';
import { errors } from '../../../services/util/errors';
import DtFecha from '../../../services/util/formatoFecha';


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
			// console.log("Carreras: ", carreraData);
		}
	}, [carreraData]);


	///
	const handleChange = (event, newValue) => {
		// console.log("Carrera seleccionada: ", newValue);
		getInfoAsignaturasDeEstudiante(newValue);
	};

	async function getInfoAsignaturasDeEstudiante(idCarrera) {
		if (idCarrera !== null && idCarrera !== undefined) {
			let result = await getAsignaturasConExamenPendiente(user.id, idCarrera, user.jwtLogin);
			setAsignaturaNoAprobadasData(result);
		}
	}

	const handleChangeAsignatura = async (event, newValue) => {
		if (newValue !== null && newValue !== undefined && newValue !== "") {
			let result = await getExamenesAsignatura(newValue, user.jwtLogin);
			getInfoExamenDate(result);
		}
	};

	async function getInfoExamenDate(fechaExamen) {
		const date = new Date('2024-06-13T01:50:21.000Z');
		const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
		date.toLocaleDateString('es-UY', options);
		// console.log('Fecha: ', date.getDate());
		// console.log('Fecha: ', formatFecha(fechaExamen));
		setFechaData(fechaExamen);
	}


	const handleSubmit = async (event) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		let idExamen = data.get('idexamen');
		let intIdExamen = parseInt(idExamen, 10);
		let result = await inscripcionExamen(user.id, intIdExamen, user.jwtLogin);
		console.log("result: ", result);
		if (result.status === 200) {
			let title = "¡Inscripto a examen!\n\n";
			errors(title, result.data, result.status);
			history('/novedades');
		} else {
			errors(result.data, "", result.status);
		}
	};


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
		<Box component="form" sx={{ marginTop: 6, display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }} onSubmit={handleSubmit} >
			<Card sx={{ display: 'flex', alignSelf: 'center', }}>
				<Box sx={{ margin: 0.6, alignSelf: 'center' }}>
					<Typography sx={{ textAlign: 'center' }} variant="plain" color="primary" noWrap>Inscripción examen</Typography>
				</Box>
				<Divider />
				<Stack direction="column" sx={{ display: { xs: 'flex', md: 'flex' }, alignSelf: 'center' }}>
					<FormControl sx={{ display: { sm: 'flex', md: 'flex', width: '350px' }, gap: 0.8 }}>
						<SelectProps size="sm" defaultValue="Seleccionar carrera" placeholder="Seleccionar carrera" id="idcarrera" name="idcarrera" onChange={handleChange}>
							{carreraData.map((carrera, index) => (
								<Option key={index} value={carrera.idCarrera}>{carrera.nombre}</Option>
							))}
						</SelectProps>

						<SelectProps size="sm" defaultValue="Seleccionar asignatura" placeholder="Seleccionar asignatura" id="idasignatura" name="idasignatura" onChange={handleChangeAsignatura}>
							{Array.isArray(asignaturaNoAprobadaData) && asignaturaNoAprobadaData.map((asignatura, index) => (
								<Option key={index} value={asignatura.idAsignatura}>{asignatura.nombre}</Option>
							))}
						</SelectProps>
						<Divider />

						<SelectProps size="sm" defaultValue="Seleccionar examen" placeholder="Seleccionar examen" id="idexamen" name="idexamen">
							{Array.isArray(fechaData) && fechaData.map((f, index) => (
								<Option key={index} value={f.idExamen}>{f.periodoExamen} - {formatFecha(f.fechaHora)}</Option>
							))}
						</SelectProps>
					</FormControl>

					<Stack direction="row" spacing={0.8} sx={{ marginTop: 1, justifyContent: 'right', zIndex: '1000' }}>
						<Button size="sm" type="submit" fullWidth sx={{ mt: 1, mb: 3, border: 0.01, borderColor: '#3d3d3d' }} variant="soft">Guardar</Button>
						<Button size="sm" variant="outlined" fullWidth color="neutral" component={Link} to="/novedades">Cancelar</Button>
					</Stack>
				</Stack>
			</Card>
		</Box>

	);
};
