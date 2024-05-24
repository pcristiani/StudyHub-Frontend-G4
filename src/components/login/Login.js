import React, { useContext, useEffect } from 'react';
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

// import { getUsuario } from '../../services/requests/getUsuario';
import { getToken } from '../../services/requests/loginService';
import { getUsuario } from '../../services/requests/usuarioService';
import { decodificaJwt } from '../../services/util/conversionBase64';


const defaultTheme = createTheme();
//jwQ0qMQt77Hw
///
function Login() {
    const context = useContext(AuthContext);
    const history = useNavigate();

    const autentication = (idUsuario, cedula, nombre, apellido, rol, email, jwtLogin) => {
        const action = {
            type: types.login,
            payload: {
                id: idUsuario,
                cedula: cedula,
                nombre: nombre,
                apellido: apellido,
                email: email,
                rol: rol,
                jwtLogin: jwtLogin
            }
        }
        context.dispatch(action);
    }

    // autentication("5", "111", "Seba", "Gonzalez", "A", "asd@asd", resultJwt);
    async function getInfoUsuario(payload, jwtLogin) {
        let user = await getUsuario(payload.id, jwtLogin);

        autentication(user.idUsuario, user.cedula, user.nombre, user.apellido, user.rol, user.email, jwtLogin);
        let rol = `Estudiante`;
        if (user.rol === 'A') rol = `Administrador`;
        if (user.rol === 'C') rol = `Coordinador`;
        if (user.rol === 'I') rol = `Invitado`;
        if (user.rol === 'F') rol = `Funcionario`;

        swal({
            title: "Acceso correcto\n\n",
            text: "Nombre: " + user.nombre + " " + user.apellido + "\nCedula: " + user.cedula + "\nRol: " + rol,
            icon: "success",
            dangerMode: false,
            position: "center",
            timer: 4000
        });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        let cedula = data.get('cedula');
        let password = data.get('password');

        async function validarLogin() {
            const token = await getToken(cedula, password);
            let payload = null;
            if (token !== null && token !== undefined) {
                payload = decodificaJwt(token);
                getInfoUsuario(payload, token).then(() => {
                    history('/Novedades');
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
                        <TextField margin="dense" required fullWidth id="cedula" label="Cédula" name="cedula" autoComplete="text" autoFocus />
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




// if (response.ok) {
//     swal({
//         title: "Email de recuperacion su correo electronico.\n\n",
//         icon: "success",
//         position: "center",
//         timer: 4000
//     });
// } else {
//     swal("¡Advertencia!", 'Email invalido', "error", {
//         timer: 3000
//     });
// }

// return user;