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

export default function AltaAsignatura() {
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

    useEffect(() => {
        const fetchAsignaturas = async () => {
            try {
                const results = await getAsignaturas(user.jwtLogin);
                setAsignaturaData(results);
            } catch (error) {
                setError(error.message);
            }
        };
        fetchAsignaturas();
    }, [user]);

    useEffect(() => {
        if (asignaturaData) {
            console.log("Asignaturas: ", asignaturaData);
        }
    }, [asignaturaData]);

    ///

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        let nombre = data.get('nombre');
        let creditos = parseInt(data.get('creditos'), 10);
        let descripcion = data.get('descripcion');
        let departamento = data.get('departamento');
        let idCarrera = data.get('idcarrera');
        let previaturas = data.get('idprevias') ? data.get('idprevias').split(',').map(item => {
            const num = parseInt(item.trim(), 10);
            return isNaN(num) ? null : num;
        }).filter(item => item !== null) : [];

        try {
            await altaAsignatura(nombre, creditos, descripcion, departamento, previaturas, idCarrera, user.jwtLogin);
            swal({
                title: "¡Asignatura creada!\n\n",
                text: "La asignatura ha sido creada con éxito.",
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
    };

    return (
        <Box component="form" sx={{ marginTop: 5, display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', }} onSubmit={handleSubmit}>
            <Card sx={{ display: 'flex', alignSelf: 'center', }}>
                <Box sx={{ margin: 1, alignSelf: 'center' }}>
                    <Typography level="title-lg">Alta asignatura</Typography>
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

                        {/* <FormLabel htmlFor="nombre">Nombre</FormLabel> */}
                        {/* <FormLabel htmlFor="creditos">Créditos</FormLabel> */}
                        {/* <FormLabel htmlFor="descripcion">Descripción</FormLabel> */}
                        {/* <FormLabel htmlFor="departamento">Departamento</FormLabel> */}
                        <Input size="sm" id="nombre" name="nombre" placeholder="Nombre" required />
                        <Input size="sm" id="creditos" name="creditos" placeholder="Créditos" required />
                        <Input size="sm" id="descripcion" name="descripcion" placeholder="Descripción" required />
                        <Input size="sm" id="departamento" name="departamento" placeholder="Departamento" required />
                        <Divider />
                        <Select size="sm" placeholder="Seleccionar previas" multiple renderValue={(selected) => (
                            <Box sx={{ display: 'flex', gap: '0.25rem' }}>
                                {selected.map((selectedOption) => (
                                    <Chip variant="soft" color="primary">
                                        {selectedOption.label}
                                    </Chip>
                                ))}
                            </Box>
                        )}
                            slotProps={{ listbox: { sx: { width: '100%', }, }, }}
                            id="idprevias" name="idprevias">
                            {asignaturaData.map((previas, index) => (
                                <Option key={index} value={previas.idAsignatura}>{previas.nombre}</Option>
                            ))}
                        </Select>
                        <Divider />
                    </FormControl>

                    <Stack direction="row" spacing={1} sx={{ marginTop: 2, justifyContent: 'right' }}>
                        <Button type="submit" size="md" variant="solid">Guardar</Button>
                        <Button size="md" variant="outlined" color="neutral" href='/'>Cancelar</Button>
                    </Stack>
                </Stack>
            </Card>
        </Box>
    );
};
