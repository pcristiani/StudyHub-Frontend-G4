import React from 'react';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import Container from '@mui/joy/Container';
import Box from '@mui/joy/Box';
import { MyAnimationFooter } from './AnimationType';


const NuestroEquipo = () => {
  return (
    <Sheet>
      <Container component="main" maxWidth="xs">
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <h1 className="focus-ring-primary" component="h1" >
            <div>
              <MyAnimationFooter />
              <Typography className="focus-ring-primary" component="h1"
                sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '18px' }}>
              </Typography>
            </div>
          </h1>
        </Box>
      </Container>
    </Sheet>
  );
}

export default NuestroEquipo;
