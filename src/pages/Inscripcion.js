/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../auth/AuthContext';
import { getUsers } from '../requests/getUsers';
import { loginTest } from '../requests/loginTest';

import Typography from '@mui/material/Typography';
import { CssVarsProvider } from '@mui/joy/styles';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

const Inscripcion = () => {
  const { user } = useContext(AuthContext); // Obtengo la informacion de logueo
  console.log("IdUser : ", user.id);

  useEffect(() => {
    getUsers(user.id).then(result => {
      console.log("Datos Usuario: ", result);
    });
  }, []);

  useEffect(() => {
    loginTest('sgonzalez', '123').then(result => {
      console.log("JWT: ", result);
    });
  }, []);

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
