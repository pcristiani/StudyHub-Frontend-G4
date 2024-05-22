import React, { useContext, useEffect, useState } from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Divider from '@mui/joy/Divider';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Stack from '@mui/joy/Stack';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import Typography from '@mui/joy/Typography';
import Card from '@mui/joy/Card';
import { AuthContext } from '../../context/AuthContext';
import { decodificaJwt } from '../../services/util/conversionBase64';
import { getToken } from '../../services/requests/loginTest';
import { getUsuario } from '../../services/requests/getUsuario';


export default function EditarPerfil() {

    // const [strJwt, setStrJwt] = useState(null);

    const { user } = useContext(AuthContext); // Obtengo la informacion de logueo
    console.log("User: ", user.id);
    // const jwtresult = getToken("111", "XdMiq4cRVtSl");


    useEffect(() => {
        getUsuario(user.id, user.jwtLogin).then(result => {
            console.log("Datos Usuario: ", result);
        });
    }, []);


    return (
        <Box sx={{ marginTop: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', }}>
            <Card sx={{ display: 'flex', alignSelf: 'center', }}>
                <Box sx={{ alignSelf: 'center' }}>
                    <Typography level="title-md">Datos de usuario</Typography>
                </Box>
                <Divider />
                <Stack direction="flex" sx={{ display: { xs: 'flex', md: 'flex' }, alignSelf: 'center' }}>
                    {/* <Stack direction="flex" spacing={1.5}>
                            <AspectRatio ratio="1" height={570} sx={{ borderRadius: '100%', display: { xs: 'flex', md: 'flex' } }}>
                                <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=286"
                                    srcSet="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=286&dpr=2 2x"
                                    loading="lazy"
                                    alt="" />
                            </AspectRatio>
                        </Stack> */}
                    <Stack>
                        <Stack spacing={1}>
                            <FormLabel>Nombre</FormLabel>
                            <FormControl sx={{ display: { sm: 'flex', md: 'flex', width: '350px' }, gap: 1 }}>
                                <Input size="sm" placeholder="Nombre" defaultValue={user.nombre} readOnly />
                                <Input size="sm" placeholder="Apellido" sx={{}} defaultValue={user.apellido} readOnly />
                            </FormControl>
                        </Stack>
                        <Stack>
                            <FormControl>
                                <FormLabel>Cedula</FormLabel>
                                <Input size="sm" placeholder="Cedula" defaultValue={user.cedula} readOnly />
                                <FormLabel>Email</FormLabel>
                                <Input size="sm" type="email" defaultValue={user.email} readOnly placeholder="Email" sx={{ flexGrow: 1 }} />
                            </FormControl>
                        </Stack>

                        <div marginTop={2}>
                            <FormControl sx={{ marginTop: "4px" }} >
                                <FormLabel>Perfil</FormLabel>
                                <Select size="sm" defaultValue="1">
                                    <Option value="1">
                                        Administrador
                                    </Option>
                                    <Option value="2">
                                        Estudiante
                                    </Option>
                                </Select>
                            </FormControl>
                        </div>
                    </Stack>
                </Stack>
                {/*<CardActions sx={{ alignSelf: 'flex-end', pt: 1 }}> */}
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

