import { useState, useEffect, useContext } from 'react';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import Button from '@mui/joy/Button';
import Stack from '@mui/joy/Stack';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext';
import Option from '@mui/joy/Option';
import Select from '@mui/joy/Select';
import Card from '@mui/joy/Card';
import { getCarrerasInscripcionesPendientes } from '../../../services/requests/carreraService';
import FormControl from '@mui/joy/FormControl';
import Divider from '@mui/joy/Divider';
import swal from 'sweetalert';

///

export default function ValidarInscripcionesCarrera() {
  const { user } = useContext(AuthContext);
  const history = useNavigate();
  const [error, setError] = useState(null);

  const [carreraData, setCarreraData] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let idCarrera = data.get('idcarrera');
    if (idCarrera !== "Seleccionar carrera" && idCarrera !== "" && idCarrera !== null && idCarrera !== undefined) {
      let idCarreraInt = parseInt(idCarrera, 10);
      console.log(`IDcarrera: ${idCarreraInt}`);
      history(`/tabla-inscripciones-carrera?id=${idCarreraInt}`);
    } else {
      swal("Información!", 'No hay carreras sin validar', "info", {
        timer: 3000
      });
    }
  }

  useEffect(() => {
    const fetchCarreras = async () => {
      try {
        const result = await getCarrerasInscripcionesPendientes(user.jwtLogin);
        if (result.length === 0) {
          swal("Información!", 'No hay carreras sin validar', "info", {
            timer: 3000
          });
          history('/');
        }
        setCarreraData(result);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchCarreras();
  }, [user]);

  useEffect(() => {
    if (carreraData) {
      console.log("Carreras: ", carreraData);
    }
  }, [carreraData]);

  ///
  return (
    <>
      <Box component="form" sx={{ marginTop: 6, display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', }} onSubmit={handleSubmit}>
        <Card sx={{ display: 'flex', alignSelf: 'center', }}>
          <Box sx={{ margin: 0.6, alignSelf: 'center' }}>
            <Typography sx={{ textAlign: 'center' }} variant="plain" color="primary" noWrap>Validar inscripcion carrera</Typography>
          </Box>
          <Divider />
          <Stack direction="column" sx={{ display: { xs: 'flex', md: 'flex' }, alignSelf: 'center' }}>
            <FormControl sx={{ display: { sm: 'flex', md: 'flex', width: '310px' }, gap: 0.8 }}>
              <Select size="sm" defaultValue="Seleccionar carrera" placeholder="Seleccionar carrera" id="idcarrera" name="idcarrera">
                {carreraData.map((carrera, index) => (
                  <Option key={index} value={carrera.idCarrera}>{carrera.nombre}</Option>
                ))}
              </Select>
              <Divider />
            </FormControl>

            <Stack direction="row" spacing={0.6} sx={{ marginTop: 1, justifyContent: 'right', zIndex: '1000' }}>
              <Button type="submit" fullWidth sx={{ mt: 1, mb: 3, border: 0.01, borderColor: '#3d3d3d' }} variant="soft">Continuar</Button>
            </Stack>
          </Stack>
        </Card>
      </Box>
    </>
  );
}