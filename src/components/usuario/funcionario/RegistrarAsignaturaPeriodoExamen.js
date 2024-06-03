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

dayjs.extend(isBetweenPlugin);


export default function RegistrarAsignaturaPeriodoExamen() {
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



   const [isClicked, setIsClicked] = React.useState(false);
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
      console.log("Selected: ", newValue);
      setSelectedCarrera(newValue);
      if (selectedCarrera !== null) {
         getInfoCarrera(newValue);
      }
   };

   async function getInfoCarrera(selectedCarrera) {
      let result = await getAsignaturasDeCarreraConExamen(selectedCarrera, user.jwtLogin);
      let resultPeriodo = await getPeriodosDeCarrera(selectedCarrera, user.jwtLogin);
      console.log("resultPeriodo: ", resultPeriodo);
      console.log("getInfoCarrera: ", result);
      setPeriodoData(resultPeriodo);
      setAsignaturaData(result);
   }

   const handleChangeAsignatura = (event, idAsignatura) => {
      getInfoDocentesDeAsignatura(idAsignatura);
   };

   async function getInfoDocentesDeAsignatura(idAsignatura) {
      let result = await getDocentesByAsignatura(idAsignatura, user.jwtLogin);
      setDocenteData(result);
   }

   const handleChangeFecha = (event, idPeriodoExamen) => {
      if (idPeriodoExamen !== null && idPeriodoExamen !== undefined) {

         console.log("fechaInicio: ", idPeriodoExamen.fechaInicio);
         console.log("fechaFin: ", idPeriodoExamen.fechaFin);
         setIdPeriodo(idPeriodoExamen.idPeriodoExamen);
         setSelectedInicio(idPeriodoExamen.fechaInicio + 'T00:00');
         setSelectedFin(idPeriodoExamen.fechaFin + 'T23:59');
      }
   };



   const handleSubmit = async (event) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      // let idAsignatura = data.get('idasignatura');
      // let idPeriodo = data.get('idperiodo');
      let idAsignatura = parseInt(data.get('idasignatura'));

      let idsDocentes = data.get('iddocente') ? data.get('iddocente').split('').map(item => {
         const nums = parseInt(item.trim(), 10);
         return isNaN(nums) ? null : nums;
      }).filter(item => item !== null) : [];

      let fechaHora = data.get('fechaHora');

      console.log("Id docente: ", idsDocentes);
      console.log("fechaHora: ", fechaHora);
      console.log("idAsignatura: ", idAsignatura);
      console.log("idPeriodo: ", idPeriodo);

      // if (horaInicio > horaFin) {
      //    swal("Error", "La hora de inicio debe ser menor a la hora de fin.", "error", {
      //       timer: 3000
      //    });
      // } else {
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
         //     history('/Novedades');
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
         // }
      }
   };


   return (
      <Box component="form" sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }} onSubmit={handleSubmit} >
         <Card sx={{ display: 'flex', alignSelf: 'center', }}>
            <Box sx={{ margin: 1, alignSelf: 'center' }}>
               <Typography level="title-lg">Registrar asignatura a periodo de examen</Typography>
            </Box>
            <Divider />
            <Stack direction="column" sx={{ display: { xs: 'flex', md: 'flex' }, alignSelf: 'center' }}>
               <FormControl sx={{ display: { sm: 'flex', md: 'flex', width: '350px' }, gap: 0.8 }}>

                  <Select size="sm" defaultValue="Seleccionar carrera" placeholder="Seleccionar carrera" id="idcarrera" name="idcarrera" onChange={handleChange}>
                     {carreraData.map((carrera, index) => (
                        <Option key={index} value={carrera.idCarrera}>{carrera.nombre}</Option>
                     ))}
                  </Select>
                  <Divider />

                  <Select size="sm" defaultValue="Seleccionar asignatura" placeholder="Seleccionar asignatura" id="idasignatura" name="idasignatura" onChange={handleChangeAsignatura}>
                     {Array.isArray(asignaturaData) && asignaturaData.map((asignatura, index) => (
                        <Option key={index} value={asignatura.idAsignatura}>{asignatura.nombre}</Option>
                     ))}
                  </Select>
                  <Divider />

                  <Select size="sm" defaultValue="Seleccionar periodo" placeholder="Seleccionar periodo" id="idperiodo" name="idperiodo" onChange={handleChangeFecha}>
                     {Array.isArray(periodoData) && periodoData.map((periodo, index) => (
                        <Option key={index} value={periodo}>{periodo.idPeriodoExamen}</Option>
                     ))}
                  </Select>

                  {/* <Select size="sm" defaultValue="Seleccionar docente" placeholder="Seleccionar docente" id="iddocente" name="iddocente">
                     {Array.isArray(docenteData) && docenteData.map((docente, index) => (
                        <Option key={index} value={docente.idDocente}>{docente.nombre}</Option>
                     ))}
                  </Select> */}
                  <Divider />

                  <Select size="sm" placeholder="Seleccionar docente" multiple renderValue={(selecteds) => (
                     <Box sx={{ display: 'flex', gap: '0.25rem' }}>
                        {selecteds.map((selectedOptions) => (
                           <Chip variant="soft" color="primary">
                              {selectedOptions.label}
                           </Chip>
                        ))}
                     </Box>
                  )}
                     slotProps={{ listbox: { sx: { width: '100%', }, }, }}
                     id="iddocente" name="iddocente">
                     {Array.isArray(docenteData) && docenteData.map((docente, index) => (
                        <Option key={index} value={docente.idDocente}>{docente.nombre}</Option>

                     ))}
                  </Select>
                  <Divider />
                  {(selectedInicio !== null && selectedFin !== null && selectedInicio !== undefined && selectedFin !== undefined) &&
                     <Input type="datetime-local" size='sm' slotProps={{ input: { min: selectedInicio, max: selectedFin, }, }} id="fechaHora" name="fechaHora" />
                  }



                  {/*      <Select size="sm" onChange={(event, newValue) => setYear(newValue)} placeholder="Año lectivo" id="aniolectivo" name="aniolectivo">
                     {years.map((year) => (
                        <Option key={year} value={year}>
                           {year}
                        </Option>
                     ))}
                  </Select>

                  <Select size="sm" value={selectedDay} onChange={(event, newValue) => setSelectedDay(newValue)} placeholder="Dia de la semana" id="diasemana" name="diasemana">
                     {diasSemana.map((day) => (
                        <Option key={day.value} value={day.value}>
                           {day.label}
                        </Option>
                     ))}
                  </Select> */}

                  {/* <Stack direction="row" spacing={0.6} sx={{ justifyContent: 'right' }}>
                     <Autocomplete size="sm" id="inicioclase" name="inicioclase" options={timeSlots} placeholder="Inicia la clase" onChange={(event, newValue) => setSelectedInicio(newValue)} />
                     <Autocomplete size="sm" id="finclase" name="finclase" options={timeSlots} placeholder="Finaliza la clase" onChange={(event, newValue) => setSelectedFin(newValue)} />
                     <Tooltip title="Agregar a horario de clase" variant="plain" color="primary">
                        <Button size="sm" variant="none" color="neutral" onClick={handleChangeHorario}>
                           <ControlPointIcon variant="outlined" color="primary" />
                        </Button>
                     </Tooltip>
                  </Stack>
                  <Divider />

                  <Select size="sm" placeholder="Horario de clase" multiple renderValue={(selected) => (
                     <Box sx={{ display: 'flex', gap: '0.25rem' }}>
                        {selected.map((selectedOption) => (
                           <Chip key={selectedOption.value} variant="soft" color="primary">
                              {selectedOption.label} {selectedOption.horario}
                           </Chip>
                        ))}
                     </Box>)}
                     slotProps={{ listbox: { sx: { width: '100%', }, }, }}>
                     {Array.isArray(horarioData) && horarioData.map((horario, index) => (
                        <Option key={index} value={horario.diaSemana}> {horario.diaSemana} DE {horario.horaInicio} A {horario.horaFin} HS</Option>
                     ))}
                  </Select> */}
               </FormControl>

               <Stack direction="row" spacing={0.6} sx={{ marginTop: 1, justifyContent: 'right', zIndex: '1000' }}>
                  <Button type="submit" fullWidth sx={{ mt: 1, mb: 3, border: 0.01, borderColor: '#3d3d3d' }} variant="soft">Guardar</Button>
                  <Button size="sm" variant="outlined" fullWidth color="neutral" href='/'>Cancelar</Button>
               </Stack>
            </Stack>
         </Card>
      </Box >
   );
};
