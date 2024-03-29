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
        const token = `44b4ff323b3509c5b897e8199c0655197797128fa71d81335f68b9a2a3286f30`;
        const mensaje = { "username": username, "password": password };
        let url = `http://localhost:8080/login/test`;

        let response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(mensaje)
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
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        let username = data.get('username');
        let password = data.get('password');

        jwkUser(username, password);
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