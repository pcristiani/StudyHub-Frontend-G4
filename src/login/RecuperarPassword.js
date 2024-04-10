import React from 'react';

import { redirigir } from '../util/constants';

import '../css/style-navbar.css';
import '../css/style.css';
// window.location.href = `http://localhost:3000/resetPassword/${token}`;

function ResetPassword() {
    window.location.href = `http://localhost:3000/resetPassword/?token=`;

    const urlParams = new URLSearchParams(window.location.search);    // Obtener la URL actual

    const token = urlParams.get('token'); // Obtener el valor del parámetro 'token' de la URL

    if (token) {    // Verificar si se encontró un token en la URL
        console.log('Token obtenido:', token);
        // window.location.href = `http://localhost:3000/olvido-contrasenia`;
        setTimeout(() => {
            redirigir(`http://localhost:3000/olvido-contrasenia?token=${token}`);
        }, 1);
        // Aquí puedes hacer lo que necesites con el token, como enviarlo al servidor para restablecer la contraseña
    } else {
        console.log('No se encontró ningún token en la URL.');
    }

    return (
        <>
            {/* 
            <ThemeProvider theme={'defaultTheme'}>
                <Container component="main" maxWidth="xs" sx={{ marginBlockEnd: 12 }}>
                    <Box sx={{ marginTop: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', }}>

                        <div sx={{ m: 0, bgcolor: 'secondary.main' }}>
                            <img src={logo} className="animate-bounce" alt="logo" />
                        </div>
                        <Typography component="h1" variant="h4">Ingresar email</Typography>

                        <Box component="form" onSubmit={'handleSubmit'} noValidate sx={{ mt: 1 }}>
                            <TextField margin="dense" required fullWidth id="email" label="Email" name="email" autoComplete="text" autoFocus />
                            <Button type="submit" fullWidth variant="contained" sx={{ mt: 1, mb: 3 }}>Confirmar</Button>
                            <Grid container spacing={1}>
                                <Grid item>
                                </Grid>
                            </Grid>
                        </Box>

                    </Box>
                </Container>
            </ThemeProvider> */}
        </>

    );
}

export default ResetPassword;