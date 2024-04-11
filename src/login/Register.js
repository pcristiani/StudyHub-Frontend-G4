import * as React from 'react';
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
import { PARAMETERS, URL_BACK } from '../util/constants'


import '../css/style.css';
import logo from '../img/logo.png';

const defaultTheme = createTheme();

// debugger;
function Register() {

    async function registerUsr(firstName, lastname, email, birthdate, username, password) {
        let body = { "name": firstName, "surname": lastname, "email": email, "birthdate": birthdate, "username": username, "password": password };

        let response = await fetch(URL_BACK.registerUsr, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${PARAMETERS.tokenBearer}`,

            },
            body: JSON.stringify(body)
        })

        if (response.ok) {
            swal({
                title: "Se crea usuario correcto\n\n",
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
            {/* <Container component="main" maxWidth="sm"> */}
            <Container component="main" maxWidth="xs" sx={{ marginBlockEnd: 12 }}>
                {/* <CssBaseline /> */}
                {/* <Box sx={{ marginTop: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', }}> */}
                <Box sx={{ marginTop: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
                    <div sx={{ bgcolor: 'secondary.main' }}>
                        <img src={logo} className="animate-bounce" alt="logo" />
                    </div>
                    <Typography component="h1" variant="h4">Registrarse</Typography>
                    <Typography variant="body2" color="text.secondary">Ingresa la informacion de tu cuenta</Typography>

                    <Box component="form" onSubmit={handleSubmit} noValidate
                        sx={{ py: 1, display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap', }}>

                        <Grid container spacing={0.8}>
                            <Grid item xs={12} sm={6}>
                                <TextField size="small" autoComplete="given-name" name="firstName" required fullWidth id="firstName" label="Nombre" autoFocus />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <TextField size="small" required fullWidth id="lastName" label="Apellido" name="lastName" autoComplete="family-name" />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <TextField size="small" required fullWidth id="email" label="Email" name="email" autoComplete="email" />
                            </Grid>
                            {/*         <TextField size="small" type='date' required fullWidth id="birthdate" day={'10/10/2024'} name="birthdate" autoComplete="family-name" /> */}

                            <Grid item xs={12} sm={6}>
                                <TextField size="small" required fullWidth id="birthdate" type='date' defaultValue={'birthdate'} format="MM-DD-YYYY" />
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
                            <Button type="submit" fullWidth variant="contained">Registrarse</Button>
                        </Grid>
                        <Grid container justifyContent="flex-middle">
                            <Link href="/login" variant="body2">¿Ya tienes una cuenta? Iniciar sesión</Link>
                            <Grid item>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>

            </Container>
        </ThemeProvider>
    );
}
export default Register;
