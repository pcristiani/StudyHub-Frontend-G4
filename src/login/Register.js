/* eslint-disable no-unused-vars */

import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import logo from '../img/logo.png';

import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import '../css/style.css';


const defaultTheme = createTheme();
let dataJWT;
let respuesta;

function Register() {

    async function registerUsr() {
        const token = `44b4ff323b3509c5b897e8199c0655197797128fa71d81335f68b9a2a3286f30`;
        const mensaje = { "name": 'sebas', "surname": 'surname', "email": 'as@as', "birthdate": '20001010', "username": 'igonzalez', "password": '123' };
        let url = `http://localhost:8080/api/users/registerUser`;

        let response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(mensaje)
        })

        respuesta = response.ok;
        if (respuesta) {
            dataJWT = await response.json();
            console.log("Token JWT: ", dataJWT.token);
        } else {
            console.log("Error: ", response.status);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        registerUsr();
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs" sx={{ marginBlockEnd: 12 }}>
                {/* <CssBaseline /> */}
                <Box sx={{ marginTop: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
                    <div sx={{ m: 0, bgcolor: 'secondary.main' }}>
                        <img src={logo} className="animate-bounce" alt="logo" />
                    </div>
                    <Typography component="h1" variant="h4">Inscribirse</Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 0 }}>
                        <Grid container spacing={1}>
                            <Grid item xs={12} sm={6}>
                                <TextField autoComplete="given-name" name="firstName" required fullWidth id="firstName" label="Nombre" autoFocus />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField required fullWidth id="lastName" label="Apellido" name="lastName" autoComplete="family-name" />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField required fullWidth id="email" label="Email" name="email" autoComplete="email" />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField required fullWidth name="password" label="Contraseña" type="password" id="password" autoComplete="new-password" />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControlLabel control={<Checkbox value="allowExtraEmails" color="primary" />}
                                    label="Acepto recibir información via email." />
                            </Grid>
                        </Grid>
                        <Button type="submit" fullWidth variant="contained" sx={{ mt: 1, mb: 1 }}>Inscribirse</Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href="/login" variant="body2">¿Ya tienes una cuenta? Iniciar sesión</Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>

            </Container>
        </ThemeProvider>
    );
}
export default Register;
