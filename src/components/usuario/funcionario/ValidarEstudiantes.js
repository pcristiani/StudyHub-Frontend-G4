import React, { useContext, useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/joy/Box';
import List from '@mui/joy/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/joy/Checkbox';
import Grid from '@mui/joy/Grid';
import { getEstudiantesPendientes, acceptEstudiante } from '../../../services/requests/estudianteService';
import AccountCircleSharpIcon from '@mui/icons-material/AccountCircleSharp';
import { AuthContext } from '../../../context/AuthContext';
import Sheet from '@mui/joy/Sheet';
import Tooltip from '@mui/joy/Tooltip';
import IconButton from '@mui/material/IconButton';
import { TaskAltRounded } from '@mui/icons-material';
import Card from '@mui/joy/Card';
import Typography from '@mui/joy/Typography';

import Stack from '@mui/joy/Stack';


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
                    validado: user.validado
                })));
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        }
        fetchValidarEstudiantes();
    }, []);

    const handleValidateClick = (usuarioId) => {
        acceptEstudiante(usuarioId, user.jwtLogin);
        console.log(`Validar usuario con ID: ${usuarioId}`);
        setData(prevData => prevData.map(user =>
            user.id === usuarioId ? { ...user, validado: true } : user
        ));
    };

    const usuariosNoValidados = data.filter(info => !info.validado);
    const mitad = Math.ceil(usuariosNoValidados.length / 2);
    const primeraMitad = usuariosNoValidados.slice(0, mitad);
    const segundaMitad = usuariosNoValidados.slice(mitad);

    return (
        <Sheet>
            <Box sx={{ marginTop: 6, display: 'flex', flexDirection: 'column', alignItems: 'center' }} >
                <Card sx={{ display: 'flex', alignSelf: 'center', }}>
                    <Box sx={{ margin: 1, alignSelf: 'center' }}>
                        <Typography sx={{ textAlign: 'center' }} variant="plain" color="primary" noWrap>
                            Validación de estudiantes
                        </Typography>
                    </Box>

                    <Stack direction="column" sx={{ display: { xs: 'flex', md: 'flex' }, alignSelf: 'center' }}>
                        <FormGroup row sx={{ display: { sm: 'flex', md: 'flex', justifyContent: "center", alignItems: "center" }, gap: 0.5 }}>
                            {/* <FormGroup row> */}
                            <FormControlLabel
                                control={<Checkbox color="neutral" size="sm" variant="outlined" checked={dense} />
                                } sx={{ gap: 1 }} label="Vista compacta" onChange={(event) => setDense(event.target.checked)} />
                            <FormControlLabel
                                control={<Checkbox color="neutral" size="sm" variant="outlined" checked={secondary} />
                                } sx={{ gap: 1 }} label="Más información" onChange={(event) => setSecondary(event.target.checked)} />
                        </FormGroup>

                        <Grid container spacing={1.5} justifyContent="center" alignItems="center" sx={{ width: { xs: '100%', md: '700px' }, alignSelf: 'center' }}>
                            <Grid item xs={12} md={6}>
                                <List dense={dense}>
                                    {primeraMitad.map(usuario => (
                                        <ListItem key={usuario.id} secondaryAction={
                                            <ListItemAvatar edge="end" aria-label="validate" onClick={() => handleValidateClick(usuario.id)}>
                                                <Tooltip title="Validar cuenta estudiante" variant="plain" color="success">
                                                    <IconButton aria-label="save" size="medium" color="success">
                                                        <TaskAltRounded fontSize="inherit" />
                                                    </IconButton>
                                                </Tooltip>
                                            </ListItemAvatar>}>
                                            <ListItemAvatar>
                                                <AccountCircleSharpIcon fontSize='large' />
                                            </ListItemAvatar>
                                            <h4 className='list-item-text'>
                                                {`${usuario.nombre} ${usuario.apellido}`}
                                                <h4 className='list-item-sub'>
                                                    {secondary ? `Cedula: ${usuario.cedula}` : null}
                                                </h4>
                                            </h4>

                                        </ListItem>
                                    ))}
                                </List>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <List dense={dense}>
                                    {segundaMitad.map(usuario => (
                                        <ListItem key={usuario.id} secondaryAction={
                                            <ListItemAvatar edge="end" aria-label="validate" onClick={() => handleValidateClick(usuario.id)}>
                                                <Tooltip title="Validar cuenta estudiante" variant="plain" color="success">
                                                    <IconButton aria-label="save" size="medium" color="success">
                                                        <TaskAltRounded fontSize="inherit" />
                                                    </IconButton>
                                                </Tooltip>
                                            </ListItemAvatar>}>
                                            <ListItemAvatar>
                                                <AccountCircleSharpIcon fontSize='large' />
                                            </ListItemAvatar>
                                            <h4 className='list-item-text'>
                                                {`${usuario.nombre} ${usuario.apellido}`}
                                                <h4 className='list-item-sub'>{secondary ? `Cedula: ${usuario.cedula}` : null}</h4>
                                            </h4>
                                            {/* <ListItemText
                                                primary={`${usuario.nombre} ${usuario.apellido}`}
                                                secondary={secondary ? `Cedula: ${usuario.cedula}` : null} /> */}
                                        </ListItem>
                                    ))}
                                </List>
                            </Grid>
                        </Grid>
                    </Stack>

                </Card>
            </Box>
        </Sheet >
    );
}
