import React, { useContext, useEffect, useState } from 'react';

import AspectRatio from '@mui/joy/AspectRatio';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Divider from '@mui/joy/Divider';
import FormControl from '@mui/joy/FormControl';
import Input from '@mui/joy/Input';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import Card from '@mui/joy/Card';
import { AuthContext } from '../../context/AuthContext';
import { getUsuario, modificarPerfilUsuario } from "../../services/requests/usuarioService";
import { types } from '../../context/types';


export default function EditarPerfil() {
	const { user } = useContext(AuthContext);
	const [userData, setUserData] = useState(null);
	const [userRol, setRolData] = useState(null);

	const [error, setError] = useState(null);
	const context = useContext(AuthContext);

	const DatosRol = [
		{ cod: 'A', rol: `Administrador` },
		{ cod: 'E', rol: `Estudiante` },
		{ cod: 'C', rol: `Coordinador` },
		{ cod: 'I', rol: `Invitado` },
		{ cod: 'F', rol: `Funcionario` }
	];

	useEffect(() => {
		const fetchUser = async () => {
			try {
				const result = await getUsuario(user.id, user.jwtLogin);
				setUserData(result);
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


	const autentication = (idUsuario, cedula, nombre, apellido, rol, email, jwtLogin) => {
		const action = {
			type: types.login,
			payload: {
				id: idUsuario,
				cedula: cedula,
				nombre: nombre,
				apellido: apellido,
				email: email,
				rol: rol,
				jwtLogin: jwtLogin
			}
		}
		context.dispatch(action);
	}

	const handleModificar = (event) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		let nombre = data.get('nombre');
		let apellido = data.get('apellido');
		let email = data.get('email');

		modificarPerfilUsuario(user.id, nombre, apellido, email, userData.fechaNacimiento, user.jwtLogin).then((result) => {
			if (result) {
				console.log("Datos modificados correctamente: ", result);
				autentication(user.id, user.cedula, nombre, apellido, user.rol, email, user.jwtLogin);
			} else {
				console.log("Error al modificar los datos del usuario: ", result);
			}
		});
	}

	return (
		<Box sx={{ marginTop: 6, display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', }}>
			<Card sx={{ display: 'flex', alignSelf: 'center', }}>
				<Box sx={{ alignSelf: 'center' }}>
					<Typography level="title-md">Datos de usuario</Typography>
				</Box>
				<Divider />
				<Box component="form" sx={{ marginTop: 1, display: 'flex', flexDirection: 'column', width: '100%' }} onSubmit={handleModificar}>
					<Stack>
						<Stack spacing={1}>
							<FormControl sx={{ display: { sm: 'flex', md: 'flex', width: '350px' }, gap: 0.6 }}>
								<Input size="sm" id="nombre" name="nombre" defaultValue={userData.nombre} />
								<Input size="sm" id="apellido" name="apellido" sx={{}} defaultValue={userData.apellido} />
								<Input size="sm" id="cedula" name="cedula" defaultValue={userData.cedula} readOnly />
								<Input size="sm" id="fechanacimiento" name="fechanacimiento" defaultValue={userData.fechaNacimiento} />
								<Input size="sm" id="email" name="email" type="email" defaultValue={userData.email} />

								{user.rol === "C" ? <Input size="sm" id="rol" name="rol" defaultValue='Coordinador' readOnly />
									: user.rol === "A" ? <Input size="sm" id="rol" name="rol" defaultValue='Administrador' readOnly />
										: user.rol === "F" ? <Input size="sm" id="rol" name="rol" defaultValue='Funcionario' readOnly />
											: user.rol === "E" ? <Input size="sm" id="rol" name="rol" defaultValue='Estudiante' readOnly />
												: user.rol === "I" ? <Input size="sm" id="rol" name="rol" defaultValue='Invitado' readOnly />
													: ''}
							</FormControl>
						</Stack>
					</Stack>
					<Stack direction="row" spacing={0.8} sx={{ marginTop: 1, justifyContent: 'right' }}>
						<Button type="submit" fullWidth sx={{ mt: 1, mb: 3, border: 0.01, borderColor: '#3d3d3d' }} variant="soft">Guardar</Button>
						<Button size="sm" fullWidth variant="outlined" color="neutral" component="a" href='/'>
							Cancelar
						</Button>
					</Stack>
				</Box>
			</Card>
		</Box>
	);
}