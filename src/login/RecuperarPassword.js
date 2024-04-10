import React from 'react';

import { redirigir } from '../util/constants';

import '../css/style-navbar.css';
import '../css/style.css';

function ResetPassword() {
    window.location.href = `http://localhost:3000/resetPassword/?token=`;

    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token'); // Obtener el valor del parámetro 'token' de la URL

    if (token) {
        console.log('Token obtenido:', token);
        // window.location.href = `http://localhost:3000/olvido-contrasenia`;
        setTimeout(() => {
            redirigir(`http://localhost:3000/olvido-contrasenia?token=${token}`);
        }, 1);
    } else {
        console.log('No se encontró ningún token en la URL.');
    }

    return (
        <>
            {/* 
            <ThemeProvider theme={'defaultTheme'}>
                <Container component="main" maxWidth="xs" sx={{ marginBlockEnd: 12 }}>             
                </Container>
            </ThemeProvider> */}
        </>

    );
}

export default ResetPassword;