import React, { useContext, useEffect, useState } from 'react';

import AspectRatio from '@mui/joy/AspectRatio';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Divider from '@mui/joy/Divider';
import FormControl from '@mui/joy/FormControl';
import Input from '@mui/joy/Input';
import Stack from '@mui/joy/Stack';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import Typography from '@mui/joy/Typography';
import Card from '@mui/joy/Card';
import { AuthContext } from '../../context/AuthContext';
import { getUsuario, modificarDatosUsuario } from "../../services/requests/usuarioService";
import { types } from '../../context/types';


export default function EditarPerfil() {
    const { user } = useContext(AuthContext);
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState(null);
    const context = useContext(AuthContext);

    const DatosRol = [
        { cod: 'A', rol: `Administrador` },
        { cod: 'E', rol: `Estudiante` },
        { cod: 'C', rol: `Coordinador` },
        { cod: 'I', rol: `Invitado` },
        { cod: 'F', rol: `Funcionario` }
    ];

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const result = await getUsuario(user.id, user.jwtLogin);
                setUserData(result);
            } catch (error) {
                setError(error.message);
            }
        };
        fetchUser();
    }, [user]);

    useEffect(() => {
        if (userData) {
            console.log("Datos del Usuario: ", userData);
        }
    }, [userData]);

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!userData) {
        return <div>Cargando...</div>;
    }


    const autentication = (idUsuario, cedula, nombre, apellido, rol, email, jwtLogin) => {
        const action = {
            type: types.login,
            payload: {
                id: idUsuario,
                cedula: cedula,
                nombre: nombre,
                apellido: apellido,
                email: email,
                rol: rol,
                jwtLogin: jwtLogin
            }
        }
        context.dispatch(action);
    }

    const handleModificar = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        let nombre = data.get('nombre');
        let apellido = data.get('apellido');
        let email = data.get('email');
        let cedula = data.get('cedula');
        let rol = data.get('rol');

        modificarDatosUsuario(user.id, nombre, apellido, email, userData.fechaNacimiento, rol, cedula, user.jwtLogin).then((result) => {
            if (result) {
                console.log("Datos modificados correctamente: ", result);
                autentication(user.id, cedula, nombre, apellido, rol, email, user.jwtLogin);
            } else {
                console.log("Error al modificar los datos del usuario: ", result);
            }
        });
    }

    return (
        <Box sx={{ marginTop: 6, display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', }}>
            <Card sx={{ display: 'flex', alignSelf: 'center', }}>
                <Box sx={{ alignSelf: 'center' }}>
                    <Typography level="title-md">Datos de usuario</Typography>
                </Box>
                <Divider />
                <Box component="form" sx={{ marginTop: 1, display: 'flex', flexDirection: 'column', width: '100%' }} onSubmit={handleModificar}>
                    <Stack>
                        <Stack spacing={1}>
                            <FormControl sx={{ display: { sm: 'flex', md: 'flex', width: '350px' }, gap: 0.6 }}>
                                <label>Nombre</label>
                                <Input size="sm" id="nombre" name="nombre" defaultValue={userData.nombre} />
                                <Input size="sm" id="apellido" name="apellido" sx={{}} defaultValue={userData.apellido} />
                            </FormControl>

                            <FormControl>
                                <label>Cedula</label>
                                <Input size="sm" id="cedula" name="cedula" defaultValue={userData.cedula} disabled />
                            </FormControl>

                            <FormControl>
                                <label>Email</label>
                                <Input size="sm" id="email" name="email" type="email" defaultValue={userData.email} />
                            </FormControl>

                        </Stack>
                        <div marginTop={2}>
                            <FormControl sx={{ marginTop: "4px" }}>
                                <label>Perfil</label>
                                <Select size="sm" id="rol" name="rol" defaultValue={user.rol} disabled>
                                    {DatosRol.map((strRol, index) => (
                                        <Option key={index} value={strRol.cod}>{strRol.rol}</Option>
                                    ))}
                                </Select>
                            </FormControl>
                        </div>
                    </Stack>
                    <Stack direction="row" spacing={2} sx={{ marginTop: 2, justifyContent: 'right' }}>
                        <Button type="submit" size="sm" alignItems="right" variant="solid">Guardar</Button>
                        <Button size="sm" variant="outlined" href='/'>Cancelar</Button>
                    </Stack>
                </Box>
            </Card>
        </Box>
    );
}