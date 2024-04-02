import { CssVarsProvider } from '@mui/joy/styles';
import Typography from '@mui/material/Typography';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { Graphviz } from 'graphviz-react';
import { graphviz } from "d3-graphviz";

const Cursos = () => {
    return (
        <>
            <CssVarsProvider>
                <Container component="main" maxWidth="xs">
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '22px' }}>
                        <Typography className="text-dark focus-ring-primary" component="h1" >
                            Cursos
                        </Typography>
                        <Typography>Carrera Tecnólogo en Informática</Typography>
                        <Graphviz dot={`graph {
                            node [shape=rectangle, style=filled, color=lightblue, fontcolor=red];
                            edge [color=gray];
                            "Principios de Programación" -- "Estructuras de Datos y Algorit.";
                            "Principios de Programación" -- "Arquitectura";
                            "Arquitectura" -- "Sistemas Operativos";
                            "Discreta y Lógica 1" -- "Discreta y Lógica 2";
                            "Discreta y Lógica 2" -- "Probabilidad y Estadística";
                            "Discreta y Lógica 1" -- "Estructuras de Datos y Algorit.";
                            "Estructuras de Datos y Algorit." -- "Programación Avanzada";
                            "Matemática" -- "Bases de Datos 1";
                            "Bases de Datos 1" -- "Bases de Datos 2";
                            "Programación Avanzada" -- "Ingeniería de Software";
                            "Programación Avanzada" -- "Programación de Aplicaciones";
                            "Sistemas Operativos" -- "Redes de Computadoras";
                            "Sistemas Operativos" -- "Administración de Infraestructura";
                            "Discreta y Lógica 2" -- "Sistemas Operativos";
                            "Bases de Datos 1" -- "Programación Avanzada";
                            "Estructuras de Datos y Algorit." -- "Bases de Datos 2";
                            "Redes de Computadoras" -- "Administración de Infraestructura";
                            "Discreta y Lógica 2" -- "Programación de Aplicaciones";
                            "Inglés Técnico" -- "Inglés Técnico 2";
                            "Inglés Técnico 2" -- "Comunicación Oral y Escrita";
                            "Comunicación Oral y Escrita" -- "Relaciones Pers. y Lab.";
                            "Contabilidad" -- "Relaciones Pers. y Lab."
                            }`}
                            />
                    </Box>
                </Container>
            </CssVarsProvider>
        </>
    );
}

export default Cursos;