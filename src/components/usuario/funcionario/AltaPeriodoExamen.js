import React, { useState, useEffect, useContext } from 'react';

import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Divider from '@mui/joy/Divider';
import FormControl from '@mui/joy/FormControl';
import Input from '@mui/joy/Input';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import Card from '@mui/joy/Card';
import { AuthContext } from '../../../context/AuthContext';
import { getCarreras, altaPeriodoExamen } from '../../../services/requests/carreraService';
import Option from '@mui/joy/Option';
import Select from '@mui/joy/Select';
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';
import DtFecha from '../../../services/data/DtFecha';


export default function AltaPeriodoExamen() {
	const { user } = useContext(AuthContext);
	const [carreraData, setCarreraData] = useState([]);
	const history = useNavigate();
	const [error, setError] = useState(null);


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

		const dtFechaInicio = new DtFecha(fechaInicio);
		const dtFechaFin = new DtFecha(fechaFin);

		try {
			await altaPeriodoExamen(dtFechaInicio, dtFechaFin, idCarrera, user.jwtLogin);
			swal({
				title: "¡Periodo examen creado!\n\n",
				text: "El periodo examen ha sido creada con éxito.",
				icon: "success",
				dangerMode: false,
				position: "center",
				timer: 3000
			});
			history('/Novedades');
		} catch (error) {
			let errorMsg = 'Los datos ingresados no son correctos o la carrera ya tiene un periodo de examen';
			if (error.status === 401) {
				errorMsg = 'No autorizado. Verifica tu token de autenticación.';
			} else if (error.status === 500) {
				errorMsg = 'Error interno del servidor. Inténtalo más tarde.';
			}
			swal("Error", errorMsg, "error", {
				timer: 3000
			});
		}
	};


	return (
		<>
			<Box component="form" sx={{ marginTop: 5, display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', }} onSubmit={handleSubmit}>
				<Card sx={{ display: 'flex', alignSelf: 'center', }}>
					<Box sx={{ margin: 1, alignSelf: 'center' }}>
						<Typography level="title-lg">Registro de períodos de examen</Typography>
					</Box>
					<Divider />
					<Stack direction="column" sx={{ display: { xs: 'flex', md: 'flex' }, alignSelf: 'center' }}>
						<FormControl sx={{ display: { sm: 'flex', md: 'flex', width: '350px' }, gap: 1 }}>
							<Select size="sm" defaultValue="Seleccionar carrera" placeholder="Seleccionar carrera" id="idcarrera" name="idcarrera">
								{carreraData.map((carrera, index) => (
									<Option key={index} value={carrera.idCarrera}>{carrera.nombre}</Option>
								))}
							</Select>
							<Input size="sm" type="date" id="fechaInicio" name="fechaInicio" required />
							<Input size="sm" type="date" id="fechaFin" name="fechaFin" required />
							{/* value={value2} onChange={(newValue2) => setValue2(newValue2)} /> */}
							<Divider />

						</FormControl>
						<Stack direction="row" spacing={1} sx={{ marginTop: 1, justifyContent: 'right' }}>
							<Button type="submit" size="md" fullWidth variant="solid">Guardar</Button>
							<Button size="md" variant="outlined" fullWidth color="neutral" href='/'>Cancelar</Button>
						</Stack>
					</Stack>
				</Card>
			</Box>
		</>
	);
};
