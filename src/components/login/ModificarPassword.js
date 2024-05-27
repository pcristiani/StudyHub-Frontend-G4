import React, { useContext } from 'react';
import { createTheme } from '@mui/material/styles';
import '../../css/style-navbar.css';
import '../../css/style.css';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Divider from '@mui/joy/Divider';
import FormControl from '@mui/joy/FormControl';
import Input from '@mui/joy/Input';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import Card from '@mui/joy/Card';
import swal from 'sweetalert';
import { AuthContext } from '../../context/AuthContext';
import { modificarPassword } from '../../services/requests/loginService';
import { useNavigate } from 'react-router-dom';

const defaultTheme = createTheme();

export default function ModificarPassword() {
    const { user } = useContext(AuthContext);
    const context = useContext(AuthContext);
    const history = useNavigate();

    async function modificarPasswordUsuario(ud, s, userjwtLogin) {
        const result = await modificarPassword(ud, s, userjwtLogin);
        if (result !== null && result !== undefined) {
            swal("¡Éxito!", 'Has cambiado correctamente la contraseña', "success", {
                timer: 4000
            });
            history('/');

        } else {
            swal("¡Advertencia!", 'Un error inesperado ocurrio', "error", {
                timer: 3000
            });
        }
    }

    const handleReset = (event) => {
        event.preventDefault();
        const dat = new FormData(event.currentTarget);
        let newPassword = dat.get('password');
        modificarPasswordUsuario(user.id, newPassword, user.jwtLogin);
    }

    return (
        <Box component="form" sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', }} onSubmit={handleReset}>
            <Card sx={{ display: 'flex', alignSelf: 'center', }}>
                <Box sx={{ alignSelf: 'center' }}>
                    <Typography level="title-md">Cambia tu contraseña</Typography>
                </Box>
                <Divider />
                <Stack>
                    <Stack spacing={0}>
                        <FormControl sx={{ display: { sm: 'flex', md: 'flex', width: '280px' }, gap: 0.8 }}>
                            <Input size="sm" id="password" name="password" placeholder="Ingresa tu nueva contraseña" required />
                            <Input size="sm" id="password" name="password" placeholder="Confirmar contraseña" required />

                        </FormControl>
                    </Stack>
                    <Stack direction="row" spacing={1} sx={{ marginTop: 1, justifyContent: 'right' }}>
                        <Button type="submit" fullWidth size="sm" variant="solid">Guardar</Button>
                        <Button size="sm" fullWidth variant="outlined" color="neutral" href='./'>Cancelar</Button>
                    </Stack>
                </Stack>
            </Card>
        </Box>
    );
}
