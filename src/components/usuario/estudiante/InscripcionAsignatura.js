import React, { useState, useEffect, useContext } from 'react';

import swal from 'sweetalert';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Divider from '@mui/joy/Divider';
import FormControl from '@mui/joy/FormControl';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import Card from '@mui/joy/Card';
import Option from '@mui/joy/Option';
import Select from '@mui/joy/Select';

import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext';
import { getCarrerasInscripto } from '../../../services/requests/carreraService';
import { getAsignaturasDeCarrera, getHorarios } from '../../../services/requests/asignaturaService';


export default function InscripcionAsignatura() {
    const { user } = useContext(AuthContext);
    const history = useNavigate();
    const [carreraData, setCarreraData] = useState([]);
    const [asignaturaData, setAsignaturaData] = useState([]);
    const [error, setError] = useState(null);
    const [selectedCarrera, setSelectedCarrera] = useState('');
    const [selectedHorario, setSelectedHorario] = useState('');
    const [horariosData, setHorariosData] = useState([]);

    useEffect(() => {
        const fetchCarreras = async () => {
            try {
                const result = await getCarrerasInscripto(user.id, user.jwtLogin);
                setCarreraData(result);
                console.log("Carreras inscripto: ", carreraData);
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
        // if (selectedCarrera !== null) {
        getInfoUsuario(newValue);
        // }
    };
    console.log("Selected carrera: ", selectedCarrera);


    async function getInfoUsuario(selectedCarrera) {
        let result = await getAsignaturasDeCarrera(selectedCarrera, user.jwtLogin);
        setAsignaturaData(result);
    }

    const periodoExamen = [
        { value: 'Febrero', label: 'Febrero' },
        { value: 'Julio', label: 'Julio' },
        { value: 'Diciembre', label: 'Diciembre' },
    ];



    const handleChangeAsignatura = async (event, newValue) => {
        console.log("Selected: ", newValue);
        getInfoHorario(newValue);
        // console.log("Selected as: ", as);
        // if (as !== null) {
        //     console.log("as: ", as);
        //     let horaInicio = as.horaFin;
        //     let diaSemana = as.diaSemana;
        //     let horaFin = as.horaInicio;
        //     const nuevoHorario = {
        //         idAsignatura: newValue,
        //         diaSemana: diaSemana,
        //         horaInicio: horaInicio,
        //         horaFin: horaFin
        //     };

        //     // let horario = parseInt(selectedFin, 10);

        //     setSelectedHorario(prev => [...prev, nuevoHorario]);
        // }


        // setSelectedHorario(newValue);
        // if (selectedCarrera !== null) {
        // console.log("Selected69: ", newValue);
        // console.log("Selected70: ", selectedHorario);


        // }
    };

    async function getInfoHorario(newValue) {
        let result = await getHorarios(newValue, user.jwtLogin);
        console.log("Selected getInfoHorario: ", result);
        if (result !== null && result !== undefined) {

            for (let i = 0; i < result.length; i++) {
                console.log("Selected horario: ", result[0].dtHorarioDias[i].diaSemana);
                console.log("Selected horario: ", result[0].dtHorarioDias[i].horaInicio);
                console.log("Selected horario: ", result[0].dtHorarioDias[i].horaFin);
                let horaInicio = result[0].dtHorarioDias[i].horaInicio;
                let diaSemana = result[0].dtHorarioDias[i].diaSemana;
                let horaFin = result[0].dtHorarioDias[i].horaFin;
                const nuevoHorario = {
                    diaSemana: diaSemana,
                    horaInicio: horaInicio,
                    horaFin: horaFin
                };


                setSelectedHorario(prev => [...prev, nuevoHorario]);
            }
            // result.map((horario) => {
            //     i = i + 1
            //     console.log("Selected horario: ", horario.dtHorarioDias[i].diaSemana);
            //     return horario;
            // });
        }
        // setHorariosData(result);
    }

    return (
        <Box component="form" sx={{ marginTop: 6, display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', }}>
            <Card sx={{ display: 'flex', alignSelf: 'center', }}>
                <Box sx={{ margin: 0.6, alignSelf: 'center' }}>
                    <Typography sx={{ textAlign: 'center' }} variant="plain" color="primary" noWrap>Inscripción asignatura</Typography>
                </Box>
                <Divider />
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


                    <Select size="sm" defaultValue="Seleccionar idhorario" placeholder="Seleccionar idhorario" id="idhorario" name="idhorario">
                        {Array.isArray(selectedHorario) && selectedHorario.map((horario, index) => (
                            <Option key={index} value={horario.index}>{horario.diaSemana}</Option>
                        ))}
                    </Select>

                    {/* <Select size="sm" value={horariosData} placeholder="Dia de la semana" id="diasemana" name="diasemana">
                        {horariosData.map((day) => (
                            <Option key={day.diaSemana} value={day.horaFin}>
                                {day.label}
                            </Option>
                        ))}
                    </Select> */}
                </FormControl>

                <Stack direction="row" spacing={0.8} sx={{ marginTop: 1, justifyContent: 'right' }}>
                    <Button type="submit" fullWidth sx={{ mt: 1, mb: 3, border: 0.01, borderColor: '#3d3d3d' }} variant="soft">Guardar</Button>
                    <Button size="sm" variant="outlined" fullWidth color="neutral" href='/'>Cancelar</Button>
                </Stack>
            </Card>
        </Box>

    );
};
