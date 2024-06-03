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
import { getCarreras, getCarrerasInscripto } from '../../../services/requests/carreraService';
import { getAsignaturasDeCarrera } from '../../../services/requests/asignaturaService';


export default function InscripcionAsignatura() {
    const { user } = useContext(AuthContext);
    const history = useNavigate();
    const [carreraData, setCarreraData] = useState([]);
    const [asignaturaData, setAsignaturaData] = useState([]);
    const [error, setError] = useState(null);
    const [selectedCarrera, setSelectedCarrera] = useState('');

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

    return (
        <Box component="form" sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', }}>
            <Card sx={{ display: 'flex', alignSelf: 'center', }}>
                <Box sx={{ margin: 1, alignSelf: 'center' }}>
                    <Typography level="title-lg">Inscripción asignatura</Typography>
                </Box>
                <Divider />
                <FormControl sx={{ display: { sm: 'flex', md: 'flex', width: '350px' }, gap: 0.8 }}>
                    <Select size="sm" defaultValue="Seleccionar carrera" placeholder="Seleccionar carrera" id="idcarrera" name="idcarrera" onChange={handleChange}>
                        {carreraData.map((carrera, index) => (
                            <Option key={index} value={carrera.idCarrera}>{carrera.nombre}</Option>
                        ))}
                    </Select>
                    <Select size="sm" defaultValue="Seleccionar asignatura" placeholder="Seleccionar asignatura" id="idasignatura" name="idasignatura" >
                        {Array.isArray(asignaturaData) && asignaturaData.map((asignatura, index) => (
                            <Option key={index} value={asignatura.idAsignatura}>{asignatura.nombre}</Option>
                        ))}
                    </Select>
                </FormControl>
              
                <Stack direction="row" spacing={0.8} sx={{ marginTop: 1, justifyContent: 'right' }}>
                    <Button type="submit" fullWidth sx={{ mt: 1, mb: 3, border: 0.01, borderColor: '#3d3d3d' }} variant="soft">Guardar</Button>
                    <Button size="sm" variant="outlined" fullWidth color="neutral" href='/'>Cancelar</Button>
                </Stack>
            </Card>
        </Box>

    );
};
