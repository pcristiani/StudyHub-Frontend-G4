import React from 'react';
import { CssVarsProvider } from '@mui/joy/styles';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { Graphviz } from 'graphviz-react';
import { PARAMETERS, URL_BACK } from '../util/constants'

async function getUsers() {
    console.log("URL: ", URL_BACK.courseRelations);
    let responses = await fetch(URL_BACK.courseRelations, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${PARAMETERS.tokenBearer}`,
        },
    }
    );
    if (responses.ok) {
        return await responses.text();
    }
}

const Cursos = () => {
    const [strJwt, setStrJwt] = useState(null);

    useEffect(() => {
        getUsers().then(result => {
            setStrJwt(result);
        });
    }, []);
    if (!strJwt) return null;

    return (
        <CssVarsProvider>
            <Container component="main" maxWidth="xs">
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '22px' }}>
                    <Typography className="text-dark focus-ring-primary" component="h1" >
                        Cursos
                    </Typography>
                    <Typography>Carrera Tecnólogo en Informática</Typography>
                    <Graphviz dot={strJwt} options={{ width: 1000, height: 700 }} />
                </Box>
            </Container>
        </CssVarsProvider>

    );
}
export default Cursos;