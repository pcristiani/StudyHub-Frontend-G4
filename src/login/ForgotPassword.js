import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import swal from 'sweetalert';

import logo from '../img/logo.png';
import '../css/style-navbar.css';
import '../css/style.css';
import { PARAMETERS, URL_BACK } from '../util/constants'

const defaultTheme = createTheme();

const ForgotPassword = () => {

    async function emailValue(email) {
        let response = await fetch(URL_BACK.forgotPassword, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${PARAMETERS.tokenBearer}`,
            },
            body: email
        })

        console.log("RESPONSE.OK: ", response.ok);
        if (response.ok) {
            let strJwt = await response.text();
            console.log("emailss: ", response);
            swal({
                title: "Email correcto\n\n",
                icon: "success",
                position: "center",
                timer: 3000
            });
        } else {
            swal("¡Advertencia!", 'Email invalido', "error", {
                timer: 3000
            });
        }
    }


    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        let email = data.get('email');
        emailValue(email);
    }

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs" sx={{ marginBlockEnd: 12 }}>
                <Box sx={{ marginTop: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', }}>

                    <div sx={{ m: 0, bgcolor: 'secondary.main' }}>
                        <img src={logo} className="animate-bounce" alt="logo" />
                    </div>
                    <Typography component="h1" variant="h4">Ingresar email</Typography>

                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField margin="dense" required fullWidth id="email" label="Email" name="email" autoComplete="text" autoFocus />
                        <Button type="submit" fullWidth variant="contained" sx={{ mt: 1, mb: 3 }}>Confirmar</Button>
                        <Grid container spacing={1}>
                            <Grid item>
                            </Grid>
                        </Grid>
                    </Box>

                </Box>
            </Container>
        </ThemeProvider>
    );
}
export default ForgotPassword;