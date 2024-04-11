
import React from 'react';
import Typography from '@mui/material/Typography';
import { CssVarsProvider } from '@mui/joy/styles';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

const Inscripcion = () => {

  return (
    <CssVarsProvider>
      <Container component="main" maxWidth="xs">
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '22px' }}>
          <Typography className="text-dark focus-ring-primary" component="h1" >
            <div style={{ height: 300, width: '100%' }}>
              <Typography className="text-dark focus-ring-primary" component="h1" >
                Inscripcion
              </Typography>
            </div>
          </Typography>
        </Box>
      </Container>
    </CssVarsProvider>
  );

}

export default Inscripcion;
