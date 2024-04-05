import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import logo from '../img/logo.png';
import '../css/style-navbar.css';
import '../css/style.css';
import { PARAMETERS, URL_BACK } from '../util/constants'

const defaultTheme = createTheme();

const ForgotPassword = () => {


    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs" sx={{ marginBlockEnd: 12 }}>
                <Box sx={{ marginTop: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', }}>

                    <div sx={{ m: 0, bgcolor: 'secondary.main' }}>
                        <img src={logo} className="animate-bounce" alt="logo" />
                    </div>
                    <Typography component="h1" variant="h4">Ingresar email</Typography>

                    <Box component="form" noValidate sx={{ mt: 1 }}>
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