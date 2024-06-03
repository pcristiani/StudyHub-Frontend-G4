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
import { Chip } from '@mui/joy';

import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext';
import { getCarreras } from '../../../services/requests/carreraService';
import { getAsignaturasDeCarrera } from '../../../services/requests/asignaturaService';


export default function RegistrarPreviaturas() {
	const { user } = useContext(AuthContext);
	const history = useNavigate();
	const [carreraData, setCarreraData] = useState([]);
	const [asignaturaData, setAsignaturaData] = useState([]);
	const [previasData, setPreviasData] = useState([]);
	const [error, setError] = useState(null);
	const [selectedCarrera, setSelectedCarrera] = useState('');


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

	const handleChange = (event, newValue) => {
		console.log("Selected: ", newValue);
		setSelectedCarrera(newValue);
		if (selectedCarrera !== null) {
			getInfoCarrera(newValue);
		}
	};
	console.log("Selected carrera: ", selectedCarrera);


	async function getInfoCarrera(selectedCarrera) {
		let result = await getAsignaturasDeCarrera(selectedCarrera, user.jwtLogin);
		setAsignaturaData(result);
	}

	///
	const handleSubmit = async (event) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		let idAsignatura = data.get('idasignatura');
		let idCarrera = data.get('idcarrera');


		let previaturas = data.get('idprevias') ? data.get('idprevias').split('').map(item => {
			const num = parseInt(item.trim(), 10);
			return isNaN(num) ? null : num;
		}).filter(item => item !== null) : [];
		console.log("Id previaturas: ", previaturas);

		try {
			//      await altaAsignatura(nombre, creditos, descripcion, departamento, previaturas, idCarrera, idDocente, user.jwtLogin);
			swal({
				title: "Previatura asignada!\n\n",
				text: "La previatura ha sido asignada con éxito.",
				icon: "success",
				dangerMode: false,
				position: "center",
				timer: 4000
			});
			history('/Novedades');
		} catch (error) {
			let errorMsg = 'Los datos ingresados no son correctos o ya existe una previa con ese nombre';
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
		<Box component="form" sx={{ marginTop: 6, display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', }} onSubmit={handleSubmit}>
			<Card sx={{ display: 'flex', alignSelf: 'center', }}>
				<Box sx={{ margin: 1, alignSelf: 'center' }}>
					<Typography level="title-lg">Registrar previaturas</Typography>
				</Box>
				<Divider />
				<Stack direction="column" sx={{ display: { xs: 'flex', md: 'flex' }, alignSelf: 'center' }}>
					<FormControl sx={{ display: { sm: 'flex', md: 'flex', width: '350px' }, gap: 0.8 }}>
						<Select size="sm" defaultValue="Seleccionar carrera" placeholder="Seleccionar carrera" id="idcarrera" name="idcarrera" onChange={handleChange}>
							{carreraData.map((carrera, index) => (
								<Option key={index} value={carrera.idCarrera}>{carrera.nombre}</Option>
							))}
						</Select>
						{/* <Divider /> */}

						<Select size="sm" defaultValue="Seleccionar asignatura" placeholder="Seleccionar asignatura" id="idasignatura" name="idasignatura" >
							{Array.isArray(asignaturaData) && asignaturaData.map((asignatura, index) => (
								<Option key={index} value={asignatura.idAsignatura}>{asignatura.nombre}</Option>
							))}
						</Select>

						<Divider />
						<Select size="sm" placeholder="Seleccionar previas" multiple renderValue={(selected) => (
							<Box sx={{ display: 'flex', gap: '0.25rem' }}>
								{selected.map((selectedOption) => (
									<Chip variant="soft" color="primary">
										{selectedOption.label}
									</Chip>
								))}
							</Box>
						)}
							slotProps={{ listbox: { sx: { width: '100%', }, }, }}
							id="idprevias" name="idprevias">
							{Array.isArray(previasData) && previasData.map((previas, index) => (
								<Option key={index} value={previas.idAsignatura}>{previas.nombre}</Option>
							))}
						</Select>
						<Divider />
					</FormControl>
					<Stack direction="row" spacing={0.8} sx={{ marginTop: 1, justifyContent: 'right' }}>
						<Button type="submit" fullWidth sx={{ mt: 1, mb: 3, border: 0.01, borderColor: '#3d3d3d' }} variant="soft">Guardar</Button>
						<Button size="sm" variant="outlined" fullWidth color="neutral" href='/'>Cancelar</Button>
					</Stack>
				</Stack>
			</Card>
		</Box>
	);
};
