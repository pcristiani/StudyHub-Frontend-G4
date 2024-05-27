import React, { useContext } from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import Box from '@mui/joy/Box';
import Sheet from '@mui/joy/Sheet';
import Container from '@mui/joy/Container';
import Typography from '@mui/joy/Typography';
import { AuthContext } from '../../../context/AuthContext';

export function ResumenActividad() {
  const { user } = useContext(AuthContext);

  // const data = [
  //   { id: 0, value: dataAlumnos.length, label: 'Cursando' },
  //   { id: 1, value: 223, label: 'Lunes' },
  //   { id: 2, value: 40, label: 'Martes' },
  //   { id: 3, value: 40, label: 'Miercoles' },
  //   { id: 4, value: 40, label: 'Jueves' },
  //   { id: 5, value: 40, label: 'Viernes' },
  //   { id: 6, value: 40, label: 'Sabado' },
  //   { id: 7, value: 40, label: 'Domingo' },
  // ];

  return (
    <>
      <Sheet>
        <Container component="main" maxWidth="sm" sx={{ marginBlockEnd: 12 }}>
          <Box component="form" sx={{ marginTop: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', }} onSubmit={'handleSubmit'}>

            <Box sx={{ marginTop: 1, marginBottom: 4, alignSelf: 'center' }}>
              <h2 level="title-lg"> Estadisticas </h2>
            </Box>
            <Typography level="body-sm" color='neutral' textAlign="center" sx={{ pb: 1 }}>
              ← Cantidad de visitas →
            </Typography>
            {/* <label sx={{ alignSelf: 'center' }}> {`Cantidad de conexiones`}</label> */}
            <BarChart
              xAxis={[{ scaleType: 'band', data: ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo'] }]}
              series={[{ data: [11, 13, 25, 0, 17, 13, 16], label: (user.nombre) }, { data: [11, 16, 13, 15, 23, 12, 14, 19, 11, 12], label: (user.nombre) }, { data: [14, 15, 16, 22, 11, 19, 23, 22, 11, 11], label: (user.nombre) }]}
              width={800}
              height={400}
            />
          </Box>
        </Container>
      </Sheet>
    </>
  );
}