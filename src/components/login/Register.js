import React, { useContext } from 'react';
import Button from '@mui/joy/Button';
import Input from '@mui/joy/Input';
import Stack from '@mui/joy/Stack';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import swal from 'sweetalert';
import { createTheme } from '@mui/material/styles';
import { URL_BACK } from '../../services/util/constants'
import { AuthContext } from '../../context/AuthContext';
import { Sheet } from '@mui/joy';
// import '../../css/style.css';
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
                text: "\nNombre: " + nombre + " " + apellido + "\nCedula: " + cedula,
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
        <Sheet>
            <Container component="main" maxWidth="xs" sx={{ marginBlockEnd: 12 }}>
                <Box sx={{ marginTop: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div sx={{ bgcolor: 'secondary.main' }}>
                        <img src={logo} className="animate-bounce" alt="logo" />
                    </div>
                    <h2 component="h1" variant="h4" style={{ textAlign: 'center' }}>Registrarse</h2>
                    <Typography level="body-sm" sx={{ textAlign: 'center' }}>Ingresa la información de tu cuenta</Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, width: '300px', height: '35px', spacing: 4 }}>
                        <Stack spacing={0.8}>
                            <Input size="sm" autoComplete="given-name" name="nombre" required fullWidth id="nombre" placeholder="Nombre" autoFocus />
                            <Input size="sm" required id="apellido" name="apellido" fullWidth placeholder="Apellido" autoComplete="family-name" />
                            <Input size="sm" required id="email" name="email" fullWidth placeholder="Email" autoComplete="email" />
                            <Input size="sm" id="fechaNacimiento" name="fechaNacimiento" fullWidth type='date' />
                            <Input size="sm" required id="cedula" name="cedula" fullWidth placeholder="Cédula" autoComplete="family-name" />
                            <Input size="sm" required name="password" type="password" id="password" fullWidth autoComplete="new-password" placeholder="Contraseña" />
                            <Button type="submit" fullWidth sx={{ mt: 1, mb: 3 }}>Registrarse</Button>
                            <Link href="/login" variant="body2">¿Ya tienes una cuenta? Iniciar sesión</Link>
                        </Stack>
                    </Box>
                </Box>
            </Container>
        </Sheet>
    );
}

export default Register;