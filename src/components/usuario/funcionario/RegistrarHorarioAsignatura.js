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
import { getCarreras } from '../../../services/requests/carreraService';
import { getAsignaturasDeCarrera, getDocentesByAsignatura, registroHorarios } from '../../../services/requests/asignaturaService';

import Autocomplete from '@mui/joy/Autocomplete';


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
        let result = await getAsignaturasDeCarrera(selectedCarrera, user.jwtLogin);
        setAsignaturaData(result);
    }

    ///
    const handleChangeAsignatura = (event, idAsignatura) => {
        // if (selectedCarrera !== null) {
        getInfoDocentesDeAsignatura(idAsignatura);
        // }
    };


    async function getInfoDocentesDeAsignatura(idAsignatura) {
        let result = await getDocentesByAsignatura(idAsignatura, user.jwtLogin);
        setDocenteData(result);
        console.log("Asignatura data: ", result);
    }


    const handleChangeHorario = () => {
        console.log("Data: ", selectedDay);

        // const diasSemanas = [
        //     { value: 'LUNES', label: 'Lunes', horario: selectedDay },
        // ];
        // setHorarioData(diasSemanas);
    };


    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        let idAsignatura = data.get('idasignatura');
        let idDocente = parseInt(data.get('iddocente'), 10);
        let anioLectivo = data.get('aniolectivo');
        let diaSemana = data.get('diasemana');
        let horaInicio = parseInt(data.get('inicioclase'), 10);
        let horaFin = parseInt(data.get('finclase'), 10);


        if (horaInicio > horaFin) {
            swal("Error", " La hora de inicio debe ser menor a la hora de fin.", "error", {
                timer: 4000
            });
        } else {
            try {
                await registroHorarios(idDocente, anioLectivo, diaSemana, horaInicio, horaFin, idAsignatura, user.jwtLogin);
                swal({
                    title: "¡Horario registado!\n\n",
                    text: "Horario asignatura ha sido creada con éxito.",
                    icon: "success",
                    dangerMode: false,
                    position: "center",
                    timer: 4000
                });
                history('/Novedades');
            } catch (error) {
                let errorMsg = 'Los datos ingresados no son correctos o ya existe una asignatura con ese nombre';
                if (error.status === 401) {
                    errorMsg = 'No autorizado. Verifica tu token de autenticación.';
                } else if (error.status === 500) {
                    errorMsg = 'Error interno del servidor. Inténtalo más tarde.';
                }
                swal("Error", errorMsg, "error", {
                    timer: 3000
                });
            }
        }
    };

    const [year, setYear] = useState(new Date().getFullYear());
    const startYear = 2020;
    const endYear = new Date().getFullYear() + 5;
    const years = [];
    for (let i = startYear; i <= endYear; i++) {
        years.push(i);
    }


    const diasSemana = [
        { value: 'LUNES', label: 'Lunes' },
        { value: 'MARTES', label: 'Martes' },
        { value: 'MIÉRCOLES', label: 'Miércoles' },
        { value: 'JUEVES', label: 'Jueves' },
        { value: 'VIERNES', label: 'Viernes' },
        { value: 'SÁBADO', label: 'Sábado' },
        { value: 'DOMINGO', label: 'Domingo' },
    ];

    return (
        <Box component="form" sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', }} onSubmit={handleSubmit}>
            <Card sx={{ display: 'flex', alignSelf: 'center', }}>
                <Box sx={{ margin: 1, alignSelf: 'center' }}>
                    <Typography level="title-lg">Registrar horario asignatura</Typography>
                </Box>
                <Divider />
                <Stack direction="column" sx={{ display: { xs: 'flex', md: 'flex' }, alignSelf: 'center' }}>
                    <FormControl sx={{ display: { sm: 'flex', md: 'flex', width: '350px' }, gap: 0.8 }}>
                        <Select size="sm" defaultValue="Seleccionar carrera" placeholder="Seleccionar carrera" id="idcarrera" name="idcarrera" onChange={handleChange}>
                            {carreraData.map((carrera, index) => (
                                <Option key={index} value={carrera.idCarrera}>{carrera.nombre}</Option>
                            ))}
                        </Select>
                        <Select size="sm" defaultValue="Seleccionar asignatura" placeholder="Seleccionar asignatura" id="idasignatura" name="idasignatura" onChange={handleChangeAsignatura}>
                            {Array.isArray(asignaturaData) && asignaturaData.map((asignatura, index) => (
                                <Option key={index} value={asignatura.idAsignatura}>{asignatura.nombre}</Option>
                            ))}
                        </Select>
                        <Select size="sm" defaultValue="Seleccionar docente" placeholder="Seleccionar docente" id="iddocente" name="iddocente" >
                            {Array.isArray(docenteData) && docenteData.map((docente, index) => (
                                <Option key={index} value={docente.idDocente}>{docente.nombre}</Option>
                            ))}
                        </Select>
                        <Divider />

                        <Select size="sm" onChange={(event, newValue) => setYear(newValue)} placeholder="Año lectivo" id="aniolectivo" name="aniolectivo" >
                            {years.map((year) => (
                                <Option key={year} value={year}>
                                    {year}
                                </Option>
                            ))}
                        </Select>
                        <Divider />

                        <Select size="sm" value={selectedDay} onChange={(event, newValue) => setSelectedDay(newValue)}
                            placeholder="Dia de la semana" id="diasemana" name="diasemana">
                            {diasSemana.map((day) => (
                                <Option key={day.value} value={day.value}>
                                    {day.label}
                                </Option>
                            ))}

                        </Select>

                        <Stack direction="row" spacing={0.6} sx={{ justifyContent: 'right' }}>
                            <Autocomplete size="sm" id="inicioclase" name="inicioclase"
                                options={timeSlots}
                                placeholder="Inicia la clase"
                            // getOptionDisabled={(option) =>
                            //     option === timeSlots[0] || option === timeSlots[2]
                            // }
                            />
                            {/* </FormControl>
                        <FormControl id="finClase"> */}
                            <Autocomplete size="sm" id="finclase" name="finclase"
                                options={timeSlots}
                                placeholder="Finaliza la clase" />
                        </Stack>
                        <Divider />


                        <Select size="sm" placeholder="Horario de clase" multiple renderValue={(selected) => (
                            <Box sx={{ display: 'flex', gap: '0.25rem' }}>
                                {selected.map((selectedOption) => (
                                    <Chip variant="soft" color="primary">
                                        {selectedOption.label}
                                    </Chip>
                                ))}
                            </Box>
                        )}
                            slotProps={{ listbox: { sx: { width: '100%', }, }, }}>
                            {Array.isArray(horarioData) && horarioData.map((horario, index) => (
                                <Option key={index} value={horario}>{horario.value} {horario.horario}</Option>
                            ))}
                        </Select>
                        <Button size="sm" variant="none" color="neutral" onClick={handleChangeHorario}>✔️</Button>
                    </FormControl>

                    <Stack direction="row" spacing={0.6} sx={{ marginTop: 1, justifyContent: 'right' }}>
                        <Button type="submit" size="sm" fullWidth variant="soft">Guardar</Button>
                        <Button size="sm" variant="outlined" fullWidth color="neutral" href='/'>Cancelar</Button>
                    </Stack>
                </Stack>
            </Card>
        </Box >
    );
};

const timeSlots = Array.from(new Array(24 * 2)).map(
    (_, index) =>
        `${index < 20 ? '0' : ''}${Math.floor(index / 2)}:${index % 2 === 0 ? '00' : '30'
        }`,
);