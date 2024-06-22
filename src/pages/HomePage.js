import React from 'react';
import Typography from '@mui/joy/Typography';
import logo from '../img/logo.png';
import Container from '@mui/joy/Container';
import Box from '@mui/joy/Box';
import { MyAnimation } from '../components/common/AnimationType';
import {  extendTheme } from '@mui/joy/styles'

const theme = extendTheme({ cssVarPrefix: 'demo' });
// debugger;
const HomePage = () => {
  return (
    <>
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
    </>
  );
};

export default HomePage;
