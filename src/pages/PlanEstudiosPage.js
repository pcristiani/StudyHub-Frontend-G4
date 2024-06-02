import { CssVarsProvider } from '@mui/joy/styles';
import Typography from '@mui/joy/Typography';
import Container from '@mui/joy/Container';
import Box from '@mui/joy/Box';

const PlanEstudiosPage = () => {
  return (
    <CssVarsProvider>
      <Container component="main" maxWidth="xs">
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '22px' }}>
          <Typography className="focus-ring-primary" component="h1" >
            Plan de estudios
          </Typography>
        </Box>
      </Container>
    </CssVarsProvider>
  );
}

export default PlanEstudiosPage;