import React, { useEffect, useContext } from 'react';

import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import Input from '@mui/joy/Input';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import swal from 'sweetalert';
import { AuthContext } from '../../context/AuthContext';
import { modificarPassword } from '../../services/requests/loginService';
import { useNavigate } from 'react-router-dom';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import LinearProgress from '@mui/joy/LinearProgress';
import { Divider } from '@mui/joy';


export default function ModificarPassword() {
	const [value, setValue] = React.useState('');
	const [value2, setValue2] = React.useState('');
	const minLength = 12;

	const { user } = useContext(AuthContext);
	const history = useNavigate();
	const [open, setOpen] = React.useState(true);

	async function modificarPasswordUsuario(ud, s, userjwtLogin) {
		const result = await modificarPassword(ud, s, userjwtLogin);
		if (result !== null && result !== undefined) {
			swal("¡Éxito!", 'Has cambiado correctamente la contraseña', "success", {
				timer: 3000
			});
			history('/');
		} else {
			console.log('Error al cambiar la contraseña');
		}
	}

	const handleAsignar = (event) => {
		event.preventDefault();
		const dat = new FormData(event.currentTarget);
		let newPassword = dat.get('password');
		let newPassword2 = dat.get('password2');

		if (newPassword2 !== newPassword) {
			swal("¡Advertencia!", 'Contraseñas no coinciden', "error", {
				timer: 2000,
			});
		} else {
			modificarPasswordUsuario(user.id, newPassword, user.jwtLogin);
		}
	}
	useEffect(() => {
		if (!open) {
			history('/');
		}
	}, [open, history]);


	return (
		<React.Fragment>
			<Modal open={open} onClose={() => setOpen(false)}>
				<ModalDialog>
					<Typography sx={{ textAlign: 'center' }} variant="plain" color="primary" noWrap>Cambiar contraseña</Typography>
					<Divider />

					<form onSubmit={(event) => { event.preventDefault(); handleAsignar(event) && setOpen(false); }}>
						<Stack spacing={0.8} sx={{ '--hue': Math.min(value.length * 10, 120), }}>
							<FormControl sx={{ display: { sm: 'flex', md: 'flex', width: '260px' }, gap: 0.8 }}>

								<Input size="sm" type="password" id="password" name="password" placeholder="Contraseña nueva"
									value={value} onChange={(event) => setValue(event.target.value)} />
								<Input size="sm" type="password" id="password2" name="password2" placeholder="Confirma la contraseña nueva"
									value={value2} onChange={(event) => setValue2(event.target.value)} />

								{value === value2 &&
									<LinearProgress determinate size="sm" value={Math.min((value.length * 100) / minLength, 100)}
										sx={{ bgcolor: 'background.level3', color: 'hsl(var(--hue) 80% 40%)', }} />
								}

								<FormControl sx={{ display: { sm: 'flex', md: 'flex', width: '260px' } }}>
									<Typography level="body-xs" sx={{ alignSelf: 'flex-end', color: 'hsl(var(--hue) 80% 30%)' }}>
										{value.length < 3 && value2 === value && 'Demasiado corta'}
										{value.length >= 3 && value.length < 6 && value2 === value && 'Débil'}
										{value.length >= 6 && value.length < 10 && value2 === value && 'Fuerte'}
										{value.length >= 10 && value2 === value && 'Muy fuerte'}
									</Typography>
									<Typography level="body-xs" sx={{ alignSelf: 'flex-end', color: 'red' }}>
										{value2 !== value && 'Las contraseñas no coinciden'}
									</Typography>
								</FormControl>

							</FormControl>
							<Button type="submit" fullWidth sx={{ mt: 1, mb: 3, border: 0.01, borderColor: '#3d3d3d' }} variant="soft">Actualizar contraseña</Button>
						</Stack>
					</form>
				</ModalDialog>
			</Modal>
		</React.Fragment>
	);
}
