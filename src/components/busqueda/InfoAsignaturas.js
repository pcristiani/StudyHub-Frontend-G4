import React, { useContext, useEffect, useState } from 'react';

import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Divider from '@mui/joy/Divider';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import { AuthContext } from '../../context/AuthContext';
import { useLocation } from 'react-router-dom';
import { getAsignaturaById } from '../../services/requests/asignaturaService';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';

export default function InfoAsignatura() {
	const { user } = useContext(AuthContext);
	const [open, setOpen] = React.useState(true);
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
			<React.Fragment>
			<Modal open={open} onClose={() => setOpen(true)} component="a" href={urlListaAsig + userData.idCarrera}>
					<ModalDialog>
						<Stack spacing={0.5}>
							<Box sx={{ marginBottom: 1, alignSelf: 'center' }}>
								<Typography level="h4" variant="plain" color="primary" >{userData.nombre}</Typography>
							</Box>
							<Divider />
							<Typography level="h5" fontSize="sm" sx={{ mb: 0.5 }}>
								{userData.descripcion}.
							</Typography>
							<Typography level="h5" fontSize="sm" sx={{ mb: 0.5 }}>
								Departamento {userData.departamento}.
							</Typography>
							<Typography level="h5" fontSize="sm" sx={{ mb: 0.5 }}>
								{userData.tieneExamen ? 'Tiene examen' : 'No tiene examen'}.
							</Typography>
							<Typography level="h5" fontSize="sm" sx={{ mb: 0.5 }}>
								{userData.creditos} creditos.
							</Typography>
							<Stack direction="row" sx={{ justifyContent: 'right', zIndex: '1000' }}>
							<Button size="sm" fullWidth variant="plain" color="primary" sx={{ my: 1, mb: 0, border: 0.01, borderColor: '#3d3d3d' }} component="a" href={urlListaAsig + userData.idCarrera}>
									Atrás
								</Button>
							</Stack>
						</Stack>
					</ModalDialog>
				</Modal>
		</React.Fragment>
	);
}