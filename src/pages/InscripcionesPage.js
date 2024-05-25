/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { getUsuarios } from '../services/requests/usuarioService';
import { getToken } from '../services/requests/loginService';

import Typography from '@mui/material/Typography';
import { CssVarsProvider } from '@mui/joy/styles';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
// import SelectComponent from '../components/SelectComponent'

const InscripcionesPage = () => {
  const { user } = useContext(AuthContext); // Obtengo la informacion de logueo
  // console.log("IdUser : ", user.id);

  useEffect(() => {
    getUsuarios(user.id).then(result => {
      // console.log("Datos Usuario: ", result);
    });
  }, []);

  useEffect(() => {
    getToken('11', '123').then(result => {
      // console.log("JWT: ", result);
    });
  }, []);

  return (
    <CssVarsProvider>
      <Container component="main" maxWidth="xs">
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '22px' }}>
          <Typography className="text-dark focus-ring-primary" component="h1" >
            <div style={{ height: 100, width: '100%' }}>
              <Typography className="text-dark focus-ring-primary" component="h1" >
                Inscripciones
              </Typography>
            </div>
          </Typography>
        </Box>
        {/* <SelectComponent /> */}

      </Container>
    </CssVarsProvider>
  );
}

export default InscripcionesPage;
