import React, { useContext, useEffect, useState } from 'react';

import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Divider from '@mui/joy/Divider';
import FormControl from '@mui/joy/FormControl';
import Input from '@mui/joy/Input';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import Card from '@mui/joy/Card';
import { AuthContext } from '../../context/AuthContext';
import { getUsuario } from "../../services/requests/usuarioService";
import { useLocation } from 'react-router-dom';
import { getCarreraById } from '../../services/requests/carreraService';
import Textarea from '@mui/joy/Textarea';


export default function InfoCarreras() {
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
				console.log("Datos de la Carrera: ", result);
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
		<Box sx={{ marginTop: 6, display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', }}>
			<Card variant="outlined" sx={{ maxWidth: 400 }}>
				<Typography level="h4">	{userData.nombre}</Typography>
				<Typography level="h5" fontSize="sm" sx={{ mb: 0.5 }}>
					{userData.descripcion} 
				</Typography>
				<Typography level="h5" fontSize="sm" sx={{ mb: 0.5 }}>
					Requisitos: {userData.requisitos} 
				</Typography>
			</Card>
			<Card sx={{ display: 'flex', alignSelf: 'center', }}>
				<Box sx={{ margin: 0.6, alignSelf: 'center' }}>
					<Typography sx={{ textAlign: 'center' }} variant="plain" color="primary" noWrap>Datos de usuario</Typography>
				</Box>
				<Divider />
				<Box component="form" sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
					<Stack>
						<Stack>
							<FormControl sx={{ display: { sm: 'flex', md: 'flex', width: '320px' }, gap: 0.6 }}>
								<Typography
									fontSize="xl"
									lineHeight={1}
									startDecorator={
										<Typography fontSize="sm" textColor="text.secondary">
											Nombre
										</Typography>}
									sx={{ alignItems: 'flex-start' }}
								>
									{userData.nombre}
								</Typography>
								<Typography size="sm" textAlign={'center'}>{userData.nombre}</Typography>
								<Textarea minRows={2} size="sm" id="descripcion" name="descripcion" placeholder="Descripción" defaultValue={userData.descripcion} readOnly />
								<Textarea minRows={2} size="sm" id="requisitos" name="requisitos" placeholder="Requisitos" defaultValue={userData.requisitos} readOnly />
								<Input size="sm" type="number" id="duracion" name="duracion" placeholder="Duración" defaultValue={userData.duracion} readOnly />
							</FormControl>
						</Stack>
					</Stack>
					<Stack direction="row" spacing={0.8} sx={{ marginTop: 1, justifyContent: 'right', zIndex: '1000' }}>
						<Button size="sm" fullWidth variant="soft" color="neutral" sx={{ mt: 1, mb: 3, border: 0.01, borderColor: '#3d3d3d' }} component="a" href='/dashboard-admin?id=l'>
							Atrás
						</Button>
					</Stack>
				</Box>
			</Card>
		</Box>
	);
}