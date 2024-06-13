import Typography from '@mui/joy/Typography';

import Container from '@mui/joy/Container';
import Box from '@mui/joy/Box';
import { Graphviz } from 'graphviz-react';
import { jsPDF } from "jspdf";
import { getCourseRelations } from '../services/requests/asignaturaService';
import { AuthContext } from '../context/AuthContext';
import Sheet from '@mui/joy/Sheet';
// import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.esm.min.mjs';
import React, { useContext, useEffect, useState, useRef } from 'react';
import mermaid from 'mermaid';
import { Base91, Zstd } from "@hpcc-js/wasm";

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
const MermaidChart = ({ chart }) => {
    const chartRef = useRef(null);

    useEffect(() => {
        mermaid.initialize({ startOnLoad: true });
        if (chartRef.current) {
            mermaid.render('graphDiv', chart, (svgCode) => {
                chartRef.current.innerHTML = svgCode;
            });
        }
    }, [chart]);

    return <div ref={chartRef} />;
};
const GestionPage = () => {
    const { user } = useContext(AuthContext); // Obtengo la informacion de logueo


    const [strJwt, setStrJwt] = useState(null);


    // useEffect(() => {
    //     const mostrarUsuario = async () => {
    //         const result = await getCourseRelations(1, user.jwtLogin);
    //         setStrJwt(result);
    //     };





    // Base91 + Zstd ---
    const text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi.  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi.";
    const data = new TextEncoder().encode(text);

    async function compressDecompress() {
        const zstd = await Zstd.load();
        const compressed_data = zstd.compress(data);
        const base91 = await Base91.load();
        const base91Str = base91.encode(compressed_data);

        const compressed_data2 = base91.decode(base91Str);
        const data2 = zstd.decompress(compressed_data2);
        const text2 = new TextDecoder().decode(data2);

        console.log("Text Length:  ", text.length);
        console.log("Compressed Length:  ", compressed_data.length);
        console.log("Base91 Length:  ", base91Str.length);
        console.log("Passed:  ", text === text2);
    }

    compressDecompress();

    // }, []);
    if (!strJwt) return null;
    const chart = `
  graph TD;
 1[Programacion I]
 2[Programacion II]
 3[Programacion III]
 4[Programacion Avanzada]
 5[Coordinador]
 6[Funcionario]
1 --> 2
2 --> 3
3 --> 4
      `;
    function Graph() {
        this.vertices = [];
        this.edges = [];
    }

    Graph.prototype.addVertex = function (v) {
        this.vertices.push(v);
    };

    const g = new Graph();
    // g ---> Graph.prototype ---> Object.prototype ---> null

    g.hasOwnProperty("vertices"); // verdadero
    Object.hasOwn(g, "vertices"); // verdadero

    g.hasOwnProperty("nope"); // falso
    Object.hasOwn(g, "nope"); // falso

    g.hasOwnProperty("addVertex"); // falso
    Object.hasOwn(g, "addVertex"); // falso

    Object.getPrototypeOf(g).hasOwnProperty("addVertex"); // verdadero


    return (
        <div>
            {/* <h1>Diagrama de Estado en React</h1> */}
            {/* <Graphviz chart={chart} /> */}
            <Graphviz dot={chart} options={{ width: 800, height: 500 }} />
        </div>
    );
    // return (
    //     <>
    //         <Sheet>

    //             <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '10px', marginBottom: '80px' }}>
    //                 {/* <Typography className="text-dark focus-ring-primary" component="h1" >
    //                     Gestion
    //                 </Typography> */}
    //                 {/* {/* <a className="link-style" onClick={downloadPDF}>Descargar previaturas</a> */}
    //                 {/* <Graphviz dot={strJwt} options={{ width: 800, height: 500 }} /> */}
    //                 <MermaidChart chart={chart} />
    //             </Box>
    //         </Sheet>

    //     </>
    // );
}

export default GestionPage;