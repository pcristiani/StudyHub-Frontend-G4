import { CssVarsProvider } from '@mui/joy/styles';
import Typography from '@mui/material/Typography';
import React, { useContext } from 'react';
import { AuthContext } from '../auth/AuthContext';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { useReducer } from 'react';

import { useEffect, useState } from 'react';
import { PARAMETERS, URL_BACK } from '../util/constants'


async function getUsers() {
  console.log("URL: ", URL_BACK.getUser + 5);
  let responses = await fetch(`URL_BACK.getUser+5`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${PARAMETERS.tokenBearer}`,
    },
  }
  );

  if (responses.ok) {
    // console.log("responses: ", responses.text());
    return await responses.text();
  }
}


const Inscripcion = () => {
  const [strJwt, setStrJwt] = useState(null);

  useEffect(() => {
    getUsers().then(result => {
      setStrJwt(result);
      console.log("result: ", result);
    });
  }, []);
  if (!strJwt) return null;

  console.log("  {strJwt}  : ", {strJwt});
  return (
    <>
      <CssVarsProvider>
        <Container component="main" maxWidth="xs">
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '22px' }}>
            <Typography className="text-dark focus-ring-primary" component="h1" >
              {/* {strJwt} */}
            </Typography>

          </Box>
        </Container>
      </CssVarsProvider>
    </>
  );
}

export default Inscripcion;