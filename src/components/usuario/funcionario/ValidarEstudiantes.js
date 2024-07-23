import React, { useContext, useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/joy/Box';
import List from '@mui/joy/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Grid from '@mui/joy/Grid';
import { getEstudiantesPendientes, acceptEstudiante } from '../../../services/requests/estudianteService';
import { AuthContext } from '../../../context/AuthContext';
import Tooltip from '@mui/joy/Tooltip';
import IconButton from '@mui/material/IconButton';
import PersonRemoveRoundedIcon from '@mui/icons-material/PersonRemoveRounded';
import PersonAddAlt1RoundedIcon from '@mui/icons-material/PersonAddAlt1Rounded';
import Card from '@mui/joy/Card';
import Typography from '@mui/joy/Typography';
import Stack from '@mui/joy/Stack';
import { errors } from '../../../services/util/errors';
import {formatoCi} from '../../../services/util/formatoCi';


const Demo = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
}));


export default function ValidarEstudiantes() {
    const [dense, setDense] = useState(false);
    const [secondary, setSecondary] = useState(false);
    const [data, setData] = useState([]);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        async function fetchValidarEstudiantes() {
            try {
                const result = await getEstudiantesPendientes(user.jwtLogin);
                setData(result.map(user => ({
                    id: user.idUsuario,
                    nombre: user.nombre,
                    apellido: user.apellido,
                    cedula: user.cedula,
                    activo: user.activo,
                    validado: user.validado
                })));
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        }
        fetchValidarEstudiantes();
    }, []);


    const handleValidateClick = async (usuarioId, userName, userSurname) => {
        const resp = await acceptEstudiante(usuarioId, true, user.jwtLogin);
        let title = 'Estudiante validado: ' + userName + ` ` + userSurname;
        errors(resp.data, '', resp.status, false);
        setData(prevData => prevData.map(user =>
            user.id === usuarioId ? { ...user, validado: true } : user
        ));
    };

    const handleCancelarClick = async (usuarioId, userName, userSurname) => {
        const resp = await acceptEstudiante(usuarioId, false, user.jwtLogin);
        let title = 'Estudiante inhabilitado';
        errors(title, '', resp.status, false);

        setData(prevData => prevData.map(user =>
            user.id === usuarioId ? { ...user, validado: true } : user
        ));
    };
    const usuariosNoValidados = data.filter(info => !info.validado && info.activo);
    const mitad = Math.ceil(usuariosNoValidados.length / 2);
    const primeraMitad = usuariosNoValidados.slice(0, mitad);
    const segundaMitad = usuariosNoValidados.slice(mitad);

    return (
        <Box component="form" sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
            {/* <Card sx={{ display: 'flex', alignSelf: 'center', }}> */}
            <Card sx={{ display: 'flex', alignSelf: 'center', zIndex: '1000', width: { xs: '90%', md: '610px' } }}>
                <Box sx={{ margin: 0.2, alignSelf: 'center' }}>
                    <Typography sx={{ textAlign: 'center' }} variant="plain" color="primary" noWrap>Validación de estudiantes</Typography>
                </Box>
                <Stack direction="column" sx={{ display: { xs: 'flex', md: 'flex' }, alignSelf: 'left' }}>
                    <Grid container spacing={3} justifyContent="center" alignItems="center" sx={{ width: { xs: '100%', md: '610px' }, alignSelf: 'center' }}>
                        <Grid item xs={12} md={6}>
                            <List dense={dense}>
                                {primeraMitad.map(usuario => (
                                    <>
                                        {(usuario.activo) ?
                                            <ListItem key={usuario.id} secondaryAction={
                                                <>
                                                    <Stack direction="row" spacing={-2.5} sx={{ marginTop: 1, justifyContent: 'left', zIndex: '1000' }}>
                                                        <ListItemAvatar edge="end" aria-label="validate" onClick={() => handleValidateClick(usuario.id)}>
                                                            <Tooltip title="Validar usuario" variant="plain" color="success">
                                                                <IconButton aria-label="save" size="md" variant="plain" color="inherit">
                                                                    <PersonAddAlt1RoundedIcon fontSize="inherit" />
                                                                </IconButton>
                                                            </Tooltip>
                                                        </ListItemAvatar>
                                                        <ListItemAvatar edge="end" aria-label="validate" onClick={() => handleCancelarClick(usuario.id)}>
                                                            <Tooltip title="Inhabilitar usuario" variant="plain" color="danger">
                                                                <IconButton aria-label="save" size="md" variant="plain" color="inherit">
                                                                    <PersonRemoveRoundedIcon fontSize="inherit" />
                                                                </IconButton>
                                                            </Tooltip>
                                                        </ListItemAvatar>
                                                    </Stack>
                                                </>}>
                                                <h4 className='list-item-text'>
                                                    {`${usuario.nombre} ${usuario.apellido}`}
                                                    <h4 className='list-item-sub'>
                                                        {secondary ? `Cedula:  ${formatoCi(usuario.cedula)}` : `Cedula: ${formatoCi(usuario.cedula)}`}
                                                    </h4>
                                                </h4>
                                                {/* {formatoCi(estudiante.cedula)} */}
                                            </ListItem>
                                            :
                                            null
                                        }
                                    </>
                                ))}
                            </List>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <List dense={dense}>
                                {segundaMitad.map(usuario => (
                                    <>
                                        {(usuario.activo) ?
                                            <ListItem key={usuario.id} secondaryAction={
                                                <>
                                                    <Stack direction="row" spacing={-3} sx={{ marginTop: 0, justifyContent: 'left', zIndex: '1000' }}>
                                                        <ListItemAvatar edge="end" aria-label="validate" onClick={() => handleValidateClick(usuario.id)}>
                                                            <Tooltip title="Validar usuario" variant="plain" color="success">
                                                                <IconButton aria-label="save" size="md" variant="plain" color="inherit">
                                                                    <PersonAddAlt1RoundedIcon fontSize="inherit" />
                                                                </IconButton>
                                                            </Tooltip>
                                                        </ListItemAvatar>
                                                        <ListItemAvatar edge="start" aria-label="validate" onClick={() => handleCancelarClick(usuario.id)}>
                                                            <Tooltip title="Inhabilitar usuario" variant="plain" color="danger">
                                                                <IconButton aria-label="save" size="md" variant="plain" color="inherit">
                                                                    <PersonRemoveRoundedIcon fontSize="inherit" />
                                                                </IconButton>
                                                            </Tooltip>
                                                        </ListItemAvatar>
                                                    </Stack>
                                                </>}>
                                                <h4 className='list-item-text'>
                                                    {`${usuario.nombre} ${usuario.apellido}`}
                                                    <h4 className='list-item-sub'>
                                                        {secondary ? `Cedula: ${formatoCi(usuario.cedula)}` : `Cedula: ${formatoCi(usuario.cedula)}`}
                                                    </h4>
                                                </h4>
                                            </ListItem>
                                            :
                                            null
                                        }
                                    </>
                                ))}
                            </List>
                        </Grid>
                    </Grid>
                </Stack>
            </Card>
        </Box>
    );
}
