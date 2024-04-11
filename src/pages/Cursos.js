import React from 'react';
import { CssVarsProvider } from '@mui/joy/styles';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { Graphviz } from 'graphviz-react';
import { PARAMETERS, URL_BACK } from '../util/constants'
import { jsPDF } from "jspdf";

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

const downloadPDF = (event) => {
    var doc = new jsPDF();

    doc.setTextColor(100);
    doc.text(`PRUEBA`, 20, 20);

    doc.setTextColor(150);
    doc.text("This is light gray.", 20, 30);

    doc.setTextColor(255, 0, 0);
    doc.text("This is red.", 20, 40);

    doc.setTextColor(0, 255, 0);
    doc.text("This is green.", 20, 50);

    // doc.setTextColor(0, 0, 255);
    // doc.text("This is blue.", 20, 60);

    // doc.setTextColor("red");
    // doc.text("This is red.", 60, 40);

    // doc.setTextColor("green");
    // doc.text("This is green.", 60, 50);

    // doc.setTextColor("blue");
    // doc.text("This is blue.", 60, 60);
    // const doc = new jsPDF();

    doc.text("Hello world!", 10, 10);
    doc.save("a4.pdf");
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
        <>
            <CssVarsProvider>
                <Container component="main" maxWidth="xs">
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '22px' }}>
                        <Typography className="text-dark focus-ring-primary" component="h1" >
                            Cursos
                        </Typography>
                        <Typography>Carrera Tecnólogo en Informática</Typography>
                        <button className="btn3" onClick={downloadPDF}> Descargar PDF </button>
                        <Graphviz dot={strJwt} options={{ width: 1000, height: 700 }} />
                    </Box>
                </Container>
            </CssVarsProvider>
        </>
    );
}

export default Cursos;