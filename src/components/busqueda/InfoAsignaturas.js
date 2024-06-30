import React, { useContext, useEffect, useState } from 'react';

import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Divider from '@mui/joy/Divider';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import Card from '@mui/joy/Card';
import { AuthContext } from '../../context/AuthContext';
import { useLocation } from 'react-router-dom';
import { getAsignaturaById } from '../../services/requests/asignaturaService';


export default function InfoAsignatura() {
	const { user } = useContext(AuthContext);
	const [userData, setUserData] = useState(null);
	const [error, setError] = useState(null);
	const location = useLocation();
	const queryParams = new URLSearchParams(location.search);
	const idU = queryParams.get('id');

	useEffect(() => {
		const fetchUser = async () => {
			try {
				const result = await getAsignaturaById(idU, user.jwtLogin);
				setUserData(result.data);
			} catch (error) {
				setError(error.message);
			}
		};
		fetchUser();
	}, [user]);


	useEffect(() => {
		if (userData) {
			console.log("Datos del Usuario: ", userData);
		}
	}, [userData]);

	if (error) {
		return <div>Error: {error}</div>;
	}

	if (!userData) {
		return <div>Cargando...</div>;
	}

	const urlListaAsig = '/listado-asignaturas?id=';
	return (
		<Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', }}>
			<Card variant="outlined" sx={{ width: 340 }}>
				<Box sx={{ margin: 0.6, alignSelf: 'center' }}>
					<Typography level="h4" variant="plain" color="primary" >{userData.nombre}</Typography>
				</Box>
				<Divider />
				<Typography level="h5" fontSize="sm" sx={{ mb: 0.3 }}>
					{userData.descripcion}
				</Typography>
				<Typography level="h5" fontSize="sm" sx={{ mb: 0.3 }}>
					{userData.departamento}
				</Typography>
				<Typography level="h5" fontSize="sm" sx={{ mb: 0.3 }}>
					{userData.tieneExamen ? 'Tiene examen' : 'No tiene examen'}
				</Typography>
				<Typography level="h5" fontSize="sm" sx={{ mb: 0.3 }}>
					{userData.creditos} creditos.
				</Typography>
				<Stack direction="row" spacing={0.8} sx={{ marginTop: 0.8, justifyContent: 'right', zIndex: '1000' }}>
					<Button size="sm" fullWidth variant="soft" color="neutral" sx={{ mt: 1, mb: 3, border: 0.01, borderColor: '#3d3d3d' }} component="a" href={urlListaAsig + userData.idCarrera}>
						Atrás
					</Button>
				</Stack>
			</Card>
		</Box >
	);
}