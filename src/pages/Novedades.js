import React from 'react';
import Typography from '@mui/material/Typography';
import logo from '../img/logo.png';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { MyAnimation } from '../components/common/AnimationType';
import '../css/style.css';
import '../css/style-navbar.css';
import { CssVarsProvider } from '@mui/joy/styles';
import { extendTheme } from '@mui/joy/styles';

const theme = extendTheme({ cssVarPrefix: 'demo' });

const Novedades = () => {
  return (
    <>
      <Box>

 
        <div >
          <Container component="main" maxWidth="xs">
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
              <div sx={{ m: 19, bgcolor: 'secondary.main' }}>
                <img src={logo} className="scale-animation" alt="logo" />                
              </div>
              <br></br>
              <Typography className="text-dark focus-ring-primary" component="h1" >
                Novedades
              </Typography>
              <br></br>
              <Typography className="text-dark focus-ring-primary" component="p" >
           Grupo 4 - Tecnólogo en Informática
              </Typography>
            </Box>

          </Container>
        </div>
   
      </Box>
    </>
  );
};

export default Novedades;