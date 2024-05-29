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
import Card from '@mui/joy/Card';
import Button from '@mui/joy/Button';
import Tooltip from '@mui/joy/Tooltip';
import swal from 'sweetalert';


import { getInscriptosPendientes, acceptEstudianteCarrera } from '../../../services/requests/carreraService';

function selectValidar(id, validado) {
  return { id, validado };
}
const dataSelect = [
  selectValidar(true, "Validado"),
  selectValidar(false, "No Validado"),
];

function preventDefault(event) {
  event.preventDefault();
}

export default function TablaInscripcionesCarrera() {
  const { user } = useContext(AuthContext);
  const history = useNavigate();
  const [error, setError] = useState(null);
  const [coordinadorData, setCoordinadorData] = useState([]);

  const [carreraData, setCarreraData] = useState([]);
  const [asignaturaData, setAsignaturaData] = useState([]);

  const location = useLocation();
  const [id, setId] = useState(null);

  // useEffect(() => {
  const queryParams = new URLSearchParams(location.search);
  const idFromUrl = queryParams.get('id');
  // setId(idFromUrl);
  // }, [location]);
  console.log('id en Tabla: ', idFromUrl);


  const fetchCoordinador = async () => {
    try {
      const result = await getInscriptosPendientes(idFromUrl, user.jwtLogin);
      setCoordinadorData(result);
    } catch (error) {
      setError(error.message);
    }

  }
  fetchCoordinador();

  useEffect(() => {
    if (coordinadorData) {
      console.log("Inscriptos pendientes: ", coordinadorData);
    }
  }, [coordinadorData]);

  const handleValidar = async (idEstudiante) => {

    const result = await acceptEstudianteCarrera(idEstudiante, idFromUrl, user.jwtLogin);
    if (result.status === 200) {
      console.log("Se cambio la passwords: ", result.data);
      swal({
        title: "¡Inscripción validada!\n\n",
        text: "Inscripción a carrera validada.",
        icon: "success",
        dangerMode: false,
        position: "center",
        timer: 4000
      });
      fetchCoordinador();
      // return result.status;
    } else {
     
    }
    // if (result.ok) {

    //   swal({
    //     title: "¡Docente creado!\n\n",
    //     text: "El docente ha sido creado con éxito.",
    //     icon: "success",
    //     dangerMode: false,
    //     position: "center",
    //     timer: 4000
    //   });
    // } else {
    //   let errorMsg = 'Los datos ingresados no son correctos o ya existe un docente con ese nombre';
    //   if (result.status === 401) {
    //     errorMsg = 'No autorizado. Verifica tu token de autenticación.';
    //   } else if (result.status === 500) {
    //     errorMsg = 'Error interno del servidor. Inténtalo más tarde.';
    //   }
    //   swal("Error", errorMsg, "error", {
    //     timer: 3000
    //   });
    // }

    // history('/Novedades');
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
                    ← Asignar Coordinador a carrera →
                  </Typography>

                  <Sheet
                    variant="outlined"
                    sx={{
                      '--TableCell-height': '30px',
                      '--TableHeader-height': 'calc(1 * var(--TableCell-height))',

                      '--Table-firstColumnWidth': '140px', '--Table-lastColumnWidth': '90px', '--Table-buttonColumnWidth': '70px',
                      '--TableRow-hoverBackground': 'rgb(3, 202, 192, 0.30)',
                      borderCollapse: 'separate', borderSpacing: '0', borderTopLeftRadius: '12px', borderTopRightRadius: '12px', borderBottomLeftRadius: '12px', borderBottomRightRadius: '12px', overflow: 'auto',
                      background: (theme) =>
                        `linear-gradient(to right, ${theme.vars.palette.background.surface} 30%, rgba(255, 255, 255, 0)),
        linear-gradient(to right, rgba(255, 255, 255, 0), ${theme.vars.palette.background.surface} 90%) 0 100%`,
                      backgroundSize:
                        '40px calc(100% - var(--TableCell-height)), 40px calc(100% - var(--TableCell-height)), 14px calc(100% - var(--TableCell-height)), 14px calc(100% - var(--TableCell-height))', backgroundRepeat: 'no-repeat',
                      backgroundAttachment: 'local, local, scroll, scroll',
                      backgroundPosition:
                        'var(--Table-firstColumnWidth) var(--TableCell-height), calc(100% - var(--Table-lastColumnWidth)) var(--TableCell-height), var(--Table-firstColumnWidth) var(--TableCell-height), calc(100% - var(--Table-lastColumnWidth)) var(--TableCell-height)',
                      backgroundColor: 'background.surface',
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
                        {coordinadorData.map((row) => (
                          row.rol === 'E' && (
                            <tr key={row.idUsuario}>
                              <td>{row.nombre} {row.apellido}</td>
                              <td>{FormatCedula(row.cedula)}</td>
                              <td>
                                <Button size="sm" variant="outlined" color="primary" onClick={() => handleValidar(row.idUsuario)}>
                                  Validar
                                </Button>
                              </td>
                            </tr>
                          )
                        ))}
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