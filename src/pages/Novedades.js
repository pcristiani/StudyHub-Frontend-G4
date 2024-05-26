import React from 'react';
import logo from '../img/logo.png';
import Container from '@mui/joy/Container';
import Box from '@mui/joy/Box';
import Sheet from '@mui/joy/Sheet';

// import '../css/style.css';
// import '../css/style-navbar.css';
import { CssVarsProvider } from '@mui/joy/styles';
import { extendTheme } from '@mui/joy/styles';
import { Link } from 'react-router-dom';
const theme = extendTheme({ cssVarPrefix: 'demo' });

const Novedades = () => {
  return (
    <>
      <Sheet>
        <CssVarsProvider defaultMode="dark" theme={theme} colorSchemeSelector="#demo_dark-mode-by-default" modeStorageKey="demo_dark-mode-by-default" disableNestedContext>
          <Container component="main" maxWidth="xs">
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
              <div sx={{ m: 19, bgcolor: 'secondary.main' }}>
                <img src={logo} className="scale-animation" alt="logo" />
              </div>
              <br></br>
              <h1 className="focus-ring-primary" component="h1" >
                StudyHub
              </h1>
              <h6 className="focus-ring-primary" component="h1" >
                Novedades
              </h6>
            </Box>
          </Container>
        </CssVarsProvider>
      </Sheet>
    </>
  );
};

export default Novedades;