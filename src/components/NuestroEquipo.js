import React from 'react';
import Typography from '@mui/material/Typography';
import { CssVarsProvider } from '@mui/joy/styles';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { MyAnimation2 } from './AnimationType';
import '../css/style.css';
import '../css/style-navbar.css';

const NuestroEquipo = () => {

  return (
    <CssVarsProvider>
      <Container component="main" maxWidth="sm">
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '22px' }}>
          <Typography className="text-dark focus-ring-primary" component="h1" >
            <div style={{}}>
              <MyAnimation2 />
              <Typography className="text-dark focus-ring-primary" component="h4"
                sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '22px' }}>
              </Typography>
            </div>
          </Typography>
        </Box>
      </Container>
    </CssVarsProvider>
  );
}

export default NuestroEquipo;
