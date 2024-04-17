import React, { useContext } from 'react';
import { AuthContext } from '../auth/AuthContext';
import axios from 'axios';
import { types } from '../auth/types';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import swal from 'sweetalert';

import '../css/style-navbar.css';
import '../css/style.css';

import { URL_BACK } from '../util/constants'
import logo from '../img/logo.png';

const defaultTheme = createTheme();

function Login() {
    const context = useContext(AuthContext);

    const autentication = (username, name, surname) => {
        const action = {
            type: types.login,
            payload: {
                username: username,
                name: 'Sebastian',
                surname: 'Gonzalez',
                rol: 'Estudiante'
                //  email: email,
            }
        }
        context.dispatch(action);
    }

    // const disconnection = () => {
    //     const action = {
    //         type: types.logout,
    //     }
    //     context.dispatch(action);
    // }

    async function validateCredentials(username, password) {
        try {
            let response = await axios.post(URL_BACK.loginTest, {
                "username": username,
                "password": password
            });

            if (response.status === 200) {
                let objUser = decodeJwt(response.data);
                console.log("objUser: ", response);

                console.log("objUser.name: ", objUser);
                autentication(objUser.username, objUser.name, objUser.surname);
                swal({
                    title: "Acceso correcto\n\n",
                    text: "Nombre: " + objUser.username + " " + objUser.surname + "\nRol: Administrador", //+ objUser.rol,
                    icon: "success",
                    position: "center",
                    timer: 3000
                });
            }
        } catch (error) {
            swal("¡Advertencia!", 'Usuario y/o contraseña incorrecta', "error", {
                timer: 3000
            });
            console.log(error);
        }
    }


    function decodeJwt(strJwt) {
        let parts = strJwt.split('.');
        if (parts.length !== 3) {
            throw new Error('Token JWT inválido');
        }

        let base64Url = parts[1];
        let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        let jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        try {
            console.log(JSON.parse(jsonPayload));
        } catch (error) {
            console.error(error);
        }
        return JSON.parse(jsonPayload);
    }


    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        let username = data.get('username');
        let password = data.get('password');
        validateCredentials(username, password);
    }

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs" sx={{ marginBlockEnd: 12 }}>
                <Box sx={{ marginTop: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', }}>

                    <div sx={{ bgcolor: 'secondary.main' }}>
                        <img src={logo} className="animate-bounce" alt="logo" />
                    </div>
                    <Typography component="h1" variant="h4">Iniciar Sesión</Typography>

                    <Typography variant="body2" color="text.secondary">¿Aun no tienes cuenta?
                        <Link href="/registrarte" variant="body2" sx={{ p: 0.5 }}>Entra aquí</Link>
                    </Typography>

                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField margin="dense" required fullWidth id="username" label="Usuario" name="username" autoComplete="text" autoFocus />
                        <TextField margin="dense" required fullWidth name="password" label="Contraseña" type="password" id="password" autoComplete="current-password" />
                        <FormControlLabel control={<Checkbox value="remember" color="primary" />}
                            label="Recuerdame" />
                        <Button type="submit" fullWidth variant="contained" sx={{ mt: 1, mb: 3 }}>Iniciar sesión</Button>
                        <Grid container spacing={1}>
                            <Grid item>
                            </Grid>
                            <Link href="/olvido-contrasenia" variant="body2">¿Has olvidado tu contraseña?</Link>
                        </Grid>
                    </Box>

                </Box>
            </Container>
        </ThemeProvider>
    );
}

export default Login;