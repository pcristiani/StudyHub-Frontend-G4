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
import { Chip } from '@mui/joy';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext';
import { getCarreras } from '../../../services/requests/carreraService';
import { getAsignaturasDeCarrera, getNoPreviasAsignatura, registroPreviaturas } from '../../../services/requests/asignaturaService';
import { errors } from '../../../services/util/errors';
import { SelectProps } from '../../common/SelectProps';


export default function RegistrarPreviaturas() {
	const { user } = useContext(AuthContext);
	const history = useNavigate();
	const [carreraData, setCarreraData] = useState([]);
	const [asignaturaData, setAsignaturaData] = useState([]);
	const [previasData, setPreviasData] = useState([]);
	const [error, setError] = useState(null);
	const [selectedCarrera, setSelectedCarrera] = useState('');
	const [selectedPrevias, setSelectedPrevias] = useState('');


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
			console.log("IF Carreras: ", carreraData);
		}
	}, [carreraData]);

	const handleChange = (event, newValue) => {
		setSelectedCarrera(newValue);
		if (newValue !== null) {
			getInfoCarrera(newValue);
		}
	};

	async function getInfoCarrera(selectedCarrera) {
		let result = await getAsignaturasDeCarrera(selectedCarrera, user.jwtLogin);
		setAsignaturaData(result);
	}

	///
	const handleAsignatura = (event, newVa) => {
		if (newVa !== null) {
			setSelectedPrevias(newVa);
			getInfoPrevias(newVa);
		}
	};

	async function getInfoPrevias(miSelectId) {
		let resul = await getNoPreviasAsignatura(miSelectId, user.jwtLogin);
		setPreviasData(resul);
	}




	///
	const handleSubmit = async (event) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		let idCarrera = data.get('idcarrera');
		let idAsignatura = data.get('idasignatura');
		let idPrev = data.get('idprevias');

		const nroComoString = idPrev.slice(1, -1).split(',');
		const arrayPrevias = nroComoString.map(Number);
		const response = await registroPreviaturas(idAsignatura, arrayPrevias, user.jwtLogin);

		if (response.statusCodeValue === 200) {
			let title = "¡Previatura registada!\n\n";
			errors(title, response.body, response.statusCodeValue);
			history('/novedades');
		} else {
			console.log("Error: ", response);
			errors(response.body, response.body, response.status);
		}
	};


	return (
		<Box component="form" sx={{ marginTop: 6, display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', }} onSubmit={handleSubmit}>
			<Card sx={{ display: 'flex', alignSelf: 'center', }}>
				<Box sx={{ margin: 0.6, alignSelf: 'center' }}>
					<Typography sx={{ textAlign: 'center' }} variant="plain" color="primary" noWrap>Registrar previaturas</Typography>
				</Box>
				<Divider />
				<Stack direction="column" sx={{ display: { xs: 'flex', md: 'flex' }, alignSelf: 'center' }}>
					<FormControl sx={{ display: { sm: 'flex', md: 'flex', width: '320px' }, gap: 0.8 }}>
						<Select size="sm" defaultValue="Seleccionar carrera" placeholder="Seleccionar carrera" id="idcarrera" name="idcarrera" onChange={handleChange}>
							{carreraData.map((carrera, index) => (
								<Option key={index} value={carrera.idCarrera}>{carrera.nombre}</Option>
							))}
						</Select>

						<SelectProps size="sm" defaultValue="Seleccionar asignatura" placeholder="Seleccionar asignatura" id="idasignatura" name="idasignatura" onChange={handleAsignatura}>
							{Array.isArray(asignaturaData) && asignaturaData.map((asignatura, index) => (
								<Option key={index} value={asignatura.idAsignatura}>{asignatura.nombre}</Option>
							))}
						</SelectProps>

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
							slotProps={{ listbox: { sx: { width: '100%', }, }, }} id="idprevias" name="idprevias">
							{Array.isArray(previasData) && previasData.map((previas, index) => (
								<Option key={index} value={previas.idAsignatura}>{previas.nombre}</Option>
							))}
						</Select>
						<Divider />
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