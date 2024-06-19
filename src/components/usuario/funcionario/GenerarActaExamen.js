import React, { useState, useEffect, useContext } from 'react';
import swal from 'sweetalert';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Divider from '@mui/joy/Divider';
import FormControl from '@mui/joy/FormControl';
import Input from '@mui/joy/Input';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import Card from '@mui/joy/Card';
import Option from '@mui/joy/Option';
import Select from '@mui/joy/Select';
import { Chip } from '@mui/joy';

import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext';
import { getCarrerasConPeriodoExamen, getPeriodosDeCarrera } from '../../../services/requests/carreraService';
import { getAsignaturasDeCarreraConExamen, getDocentesByAsignatura } from '../../../services/requests/asignaturaService';

import dayjs from 'dayjs';
import isBetweenPlugin from 'dayjs/plugin/isBetween';
import { registroAsignaturaAPeriodo, getExamenesPeriodo } from '../../../services/requests/examenService';

dayjs.extend(isBetweenPlugin);


export default function GenerarActaExamen() {
   const { user } = useContext(AuthContext);
   const [carreraData, setCarreraData] = useState([]);
   const [docenteData, setDocenteData] = useState([]);
   const [asignaturaData, setAsignaturaData] = useState([]);
   const [selectedCarrera, setSelectedCarrera] = useState('');
   const [error, setError] = useState(null);
   const [periodoData, setPeriodoData] = useState([]);
   const history = useNavigate();
   const [idPeriodo, setIdPeriodo] = useState('');
   const [selectedInicio, setSelectedInicio] = useState('');
   const [selectedFin, setSelectedFin] = useState('');

   useEffect(() => {
      const fetchCarreras = async () => {
         try {
            const result = await getCarrerasConPeriodoExamen(user.jwtLogin);
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

   const handleChange = (event, newValue) => {
      setSelectedCarrera(newValue);
      if (newValue !== null) {
         getInfoCarrera(newValue);
      }
   };

   async function getInfoCarrera(selectedCarrera) {
      let resultPeriodo = await getPeriodosDeCarrera(selectedCarrera, user.jwtLogin);
      // console.log("getInfoCarrera: ", result);
      // setAsignaturaData(result);
      setPeriodoData(resultPeriodo);
   }

   const handleChangeAsignatura = (event, idAsignatura) => {
      getInfoDocentesDeAsignatura(idAsignatura);
   };

   async function getInfoDocentesDeAsignatura(idAsignatura) {
      let result = await getDocentesByAsignatura(idAsignatura, user.jwtLogin);
      console.log("getInfoDocentesDeAsignatura: ", result);
      setDocenteData(result);
   }

   const handleChangeFecha = (event, idPeriodoExamen) => {
      if (idPeriodoExamen !== null && idPeriodoExamen !== undefined) {
         // console.log("fechaInicio: ", idPeriodoExamen.fechaInicio);
         console.log("fechaFin: ", idPeriodoExamen.idPeriodoExamen);
         getInfoPeriodoExamen(idPeriodoExamen.idPeriodoExamen);
         // setSelectedInicio(idPeriodoExamen.fechaInicio + 'T00:00');
         // setSelectedFin(idPeriodoExamen.fechaFin + 'T23:59');
      }
   };

   async function getInfoPeriodoExamen(idPeriodoExamen) {
      let result = await getExamenesPeriodo(idPeriodoExamen, user.jwtLogin);
      console.log("getExamenesPeriodo: ", result.data);
      setDocenteData(result.data);
   }

   const slotProps = {
      listbox: { sx: { width: '100%' }, },
   };


   const handleSubmit = async (event) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      let idAsignatura = parseInt(data.get('idasignatura'));

      let idsDocentes = data.get('iddocente') ? data.get('iddocente').split('').map(item => {
         const nums = parseInt(item.trim(), 10);
         return isNaN(nums) ? null : nums;
      }).filter(item => item !== null) : [];
      let fechaHora = data.get('fechaHora');

      try {
         await registroAsignaturaAPeriodo(idAsignatura, idPeriodo, idsDocentes, fechaHora, user.jwtLogin);
         swal({
            title: "¡Horario registado!\n\n",
            text: "Horario asignatura ha sido creada con éxito.",
            icon: "success",
            dangerMode: false,
            position: "center",
            timer: 4000
         });
         history('/novedades');
      } catch (error) {
         let errorMsg = 'Los datos ingresados no son correctos o ya existe horario para la asignatura';
         if (error.status === 401) {
            errorMsg = 'No autorizado. Verifica tu token de autenticación.';
         } else if (error.status === 500) {
            errorMsg = 'Error interno del servidor. Inténtalo más tarde.';
         }
         swal("Error", errorMsg, "error", {
            timer: 3000
         });
      }
   };


   return (
      <Box component="form" sx={{ marginTop: 6, display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }} onSubmit={handleSubmit} >
         <Card sx={{ display: 'flex', alignSelf: 'center', }}>
            <Box sx={{ margin: 0.6, alignSelf: 'center' }}>
               <Typography sx={{ textAlign: 'center' }} variant="plain" color="primary" noWrap>Generar acta de examen</Typography>
            </Box>
            <Divider />
            <Stack direction="column" sx={{ display: { xs: 'flex', md: 'flex' }, alignSelf: 'center' }}>
               <FormControl sx={{ display: { sm: 'flex', md: 'flex', width: '320px' }, gap: 0.8 }}>

                  <Select slotProps={slotProps} size="sm" placeholder="Seleccionar carrera" id="idcarrera" name="idcarrera" onChange={handleChange} >
                     {carreraData.map((carrera, index) => (
                        <Option key={index} value={carrera.idCarrera}>{carrera.nombre}</Option>
                     ))}
                  </Select>
                  <Divider />


                  <Select size="sm" placeholder="Seleccionar periodo" id="idperiodo" name="idperiodo" onChange={handleChangeFecha} slotProps={{ listbox: { sx: { width: '100%', }, }, }}>
                     {Array.isArray(periodoData) && periodoData.map((periodo, index) => (
                        <Option key={index} value={periodo} >{periodo.nombre}</Option>
                     ))}
                  </Select>
                  <Divider />

                  <Select size="sm" placeholder="Seleccionar asignatura" id="idasignatura" name="idasignatura" onChange={handleChangeAsignatura} slotProps={{ listbox: { sx: { width: '100%', }, }, }}>
                     {Array.isArray(docenteData) && docenteData.map((asignatura, index) => (
                        <Option key={index} value={asignatura.idExamen}>{asignatura.asignatura}</Option>
                     ))}
                  </Select>
                  <Divider />

                  <Divider />
                  {(selectedInicio !== null && selectedFin !== null && selectedInicio !== undefined && selectedFin !== undefined) &&
                     <Input type="datetime-local" size='sm' slotProps={{ input: { min: selectedInicio, max: selectedFin, }, }} id="fechaHora" name="fechaHora" />
                  }
               </FormControl>

               <Stack direction="row" spacing={0.6} sx={{ marginTop: 1, justifyContent: 'right', zIndex: '1000' }}>
                  <Button size="sm" type="submit" fullWidth sx={{ mt: 1, mb: 3, border: 0.01, borderColor: '#3d3d3d' }} variant="soft">Guardar</Button>
                  <Button size="sm" variant="outlined" fullWidth color="neutral" component="a" href='/'>Cancelar</Button>
               </Stack>
            </Stack>
         </Card>
      </Box >
   );
};
