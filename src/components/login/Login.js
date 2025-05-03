import React, { useContext, useEffect } from 'react';
import Button from '@mui/joy/Button';
// import { Input } from 'reactstrap';
import Stack from '@mui/joy/Stack';
import Input from '@mui/joy/Input';

import Link from '@mui/joy/Link';
import Grid from '@mui/joy/Grid';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import Container from '@mui/joy/Container';
import logo from '../../img/logo.png';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { types } from '../../context/types';
import { getToken } from '../../services/requests/loginService';
import { getUsuario } from '../../services/requests/usuarioService';
import { decodificaJwt } from '../../services/util/conversionBase64';
import { Sheet } from '@mui/joy';
import { errors } from '../../services/util/errors';


///

function Login() {
	const context = useContext(AuthContext);
	const history = useNavigate();

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


	async function getInfoUsuario(payload, jwtLogin) {
		let user = await getUsuario(payload.id, jwtLogin);
		autentication(user.idUsuario, user.cedula, user.nombre, user.apellido, user.rol, user.email, jwtLogin);
		let rol = `Estudiante`;
		if (user.rol === 'A') rol = `Administrador`;
		if (user.rol === 'C') rol = `Coordinador`;
		if (user.rol === 'I') rol = `Invitado`;
		if (user.rol === 'F') rol = `Funcionario`;

		let title = "Acceso correcto";
		let text = "Nombre: " + user.nombre + " " + user.apellido + "\nCedula: " + user.cedula + "\nRol: " + rol;
		errors(title, text, 200);
	}

	const handleSubmit = (event) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		let cedula = data.get('cedula');
		let password = data.get('password');

		// console.log("log", !isNaN(password));
		// if (isNaN(password)) {
		// 	password = "\"" + password + "\"";
		// }

		async function validarLogin() {
			const response = await getToken(cedula, password);
			let payload = null;
			if (response.status === 200) {
				payload = decodificaJwt(response.data);
				getInfoUsuario(payload, response.data).then(() => {
				});
			} else {
				errors(response.data, response.data, response.status);
			}
		}
		validarLogin();
	}

	return (
		<Sheet>
			<Container component="main" maxWidth="xs" sx={{ marginBlockEnd: 12}}>
				<Box sx={{ marginTop: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
					<div sx={{ bgcolor: 'secondary.main' }}>
						<img src={logo} className="animate-bounce" alt="logo" />
					</div>
					<h2 component="h1" variant="h4">Iniciar Sesión</h2>

					<Typography variant="body2" fontSize={15} color="text.secondary">¿Aun no tienes cuenta?
						<Link href="/registrarse" fontSize={15} variant="body2" sx={{ p: 0.5 }}>Entra aquí</Link>
					</Typography>
					<Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, width: '300px', height: '35px', zIndex: '1000' }}>
						<Stack spacing={0.8}>

							<Input size="md" id="cedula" label="Cédula" name="cedula" autoComplete="text" placeholder="Cédula" autoFocus required />
							<Input size="md" name="password" label="Contraseña" type="password" id="password" placeholder="Contraseña" autoComplete="current-password" required />
							<Button type="submit" fullWidth sx={{ mt: 1, mb: 3, border: 0.01, borderColor: '#3d3d3d', zIndex: '1000' }} variant="soft">Iniciar sesión</Button>

							<Grid container spacing={1}>
								<Grid item>
								</Grid>
								<Link href="/olvido-contrasenia" variant="body2" fontSize={15}>¿Has olvidado tu contraseña?</Link>
							</Grid>
						</Stack>
					</Box>
				</Box>
			</Container>
		</Sheet>
	);
}

export default Login;
