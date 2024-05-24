import React, { useContext, useState } from 'react';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import '../../css/style-navbar.css';
import '../../css/style.css';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Divider from '@mui/joy/Divider';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import Card from '@mui/joy/Card';
import { URL_BACK } from '../../services/util/constants';
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import useModificarPassword from '../../services/requests/useModificarPassword';

const defaultTheme = createTheme();

export default function ModificarPassword() {
    const { user } = useContext(AuthContext);
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState(null);
    const context = useContext(AuthContext);
    const [open, setOpen] = React.useState(true);

    async function ss() {
        // useModificarPassword(payload.id, jwtLogin);
        // const { modificarPassword } = useModificarPassword();
    }

    const handleReset = (event) => {
        event.preventDefault();
        const dat = new FormData(event.currentTarget);
        let newPassword = dat.get('password');
        console.log("password: ", user.id, user.jwtLogin, newPassword);
        // const { modificarPassword, isLoading, error, data } = useModificarPassword();
        ss();
        // modificarPassword(user.id, user.jwtLogin, newPassword);
    };


    return (
        <Box component="form" sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', }} onSubmit={handleReset}>
            <Card sx={{ display: 'flex', alignSelf: 'center', }}>
                <Box sx={{ alignSelf: 'center' }}>
                    <Typography level="title-md">Cambia tu contraseña</Typography>
                </Box>
                <Divider />
                <Stack>
                    <Stack spacing={0}>
                        <FormControl sx={{ display: { sm: 'flex', md: 'flex', width: '280px' } }}>
                            <Input size="sm" id="password" name="password" placeholder="Ingresa tu nueva contraseña" required />
                        </FormControl>
                    </Stack>
                    <Stack direction="row" spacing={1} sx={{ marginTop: 1, justifyContent: 'right' }}>
                        <Button type="submit" size="sm" variant="solid">Guardar</Button>
                        <Button size="sm" variant="outlined" color="neutral" href='/'>Cancelar</Button>
                    </Stack>
                </Stack>
            </Card>
        </Box>
    );
}
