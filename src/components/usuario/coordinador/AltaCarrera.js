import React, { useContext } from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Divider from '@mui/joy/Divider';
import FormControl from '@mui/joy/FormControl';
import Input from '@mui/joy/Input';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import Card from '@mui/joy/Card';
import { AuthContext } from '../../../context/AuthContext';
import { URL_BACK } from '../../../services/util/constants';
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';
import Textarea from '@mui/joy/Textarea';


export default function AltaCarrera() {
    const { user } = useContext(AuthContext);
    console.log(user.jwtLogin);
    const history = useNavigate();

    async function altaCarrera(nombre, descripcion, requisitos, duracion) {
        let body = { "nombre": nombre, "descripcion": descripcion, "requisitos": requisitos, "duracion": duracion };
        let response = await fetch(URL_BACK.altaCarrera, {
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
                title: "¡Carrera creada!\n\n",
                text: "La carrera ha sido creada con éxito",
                icon: "success",
                dangerMode: false,
                position: "center",
                timer: 4000
            });
        } else {
            swal("Error", 'Los datos ingresados no son correctos o ya existe una carrera con ese nombre', "error", {
                timer: 3000
            });
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        let nombre = data.get('nombre');
        let descripcion = data.get('descripcion');
        let requisitos = data.get('requisitos');
        let duracion = data.get('duracion');

        console.log(nombre, descripcion, requisitos, duracion);
        altaCarrera(nombre, descripcion, requisitos, duracion);
        history('/Novedades');
    };

    return (
        <Box component="form" sx={{ marginTop: 6, display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', }} onSubmit={handleSubmit}>
            <Card sx={{ display: 'flex', alignSelf: 'center', }}>
                <Box sx={{ margin: 0.6, alignSelf: 'center' }}>
                    <Typography sx={{ textAlign: 'center' }} variant="plain" color="primary" noWrap>Alta carrera</Typography>
                </Box>
                <Divider />
                <Stack direction="column" sx={{ display: { xs: 'flex', md: 'flex' }, alignSelf: 'center' }}>
                    <FormControl sx={{ display: { sm: 'flex', md: 'flex', width: '350px' }, gap: 0.8 }}>
                        <Input size="sm" id="nombre" name="nombre" placeholder="Nombre" required />
                        <Textarea minRows={3} size="sm" id="descripcion" name="descripcion" placeholder="Descripción" required />
                        <Textarea minRows={3} size="sm" id="requisitos" name="requisitos" placeholder="Requisitos" required />
                        <Input size="sm" type="number" id="duracion" name="duracion" placeholder="Duración" required />
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
