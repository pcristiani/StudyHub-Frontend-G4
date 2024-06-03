import React, { useContext } from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import Box from '@mui/joy/Box';
import Sheet from '@mui/joy/Sheet';
import Container from '@mui/joy/Container';
import Typography from '@mui/joy/Typography';
import { AuthContext } from '../../../context/AuthContext';

export function ResumenActividad() {
  const { user } = useContext(AuthContext);

  const actividadUsuario = [
    { time: '8:00', activity: [5, 3] },
    { time: '9:00', activity: [5, 6, 8, 12] },
    { time: '10:00', activity: [5, 6] },
    { time: '11:00', activity: [5, 23] },
    { time: '13:00', activity: [5, 33] },
    { time: '14:00', activity: [5, 43] },
    { time: '22:00', activity: [5, 53] },
  ];
  return (
    <>
      <Sheet sx={{ marginBlockEnd: 12, backgroundColor: 'HighlightText', height: '100%', boxShadow: '-moz-initial' }}>
        <Container component="main" maxWidth="sm" sx={{ marginBlockEnd: 12 }}>
          <Box component="form" sx={{ paddingTop: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', }} onSubmit={'handleSubmit'}>
            <Box sx={{ marginTop: 2, marginBottom: 4, alignSelf: 'center' }}>
            </Box>
            <Typography level="h1" color='neutral'> Estadisticas </Typography>
            <Typography level="body-sm" color='neutral' textAlign="center" sx={{ pb: 1 }}>
              ← Cantidad de visitas →
            </Typography>
            <BarChart
              xAxis={[{ scaleType: 'band', data: ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo'] }]}
              series={[{ data: [11, 13, 25, 0, 17, 13, 16], label: (user.nombre) }, { data: [21, 26, 23, 22, 23, 12, 24, 29, 21, 22], label: (user.nombre) }, { data: [14, 15, 16, 22, 11, 19, 23, 22, 11, 11], label: (user.nombre) }]}
              width={800}
              height={400}
            />

          </Box>
        </Container>
      </Sheet>
    </>
  );
}
