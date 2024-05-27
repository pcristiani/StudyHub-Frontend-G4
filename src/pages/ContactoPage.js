import { useState, useEffect } from 'react';

import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import Input from '@mui/joy/Input';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import Container from '@mui/joy/Container';
import Textarea from '@mui/joy/Textarea';

const ContactoPage = () => {
  const handleResize = () => setWindowWidth(window.innerWidth);
  const [windowWidth, setWindowWidth] = useState();

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Sheet>
      <Container component="main" maxWidth="xs" sx={{ marginBlockEnd: 12 }}>
        <Box component="form" sx={{ marginTop: 11, display: 'flex', flexDirection: 'column', width: '100%' }} onSubmit={''}>
          <h3 style={{ margin: 0.5, textAlign: 'center' }}>Comunícate con Nosotros</h3>
          <Typography level="body-sm" sx={{ textAlign: 'center' }}>Envíanos tus comentarios, preguntas o inquietudes</Typography>
          <Stack direction="column" sx={{ marginTop: 2, display: { xs: 'flex', md: 'flex' }, alignSelf: 'center' }}>
            <FormControl sx={{ display: { sm: 'flex', md: 'flex', width: '350px' }, gap: 0.8 }}>
              <Input size="sm" id="nombre" name="nombre" placeholder="Nombre" required />
              <Input size="sm" id="telefono" name="telefono" placeholder="Telefono" required />
              <Input size="sm" id="email" name="email" placeholder="Email" required />
              <Textarea minRows={3} size="sm" id="mensaje" name="mensaje" placeholder="Mensaje" required />
            </FormControl>
            <Stack direction="row" spacing={1} sx={{ marginTop: 2, justifyContent: 'right' }}>
              <Button type="submit" fullWidth size="md" variant="solid">Guardar</Button>
              <Button size="md" fullWidth variant="outlined" color="neutral" href='/'>Cancelar</Button>
            </Stack>
          </Stack>
        </Box>
      </Container>
    </Sheet>
  );
}

export default ContactoPage