import React, { useContext, useEffect } from 'react';
import Button from '@mui/joy/Button';
import Input from '@mui/joy/Input';
import Stack from '@mui/joy/Stack';
import Link from '@mui/joy/Link';
import Grid from '@mui/joy/Grid';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import Container from '@mui/joy/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import swal from 'sweetalert';

import logo from '../../img/logo.png';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { types } from '../../context/types';
import { getToken } from '../../services/requests/loginService';
import { getUsuario } from '../../services/requests/usuarioService';
import { decodificaJwt } from '../../services/util/conversionBase64';
import { Sheet } from '@mui/joy';


const defaultTheme = createTheme();

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
		console.log("re", user);
		autentication(user.idUsuario, user.cedula, user.nombre, user.apellido, user.rol, user.email, jwtLogin);
		let rol = `Estudiante`;
		if (user.rol === 'A') rol = `Administrador`;
		if (user.rol === 'C') rol = `Coordinador`;
		if (user.rol === 'I') rol = `Invitado`;
		if (user.rol === 'F') rol = `Funcionario`;

		swal({
			title: "Acceso correcto\n\n",
			text: "Nombre: " + user.nombre + " " + user.apellido + "\nCedula: " + user.cedula + "\nRol: " + rol,
			icon: "success",
			dangerMode: false,
			position: "center",
			timer: 4000
		});
	}

	const handleSubmit = (event) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		let cedula = data.get('cedula');
		let password = data.get('password');

		async function validarLogin() {
			const token = await getToken(cedula, password);
			let payload = null;
			if (token !== null && token !== undefined) {
				payload = decodificaJwt(token);
				getInfoUsuario(payload, token).then(() => {
					history('/Novedades');
				});
			} else {
				swal("¡Advertencia!", 'Usuario y/o contraseña incorrecta', "error", {
					timer: 3000
				});
			}
		}
		validarLogin();
	}

	return (
		<Sheet>
			<Container component="main" maxWidth="xs" sx={{ marginBlockEnd: 12 }}>
				<Box sx={{ marginTop: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
					<div sx={{ bgcolor: 'secondary.main' }}>
						<img src={logo} className="animate-bounce" alt="logo" />
					</div>
					<h2 component="h1" variant="h4">Iniciar Sesión</h2>

					<Typography variant="body2" fontSize={15} color="text.secondary">¿Aun no tienes cuenta?
						<Link href="/registrarse" fontSize={15} variant="body2" sx={{ p: 0.5 }}>Entra aquí</Link>
					</Typography>
					<Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, width: '300px', height: '35px' }}>
						<Stack spacing={0.8}>
							<Input id="cedula" label="Cédula" name="cedula" autoComplete="text" autoFocus required />
							<Input name="password" label="Contraseña" type="password" id="password" autoComplete="current-password" required />
							{/* <FormControlLabel control={<Checkbox value="remember" size='sm' />} sx={{ mt: 0.5, mx: 0.5 }}
                                label="Recuerdame" /> */}

							{/* <Button type="submit" fullWidth sx={{ mt: 1, mb: 3 }}>Iniciar sesión</Button> */}
							{/* <Button type="submit" fullWidth sx={{ mt: 1, mb: 3, border: 0.1 }} variant="soft"> */}
							<Button type="submit" fullWidth sx={{ mt: 1, mb: 3, border: 0.01, borderColor: '#3d3d3d' }} variant="soft">
								Iniciar sesión</Button>


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




// if (response.ok) {
//     swal({
//         title: "Email de recuperacion su correo electronico.\n\n",
//         icon: "success",
//         position: "center",
//         timer: 4000
//     });
// } else {
//     swal("¡Advertencia!", 'Email invalido', "error", {
//         timer: 3000
//     });
// }

// return user;