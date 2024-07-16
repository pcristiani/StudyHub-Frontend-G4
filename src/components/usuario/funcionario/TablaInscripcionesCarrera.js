import { useState, useEffect, useContext } from 'react';
import Box from '@mui/joy/Box';
import Table from '@mui/joy/Table';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import { useLocation } from 'react-router-dom';
import { errors } from '../../../services/util/errors';
import { TablePagination, tablePaginationClasses as classes, } from '@mui/base/TablePagination';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext';
import { formatoCi } from '../../../services/util/formatoCi';
import Button from '@mui/joy/Button';
import { getInscriptosPendientes, acceptEstudianteCarrera } from '../../../services/requests/carreraService';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';


export default function TablaInscripcionesCarrera() {
  const { user } = useContext(AuthContext);
  const history = useNavigate();
  const [error, setError] = useState(null);
  const [estudianteData, setEstudianteData] = useState([]);
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const idCarrera = queryParams.get('id');
  const [open, setOpen] = useState(false);


  useEffect(() => {
    fetchInscriptosPendientes();
  }, [user]);


  const fetchInscriptosPendientes = async (res) => {
    // res = await getInscriptosPendientes(idCarrera, user.jwtLogin);
    // let title = "¡Inscripción validada!\n\n";
    // errors(title, res.data, res.status, true);
    // setOpen(false);
    try {
      setOpen(false);
      const result = await getInscriptosPendientes(idCarrera, user.jwtLogin);
      const title = "¡Inscripción validada!\n\n";
      if (result.length === 0) {
        //   history('/validar-inscripciones-carrera');
        errors(title, res.data, res.status, '/validar-inscripciones-carrera');
      } else {
        if (res !== undefined && res !== null) {
          errors(title, res.data, res.status, false);
        }
      }
      setEstudianteData(result);
    } catch (error) {
      setError(error.message);
    }
  }


  const handleValidar = async (idEstudiante) => {
    setOpen(true)
    const res = await acceptEstudianteCarrera(idEstudiante, idCarrera, user.jwtLogin);
    fetchInscriptosPendientes(res);
  };

  const handleOpen = () => {
    setOpen(true);
  };
  // const handleClose = () => {
  //   setOpen(false);
  // };
  ///
  return (
    <>
      {/* <Stack direction="row" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', }} spacing={2}> */}
      <Box component="form" sx={{ marginTop: 6, display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
        <div className="tracking-tight lg:flex-row-reverse">
          <div className="flex grid lg:grid-cols-2 grid-cols-2">
            <section className="text-black body-font">
              <div className="px-2 py-2 mx-auto">

                <Box sx={{ minHeight: '20vh', maxWidth: '420px' }}>
                  <Box sx={{ margin: 0.6, alignSelf: 'center', pb: 1.2 }}>
                    <Typography sx={{ textAlign: 'center' }} variant="plain" color="primary" noWrap>Validar inscripción a carrera</Typography>
                  </Box>
                  {/* <Divider /> */}
                  <Sheet
                    variant="outlined"
                    sx={{
                      cursor: 'pointer', '--TableRow-hoverBackground': 'rgb(3, 87, 4, 0.20)', '--TableCell-headBackground': 'transparent',
                      borderCollapse: 'separate', borderSpacing: '0', borderTopLeftRadius: '10px', borderTopRightRadius: '10px', borderBottomLeftRadius: '10px',
                      borderBottomRightRadius: '10px', overflow: 'auto',
                      '& thead th:nth-child(1)': { width: '60%', },
                      '& thead th:nth-child(2)': { width: '16%' },
                      '& tr > *:nth-child(n+3)': { width: '22%' },
                    }}>
                    <Table hoverRow>
                      <thead>
                        <tr>
                          <th style={{ width: 'var(--Table-firstColumnWidth)' }}>Nombre</th>
                          <th style={{ width: 'var(--Table-lastColumnWidth)' }}>Cédula</th>
                          <th aria-label="last" />
                        </tr>
                      </thead>
                      <tbody>
                        {estudianteData.map((estudiante) => (
                          <tr key={estudiante.idUsuario}>
                            <td>{estudiante.nombre} {estudiante.apellido}</td>
                            <td>{formatoCi(estudiante.cedula)}</td>
                            <td>
                              <Button size="sm" variant="plain" color="success" onClick={() => handleValidar(estudiante.idUsuario)}>
                                Validar
                              </Button>
                            </td>
                          </tr>
                        )
                        )}
                      </tbody>
                    </Table>
                    <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                      open={open} onClick={handleOpen}>
                      <CircularProgress color="inherit" />
                    </Backdrop>
                  </Sheet>
                </Box>
              </div>
            </section>
          </div>
        </div>
      </Box>
    </>
  );
}