import React, { useContext } from 'react';

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
import { PARAMETERS, URL_BACK } from '../../services/util/constants'
import { AuthContext } from '../../context/AuthContext';
import { PublicRoute } from '../../../src/routers/PublicRoute';

import '../../css/style.css';
import logo from '../../img/logo.png';

const defaultTheme = createTheme();

// debugger;
function Register() {
    const { user } = useContext(AuthContext);

    async function registerUsr(nombre, apellido, email, fechaNacimiento, cedula, password, rol) {

        let body = { "nombre": nombre, "apellido": apellido, "email": email, "fechaNacimiento": fechaNacimiento, "cedula": cedula, "password": password, "rol": rol };

        let response = await fetch(URL_BACK.registerUsr, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.jwtLogin}`,
            },
            body: JSON.stringify(body)
        })

        if (response.ok) {
            console.log("response: ", response);
            swal({
                title: "Su usuario queda pendiente de validación\n\n",
                text: "\nNombre: " + nombre + " " + apellido + "Cedula: " + cedula,
                icon: "success",
                position: "center",
                timer: 4000
            });
        } else {
            swal("¡Advertencia!", 'Los datos ingresados son incorrectos', "error", {
                timer: 3000
            });
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        let nombre = data.get('nombre');
        let apellido = data.get('apellido');
        let email = data.get('email');
        let fechaNacimiento = data.get('fechaNacimiento');
        let cedula = data.get('cedula');
        let password = data.get('password');
        registerUsr(nombre, apellido, email, fechaNacimiento, cedula, password, `E`);
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs" sx={{ marginBlockEnd: 12 }}>
                <Box sx={{ marginTop: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
                    <div sx={{ bgcolor: 'secondary.main' }}>
                        <img src={logo} className="animate-bounce" alt="logo" />
                    </div>
                    <Typography component="h1" variant="h4">Registrarse</Typography>
                    <Typography variant="body2" color="text.secondary">Ingresa la información de tu cuenta</Typography>

                    <Box component="form" onSubmit={handleSubmit} noValidate
                        sx={{ py: 1, display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap', width: '400px' }}>

                        <Grid container spacing={0.8}>
                            <Grid item xs={12} sm={6}>
                                <TextField size="small" autoComplete="given-name" name="nombre" required fullWidth id="nombre" label="Nombre" autoFocus />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <TextField size="small" required fullWidth id="apellido" label="Apellido" name="apellido" autoComplete="family-name" />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <TextField size="small" required fullWidth id="email" label="Email" name="email" autoComplete="email" />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <TextField size="small" fullWidth id="fechaNacimiento" name="fechaNacimiento" type='date' />
                                {/* <Input
                                    type="date" slotProps={{                                        input: { min: '2018-06-07', max: '2018-06-14', },                                    }}
                                /> */}
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <TextField size="small" required fullWidth id="cedula" label="Cedula" name="cedula" autoComplete="family-name" />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <TextField size="small" required fullWidth name="password" label="Contraseña" type="password" id="password" autoComplete="new-password" />
                            </Grid>

                            <Grid item xs={12}>
                                {/* <FormControlLabel control={<Checkbox value="allowExtraEmails" color="primary" />}
                                    label="Acepto recibir información via email." /> */}
                            <Button  type="submit" fullWidth variant="contained">Registrarse</Button>
                            </Grid>
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