import { CssVarsProvider } from '@mui/joy/styles';
import React, { useState, useEffect, useContext } from 'react';

import Option from '@mui/joy/Option';
import Select from '@mui/joy/Select';
import Box from '@mui/joy/Box';
import DAGViewer from './DAGViewer';
import { AuthContext } from '../context/AuthContext';
import { getCarreras } from '../services/requests/carreraService';
import { getPreviaturasGrafo } from '../services/requests/asignaturaService';
import { errors } from '../services/util/errors';
import { COURSE } from '../services/util/constants';


const PlanEstudiosPage = () => {
  const { user } = useContext(AuthContext);
  const [previaturasGrafoData, setPreviaturasGrafoData] = useState(null);
  const [carreraData, setCarreraData] = useState([]);
  const [selectedCarrera, setSelectedCarrera] = useState('');

  useEffect(() => {
    const fetchCarreras = async () => {
      try {
        const result = await getCarreras(user.jwtLogin);
        setCarreraData(result);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchCarreras();
  }, [user]);

  useEffect(() => {
    if (carreraData) {
      console.log("getCarreras: ", carreraData);
    }
  }, [carreraData]);

  const handleChangeCarrera = (event, idCarrera) => {
    setSelectedCarrera(idCarrera);
    if (idCarrera !== null) {
      getInfoPreviaturasGrafo(idCarrera);
    }
  };

  if (selectedCarrera === null || selectedCarrera === '' || selectedCarrera === undefined) {
    getInfoPreviaturasGrafo(1);
  }

  async function getInfoPreviaturasGrafo(idCarrera) {
    const result = await getPreviaturasGrafo(idCarrera, user.jwtLogin);

    if (result === null || result === '' || result === undefined) {
      errors("La carrera no tiene asignaturas", "", 400);
    } else {
      setPreviaturasGrafoData(result);
    }
  }
  if (!previaturasGrafoData) return null;

  const mostrarGrafo = COURSE.graph + `${previaturasGrafoData}}`;

  return (
    <>
      <CssVarsProvider>
        <Box sx={{ marginTop: 6, display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
          <Select size="sm" defaultValue="Seleccionar carrera" placeholder="Seleccionar carrera" id="idcarrera" name="idcarrera" onChange={handleChangeCarrera} >
            {carreraData.map((carrera, index) => (
              <Option key={index} value={carrera.idCarrera}>{carrera.nombre}</Option>
            ))}
          </Select>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '3%' }}>
          <DAGViewer dot={mostrarGrafo} options={{ width: 1200, height: 500 }} />
        </Box>
      </CssVarsProvider>
    </>
  );
}

export default PlanEstudiosPage;