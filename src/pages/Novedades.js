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
      <CssVarsProvider defaultMode="dark" theme={theme} colorSchemeSelector="#demo_dark-mode-by-default" modeStorageKey="demo_dark-mode-by-default" disableNestedContext>
        <div id="demo_dark-mode-by-default">
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
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas porttitor condimentum porttitor. Curabitur faucibus ante nec sapien euismod mattis. Sed odio lectus, vestibulum eget risus id, laoreet dignissim orci. Nunc ultricies semper quam, id tristique nibh mattis vitae. Cras mauris nisi, mollis eget turpis a, pharetra finibus orci. Donec vitae consequat ante. Morbi dapibus sem metus.
              </Typography>
            </Box>
          </Container>
        </div>
      </CssVarsProvider>
    </>
  );
};

export default Novedades;