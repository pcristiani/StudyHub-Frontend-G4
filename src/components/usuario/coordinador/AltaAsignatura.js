import React, { useContext } from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Divider from '@mui/joy/Divider';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import Card from '@mui/joy/Card';
import { AuthContext } from '../../../context/AuthContext';
import { URL_BACK } from '../../../services/util/constants';
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';

export default function AltaAsignatura() {
    const { user } = useContext(AuthContext);
    console.log(user.jwtLogin);
    const history = useNavigate();

    async function altaAsignatura(idAsignatura, nombre, creditos, descripcion, departamento, activa, previaturas = [], idCarrera) {
        console.log("Alta asignatura:", nombre, descripcion);

        let body = {
            "idAsignatura": idAsignatura,
            "nombre": nombre,
            "creditos": creditos,
            "descripcion": descripcion,
            "departamento": departamento,
            "activa": activa,          
            "previaturas": previaturas, 
            "idCarrera": idCarrera
        };
        let response = await fetch(URL_BACK.altaAsignatura, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.jwtLogin}`,
            },
            body: JSON.stringify(body)
        })

        if (response.ok) {
            console.log("response: ", response);
            swal({
                title: "La asignatura ha sido creada con éxito\n\n",
                icon: "success",
                position: "center",
                timer: 4000
            });
        } else {let errorMsg = 'Los datos ingresados no son correctos o ya existe una asignatura con ese nombre';
        if (response.status === 401) {
            errorMsg = 'No autorizado. Verifica tu token de autenticación.';
        } else if (response.status === 500) {
            errorMsg = 'Error interno del servidor. Inténtalo más tarde.';
        }
        swal("Error", errorMsg, "error", {
            timer: 3000
        });
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        let idAsignatura = data.get('idAsignatura');
        let nombre = data.get('nombre');
        let creditos = parseInt(data.get('creditos'), 10); 
        let descripcion = data.get('descripcion');
        let departamento = data.get('departamento');
        let activa = data.get('activa'); 
        let previaturas = data.get('previaturas') ? data.get('previaturas').split(',').map(item => item.trim()) : [];
        let idCarrera = data.get('idCarrera');
        altaAsignatura(idAsignatura, nombre, creditos, descripcion, departamento, activa, previaturas = [], idCarrera=1);
        history('/Novedades');
    };

    return (
        <Box component="form" sx={{ marginTop: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', }} onSubmit={handleSubmit}>
            <Card sx={{ display: 'flex', alignSelf: 'center', }}>
                <Box sx={{ alignSelf: 'center' }}>
                    <Typography level="title-md">Alta carrera</Typography>
                </Box>
                <Divider />
                <Stack direction="column" sx={{ display: { xs: 'flex', md: 'flex' }, alignSelf: 'center' }}>
                    {/* <FormControl sx={{ width: '100%', maxWidth: 350, gap: 1 }}> */}
                        <FormControl sx={{ display: { sm: 'flex', md: 'flex', width: '350px' }, gap: 1 }}>
                        <FormLabel htmlFor="idAsignatura">Id Asignatura</FormLabel>
                        <Input size="small" id="idAsignatura" name="idAsignatura" placeholder="Id" required />
                        <FormLabel htmlFor="nombre">Nombre</FormLabel>
                        <Input size="small" id="nombre" name="nombre" placeholder="Nombre" required />
                        <FormLabel htmlFor="creditos">Créditos</FormLabel>
                        <Input size="small" id="creditos" name="creditos" placeholder="Créditos" required />
                        <FormLabel htmlFor="descripcion">Descripción</FormLabel>
                        <Input size="small" id="descripcion" name="descripcion" placeholder="Descripción" required />
                        <FormLabel htmlFor="departamento">Departamento</FormLabel>
                        <Input size="small" id="departamento" name="departamento" placeholder="Departamento" required />
                        {/* <FormControlLabel control={<Checkbox value="activa" color="primary" />}
                            label="Activa" /> */}
                        {/* <Select defaultValue="Seleccionar previas">
                            {carreras.map((carrera, index) => (
                                <Option key={index} value={carrera.name}>{carrera.name}</Option>
                            ))}
                        </Select>
                        <br></br>
                        <Select defaultValue="Seleccionar carrera">
                            {asignaturas.map((asignaturas, index) => (
                                <Option key={index} value={asignaturas.idCarrera}>{asignaturas.name}</Option>
                            ))}
                        </Select> */}
                    </FormControl>
                    <Stack direction="row" spacing={2} sx={{ marginTop: 2, justifyContent: 'center' }}>
                        <Button type="submit" size="small" variant="solid">Guardar</Button>
                        <Button size="small" variant="outlined" color="neutral" href='/'>Cancelar</Button>
                    </Stack>
                </Stack>
            </Card>
        </Box>
    );
};
