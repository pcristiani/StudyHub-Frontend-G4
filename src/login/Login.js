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
import { useContext } from 'react';
import { AuthContext } from '../auth/AuthContext';
import { types } from '../auth/types';

import logo from '../img/logo.png';
import '../css/style-navbar.css';
import '../css/style.css';
import { PARAMETERS, URL_BACK } from '../util/constants'


const defaultTheme = createTheme();

function Login() {
    const context = useContext(AuthContext);

    const autentication = (username, name, surname) => {
        const action = {
            type: types.login,
            payload: {
                username: username,
                name: name,
                surname: surname,
                rol: 'Administrador'
                //  email: email,
            }
        }
        context.dispatch(action);
    }

    const disconnection = () => {
        const action = {
            type: types.logout,
        }
        context.dispatch(action);
    }

    async function jwkUser(username, password) {
        let body = {
            "username": username,
            "password": password
        };

        let response = await fetch(URL_BACK.loginTest, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${PARAMETERS.tokenBearer}`,
            },
            body: JSON.stringify(body)
        })


        if (response.ok) {
            let strJwt = await response.text();
            let objUser = decodedJwt(strJwt);
            console.log("objUser: ", strJwt);
            autentication(objUser.username, objUser.name, objUser.surname);
            swal({
                title: "Acceso correcto\n\n",
                text: "Nombre: " + objUser.name + " " + objUser.surname + "\nRol: Administrador", //+ objUser.rol,
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


    function decodedJwt(strJwt) {
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
        jwkUser(username, password);
    }

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs" sx={{ marginBlockEnd: 12 }}>
                <Box sx={{ marginTop: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', }}>

                    <div sx={{ m: 0, bgcolor: 'secondary.main' }}>
                        <img src={logo} className="animate-bounce" alt="logo" />
                    </div>
                    <Typography component="h1" variant="h4">Iniciar sesión</Typography>

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