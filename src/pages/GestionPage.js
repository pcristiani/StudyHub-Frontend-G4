import React, { useState } from 'react';
import { CssVarsProvider } from '@mui/joy/styles';
import Typography from '@mui/material/Typography';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { Graphviz } from 'graphviz-react';
import { jsPDF } from "jspdf";
import { getCourseRelations } from '../services/requests/getCourseRelations';
import '../css/style-navbar.css';

const downloadPDF = (event) => {
    var doc = new jsPDF();

    doc.setTextColor(100);
    doc.text(`StudyHub`, 20, 20);

    doc.setTextColor(150);
    doc.text("StudyHub.", 20, 30);

    doc.setTextColor(255, 0, 0);
    doc.text("StudyHub", 20, 40);

    doc.setTextColor(0, 255, 0);
    doc.text("StudyHub", 20, 50);
    // doc.setTextColor("blue");
    // doc.text("This is blue.", 60, 60);
    // const doc = new jsPDF();

    doc.text("StudyHub", 10, 10);
    doc.save("a4.pdf");
}

const GestionPage = () => {
    const [strJwt, setStrJwt] = useState(null);

    async function mostrarUsuario() {
        const result = await getCourseRelations();
        setStrJwt(result);
    }
    mostrarUsuario();
    if (!strJwt) return null;

    return (
        <>
            <CssVarsProvider>
                <Container component="main" maxWidth="xs">
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '10px', marginBottom: '80px' }}>
                        <Typography className="text-dark focus-ring-primary" component="h1" >
                            Gestion
                        </Typography>
                        <a className="link-style" onClick={downloadPDF}>Descargar previaturas</a>
                        <Graphviz dot={strJwt} options={{ width: 800, height: 500 }} />
                    </Box>
                </Container>
            </CssVarsProvider>
        </>
    );
}

export default GestionPage;