// import { useInView } from 'react-intersection-observer'
import { useState, useEffect } from 'react';

import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Divider from '@mui/joy/Divider';
import FormControl from '@mui/joy/FormControl';
import Input from '@mui/joy/Input';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import Container from '@mui/joy/Container';

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
          <h4 style={{ margin: 0.5, textAlign: 'center' }}>Comunícate con Nosotros</h4>
          <Typography level="body-sm" sx={{ textAlign: 'center' }}>Envíanos tus comentarios, preguntas o inquietudes</Typography>
          <Stack direction="column" sx={{ display: { xs: 'flex', md: 'flex' }, alignSelf: 'center' }}>
            <FormControl sx={{ display: { sm: 'flex', md: 'flex', width: '350px' }, gap: 1 }}>
              <Input size="sm" id="nombre" name="nombre" placeholder="Nombre" required />
              <Input size="sm" id="creditos" name="creditos" placeholder="Telefono" required />
              <Input size="sm" id="descripcion" name="descripcion" placeholder="Email" required />
              <Input size="sm" id="departamento" name="departamento" placeholder="Mensaje" required />
              <Divider />
            </FormControl>
            <Stack direction="row" spacing={1} sx={{ marginTop: 2, justifyContent: 'right' }}>
              <Button type="submit" size="md" variant="solid">Guardar</Button>
              <Button size="md" variant="outlined" color="neutral" href='/'>Cancelar</Button>
            </Stack>
          </Stack>
        </Box>
      </Container>
    </Sheet>
  );
}

export default ContactoPage


// {/* <form action="https://formsubmit.co/43a" method="POST"> */ }
// {/* <button type="submit">
//                 Enviar
//               </button>
//               <input type="hidden" name="_next" value="https://.com.uy/" />
//               <input type="hidden" name="_captcha" value="false" /> */}