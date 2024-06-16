import React, { useState, useContext } from 'react';
import { CssVarsProvider } from '@mui/joy/styles';

import Typography from '@mui/joy/Typography';
import Container from '@mui/joy/Container';
import { Graphviz } from 'graphviz-react';

import Box from '@mui/joy/Box';
import { getCourseRelations } from '../services/requests/asignaturaService';
import { AuthContext } from '../context/AuthContext';
import DAGViewer from "./DAGViewer";


const PlanEstudiosPage = () => {
  const [strJwt, setStrJwt] = useState(null);
  const { user } = useContext(AuthContext); // Obtengo la informacion de logueo

  async function mostrarUsuario() {
    const result = await getCourseRelations(1, user.jwtLogin);
    setStrJwt(result);
  }
  mostrarUsuario();
  if (!strJwt) return null;
  const getCourseRelationss = `
    graph G{
    bgcolor=transparent;
      node [shape=rectangle, style=border, color="#ED96AC", fontcolor=grey, fontsize=12, fontname="Arial", height=0.2, width=0.4,spacing=0.1,margin=0.1,showboxes=1,border=2,bordercolor=green];
      rankdir=TB;
      `+ ` ${strJwt} ` + `}
  `;
  //   const getCourseRelationss = `
  //    digraph {
  //     node [shape=rectangle, style=filled, color=lightblue];
  //       bgcolor=transparent;    node [shape=rectangle, style=border, color=grey, color="#ED96AC", fontcolor=grey, fontsize=12, fontname="Arial", height=0.2, width=0.4,spacing=0.1,margin=0.1,showboxes=1,border=2,bordercolor=green];  
  //       rankdir=TB; 
  //    ${strJwt} 
  //  "1" [label="Programacion I"];
  //  "2" [label="Programacion II"] ;
  //  "3" [label="Programacion III"];
  //  "4" [label="Estructura de Datos"];
  //  "5" [label="Programacion Avanzada"];
  //  "6" [label="seba", height=0, width=0];

  //    }
  //  `;
  //   const getCourseRelationss = `
  //  digraph {
  //     // Base Styling
  //     rankdir="TB";
  //     splines=true;
  //     overlap=false;
  //     bgcolor=transparent;
  //     nodesep="0.2";
  //     width="800";
  //     height="800";
  //     ranksep="0.4";
  //     // label="Previaturas de la carrera de Ingenieria en Informatica";
  //     labelloc="t";
  //     fontname="Lato";
  //     node [ shape="plaintext" style="filled, rounded" fontname="Lato" margin=0.2 ]
  //     edge [ fontname="Lato" color="#fabfbf" ]
  //     reality [ label="Reality" fillcolor="#17181a" fontcolor="#ffffff" ]
  //     node [ color="#ED96AC" ]
  //     ${strJwt}  }
  //  `;

  console.log("strJwt: ", getCourseRelationss);

  return (
    <>
      <CssVarsProvider>
        <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '40px', marginBottom: '0px' }}>
          {/* <Typography className="text-dark focus-ring-primary" component="h1" >
              Gestion
            </Typography> */}
          {/* <a className="link-style" onClick={downloadPDF}>Descargar previaturas</a> */}
          {/* <Graphviz dot={getCourseRelationss} options={{ width: 1000, height: 500 }} /> */}
          <DAGViewer dot={getCourseRelationss} options={{ width: 1000, height: 1000 }} />
          {/* <textarea value={dag} onChange={(e) => setDag(e.target.value)}></textarea> */}
          {/* <DAGViewer dot={dag} options={{ width: 1000, height: 500 }} /> */}
        </Box>
      </CssVarsProvider>
    </>
  );
}

export default PlanEstudiosPage;




// const getCourseRelationss = `
//   graph G {
//     node [shape=rectangle, style=filled, color=lightblue];
//     rankdir=TB;
//   "1" [label="Programacion I"];
// "2" [label="Programacion II"] ;
// "3" [label="Programacion III"];
// "4" [label="Estructura de Datos"];
// "5" [label="Programacion Avanzada"] [style=invis];
// "6" [label="seba", style=invis, height=0, width=0];
// "1" -- "2"  [style=dotted, color=blue];
// "2" -- "3";
// "3" -- "4";
// "4" -- "5";
//   }
// `;

// const getCourseRelationss = `
//    graph G {
//     node [shape=rectangle, style=filled, color=lightblue];
//       bgcolor=transparent;    node [shape=rectangle, style=border, color=grey, color="#ED96AC", fontcolor=grey, fontsize=12, fontname="Arial", height=0.2, width=0.4,spacing=0.1,margin=0.1,showboxes=1,border=2,bordercolor=green];  
//       rankdir=TB; 
//    ${strJwt} 
//  "1" [label="Programacion I"];
//  "2" [label="Programacion II"] ;
//  "3" [label="Programacion III"];
//  "4" [label="Estructura de Datos"];
//  "5" [label="Programacion Avanzada"] ;
//  "6" [label="seba", height=0, width=0];
//  "1" -- "2";
//  "2" -- "3";
//  "3" -- "4";
//  "4" -- "5";
//    }
//  `;