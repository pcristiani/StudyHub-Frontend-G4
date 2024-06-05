import { useState, useEffect, useContext } from 'react';
import Box from '@mui/joy/Box';
import Table from '@mui/joy/Table';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import { useLocation } from 'react-router-dom';

import Stack from '@mui/joy/Stack';
import { TablePagination, tablePaginationClasses as classes, } from '@mui/base/TablePagination';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext';
import { FormatCedula } from '../../../services/data/FormatCedula';
import Button from '@mui/joy/Button';

import { getInscriptosPendientes, acceptEstudianteCarrera } from '../../../services/requests/carreraService';


export default function TablaInscripcionesCarrera() {
  const { user } = useContext(AuthContext);
  const history = useNavigate();
  const [error, setError] = useState(null);
  const [estudianteData, setEstudianteData] = useState([]);

  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const idCarrera = queryParams.get('id');


  useEffect(() => {
    fetchInscriptosPendientes();
  }, [user]);


  const fetchInscriptosPendientes = async () => {
    try {
      let result = await getInscriptosPendientes(idCarrera, user.jwtLogin);
      console.log('id en Tablaaasde: ', result.length);
      if (result.length === 0) {
        history('/validar-inscripciones-carrera');
      }
      setEstudianteData(result);

    } catch (error) {
      setError(error.message);
    }
  }

  const handleValidar = async (idEstudiante) => {
    const res = await acceptEstudianteCarrera(idEstudiante, idCarrera, user.jwtLogin);
    fetchInscriptosPendientes();
  };


  ///
  return (
    <>
      <Stack direction="row" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', }} spacing={2}>
        <div className="tracking-tight lg:flex-row-reverse">
          <div className="flex grid lg:grid-cols-2 grid-cols-2">
            <section className="text-black body-font">
              <div className="px-2 py-5 mx-auto">

                <Box sx={{ minHeight: '20vh', maxWidth: '500px' }}>
                  <Typography level="body-sm" color='neutral' textAlign="center" sx={{ pb: 1 }}>
                    ← Validar inscripción a carrera →
                  </Typography>
                  <Sheet
                    variant="outlined"
                    sx={{
                      '--TableCell-height': '30px', '--TableHeader-height': 'calc(1 * var(--TableCell-height))', '--Table-firstColumnWidth': '140px', '--Table-lastColumnWidth': '90px', '--Table-buttonColumnWidth': '70px',
                      '--TableRow-hoverBackground': 'rgb(3, 202, 192, 0.30)',
                      borderCollapse: 'separate', borderSpacing: '0', borderTopLeftRadius: '12px', borderTopRightRadius: '12px', borderBottomLeftRadius: '12px', borderBottomRightRadius: '12px', overflow: 'auto', backgroundSize: '40px calc(100% - var(--TableCell-height)), 40px calc(100% - var(--TableCell-height)), 14px calc(100% - var(--TableCell-height)), 14px calc(100% - var(--TableCell-height))', backgroundRepeat: 'no-repeat', backgroundAttachment: 'local, local, scroll, scroll', backgroundColor: 'background.surface'
                    }}>

                    <Table hoverRow>
                      <thead>
                        <tr>
                          <th style={{ width: 'var(--Table-firstColumnWidth)' }}>Nombre</th>
                          <th style={{ width: 'var(--Table-lastColumnWidth)' }}>Cédula</th>
                          <th aria-label="last" style={{ width: 'var(--Table-buttonColumnWidth)' }} />
                        </tr>
                      </thead>
                      <tbody>
                        {estudianteData.map((estudiante) => (

                          <tr key={estudiante.idUsuario}>
                            <td>{estudiante.nombre} {estudiante.apellido}</td>
                            <td>{FormatCedula(estudiante.cedula)}</td>
                            <td>
                              <Button size="sm" variant="outlined" color="primary" onClick={() => handleValidar(estudiante.idUsuario)}>
                                Validar
                              </Button>
                            </td>
                          </tr>
                        )
                        )}
                      </tbody>
                    </Table>
                  </Sheet>
                </Box>
              </div>
            </section>
          </div>
        </div>
      </Stack>
    </>
  );
}