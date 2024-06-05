import React, { useContext } from 'react';

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
import swal from 'sweetalert';
import { AuthContext } from '../../../context/AuthContext';
import { registrarUsuario } from "../../../services/requests/usuarioService";
import { URI_FRONT, redirigir } from '../../../services/util/constants';
import { useNavigate } from 'react-router-dom';


export default function AltaFuncionarioCoordinador() {
    const { user } = useContext(AuthContext);
    const history = useNavigate();

    const DatosRol = [
        { cod: 'C', rol: `Coordinador` },
        { cod: 'F', rol: `Funcionario` }
    ];

    const handleCancelar = () => {
        redirigir(URI_FRONT.dashboardUri + `?id=m`);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        let nombre = data.get('nombre');
        let apellido = data.get('apellido');
        let cedula = data.get('cedula');
        let email = data.get('email');
        let fecha = data.get('fecha');
        let rol = data.get('rol');
        let password = '123';
        try {
            await registrarUsuario(nombre, apellido, cedula, password, email, fecha, rol, user.jwtLogin);
            swal({
                title: "El usuario ha sido creado con éxito\n\n",
                icon: "success",
                position: "center",
                timer: 4000
            });
            history('/Novedades');
        } catch (error) {
            let errorMsg = 'Los datos ingresados no son correctos o ya existe un usuario con esa cedula';
            if (error.status === 400) {
                errorMsg = 'No autorizado. Verifica tu token de autenticación.';
            } else if (error.status === 500) {
                errorMsg = 'Error interno del servidor. Inténtalo más tarde.';
            }
            swal("Error", errorMsg, "error", {
                timer: 3000
            });
        }
    }

    return (
        <Box component="form" sx={{ marginTop: 6, display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', }} onSubmit={handleSubmit}>
            <Card sx={{ display: 'flex', alignSelf: 'center', }}>
                <Box sx={{ margin: 0.6, alignSelf: 'center' }}>
                    <Typography sx={{ textAlign: 'center' }} variant="plain" color="primary" noWrap>Funcionario / Coordinador</Typography>
                </Box>
                <Divider />
                <FormControl sx={{ display: { sm: 'flex', md: 'flex', width: '350px' }, gap: 0.8 }}>
                    <Input size="sm" id="nombre" name="nombre" placeholder="Nombre:" required />
                    <Input size="sm" id="apellido" name="apellido" placeholder="Apellido:" required />
                    <Input size="sm" id="cedula" name="cedula" placeholder="Cedula:" required />
                    <Input size="sm" id="email" name="email" type="email" placeholder="Email:" required />
                    <Input size="sm" id="fecha" name="fecha" type="date" placeholder="Fecha nacimientos:" />
                    <Divider />
                    <div marginTop={2}>
                        <Select size="sm" id="rol" name="rol" placeholder="Perfil de usuario..." required>
                            {DatosRol.map((strRol, index) => (
                                <Option key={index} value={strRol.cod}>{strRol.rol}</Option>
                            ))}
                        </Select>
                    </div>
                </FormControl>
                <Stack direction="row" spacing={0.8} sx={{ marginTop: 1, justifyContent: 'right' }}>
                    <Button type="submit" fullWidth sx={{ mt: 1, mb: 3, border: 0.01, borderColor: '#3d3d3d' }} variant="soft">                        Guardar</Button>
                    <Button size="sm" fullWidth variant="outlined" color="neutral" onClick={() => handleCancelar()}>
                        Cancelar
                    </Button>
                </Stack>
            </Card>
        </Box>
    );
}