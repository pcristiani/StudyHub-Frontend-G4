import React, { useContext, useEffect, useState } from 'react';

import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Divider from '@mui/joy/Divider';
import FormControl from '@mui/joy/FormControl';
import { Input } from 'reactstrap';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import Card from '@mui/joy/Card';
import { AuthContext } from '../../context/AuthContext';
import { getUsuario } from "../../services/requests/usuarioService";
import { useLocation } from 'react-router-dom';


export default function InfoUsuario() {
	const { user } = useContext(AuthContext);
	const [userData, setUserData] = useState(null);
	const [error, setError] = useState(null);
	const location = useLocation();
	const queryParams = new URLSearchParams(location.search);
	const idU = queryParams.get('id');

	useEffect(() => {
		const fetchUser = async () => {
			try {
				const result = await getUsuario(idU, user.jwtLogin);
				setUserData(result);
			} catch (error) {
				setError(error.message);
			}
		};
		fetchUser();
	}, [user]);


	useEffect(() => {
		if (userData) {
			// console.log("Datos del Usuario: ", userData);
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
			<Card sx={{ display: 'flex', alignSelf: 'center', }}>
				<Box sx={{ margin: 0.6, alignSelf: 'center' }}>
					<Typography sx={{ textAlign: 'center' }} variant="plain" color="primary" noWrap>Datos de usuario</Typography>
				</Box>
				<Divider />
				<Box component="form" sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
					<Stack>
						<Stack>
							<FormControl sx={{ display: { sm: 'flex', md: 'flex', width: '320px' }, gap: 0.6 }}>
								<Input size="sm" id="nombre" name="nombre" defaultValue={userData.nombre} readOnly />
								<Input size="sm" id="apellido" name="apellido" defaultValue={userData.apellido} readOnly />
								<Input size="sm" id="cedula" name="cedula" defaultValue={userData.cedula} readOnly />
								<Input size="sm" id="fechanacimiento" name="fechanacimiento" type="date" defaultValue={userData.fechaNacimiento} readOnly />
								<Input size="sm" id="email" name="email" type="email" defaultValue={userData.email} readOnly />
								{user.rol === "C" ? <Input size="sm" id="rol" name="rol" defaultValue='Coordinador' readOnly />
									: user.rol === "A" ? <Input size="sm" id="rol" name="rol" defaultValue='Administrador' readOnly />
										: user.rol === "F" ? <Input size="sm" id="rol" name="rol" defaultValue='Funcionario' readOnly />
											: user.rol === "E" ? <Input size="sm" id="rol" name="rol" defaultValue='Estudiante' readOnly />
												: user.rol === "I" ? <Input size="sm" id="rol" name="rol" defaultValue='Invitado' readOnly />
													: ''}
								<Divider />
							</FormControl>
						</Stack>
					</Stack>
					<Stack direction="row" spacing={0.8} sx={{ marginTop: 1, justifyContent: 'right', zIndex: '1000' }}>
						<Button size="sm" fullWidth variant="soft" color="neutral" sx={{ mt: 1, mb: 3, border: 0.01, borderColor: '#3d3d3d' }} component="a" href='/dashboard-admin?id=l'>Atrás</Button>
					</Stack>
				</Box>
			</Card>
		</Box>
	);
}