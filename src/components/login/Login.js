import React, { useContext } from 'react';
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
import '../../css/style-navbar.css';
import '../../css/style.css';
import logo from '../../img/logo.png';
import { useNavigate } from 'react-router-dom';

import { AuthContext } from '../../context/AuthContext';
import { types } from '../../context/types';

import { getUsers } from '../../services/requests/getUsers';
import { validateCredentials, getToken } from '../../services/requests/loginTest';


const defaultTheme = createTheme();

///
function Login() {

    const context = useContext(AuthContext);
    const history = useNavigate();
    const autentication = (id, cedula, name, surname, rol, email) => {
        const action = {
            type: types.login,
            payload: {
                id: id,
                cedula: cedula,
                name: name,
                surname: surname,
                rol: rol,
                email: email,
            }
        }
        context.dispatch(action);
    }

    async function getInfoUsuario(idUsuario) {
        //   const usuario = await getUsers(idUsuario);
        // autentication(usuario.id, usuario.cedula, usuario.name, usuario.surname, usuario.rol, usuario.email);
        autentication("5", "111", "Sebastian", "Gonzalez", "A", "sgonzalez@gmail.com");

        swal({
            title: "Acceso correcto\n\n",
            text: "Nombre: ",//+ usuario.name + " " + usuario.surname + "\nRol: " + usuario.rol,
            icon: "success",
            position: "center",
            timer: 3000
        });
        //   return usuario;
    }


    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        let cedula = data.get('cedula');
        let password = data.get('password');
        // validateCredentials(cedula, password);
        async function validarLogin() {
            const result = await validateCredentials(cedula, password);
            //  const jwtresult = await getToken(cedula, password);
            if (result !== null && result !== undefined) {
                //  console.log("jwtresult id ", jwtresult);
                getInfoUsuario(result.id).then(() => {
                    history('/Novedades'); // Redirige al usuario a la página de inicio
                });
            } else {
                swal("¡Advertencia!", 'Usuario y/o contraseña incorrecta', "error", {
                    timer: 3000
                });
            }
        }
        validarLogin();
    }


    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs" sx={{ marginBlockEnd: 12 }}>
                <Box sx={{ marginTop: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

                    <div sx={{ bgcolor: 'secondary.main' }}>
                        <img src={logo} className="animate-bounce" alt="logo" />
                    </div>
                    <Typography component="h1" variant="h4">Iniciar Sesión</Typography>

                    <Typography variant="body2" color="text.secondary">¿Aun no tienes cuenta?
                        <Link href="/registrarse" variant="body2" sx={{ p: 0.5 }}>Entra aquí</Link>
                    </Typography>

                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, width: '300px', height: '35px' }}>
                        <TextField margin="dense" required fullWidth id="cedula" label="Usuario" name="cedula" autoComplete="text" autoFocus />
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