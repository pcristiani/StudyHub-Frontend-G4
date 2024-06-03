import React, { StrictMode } from 'react';
import Typography from '@mui/joy/Typography';
import logo from '../img/logo.png';
import Container from '@mui/joy/Container';
import Box from '@mui/joy/Box';
import { MyAnimation } from '../components/common/AnimationType';
import {  CssVarsProvider, extendTheme } from '@mui/joy/styles'

const theme = extendTheme({ cssVarPrefix: 'demo' });
// debugger;
const HomePage = () => {
  return (
    <>
      <CssVarsProvider defaultMode="dark" theme={theme} colorSchemeSelector="#demo_dark-mode-by-default" modeStorageKey="demo_dark-mode-by-default" disableNestedContext>
        <div id="demo_dark-mode-by-default">
          <Container component="main" maxWidth="xs">
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
              <div sx={{ m: 19, bgcolor: 'secondary.main' }}>
                <img src={logo} className="scale-animation" alt="logo" />
              </div>
              <br></br>
              <Typography className="text-dark focus-ring-primary" component="h1" >
                <MyAnimation />
              </Typography>
            </Box>
          </Container>
        </div>
      </CssVarsProvider>
    </>
  );
};

export default HomePage;
