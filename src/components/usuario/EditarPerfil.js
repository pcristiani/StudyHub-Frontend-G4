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
import CardActions from '@mui/joy/CardActions';
import { getUsers } from '../../requests/getUsers';
import { AuthContext } from '../../auth/AuthContext';


export default function EditarPerfil() {
    // const [strJwt, setStrJwt] = useState(null);
    const { user } = useContext(AuthContext); // Obtengo la informacion de logueo

    useEffect(() => {
        getUsers(user.id).then(result => {
            console.log("Datos Usuario: ", result);
        });
    }, []);


    return (
        <Box sx={{ marginTop: 6, display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
            <Box sx={{ display: 'flex', maxWidth: '800px', alignSelf: 'center' }}>
                <Card sx={{ display: 'flex', maxWidth: '800px', alignSelf: 'center' }}>
                    <Box sx={{ alignSelf: 'center' }}>
                        <Typography level="title-md">Datos de usuario</Typography>
                    </Box>
                    <Divider />
                    <Stack direction="row" sx={{ display: { xs: 'flex', md: 'flex' }, alignSelf: 'center' }}>
                        <Stack direction="column" spacing={1}>

                            <AspectRatio ratio="1" maxHeight={180} sx={{ minWidth: 200, borderRadius: '100%', display: { xs: 'none', md: 'none' } }}>
                                <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=286"
                                    srcSet="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=286&dpr=2 2x"
                                    loading="lazy"
                                    alt="" />
                            </AspectRatio>

                        </Stack>
                        <Stack >
                            <Stack spacing={1}>
                                <FormLabel>Nombre</FormLabel>
                                <FormControl sx={{ display: { sm: 'flex-column', md: 'flex-row' }, gap: 1 }}>
                                    <Input size="sm" placeholder="Nombre" defaultValue={user.name} readOnly />
                                    <Input size="sm" placeholder="Apellido" sx={{ flexGrow: 1 }} defaultValue={user.surname} readOnly />
                                </FormControl>
                            </Stack>
                            <Stack direction="row" spacing={1}>
                                <FormControl>
                                    <FormLabel>Usuario</FormLabel>
                                    <Input size="sm" placeholder="Usuario" defaultValue={user.username} readOnly />
                                </FormControl>
                                <FormControl sx={{ flexGrow: 1 }}>
                                    <FormLabel>Email</FormLabel>
                                    <Input size="sm" type="email" defaultValue={user.email} readOnly placeholder="Email" sx={{ flexGrow: 2 }} />
                                </FormControl>
                            </Stack>

                            <div>
                                <FormControl sx={{ display: { sm: 'contents' } }}>
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

                    <CardActions sx={{ alignSelf: 'flex-end', pt: 1 }}>
                        <Button size="sm" variant="outlined" color="neutral">
                            Cancelar
                        </Button>
                        <Button size="sm" variant="solid">
                            Guardar
                        </Button>
                    </CardActions>

                </Card>

            </Box>
        </Box>
    );
}


// useEffect(() => {
//     getUser().then(result => {
//         setStrJwt(result);
//     });
// }, []);
// if (!strJwt) return null;
//  <IconButton
// aria-label="upload new picture"
// size="sm"
// variant="outlined"
// color="neutral"
// sx={{ bgcolor: 'background.body', position: 'absolute', zIndex: 2, borderRadius: '50%', left: 100, top: 170, boxShadow: 'sm', }}>
// <EditRoundedIcon />
//     </IconButton> 