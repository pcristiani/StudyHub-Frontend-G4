import React, { useContext, useRef } from 'react';
import Box from '@mui/joy/Box';
import { jsPDF } from "jspdf";
import { AuthContext } from '../context/AuthContext';
import Sheet from '@mui/joy/Sheet';


const downloadPDF = (event) => {
    var doc = new jsPDF();

    doc.setTextColor(100);
    doc.text(`------------------------------------------------------------------`, 20, 20);

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

    return (
        <>
            <Sheet>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '10px', marginBottom: '80px' }}>
                    <h1 className="focus-ring-primary py-4" component="h1" >
                        Escolaridad
                    </h1>
                    <br></br>
                    <a className="link-style" onClick={downloadPDF}>Descargar</a>
                </Box>
            </Sheet>

        </>
    );
}

export default GestionPage;