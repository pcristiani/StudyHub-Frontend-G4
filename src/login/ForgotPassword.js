import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import swal from 'sweetalert';

import logo from '../img/logo.png';
import '../css/style-navbar.css';
import '../css/style.css';
import { PARAMETERS, URL_BACK, redirigir } from '../util/constants'

// olvido-contrasenia
const defaultTheme = createTheme();

const ForgotPassword = () => {
    let params = new URLSearchParams(window.location.search);
    let token = params.get('token');
    
    async function emailValue(email) {
        let response = await fetch(URL_BACK.forgotPassword, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${PARAMETERS.tokenBearer}`,
            },
            body: email
        })

        if (response.ok) {
            swal({
                title: "Verifique su correo electronico.\n\n",
                icon: "success",
                position: "center",
                timer: 3000
            });
            redirigir(`http://localhost:3000/`);

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
        let body = { "token": token, "newPassword": newPassword };
        let response = await fetch(URL_BACK.recuperarPassword, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${PARAMETERS.tokenBearer}`,
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
            redirigir(`http://localhost:3000/login`);

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
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs" sx={{ marginBlockEnd: 12 }}>
                <Box sx={{ marginTop: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', }}>

                    <div sx={{ m: 0, bgcolor: 'secondary.main' }}>
                        <img src={logo} className="animate-bounce" alt="logo" />
                    </div>

                    {
                        (!token) ?
                            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 0 }}>
                                <>
                                    <Typography component="h1" variant="h4">Verificar su identidad</Typography>
                                    <Typography variant="body2" color="text.secondary">Ingresa tu correo de recuperación.</Typography>
                                    <TextField margin="normal" required fullWidth id="email" label="Correo electrónico" name="email" autoComplete="text" autoFocus />
                                    <Button type="submit" fullWidth variant="contained" sx={{ mt: 1, mb: 3 }}>Siguiente</Button>
                                    <Grid container spacing={1}>
                                        <Grid item>
                                        </Grid>
                                    </Grid>
                                </>
                            </Box>
                            :
                            <Box component="form" onSubmit={resetPassword} noValidate sx={{ mt: 0 }}>
                                <>
                                    <Typography component="h2" variant="h5">Restablezca la contraseña</Typography>
                                    <TextField margin="normal" required fullWidth id="newPass" type='password' label="Crear una nueva contraseña" name="newPass" />
                                    <TextField margin="md" required fullWidth id="confirmNewPass" type='password' label="Confirma la contraseña nueva" name="confirmNewPass" />
                                    <Button type="submit" fullWidth variant="contained" sx={{ mt: 1, mb: 3 }}>Cambiar contraseña</Button>
                                    <Grid container spacing={1}>
                                        <Grid item>
                                        </Grid>
                                    </Grid>
                                </>
                            </Box>
                    }
                </Box>
            </Container>
        </ThemeProvider>
    );
}
export default ForgotPassword;