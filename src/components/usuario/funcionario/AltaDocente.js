import React, { useContext } from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Divider from '@mui/joy/Divider';
import FormControl from '@mui/joy/FormControl';
import Input from '@mui/joy/Input';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import Card from '@mui/joy/Card';
import { AuthContext } from '../../../context/AuthContext';
import { URL_BACK } from '../../../services/util/constants';
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';


export default function AltaDocente() {
	const { user } = useContext(AuthContext);
	console.log(user.jwtLogin);
	const history = useNavigate();

	async function altaDocente(codigoDocente, nombre) {

		let body = { "codigoDocente": codigoDocente, "nombre": nombre };
		let response = await fetch(URL_BACK.altaDocente, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${user.jwtLogin}`,
			},
			body: JSON.stringify(body)
		})

		if (response.ok) {
			swal({
				title: "¡Docente creado!\n\n",
				text: "El docente ha sido creado con éxito.",
				icon: "success",
				dangerMode: false,
				position: "center",
				timer: 4000
			});
			history('/');
		} else {
			let errorMsg = 'Los datos ingresados no son correctos o ya existe un docente con ese nombre';
			if (response.status === 401) {
				errorMsg = 'No autorizado. Verifica tu token de autenticación.';
			} else if (response.status === 500) {
				errorMsg = 'Error interno del servidor. Inténtalo más tarde.';
			}
			swal("Error", errorMsg, "error", {
				timer: 3000
			});
		}
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		let codigoDocente = data.get('codigoDocente');
		let nombre = data.get('nombre');
		altaDocente(codigoDocente, nombre);
	};


	return (
		<Box component="form" sx={{ marginTop: 6, display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', }} onSubmit={handleSubmit}>
			<Card sx={{ display: 'flex', alignSelf: 'center', }}>
				<Box sx={{ margin: 0.6, alignSelf: 'center' }}>
					<Typography sx={{ textAlign: 'center' }} variant="plain" color="primary" noWrap>Alta docente</Typography>
				</Box>
				<Divider />
				<Stack direction="column" sx={{ display: { xs: 'flex', md: 'flex' }, alignSelf: 'center' }}>
					<FormControl sx={{ display: { sm: 'flex', md: 'flex', width: '320px' }, gap: 0.8 }}>
						<Input size="sm" id="codigoDocente" name="codigoDocente" placeholder="Código" required />
						<Input size="sm" id="nombre" name="nombre" placeholder="Nombre" required />
					</FormControl>
					<Stack direction="row" spacing={0.8} sx={{ marginTop: 1, justifyContent: 'right' }}>
						<Button size="sm" type="submit" fullWidth sx={{ mt: 1, mb: 3, border: 0.01, borderColor: '#3d3d3d' }} variant="soft">Guardar</Button>
						<Button size="sm" variant="outlined" fullWidth color="neutral" component="a" href='/'>Cancelar</Button>
					</Stack>
				</Stack>
			</Card>
		</Box>
	);
};
