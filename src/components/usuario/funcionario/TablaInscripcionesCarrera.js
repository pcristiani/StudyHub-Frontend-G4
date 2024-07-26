import { useState, useEffect, useContext } from 'react';
import Box from '@mui/joy/Box';
import Table from '@mui/joy/Table';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import { useLocation } from 'react-router-dom';
import { errors } from '../../../services/util/errors';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext';
import { formatoCi } from '../../../services/util/formatoCi';
import { getInscriptosPendientes, acceptEstudianteCarrera } from '../../../services/requests/carreraService';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import IconButton from '@mui/joy/IconButton';
import Tooltip from '@mui/joy/Tooltip';
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import swal from 'sweetalert';


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
    try {
      setOpen(false);
      const result = await getInscriptosPendientes(idCarrera, user.jwtLogin);
      const title = "¡Inscripción validada!\n\n";

      if (result.length === 0) {
        swal("Información!", 'No hay carreras sin validar', "info", {
          timer: 3000
        });
        history(`/validar-inscripciones-carrera`);
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
    const res = await acceptEstudianteCarrera(idEstudiante, idCarrera, true, user.jwtLogin);
    fetchInscriptosPendientes(res);
  };

  const handleInvalidar = async (idEstudiante) => {
    setOpen(true)
    const res = await acceptEstudianteCarrera(idEstudiante, idCarrera, false, user.jwtLogin);
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
      <Box component="form" sx={{ marginTop: 6, display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
        <div className="tracking-tight lg:flex-row-reverse">
          <div className="flex grid lg:grid-cols-2 grid-cols-2">
            <section className="text-black body-font">
              <div className="px-2 py-2 mx-auto">

                <Box sx={{ minHeight: '20vh', maxWidth: '420px' }}>
                  <Box sx={{ margin: 0.6, alignSelf: 'center', pb: 1 }}>
                    <Typography sx={{ textAlign: 'center' }} variant="plain" color="primary" noWrap>Validar inscripción a carrera</Typography>
                  </Box>
                  <Sheet
                    variant="outlined"
                    sx={{
                      cursor: 'pointer', '--TableRow-hoverBackground': 'rgb(3, 87, 4, 0.20)', '--TableCell-headBackground': 'transparent',
                      borderCollapse: 'separate', borderSpacing: '0', borderTopLeftRadius: '10px', borderTopRightRadius: '10px', borderBottomLeftRadius: '10px',
                      borderBottomRightRadius: '10px', overflow: 'auto'
                    }}>
                    <Table hoverRow>
                      <thead>
                        <tr>
                          <th style={{ width: '50%' }}>Nombre</th>
                          <th style={{ width: '30%' }}>Cédula</th>
                          <th aria-label="last" style={{ width: '20%' }} />
                        </tr>
                      </thead>
                      <tbody>
                        {estudianteData.map((estudiante) => (
                          <>
                            {(estudiante.activo) ?
                              <tr key={estudiante.idUsuario}>
                                <td>{estudiante.nombre} {estudiante.apellido}</td>
                                <td>{formatoCi(estudiante.cedula)}</td>
                                <td>
                                  <Tooltip title="Validar inscripción" variant="plain" color="success" >
                                    <IconButton size="sm" variant="plain" color="success" onClick={() => handleValidar(estudiante.idUsuario)}>
                                      <CheckCircleOutlineRoundedIcon />
                                    </IconButton>
                                  </Tooltip>
                                  <Tooltip title="Invalidar inscripción" variant="plain" color="danger" >
                                    <IconButton size="sm" variant="plain" color="danger" onClick={() => handleInvalidar(estudiante.idUsuario)}>
                                      <CancelOutlinedIcon />
                                    </IconButton>
                                  </Tooltip>
                                </td>
                              </tr>
                              :
                              null
                            }
                          </>
                        ))}
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


// RemoveCircleOutlineRoundedIcon

//RemoveRoundedIcon 
// CheckCircleOutlineRoundedIcon CloseRoundedIcon
// CheckRoundedIcon BlockRoundedIcon AddCircleOutlineRoundedIcon 