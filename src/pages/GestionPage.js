import { CssVarsProvider } from '@mui/joy/styles';
import Typography from '@mui/joy/Typography';

import Container from '@mui/joy/Container';
import Box from '@mui/joy/Box';
import { Graphviz } from 'graphviz-react';
import { jsPDF } from "jspdf";
import { getCourseRelations } from '../services/requests/asignaturaService';
import { AuthContext } from '../context/AuthContext';
import Sheet from '@mui/joy/Sheet';

import React, { useContext, useEffect, useState } from 'react';

const downloadPDF = (event) => {
    var doc = new jsPDF();

    doc.setTextColor(100);
    doc.text(`gest`, 20, 20);

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
    const { user } = useContext(AuthContext); // Obtengo la informacion de logueo

    const [strJwt, setStrJwt] = useState(null);

    async function mostrarUsuario() {
        const result = await getCourseRelations(1, user.jwtLogin);
        setStrJwt(result);
    }
    mostrarUsuario();
    if (!strJwt) return null;

    return (
        <>
            <Sheet>


                {/* <CssVarsProvider> */}
                    {/* <Container component="main" maxWidth="xs"> */}
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '10px', marginBottom: '80px' }}>
                            <Typography className="text-dark focus-ring-primary" component="h1" >
                                Gestion
                            </Typography>
                            <a className="link-style" onClick={downloadPDF}>Descargar previaturas</a>
                            <Graphviz dot={strJwt} options={{ width: 800, height: 500 }} />
                        </Box>
                    {/* </Container> */}
                {/* </CssVarsProvider> */}
            </Sheet>

        </>
    );
}

export default GestionPage;