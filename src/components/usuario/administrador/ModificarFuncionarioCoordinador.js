import React, { useEffect, useState, useContext } from 'react';
import { useLocation } from 'react-router-dom';
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
import { AuthContext } from '../../../context/AuthContext';
import { modificarDatosUsuario, getUsuario } from "../../../services/requests/usuarioService";
import { URI_FRONT, redirigir } from '../../../services/util/constants';
import { useNavigate } from 'react-router-dom';
import { types } from '../../../context/types';


export default function ModificarFuncionarioCoordinador() {
    const { user } = useContext(AuthContext);
    const history = useNavigate();
    const context = useContext(AuthContext);
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState(null);

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const idU = queryParams.get('id');

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const result = await getUsuario(idU, user.jwtLogin);
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

    const DatosRol = [
        { cod: 'C', rol: `Coordinador` },
        { cod: 'F', rol: `Funcionario` },
        { cod: 'A', rol: `Administrador` },
        { cod: 'E', rol: `Estudiante` },
    ];


    const handleModificar = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        let nombre = data.get('nombre');
        let apellido = data.get('apellido');
        let email = data.get('email');
        let cedula = data.get('cedula');
        let fechaNacimiento = data.get('fecha');
        let rol = data.get('rol');

        modificarDatosUsuario(idU, nombre, apellido, email, fechaNacimiento, rol, cedula, user.jwtLogin).then((result) => {
            history(URI_FRONT.dashboardUri + `?id=m`);
            if (result) {
                console.log("Datos modificados correctamente: ", result);
                autentication(user.id, cedula, nombre, apellido, rol, email, user.jwtLogin);
            } else {
                console.log("Error al modificar los datos del usuario: ", result);
            }
        });
    }

    const handleCancelar = () => {
        redirigir(URI_FRONT.dashboardUri + `?id=m`);
    };

    return (
        <Box component="form" sx={{ marginTop: 6, display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', }} onSubmit={handleModificar}>
            <Card sx={{ display: 'flex', alignSelf: 'center', }}>
                <Box sx={{ margin: 0.6, alignSelf: 'center' }}>
                    <Typography sx={{ textAlign: 'center' }} variant="plain" color="primary" noWrap>Modificar Funcionario - Coordinador</Typography>
                </Box>
                <Divider />
                <FormControl sx={{ display: { sm: 'flex', md: 'flex', width: '320px' }, gap: 0.6 }}>
                    <Input size="sm" id="nombre" name="nombre" placeholder="Nombre:" required defaultValue={userData.nombre} />
                    <Input size="sm" id="apellido" name="apellido" placeholder="Apellido:" required defaultValue={userData.apellido} />
                    <Input size="sm" id="cedula" name="cedula" placeholder="Cedula:" required defaultValue={userData.cedula} />
                    <Input size="sm" id="email" name="email" type="email" placeholder="Email:" required defaultValue={userData.email} />
                    <Input size="sm" id="fecha" name="fecha" type="date" placeholder="Fecha nacimientos:" defaultValue={userData.fechaNacimiento} />
                    <Divider />
                    <div marginTop={1}>
                        <Select size="sm" id="rol" name="rol" defaultValue={userData.rol} >
                            {DatosRol.map((strRol, index) => (
                                <Option key={index} value={strRol.cod}>{strRol.rol}</Option>
                            ))}
                        </Select>
                    </div>
                </FormControl>
                <Stack direction="row" spacing={0.8} sx={{ marginTop: 1, justifyContent: 'right' , zIndex: '1000' }}>
                    <Button type="submit" fullWidth sx={{ mt: 1, mb: 3, border: 0.01, borderColor: '#3d3d3d' }} variant="soft">Guardar</Button>
                    <Button size="sm" fullWidth variant="outlined" color="neutral" onClick={() => handleCancelar()}>
                        Cancelar
                    </Button>
                </Stack>
            </Card>
        </Box>
    );
}