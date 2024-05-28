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
import { getAsignaturas, altaAsignatura } from '../../../services/requests/asignaturaService';
import { inscripcionCarrera } from '../../../services/requests/estudianteService';


export default function InscripcionCarrera() {
    const { user } = useContext(AuthContext);
    const history = useNavigate();
    const [carreraData, setCarreraData] = useState([]);
    const [asignaturaData, setAsignaturaData] = useState([]);
    const [error, setError] = useState(null);

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

    ///
    // useEffect(() => {
    //     const fetchAsignaturas = async () => {
    //         try {
    //             const results = await getAsignaturas(user.jwtLogin);
    //             setAsignaturaData(results);
    //         } catch (error) {
    //             setError(error.message);
    //         }
    //     };
    //     fetchAsignaturas();
    // }, [user]);

    // useEffect(() => {
    //     if (asignaturaData) {
    //         console.log("Asignaturas: ", asignaturaData);
    //     }
    // }, [asignaturaData]);

    ///
    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        let idCarrera = data.get('idcarrera');
        let idCarreraInt = parseInt(idCarrera, 10);
        console.log(`IDcarrera: ${idCarreraInt}`);
        console.log("IDcarreraInt: ", typeof idCarreraInt);
        // let intValue = convertObjectToInt(ida);
        try {
            await inscripcionCarrera(user.id, idCarreraInt, user.jwtLogin);
            swal({
                title: "Carrera asignada!\n\n",
                text: "La carrera ha sido creada con éxito.",
                icon: "success",
                dangerMode: false,
                position: "center",
                timer: 4000
            });
            // history('/Novedades');
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
    };

    return (
        <Box component="form" sx={{ marginTop: 5, display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', }} onSubmit={handleSubmit}>
            <Card sx={{ display: 'flex', alignSelf: 'center', }}>
                <Box sx={{ margin: 1, alignSelf: 'center' }}>
                    <Typography level="title-lg">Inscripcion Carrera</Typography>
                </Box>
                <Divider />
                <Stack direction="column" sx={{ display: { xs: 'flex', md: 'flex' }, alignSelf: 'center' }}>
                    <FormControl sx={{ display: { sm: 'flex', md: 'flex', width: '350px' }, gap: 1 }}>
                        <Select size="sm" defaultValue="Seleccionar carrera" placeholder="Seleccionar carrera" id="idcarrera" name="idcarrera">
                            {carreraData.map((carrera, index) => (
                                <Option key={index} value={carrera.idCarrera}>{carrera.nombre}</Option>
                            ))}
                        </Select>
                        <Divider />
                        <Divider />
                    </FormControl>
                    <Stack direction="row" spacing={1} sx={{ marginTop: 1, justifyContent: 'right' }}>
                        <Button type="submit" size="md" fullWidth variant="solid">Guardar</Button>
                        <Button size="md" variant="outlined" fullWidth color="neutral" href='/'>Cancelar</Button>
                    </Stack>
                </Stack>
            </Card>
        </Box>
    );
};
