import { CssVarsProvider } from '@mui/joy/styles';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

const Panel = () => {
  return (
    <CssVarsProvider>
        <Container component="main" maxWidth="xs">
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '22px' }}>
            <Typography className="text-dark focus-ring-primary" component="h1" >
              Panel
            </Typography>
          </Box>
        </Container>
    </CssVarsProvider>
  );

}

export default Panel;