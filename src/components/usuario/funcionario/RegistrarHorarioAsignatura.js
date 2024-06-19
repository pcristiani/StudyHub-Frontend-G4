import React, { useState, useEffect, useContext } from 'react';
import swal from 'sweetalert';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Divider from '@mui/joy/Divider';
import IconButton from '@mui/joy/IconButton';
import FormControl from '@mui/joy/FormControl';
import Tooltip from '@mui/joy/Tooltip';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import Card from '@mui/joy/Card';
import Option from '@mui/joy/Option';
import Select from '@mui/joy/Select';
import { Chip } from '@mui/joy';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext';
import { getCarreras } from '../../../services/requests/carreraService';
import { getAsignaturasDeCarrera, getDocentesByAsignatura, registroHorarios } from '../../../services/requests/asignaturaService';
import Autocomplete from '@mui/joy/Autocomplete';
import ControlPointIcon from '@mui/icons-material/DataSaverOn';
import { errors } from '../../../services/util/errors';


export default function RegistrarHorarioAsignatura() {
   const { user } = useContext(AuthContext);
   const history = useNavigate();
   const [carreraData, setCarreraData] = useState([]);
   const [docenteData, setDocenteData] = useState([]);
   const [asignaturaData, setAsignaturaData] = useState([]);
   const [error, setError] = useState(null);
   const [selectedCarrera, setSelectedCarrera] = useState('');
   const [horarioData, setHorarioData] = useState([]);
   const [selectedDay, setSelectedDay] = useState('');
   const [selectedInicio, setSelectedInicio] = useState('');
   const [selectedFin, setSelectedFin] = useState('');

   useEffect(() => {
      const fetchCarreras = async () => {
         try {
            const result = await getCarreras(user.jwtLogin);
            setCarreraData(result);
         } catch (error) {
            setError(error.message);
         }
      };
      fetchCarreras();
   }, [user]);

   useEffect(() => {
      if (carreraData) {
         // console.log("Carreras: ", carreraData);
      }
   }, [carreraData]);

   const handleChange = (event, newValue) => {
      console.log("Selected: ", newValue);
      setSelectedCarrera(newValue);
      if (newValue !== null) {
         getInfoCarrera(newValue);
      }
   };

   async function getInfoCarrera(selectedCarrera) {
      let result = await getAsignaturasDeCarrera(selectedCarrera, user.jwtLogin);
      setAsignaturaData(result);
   }

   const handleChangeAsignatura = (event, idAsignatura) => {
      getInfoDocentesDeAsignatura(idAsignatura);
   };

   async function getInfoDocentesDeAsignatura(idAsignatura) {
      let result = await getDocentesByAsignatura(idAsignatura, user.jwtLogin);
      setDocenteData(result);
   }

   const handleChangeHorario = () => {
      let horaInicio = selectedInicio;
      let horaFin = selectedFin;
      // let horaFin = parseInt(selectedFin, 10);
      const nuevoHorario = {
         diaSemana: selectedDay,
         horaInicio: horaInicio,
         horaFin: horaFin
      };

      setHorarioData(prev => [...prev, nuevoHorario]);
   };

   const handleSubmit = async (event) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      let idAsignatura = data.get('idasignatura');
      let idDocente = parseInt(data.get('iddocente'), 10);
      let anioLectivo = parseInt(data.get('aniolectivo'), 10);
      let horaInicio = parseInt(data.get('inicioclase'), 10);
      let horaFin = parseInt(data.get('finclase'), 10);

      if (horaInicio > horaFin) {
         swal("Error", "La hora de inicio debe ser menor a la hora de fin.", "error", {
            timer: 3000
         });
      } else {
         const response = await registroHorarios(idDocente, anioLectivo, horarioData, idAsignatura, user.jwtLogin);
         if (response.statusCodeValue === 200) {
            let title = "¡Horario registado!\n\n";
            errors(title, response.body, response.statusCodeValue);
            history('/novedades');
         } else {
            errors(response.body, response.body, response.statusCodeValue);
         }
      }
   };

   const [year, setYear] = useState(new Date().getFullYear());
   const startYear = 2023;
   const endYear = new Date().getFullYear() + 2;
   const years = [];
   for (let i = startYear; i <= endYear; i++) {
      years.push(i);
   }

   const diasSemana = [
      { value: 'LUNES', label: 'Lunes' },
      { value: 'MARTES', label: 'Martes' },
      { value: 'MIERCOLES', label: 'Miércoles' },
      { value: 'JUEVES', label: 'Jueves' },
      { value: 'VIERNES', label: 'Viernes' },
      { value: 'SABADO', label: 'Sábado' },
      { value: 'DOMINGO', label: 'Domingo' },
   ];

   // Select con slotProps
   const withSlotProps = (WrappedComponent, slotProps) => {
      return (props) => <WrappedComponent {...props} slotProps={slotProps} />;
   };
   const slotProps = {
      listbox: { sx: { width: '100%', }, },
   };
   const SelectProps = withSlotProps(Select, slotProps);

   return (
      <Box component="form" sx={{ marginTop: 6, display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }} onSubmit={handleSubmit}>
         <Card sx={{ display: 'flex', alignSelf: 'center', }}>
            <Box sx={{ margin: 0.6, alignSelf: 'center' }}>
               <Typography sx={{ textAlign: 'center' }} variant="plain" color="primary" noWrap>Registrar horario asignatura</Typography>
            </Box>
            <Divider />
            <Stack direction="column" sx={{ display: { xs: 'flex', md: 'flex' }, alignSelf: 'center' }}>
               <FormControl sx={{ display: { sm: 'flex', md: 'flex', width: '320px' }, gap: 0.6 }}>

                  <SelectProps size="sm" placeholder="Seleccionar carrera" id="idcarrera" name="idcarrera" onChange={handleChange}>
                     {carreraData.map((carrera, index) => (
                        <Option key={index} value={carrera.idCarrera}>{carrera.nombre}</Option>
                     ))}
                  </SelectProps>

                  <SelectProps size="sm" placeholder="Seleccionar asignatura" id="idasignatura" name="idasignatura" onChange={handleChangeAsignatura} required>
                     {Array.isArray(asignaturaData) && asignaturaData.map((asignatura, index) => (
                        <Option key={index} value={asignatura.idAsignatura}>{asignatura.nombre}</Option>
                     ))}
                  </SelectProps>

                  <SelectProps size="sm" placeholder="Seleccionar docente" id="iddocente" name="iddocente" required>
                     {Array.isArray(docenteData) && docenteData.map((docente, index) => (
                        <Option key={index} value={docente.idDocente}>{docente.nombre}</Option>
                     ))}
                  </SelectProps>
                  <Divider />

                  <SelectProps size="sm" onChange={(event, newValue) => setYear(newValue)} placeholder="Año lectivo" id="aniolectivo" name="aniolectivo" required>
                     {years.map((year) => (
                        <Option key={year} value={year} >{year}</Option>
                     ))}
                  </SelectProps>

                  <SelectProps size="sm" value={selectedDay} onChange={(event, newValue) => setSelectedDay(newValue)} placeholder="Dia de la semana" id="diasemana" name="diasemana" required>
                     {diasSemana.map((day) => (
                        <Option key={day.value} value={day.value}>{day.label}</Option>
                     ))}
                  </SelectProps>

                  <Stack direction="row" spacing={0.6} sx={{ justifyContent: 'right' }}>
                     <Autocomplete size="sm" id="inicioclase" name="inicioclase" options={timeSlots} placeholder="Inicia" onChange={(event, newValue) => setSelectedInicio(newValue)} />
                     <Autocomplete size="sm" id="finclase" name="finclase" options={timeSlots} placeholder="Finaliza" onChange={(event, newValue) => setSelectedFin(newValue)} />
                     <Tooltip title="Agregar a horario de clase" variant="plain" color="primary">
                        <IconButton size="sm" variant="outlined" color="neutral" onClick={handleChangeHorario}>
                           <ControlPointIcon size="sm" variant="plain" color="primary" />
                        </IconButton>
                     </Tooltip>
                  </Stack>

                  <Select size="sm" placeholder="Horario de clase" multiple renderValue={(selected) => (
                     <Box sx={{ display: 'flex', gap: '0.25rem' }}>
                        {selected.map((selectedOption) => (
                           <Chip key={selectedOption.value} variant="soft" color="primary">{selectedOption.label} {selectedOption.horario}</Chip>
                        ))}
                     </Box>)}
                     slotProps={{ listbox: { sx: { width: '100%', }, }, }} required>
                     {Array.isArray(horarioData) && horarioData.map((horario, index) => (
                        <Option key={index} value={horario.diaSemana}> {horario.diaSemana} de {horario.horaInicio} a {horario.horaFin} hs</Option>
                     ))}
                  </Select>
               </FormControl>
               <Divider />

               <Stack direction="row" spacing={0.8} sx={{ marginTop: 1, justifyContent: 'right', zIndex: '1000' }}>
                  <Button size="sm" type="submit" fullWidth sx={{ mt: 1, mb: 3, border: 0.01, borderColor: '#3d3d3d' }} variant="soft">Guardar</Button>
                  <Button size="sm" variant="outlined" fullWidth color="neutral" component="a" href='/'>Cancelar</Button>
               </Stack>
            </Stack>
         </Card>
      </Box>
   );
};

const timeSlots = Array.from(new Array(24 * 1)).map(
   (_, index) =>
      `${index < 20 ? '' : ''}${Math.floor(index / 1)
      }:00`,
);