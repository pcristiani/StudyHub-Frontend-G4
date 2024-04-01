import React from 'react'

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

import logo from '../img/logo.png';
import '../css/style-navbar.css';
import '../css/style.css';

const defaultTheme = createTheme();

function Login() {

    async function jwkUser(username, password) {
        let url = `http://localhost:8080/login/test`;

        let headers = {
            'Content-Type': 'application/json',
        };

        let body = {
            username,
            password,
        };

        let response = await fetch(url, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(body),
        });

        // if (response.ok) {
        //     let data = await response.json();
        //     decodeJwt(data);
        //     console.log("decodeJwt(data): ", decodeJwt(data));
        //     console.log("Token JWT: ", data);
        // } else {
        //     console.log("Error: ", response.status);
        // }

        if (response.ok) {
            swal({
                title: "Acceso correcto\n\n",
                text: "Usuario: " + username,// "\nNombre: " + name,
                icon: "success",
                position: "center",
                timer: 3000
            });
        } else {
            swal("¡Advertencia!", 'Usuario y/o contraseña incorrecta', "error", {
                timer: 3000
            });
        }
    };



    // async function jwkUser(username, password) {
    //     const token = `44b4ff323b3509c5b897e8199c0655197797128fa71d81335f68b9a2a3286f30`;
    //     const mensaje = { "username": username, "password": password };
    //     let url = `http://localhost:8080/login/test`;

    //     let response = await fetch(url, {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Authorization': `Bearer ${token}`,
    //         },
    //         body: JSON.stringify(mensaje)
    //     })

    //     if (response.ok) {
    //         swal({
    //             title: "Acceso correcto\n\n",
    //             text: "Usuario: " + username,// "\nNombre: " + name,
    //             icon: "success",
    //             position: "center",
    //             timer: 3000
    //         });
    //     } else {
    //         swal("¡Advertencia!", 'Usuario y/o contraseña incorrecta', "error", {
    //             timer: 3000
    //         });
    //     }
    // }


    function decodeJwt(strJwt) {
        let parts = strJwt.split('.');
        if (parts.length !== 3) {
            throw new Error('Token JWT inválido');
        }

        let base64Url = parts[1];
        let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        let cargaUtil = decodeURIComponent(atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        try {
            let decodedJwt = JSON.parse(cargaUtil);
            console.log(decodedJwt);
        } catch (error) {
            console.error(error);
        }
        // return JSON.parse(cargaUtil);
    }


    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        let username = data.get('username');
        let password = data.get('password');
        jwkUser(username, password);
    }
    const handleDecodeJwt = (event) => {
        const strJwt = `eyJhbGciOiJIUzI1NiJ9.eyJiaXJ0aGRhdGUiOiIxOTg5MTAyMCIsInN1cm5hbWUiOiJHb256YWxleiIsIm5hbWUiOiJTZWJhc3RpYW4iLCJlbWFpbCI6InNlYmFzdGlhbkBleGFtcGxlLmNvbSIsInVzZXJuYW1lIjoic2dvbnphbGV6Iiwic3ViIjoic2dvbnphbGV6IiwiaWF0IjoxNzExOTI5NDI2LCJleHAiOjE3MTE5MzAzMjZ9.-3_zUGl-PxQKaRpRZYEkNrdYoWRfJfTBBfSy3AQqWQo`;
        decodeJwt(strJwt);
    }


    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs" sx={{ marginBlockEnd: 12 }}>
                <Box sx={{ marginTop: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', }}>

                    <div sx={{ m: 0, bgcolor: 'secondary.main' }}>
                        <img src={logo} className="animate-bounce" alt="logo" />
                    </div>
                    <Typography component="h1" variant="h4">Iniciar sesión</Typography>

                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 0 }}>
                        <TextField margin="normal" required fullWidth id="username" label="Usuario" name="username" autoComplete="text" autoFocus />
                        <TextField margin="normal" required fullWidth name="password" label="Contraseña" type="password" id="password" autoComplete="current-password" />
                        <FormControlLabel control={<Checkbox value="remember" color="primary" />}
                            label="Recuerdame" />
                        <Button type="submit" fullWidth variant="contained" sx={{ mt: 2, mb: 3 }}>Iniciar sesión</Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">¿Has olvidado tu contraseña?</Link>
                            </Grid>
                            <Grid item>
                                <Link href="/registrarte" variant="body2">{"Registrarte"}</Link>
                            </Grid>
                        </Grid>
                    </Box>

                </Box>
            </Container>
        </ThemeProvider>
    );
}

export default Login;