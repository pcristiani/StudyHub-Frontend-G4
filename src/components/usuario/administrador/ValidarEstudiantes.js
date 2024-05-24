import React, { useContext, useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { getEstudiantesPendientes, acceptEstudiante } from '../../../services/requests/estudianteServices';
import TaskAltSharpIcon from '@mui/icons-material/TaskAltSharp';
import AccountCircleSharpIcon from '@mui/icons-material/AccountCircleSharp';
import { AuthContext } from '../../../context/AuthContext';
import ModificarPassword from '../../login/ModificarPassword';

const Demo = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
}));

export default function ValidarEstudiantes() {
    const [dense, setDense] = useState(false);
    const [secondary, setSecondary] = useState(false);
    const [data, setData] = useState([]);
    const { user } = useContext(AuthContext); // Obtengo la informacion de logueo

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
        <Box sx={{ marginTop: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

            <Typography sx={{ mt: 4, mb: 2 }} variant="h5" component="div">
                Lista de estudiantes a validar
            </Typography>
            <FormGroup row>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={dense}
                            onChange={(event) => setDense(event.target.checked)} />
                    }
                    label="Vista compacta"
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={secondary}
                            onChange={(event) => setSecondary(event.target.checked)} />
                    }
                    label="Más información"
                />
            </FormGroup>

            <Grid container spacing={2} justifyContent="center" alignItems="center" sx={{ minHeight: '20vh', maxWidth: '90vh' }}>
                <Grid item xs={12} md={6}>
                    <Demo>
                        <List dense={dense}>
                            {primeraMitad.map(usuario => (
                                <ListItem key={usuario.id} secondaryAction={
                                    <IconButton edge="end" aria-label="validate" onClick={() => handleValidateClick(usuario.id)}>
                                        <TaskAltSharpIcon />
                                    </IconButton>
                                }>
                                    <ListItemAvatar>
                                        <AccountCircleSharpIcon fontSize='large' />
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={`${usuario.nombre} ${usuario.apellido}`}
                                        secondary={secondary ? `Cedula: ${usuario.cedula}` : null}
                                    />
                                </ListItem>
                            ))}
                        </List>
                    </Demo>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Demo>
                        <List dense={dense}>
                            {segundaMitad.map(usuario => (
                                <ListItem key={usuario.id} secondaryAction={
                                    <IconButton edge="end" aria-label="validate" onClick={() => handleValidateClick(usuario.id)}>
                                        <TaskAltSharpIcon />
                                    </IconButton>
                                }>
                                    <ListItemAvatar>
                                        <AccountCircleSharpIcon fontSize='large' />
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={`${usuario.nombre} ${usuario.apellido}`}
                                        secondary={secondary ? `Cedula: ${usuario.cedula}` : null}
                                    />
                                </ListItem>
                            ))}
                        </List>
                    </Demo>
                </Grid>
            </Grid>
        </Box>
    );
}
