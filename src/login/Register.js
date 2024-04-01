// import * as React from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import swal from 'sweetalert';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import '../css/style.css';
import logo from '../img/logo.png';


const defaultTheme = createTheme();

// debugger;
function Register() {

    async function registerUsr(firstName, lastname, email, birthdate, username, password) {
        const token = `44b4ff323b3509c5b897e8199c0655197797128fa71d81335f68b9a2a3286f30`;
        let body = { "name": firstName, "surname": lastname, "email": email, "birthdate": birthdate, "username": username, "password": password };
        let url = `http://localhost:8080/api/users/registerUser`;


        let response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(body)
        })

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

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        let firstName = data.get('name');
        let lastname = data.get('surname');
        let email = data.get('email');
        let birthdate = data.get('birthdate');
        let username = data.get('username');
        let password = data.get('password');
        registerUsr(firstName, lastname, email, birthdate, username, password);
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="sm">
                {/* <CssBaseline /> */}
                <Box sx={{ marginTop: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
                    <div sx={{ bgcolor: 'secondary.main' }}>
                        <img src={logo} className="animate-bounce" alt="logo" />
                    </div>
                    <Typography component="h1" variant="h4">Inscribirse</Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate

                        sx={{
                            py: 1,
                            display: 'flex',
                            gap: 2,
                            alignItems: 'center',
                            flexWrap: 'wrap',
                        }}>

                        <Grid container spacing={1}>
                            <Grid item xs={12} sm={6}>
                                <TextField size="small" autoComplete="given-name" name="firstName" required fullWidth id="firstName" label="Nombre" autoFocus />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField size="small" required fullWidth id="lastName" label="Apellido" name="lastName" autoComplete="family-name" />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField size="small" required fullWidth id="email" label="Email" name="email" autoComplete="email" />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField size="small" required fullWidth id="birthdate" label="Fecha nacimiento" name="birthdate" autoComplete="family-name" />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <TextField size="small" required fullWidth id="username" label="Usuario" name="username" autoComplete="family-name" />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                {/* <Grid item xs={12}> */}
                                <TextField size="small" required fullWidth name="password" label="Contraseña" type="password" id="password" autoComplete="new-password" />
                            </Grid>

                            <Grid item xs={12}>
                                <FormControlLabel control={<Checkbox value="allowExtraEmails" color="primary" />}
                                    label="Acepto recibir información via email." />
                            </Grid>
                        </Grid>
                        <Button type="submit" fullWidth variant="contained" sx={{ mt: 0, mb: 0 }}>Inscribirse</Button>
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
