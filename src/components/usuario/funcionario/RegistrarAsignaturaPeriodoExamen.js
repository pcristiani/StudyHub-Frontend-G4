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
import { registroAsignaturaAPeriodo } from '../../../services/requests/examenService';
import { errors } from '../../../services/util/errors';
import { SelectProps } from '../../common/SelectProps';

dayjs.extend(isBetweenPlugin);


export default function RegistrarAsignaturaPeriodoExamen() {
   const { user } = useContext(AuthContext);
   const [carreraData, setCarreraData] = useState([]);
   const [docenteData, setDocenteData] = useState([]);
   const [asignaturaData, setAsignaturaData] = useState([]);
   const [selectedCarrera, setSelectedCarrera] = useState('');
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
            console.log("error: ", error);
         }
      };
      fetchCarreras();
   }, [user]);

   useEffect(() => {
      if (carreraData) {
         //  console.log("Carreras: ", carreraData);
      }
   }, [carreraData]);

   const handleChange = (event, newValue) => {
      setSelectedCarrera(newValue);
      if (newValue !== null) {
         getInfoCarrera(newValue);
      }
   };

   async function getInfoCarrera(selectedCarrera) {
      let result = await getAsignaturasDeCarreraConExamen(selectedCarrera, user.jwtLogin);
      let resultPeriodo = await getPeriodosDeCarrera(selectedCarrera, user.jwtLogin);
      setAsignaturaData(result.body);
      setPeriodoData(resultPeriodo);
   }

   const handleChangeAsignatura = (event, idAsignatura) => {
      getInfoDocentesDeAsignatura(idAsignatura);
   };

   async function getInfoDocentesDeAsignatura(idAsignatura) {
      let result = await getDocentesByAsignatura(idAsignatura, user.jwtLogin);

      if (result.length === '' || result === null || result === undefined) {
         swal({
            title: "¡Error!\n\n",
            text: "No hay docentes asignados a esta asignatura.",
            icon: "error",
            dangerMode: true,
            position: "center",
            timer: 4000
         });
      }
      setDocenteData(result);
   }

   const handleChangeFecha = (event, idPeriodoExamen) => {
      if (idPeriodoExamen !== null && idPeriodoExamen !== undefined) {
         setIdPeriodo(idPeriodoExamen.idPeriodoExamen);
         setSelectedInicio(idPeriodoExamen.fechaInicio + 'T00:00');
         setSelectedFin(idPeriodoExamen.fechaFin + 'T23:59');
      }
   };

   const handleSubmit = async (event) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      let idAsignatura = parseInt(data.get('idasignatura'));
      let idsDocentes = data.get('iddocente');

      const nroComoString = idsDocentes.slice(1, -1).split(',');
      const arrayDocentes = nroComoString.map(Number);

      let fechaHora = data.get('fechaHora');
      console.log("Docentes: ", arrayDocentes);

      const restul = await registroAsignaturaAPeriodo(idAsignatura, idPeriodo, arrayDocentes, fechaHora, user.jwtLogin);
      let title = "¡Fecha de examen registrada!\n\n";
      errors(title, restul.data, restul.status, true);
   };


   return (
      <Box component="form" sx={{ marginTop: 6, display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }} onSubmit={handleSubmit}>
         <Card sx={{ display: 'flex', alignSelf: 'center', zIndex: '1000' }}>
            <Box sx={{ margin: 0.6, alignSelf: 'center' }}>
               <Typography sx={{ textAlign: 'center' }} variant="plain" color="primary" noWrap>Registrar fecha de examen</Typography>
            </Box>
            <Divider />
            <Stack direction="column" sx={{ display: { xs: 'flex', md: 'flex' }, alignSelf: 'center' }}>
               <FormControl sx={{ display: { sm: 'flex', md: 'flex', width: '320px' }, gap: 0.8 }}>

                  <SelectProps size="sm" placeholder="Seleccionar carrera" id="idcarrera" name="idcarrera" onChange={handleChange} required>
                     {carreraData.map((carrera, index) => (
                        <Option key={index} value={carrera.idCarrera}>{carrera.nombre}</Option>
                     ))}
                  </SelectProps>

                  <SelectProps size="sm" placeholder="Seleccionar asignatura" id="idasignatura" name="idasignatura" onChange={handleChangeAsignatura} required>
                     {Array.isArray(asignaturaData) && asignaturaData.map((asignatura, index) => (
                        <Option key={index} value={asignatura.idAsignatura}>{asignatura.nombre}</Option>
                     ))}
                  </SelectProps>

                  <SelectProps size="sm" placeholder="Seleccionar periodo" id="idperiodo" name="idperiodo" onChange={handleChangeFecha} required>
                     {Array.isArray(periodoData) && periodoData.map((periodo, index) => (
                        <Option size="sm" key={index} value={periodo} >{periodo.nombre}</Option>
                     ))}
                  </SelectProps>

                  <SelectProps size="sm" placeholder="Seleccionar docente" multiple renderValue={(selecteds) => (
                     <Box sx={{ display: 'flex', gap: '0.25rem' }}>
                        {selecteds.map((selectedOptions) => (
                           <Chip variant="soft" color="primary">
                              {selectedOptions.label}
                           </Chip>
                        ))}
                     </Box>)} id="iddocente" name="iddocente" required>
                     {Array.isArray(docenteData) && docenteData.map((docente, index) => (
                        <Option key={index} value={docente.idDocente}>{docente.nombre}</Option>
                     ))}
                  </SelectProps>

                  {(selectedInicio !== null && selectedFin !== null && selectedInicio !== undefined && selectedFin !== undefined) &&
                     <Input type="datetime-local" size='sm' slotProps={{ input: { min: selectedInicio, max: selectedFin, }, }} id="fechaHora" name="fechaHora" />}
               </FormControl>

               <Stack direction="row" spacing={0.6} sx={{ marginTop: 1, justifyContent: 'right', zIndex: '1000' }}>
                  <Button size="sm" type="submit" fullWidth sx={{ mt: 1, mb: 3, border: 0.01, borderColor: '#3d3d3d' }} variant="soft">Guardar</Button>
                  <Button size="sm" variant="outlined" fullWidth color="neutral" component="a" href='/'>Cancelar</Button>
               </Stack>
            </Stack>
         </Card>
      </Box>
   );
};
