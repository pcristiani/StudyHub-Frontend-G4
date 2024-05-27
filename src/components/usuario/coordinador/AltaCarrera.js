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


export default function AltaCarrera() {
    const { user } = useContext(AuthContext);
    console.log(user.jwtLogin);
    const history = useNavigate();

    async function altaCarrera(nombre, descripcion) {
        // console.log("Alta carrera:", nombre, descripcion);

        let body = { "nombre": nombre, "descripcion": descripcion };
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
        console.log(nombre, descripcion);
        altaCarrera(nombre, descripcion);
        history('/Novedades');
    };

    return (
        <Box component="form" sx={{ marginTop: 5, display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', }} onSubmit={handleSubmit}>
            <Card sx={{ display: 'flex', alignSelf: 'center', }}>
                <Box sx={{ alignSelf: 'center' }}>
                    <Typography level="title-lg">Alta carrera</Typography>
                </Box>
                <Divider />
                <Stack direction="column" sx={{ display: { xs: 'flex', md: 'flex' }, alignSelf: 'center' }}>
                    <FormControl sx={{ display: { sm: 'flex', md: 'flex', width: '350px' }, gap: 1 }}>
                        <Input size="sm" id="nombre" name="nombre" placeholder="Nombre" required />
                        <Input size="sm" id="descripcion" name="descripcion" placeholder="Descripción" required />
                    </FormControl>
                    <Stack direction="row" spacing={1} sx={{ marginTop: 1, justifyContent: 'center' }}>
                        <Button type="submit" fullWidth size="small" variant="solid">Guardar</Button>
                        <Button size="small" fullWidth variant="outlined" color="neutral" href='/'>Cancelar</Button>
                    </Stack>
                </Stack>
            </Card>
        </Box>
    );
};
