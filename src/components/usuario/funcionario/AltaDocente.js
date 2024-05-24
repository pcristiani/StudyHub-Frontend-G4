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

export default function AltaDocente() {
    const { user } = useContext(AuthContext);
    console.log(user.jwtLogin);
    const history = useNavigate();

    async function altaDocente(codigoDocente, nombre) {

        let body = { "codigoDocente": codigoDocente, "nombre": nombre };

        let response = await fetch(URL_BACK.altaDocente, {
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
                title: "El docente ha sido creado con éxito\n\n",
                icon: "success",
                position: "center",
                timer: 4000
            });
        } else {
            let errorMsg = 'Los datos ingresados no son correctos o ya existe un docente con ese nombre';
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
        let codigoDocente = data.get('codigoDocente');
        let nombre = data.get('nombre');
        altaDocente(codigoDocente, nombre);
        history('/Novedades');
    };


    return (
        <Box component="form" sx={{ marginTop: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', }} onSubmit={handleSubmit}>
            <Card sx={{ display: 'flex', alignSelf: 'center', }}>
                <Box sx={{ alignSelf: 'center' }}>
                    <Typography level="title-md">Alta docente</Typography>
                </Box>
                <Divider />
                <Stack direction="column" sx={{ display: { xs: 'flex', md: 'flex' }, alignSelf: 'center' }}>
                    {/* <FormControl sx={{ width: '100%', maxWidth: 350, gap: 1 }}> */}
                        <FormControl sx={{ display: { sm: 'flex', md: 'flex', width: '350px' }, gap: 1 }}>
                        <FormLabel htmlFor="codigoDocente">Código</FormLabel>
                        <Input size="small" id="codigoDocente" name="codigoDocente" placeholder="Código" required />
                        <FormLabel htmlFor="nombre">Nombre</FormLabel>
                        <Input size="small" id="nombre" name="nombre" placeholder="Nombre" required />
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