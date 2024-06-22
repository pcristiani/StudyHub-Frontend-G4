import React, { useState, useEffect, useContext } from 'react';

import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Divider from '@mui/joy/Divider';
import FormControl from '@mui/joy/FormControl';
import { FormGroup, Label } from 'reactstrap';
import Input from '@mui/joy/Input';

import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import Card from '@mui/joy/Card';
import { AuthContext } from '../../../context/AuthContext';
import { getCarreras, altaPeriodoDeExamen } from '../../../services/requests/carreraService';
import Option from '@mui/joy/Option';
import { useNavigate } from 'react-router-dom';
import DtFecha from '../../../services/data/DtFecha';
import { errors } from '../../../services/util/errors';
import { SelectProps } from '../../common/SelectProps';

export const FechaExamen = () => {
	return (
		<Input
			size="sm"
			placeholder="Seleccionar periodo examen"
			type="date"
			id="fechaInicio"
			name="fechaInicio"
			required
		/>
	);
};

export default function AltaPeriodoExamen() {
	const { user } = useContext(AuthContext);
	const history = useNavigate();
	const [carreraData, setCarreraData] = useState([]);
	const [error, setError] = useState(null);
	const [selectedPeriodo, setSelectedPeriodo] = useState('');

	const periodoExamen = [
		{ value: 'Febrero', label: 'Febrero' },
		{ value: 'Julio', label: 'Julio' },
		{ value: 'Diciembre', label: 'Diciembre' },
	];

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
			console.log("Carreras: ", carreraData);
		}
	}, [carreraData]);


	const handleSubmit = async (event) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		let idCarrera = data.get('idcarrera');
		let fechaInicio = data.get('fechaInicio');
		let fechaFin = data.get('fechaFin');
		let nombrePeriodo = data.get('periodo');

		const dtFechaInicio = new DtFecha(fechaInicio);
		const dtFechaFin = new DtFecha(fechaFin);

		const response = await altaPeriodoDeExamen(nombrePeriodo, dtFechaInicio, dtFechaFin, idCarrera, user.jwtLogin);
		console.log("Response: ", response.data);
		if (response !== undefined) {
			if (response.data.status === 200 && response.data !== undefined && response.data !== null) {
				let title = "¡Periodo examen creado!\n\n";
				errors(title, response.data, response.data.status);
				history('/novedades');
			} else {
				errors(response.data, response.data, response.status);
			}
		} else {
			errors("Error", "El período ingresado se solapa con un período existente.", 500);
		}
	};


	return (
		<>
			<Box component="form" sx={{ marginTop: 6, display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', }} onSubmit={handleSubmit}>
				<Card sx={{ display: 'flex', alignSelf: 'center', }}>
					<Box sx={{ margin: 0.6, alignSelf: 'center' }}>
						<Typography sx={{ textAlign: 'center' }} variant="plain" color="primary" noWrap>Registro de períodos de éxamen</Typography>
					</Box>
					<Divider />
					<Stack direction="column" sx={{ display: { xs: 'flex', md: 'flex' }, alignSelf: 'center' }}>
						<FormControl sx={{ display: { sm: 'flex', md: 'flex', width: '320px' }, gap: 0.8 }}>
							<SelectProps size="sm" defaultValue="Seleccionar carrera" placeholder="Seleccionar carrera" id="idcarrera" name="idcarrera">
								{carreraData.map((carrera, index) => (
									<Option key={index} value={carrera.idCarrera}>{carrera.nombre}</Option>
								))}
							</SelectProps>

							<SelectProps size="sm" value={selectedPeriodo} onChange={(event, newValue) => setSelectedPeriodo(newValue)} placeholder="Seleccionar periodo examen" id="periodo" name="periodo">
								{periodoExamen.map((periodo) => (
									<Option key={periodo.value} value={periodo.value}>
										{periodo.label}
									</Option>
								))}
							</SelectProps>
							<Stack  sx={{  width: '100%', }}>
								<Label className='text-fecha'>Fecha Inicio
									<Input size='sm'  type="date" id="fechaInicio" name="fechaInicio" required />
								</Label>
								<Label className='text-fecha'>Fecha Fin
									<Input  size="sm" type="date" id="fechaFin" name="fechaFin" required />
								</Label>
							</Stack>
							<Divider />

						</FormControl>
						<Stack direction="row" spacing={0.8} sx={{ marginTop: 1, justifyContent: 'right', zIndex: '1000' }}>
							<Button size="sm" type="submit" fullWidth sx={{ mt: 1, mb: 3, border: 0.01, borderColor: '#3d3d3d' }} variant="soft">Guardar</Button>
							<Button size="sm" variant="outlined" fullWidth color="neutral" component="a" href='/'>Cancelar</Button>
						</Stack>
					</Stack>
				</Card>
			</Box>

		</>
	);
};

const timeSlots = Array.from(new Array(24 * 1)).map(
	(_, index) =>
		`${index < 20 ? '' : ''}${Math.floor(index / 1)
		}:00`,
);

