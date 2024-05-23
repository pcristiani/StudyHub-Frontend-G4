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

export default function AltaCarrera() {
    const { carrera } = useContext(AuthContext);

    async function altaCarrera(nombre, descripcion) {

        let body = { "nombre": nombre, "descripcion": descripcion };

        let response = await fetch(URL_BACK.altaCarrera, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${carrera.jwtLogin}`,
            },
            body: JSON.stringify(body)
        })

        if (response.ok) {
            console.log("response: ", response);
            swal({
                title: "La carrera ha sido creada con éxito\n\n",
                icon: "success",
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
        altaCarrera(nombre, descripcion);
    };

    return (
        <Box sx={{ marginTop: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', }}>
            <Card sx={{ display: 'flex', alignSelf: 'center', }}>
                <Box sx={{ alignSelf: 'center' }} onSubmit={handleSubmit}>
                    <Typography level="title-md">Alta carrera</Typography>
                </Box>
                <Divider />
                <Stack direction="flex" sx={{ display: { xs: 'flex', md: 'flex' }, alignSelf: 'center' }}>
                    <Stack>
                        <Stack spacing={1}>
                            <FormControl sx={{ display: { sm: 'flex', md: 'flex', width: '350px' }, gap: 1 }}>
                                <FormLabel>Nombre</FormLabel>
                                <Input size="sm" placeholder="Nombre" />
                                <FormLabel>Descripción</FormLabel>
                                <Input size="sm" placeholder="Descripción" sx={{}} />
                            </FormControl>
                        </Stack>
                    </Stack>
                </Stack>

                <div style={{ display: 'flex', marginTop: '10px' }}>
                    <div style={{ padding: '5px' }}>
                        <Button size="sm" variant="solid">
                            Guardar
                        </Button>
                    </div>
                    <div style={{ padding: '5px' }}>
                        <Button size="sm" variant="outlined" color="neutral">
                            Cancelar
                        </Button>
                    </div>
                </div>
                {/* </CardActions> */}

            </Card>

        </Box>
    );
}

