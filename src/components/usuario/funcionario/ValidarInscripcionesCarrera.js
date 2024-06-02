import { useState, useEffect, useContext } from 'react';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import Button from '@mui/joy/Button';
import Stack from '@mui/joy/Stack';
import { TablePagination, tablePaginationClasses as classes } from '@mui/base/TablePagination';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext';
import Option from '@mui/joy/Option';
import Select from '@mui/joy/Select';
import Card from '@mui/joy/Card';
import { getCarrerasInscripcionesPendientes } from '../../../services/requests/carreraService';
import FormControl from '@mui/joy/FormControl';
import Divider from '@mui/joy/Divider';

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
    let idCarreraInt = parseInt(idCarrera, 10);
    console.log(`IDcarrera: ${idCarreraInt}`);
    history(`/tabla-inscripciones-carrera?id=${idCarreraInt}`);
  }

  useEffect(() => {
    const fetchCarreras = async () => {
      try {
        const result = await getCarrerasInscripcionesPendientes(user.jwtLogin);
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
      <Box component="form" sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', }} onSubmit={handleSubmit}>
        <Card sx={{ display: 'flex', alignSelf: 'center', }}>
          <Box sx={{ margin: 1, alignSelf: 'center' }}>
            <Typography level="title-lg">Validar inscripcion carrera</Typography>
          </Box>
          <Divider />
          <Stack direction="column" sx={{ display: { xs: 'flex', md: 'flex' }, alignSelf: 'center' }}>
            <FormControl sx={{ display: { sm: 'flex', md: 'flex', width: '350px' }, gap: 0.8 }}>
              <Select size="sm" defaultValue="Seleccionar carrera" placeholder="Seleccionar carrera" id="idcarrera" name="idcarrera">
                {carreraData.map((carrera, index) => (
                  <Option key={index} value={carrera.idCarrera}>{carrera.nombre}</Option>
                ))}
              </Select>
              <Divider />
            </FormControl>
            <Stack direction="row" spacing={0.8} sx={{ marginTop: 1, justifyContent: 'right' }}>
              <Button type="submit" fullWidth sx={{ mt: 1, mb: 3, border: 0.01, borderColor: '#3d3d3d' }} variant="soft">Continuar</Button>
            </Stack>
          </Stack>
        </Card>
      </Box>
    </>
  );
}