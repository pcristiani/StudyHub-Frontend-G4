import React from 'react';
import Typography from '@mui/material/Typography';
import logo from '../img/logo.png';
import { CssVarsProvider } from '@mui/joy/styles';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import AnimationType from '../components/AnimationType';
import '../css/style.css';
import '../css/style-navbar.css';

const Home = () => {
  return (
    <>
      <CssVarsProvider>
        <Container component="main" maxWidth="xs">
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
            <div sx={{ m: 19, bgcolor: 'secondary.main' }}>
              <img src={logo} className="scale-animation" alt="logo" />
            </div>
            <br></br>
            <Typography className="text-dark focus-ring-primary" component="h1" >
              <AnimationType />
            </Typography>
          </Box>
        </Container>
      </CssVarsProvider>
    </>
  );
};

export default Home;
