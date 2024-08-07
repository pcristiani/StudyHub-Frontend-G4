import React, { useContext, useEffect, useState } from 'react';

import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Divider from '@mui/joy/Divider';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import { AuthContext } from '../../context/AuthContext';
import { useLocation } from 'react-router-dom';
import { getCarreraById } from '../../services/requests/carreraService';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';


export default function InfoCarreras() {
	const [open, setOpen] = React.useState(true);
	const [carreraData, setCarreraData] = useState([]);

	const { user } = useContext(AuthContext);
	const [userData, setUserData] = useState(null);
	const [error, setError] = useState(null);
	const location = useLocation();
	const queryParams = new URLSearchParams(location.search);
	const idU = queryParams.get('id');

	useEffect(() => {
		const fetchUser = async () => {
			try {
				const result = await getCarreraById(idU, user.jwtLogin);
				//	console.log("Datos de la Carrera: ", result);
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


	return (
		<React.Fragment>
			<Modal open={open} onClose={() => setOpen(true)} component="a" href='/listado-carreras'>
				<ModalDialog>
					<Stack spacing={0.5}>
						<Box sx={{ marginBottom: 1, alignSelf: 'center' }}>
							<Typography level="h4" variant="plain" color="primary" >{userData.nombre}</Typography>
						</Box>
						<Divider />
						<Typography level="h5" fontSize="sm" sx={{ mb: 0.5 }}>
							{userData.descripcion}
						</Typography>
						<Typography level="h5" fontSize="sm" sx={{ mb: 0.5 }}>
							{userData.requisitos}
						</Typography>
						<Typography level="h5" fontSize="sm" sx={{ mb: 0.5 }}>
							{userData.duracion} años de duración.
						</Typography>
						<Stack direction="row" sx={{ justifyContent: 'right', zIndex: '1000' }}>
							<Button size="sm" fullWidth variant="plain" color="primary" sx={{ my: 1, mb: 0, border: 0.01, borderColor: '#3d3d3d' }} component="a" href='/listado-carreras'>
								Atrás
							</Button>
						</Stack>
					</Stack>
				</ModalDialog>
			</Modal>
		</React.Fragment>

		// <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', }}>
		// 	<Card variant="outlined" sx={{ width: 340 }}>
		// 		<Box sx={{ margin: 0.6, alignSelf: 'center' }}>
		// 			<Typography level="h4" variant="plain" color="primary" >{userData.nombre}</Typography>
		// 		</Box>
		// 		<Divider />
		// 		<Typography level="h5" fontSize="sm" sx={{ mb: 0.5 }}>
		// 			{userData.descripcion}
		// 		</Typography>
		// 		<Typography level="h5" fontSize="sm" sx={{ mb: 0.5 }}>
		// 			{userData.requisitos}
		// 		</Typography>
		// 		<Typography level="h5" fontSize="sm" sx={{ mb: 0.5 }}>
		// 			{userData.duracion} años de duración.
		// 		</Typography>
		// 		<Stack direction="row" spacing={0.8} sx={{ marginTop: 0.8, justifyContent: 'right', zIndex: '1000' }}>
		// 			<Button size="sm" fullWidth variant="soft" color="neutral" sx={{ mt: 1, mb: 3, border: 0.01, borderColor: '#3d3d3d' }} component="a" href='/listado-carreras'>
		// 				Atrás
		// 			</Button>
		// 		</Stack>
		// 	</Card>
		// </Box>
	);
}