import React, { useContext, useEffect, useState } from 'react';

import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Divider from '@mui/joy/Divider';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import { AuthContext } from '../../context/AuthContext';
import { useLocation } from 'react-router-dom';
import { getAsignaturaById, getPreviasAsignatura } from '../../services/requests/asignaturaService';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';


export default function InfoAsignatura() {
	const { user } = useContext(AuthContext);
	const [open, setOpen] = React.useState(true);
	const [userData, setUserData] = useState(null);
	const [previasData, setPreviasData] = useState([]);

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
			console.log("Datos del Usuario: ", userData.idAsignatura);
			if (userData.idAsignatura !== null && userData.idAsignatura !== undefined) {
				getInfoHorarios(userData.idAsignatura)
			}
		}
	}, [userData]);

	if (error) {
		return <div>Error: {error}</div>;
	}

	if (!userData) {
		return <div>Cargando...</div>;
	}

	const getInfoHorarios = async (idAsignatura) => {
		setPreviasData('');
		let resulta = await getPreviasAsignatura(idAsignatura, user.jwtLogin);
		setPreviasData(resulta);
	}

	const urlListaAsig = '/listado-asignaturas?id=';

	return (
		<React.Fragment>
			<Modal open={open} onClose={() => setOpen(true)} component="a" href={urlListaAsig + userData.idCarrera}>
				<ModalDialog>
					<Stack spacing={0.5} >
						<Box spacing={1} sx={{ alignSelf: 'center', zIndex: '1000' }}>
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
						<Typography level="h5" fontSize="sm" sx={{ mb: 0.5}}>
							{userData.creditos} creditos.
						</Typography>
						<Typography level="h5" fontSize="sm" sx={{ mb: 0.5 }}>
							{previasData.length === 0 ? 'No tiene previas' : "Previas: " +
								previasData.map(previa => previa.nombre).join(', ')}.
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