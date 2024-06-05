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
import { getAsignaturasDeCarrera, altaAsignatura } from '../../../services/requests/asignaturaService';
import { getDocentes } from '../../../services/requests/usuarioService';


export default function AltaAsignatura() {
    const { user } = useContext(AuthContext);
    const history = useNavigate();
    const [carreraData, setCarreraData] = useState([]);
    const [docenteData, setDocenteData] = useState([]);
    const [asignaturaData, setAsignaturaData] = useState([]);
    const [error, setError] = useState(null);
    const [selectedCarrera, setSelectedCarrera] = useState('');


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


    useEffect(() => {
        const fetchDocente = async () => {
            try {
                const results = await getDocentes(user.jwtLogin);
                setDocenteData(results);
            } catch (error) {
                setError(error.message);
            }
        };
        fetchDocente();
    }, [user]);

    useEffect(() => {
        if (docenteData) {
            console.log("Docente: ", docenteData);
        }
    }, [docenteData]);
    ///
    const handleChange = (event, newValue) => {
        console.log("Selected: ", newValue);
        setSelectedCarrera(newValue);

        if (newValue !== null) {
            getInfoCarrera(newValue);
        }
    };
    console.log("Selected carrera: ", selectedCarrera);


    async function getInfoCarrera(selectedCarrera) {
        let result = await getAsignaturasDeCarrera(selectedCarrera, user.jwtLogin);
        setAsignaturaData(result);
    }

    ///
    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        let nombre = data.get('nombre');
        let creditos = parseInt(data.get('creditos'), 10);
        let descripcion = data.get('descripcion');
        let departamento = data.get('departamento');
        let idCarrera = data.get('idcarrera');

        let idDocente = data.get('iddocente') ? data.get('iddocente').split('').map(item => {
            const nums = parseInt(item.trim(), 10);
            return isNaN(nums) ? null : nums;
        }).filter(item => item !== null) : [];

        console.log("Id docente: ", idDocente);

        let previaturas = data.get('idprevias') ? data.get('idprevias').split('').map(item => {
            const num = parseInt(item.trim(), 10);
            return isNaN(num) ? null : num;
        }).filter(item => item !== null) : [];
        console.log("Id previaturas: ", previaturas);

        try {
            await altaAsignatura(nombre, creditos, descripcion, departamento, previaturas, idCarrera, idDocente, user.jwtLogin);
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
        <Box component="form" sx={{ marginTop: 6, display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', }} onSubmit={handleSubmit}>
            <Card sx={{ display: 'flex', alignSelf: 'center', }}>
                <Box sx={{ margin: 0.6, alignSelf: 'center' }}>
                    <Typography sx={{ textAlign: 'center' }} variant="plain" color="primary" noWrap>Alta asignatura</Typography>
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
                        <Input size="sm" id="nombre" name="nombre" placeholder="Nombre" required />
                        <Input size="sm" id="creditos" name="creditos" placeholder="Créditos" required />
                        <Input size="sm" id="descripcion" name="descripcion" placeholder="Descripción" />
                        <Input size="sm" id="departamento" name="departamento" placeholder="Departamento" />
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
                            {Array.isArray(asignaturaData) && asignaturaData.map((asignatura, index) => (
                                <Option key={index} value={asignatura.idAsignatura}>{asignatura.nombre}</Option>
                            ))}
                        </Select>
                        <Divider />
                    </FormControl>
                    <Stack direction="row" spacing={0.8} sx={{ marginTop: 1, justifyContent: 'right' }}>
                        <Button type="submit" fullWidth sx={{ mt: 1, mb: 3, border: 0.01, borderColor: '#3d3d3d' }} variant="soft">Guardar</Button>
                        <Button size="sm" variant="outlined" fullWidth color="neutral" href='/'>Cancelar</Button>
                    </Stack>
                </Stack>
            </Card>
        </Box>
    );
};
