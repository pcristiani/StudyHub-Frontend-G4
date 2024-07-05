import { CssVarsProvider } from '@mui/joy/styles';
import React, { useState, useEffect, useContext } from 'react';
import Option from '@mui/joy/Option';
import Select from '@mui/joy/Select';
import Box from '@mui/joy/Box';
import DAGViewer from './DAGViewer';
import { AuthContext } from '../context/AuthContext';
import { getCarrerasPublic } from '../services/requests/carreraService';
import { getPreviaturasGrafo } from '../services/requests/asignaturaService';
import { errors } from '../services/util/errors';
import { COURSE } from '../services/util/constants';


const PlanEstudiosPage = () => {
  const { user } = useContext(AuthContext);
  const [previaturasGrafoData, setPreviaturasGrafoData] = useState('');
  const [carreraData, setCarreraData] = useState([]);
  const [selectedCarrera, setSelectedCarrera] = useState('');

  useEffect(() => {
    const fetchCarreras = async () => {
      try {
        const result = await getCarrerasPublic(user.jwtLogin);
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


  if (selectedCarrera === null || selectedCarrera === '' || selectedCarrera === undefined) {
    getInfoPreviaturasGrafo(1);
  }

  
  const handleChangeCarrera = (event, idCarrera) => {
    setSelectedCarrera(idCarrera);
    if (idCarrera !== null) {
      getInfoPreviaturasGrafo(idCarrera);
    } else {
    }
  };
  
  // getInfoPreviaturasGrafo(1);

  const mostrarGrafo = COURSE.graph + `${previaturasGrafoData}}`;

  async function getInfoPreviaturasGrafo(idCarrera) {
    let result = await getPreviaturasGrafo(idCarrera, user.jwtLogin);
    if (result === null || result === '' || result === undefined) {
      errors("La carrera no tiene asignaturas", "", 400);
    } else {
      setPreviaturasGrafoData(result);
    }
  }

  return (
    <>
      <CssVarsProvider sx={{ zIndex: '1000' }} >
        <Box sx={{ marginTop: 6, display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', zIndex: '1000' }}>
          <Select size="sm" placeholder="Seleccionar una carrera" id="idcarrera" name="idcarrera" onChange={handleChangeCarrera} >
            {carreraData.map((carrera, index) => (
              <Option key={index} value={carrera.idCarrera}>{carrera.nombre}</Option>
            ))}
          </Select>

        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '1%', height: '70%', border: "0.5px solid #2596be", borderRadius: "20px", zIndex: '1000' }}>
          <DAGViewer dot={mostrarGrafo} options={{}} />
        </Box>
      </CssVarsProvider>
    </>
  );
}

export default PlanEstudiosPage;