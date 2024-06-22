import React from 'react';
import { Link } from 'react-router-dom';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import swal from 'sweetalert';
import { Input } from 'reactstrap';
import Button from '@mui/joy/Button';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import Container from '@mui/joy/Container';
import Card from '@mui/joy/Card';

import { PARAMETERS, URL_BACK, redirigir, URI_FRONT } from '../../services/util/constants'
import { Divider, Sheet } from '@mui/joy';
import FormControl from '@mui/joy/FormControl';
import Stack from '@mui/joy/Stack';


// olvido-contrasenia
const defaultTheme = createTheme();

const ForgotPassword = () => {
	let params = new URLSearchParams(window.location.search);
	let token = params.get('token');
	const redirectHome = URI_FRONT.novedadesUri;

	async function emailValue(email) {
		let response = await fetch(URL_BACK.forgotPassword, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${PARAMETERS.accessToken}`,
			},
			body: email
		})

		if (response.ok) {
			swal({
				title: "Email de recuperacion su correo electronico.\n\n",
				icon: "success",
				position: "center",
				timer: 4000
			});

			redirigir(redirectHome);
		} else {
			swal("¡Advertencia!", 'Email invalido', "error", {
				timer: 3000
			});
		}
	}

	const handleSubmit = (event) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		let email = data.get('email');
		emailValue(email);
	}


	async function recuperarPassword(token, newPassword) {
		const redirectLogin = URI_FRONT.loginUri;

		let body = { "token": token, "newPassword": newPassword };
		let response = await fetch(URL_BACK.recuperarPassword, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${PARAMETERS.accessToken}`,
			},
			body: JSON.stringify(body)
		})

		if (response.ok) {
			swal({
				title: "Se actualizo correctamente su contraseña.\n\n",
				icon: "success",
				position: "center",
				timer: 3000
			});
			redirigir(redirectLogin);
		} else {
			swal("¡Advertencia!", 'Email invalido', "error", {
				timer: 3000
			});
		}
	}

	const resetPassword = (event) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		let newPass = data.get('newPass');
		let confirmNewPass = data.get('confirmNewPass');

		if (newPass === confirmNewPass) {
			recuperarPassword(token, confirmNewPass);
		} else {
			swal("¡Advertencia!", 'La contraseña no coincide', "error", {
				timer: 3000
			});
		}
	}

	return (
		<Sheet>
			<Container component="main" maxWidth="xs" sx={{ marginBlockEnd: 12 }}>
				<Box sx={{ marginTop: 6, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
					{(!token) ?
						<Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 0 }}>
							<Card sx={{ display: 'flex', alignSelf: 'center', }}>
								<Box sx={{ margin: 0.6, alignSelf: 'center' }}>
									<Typography sx={{ textAlign: 'center' }} variant="plain" color="primary" noWrap>Verificar su identidad</Typography>
								</Box>
								<Divider />
								<Stack direction="column" sx={{ display: { xs: 'flex', md: 'flex' }, alignSelf: 'center' }}>
									<FormControl sx={{ display: { sm: 'flex', md: 'flex', width: '300px' }, gap: 0.8 }}>
										<Input size="sm" id="email" name="email" placeholder="Ingresar correo de recuperacion" autoComplete="text" autoFocus required />
									</FormControl>
									<Stack direction="row" spacing={0.8} sx={{ marginTop: 1, justifyContent: 'right', zIndex: '1000' }}>
										<Button type="submit" fullWidth sx={{ mt: 1, mb: 3, border: 0.01, borderColor: '#3d3d3d' }} variant="soft">Siguiente</Button>
									</Stack>
								</Stack>
							</Card>
						</Box>
						:
						<Box component="form" onSubmit={resetPassword} noValidate sx={{ mt: 0 }}>
							<Card sx={{ display: 'flex', alignSelf: 'center', }}>
								<Box sx={{ margin: 0.6, alignSelf: 'center' }}>
									<Typography sx={{ textAlign: 'center' }} variant="plain" color="primary" noWrap>Restablezca la contraseña</Typography>
								</Box>
								<Divider />
								<Stack direction="column" sx={{ display: { xs: 'flex', md: 'flex' }, alignSelf: 'center' }}>
									<FormControl sx={{ display: { sm: 'flex', md: 'flex', width: '320px' }, gap: 1 }}>
										<Input size="sm" name="newPass" placeholder="Nueva contraseña" type="password" id="newPass" autoComplete="current-password" required />
										<Input size="sm" name="confirmNewPass" placeholder="Confirmar nueva contraseña" type="password" id="confirmNewPass" autoComplete="current-password" required />
									</FormControl>
									<Stack direction="row" spacing={1} sx={{ marginTop: 2, justifyContent: 'right' }}>
										<Button type="submit" fullWidth sx={{ mt: 1, mb: 3, border: 0.01, borderColor: '#3d3d3d' }} variant="soft">Cambiar contraseña</Button>
										<Button variant="outlined" fullWidth color="neutral" component={Link} to="/novedades">Cancelar</Button>
									</Stack>
								</Stack>
							</Card>
						</Box>
					}
				</Box>
			</Container>
		</Sheet >
	);
}
export default ForgotPassword;