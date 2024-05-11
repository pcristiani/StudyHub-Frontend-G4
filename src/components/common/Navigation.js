import React, { useContext } from 'react';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemButton from '@mui/joy/ListItemButton';
import Button from '@mui/joy/Button';
import { AuthContext } from '../../context/AuthContext';
import Dropdown from '@mui/joy/Dropdown';
import Menu from '@mui/joy/Menu';
import MenuButton from '@mui/joy/MenuButton';
import { URI_FRONT, TIPO_ROL } from '../../services/util/constants'
import Box from '@mui/joy/Box';
import Logo from '../../img/logo-text.png';


import Input from '@mui/joy/Input';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';

import { types } from '../../context/types';
import { useNavigate } from 'react-router-dom'


export default function Navigation() {
    const { user, dispatch } = useContext(AuthContext);
    const [open, setOpen] = React.useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch({ type: types.logout });
        navigate('/login', {
            replace: true
        });
    }

    return (
        <>

            <List size="sm" sx={{ '--ListItem-radius': '8px', '--List-gap': '2px' }}>
                <ListItem nested>
                    <List aria-labelledby="nav-list-browse">
                        {(user.logged) && (user.rol) ?
                            <>
                                {(user.rol === TIPO_ROL.ADMIN) &&
                                    <>
                                        <Dropdown>
                                            <MenuButton variant="plain" color="neutral" aria-pressed="true" component="a" size="sm">Usuario
                                                <Menu placement="bottom-start" size="sm" sx={{ zIndex: '99999', gap: 1, '--ListItem-radius': 'var--joy-radius-sm)', }}>
                                                    <Button variant="plain" color="neutral" component="a" href='./alta-estudiante' size="sm">
                                                        Nuevo
                                                    </Button>
                                                    <Button variant="plain" color="neutral" component="a" href='./modificar-estudiante' size="sm">
                                                        Modificar
                                                    </Button>
                                                    <Button variant="plain" color="neutral" component="a" href='./baja-estudiante' size="sm">
                                                        Eliminar
                                                    </Button>
                                                </Menu>
                                            </MenuButton>
                                        </Dropdown>
                                        <ListItemButton>
                                            <Button variant="plain" color="neutral" component="a" href='./listados-busquedas' size="sw" sx={{ alignSelf: 'left' }}>
                                                Listados y busquedas
                                            </Button>
                                        </ListItemButton>
                                        <ListItemButton>
                                            <Button variant="plain" color="neutral" component="a" href='./resumen-actividad' size="sw" sx={{ alignSelf: 'left' }}>
                                                Resumen de actividad
                                            </Button>
                                        </ListItemButton>
                                    </>
                                }{
                                    (user.rol === TIPO_ROL.ESTUDIANTE) &&
                                    <>
                                        <ListItemButton>
                                            <img className="logo-navbar-mobile" src={Logo} alt="ico" />
                                            <Button variant="plain" color="neutral" component="a" href={URI_FRONT.planEstudiosUri} size="sw" sx={{ alignSelf: 'left' }}>
                                            </Button>
                                        </ListItemButton>
                                        <ListItemButton>
                                            <Button variant="plain" color="neutral" component="a" href={URI_FRONT.planEstudiosUri} size="sw" sx={{ alignSelf: 'left' }}>
                                                Plan de Estudios
                                            </Button>
                                        </ListItemButton>
                                        <ListItemButton>
                                            <Button variant="plain" color="neutral" component="a" href={URI_FRONT.inscripcionesUri} size="sw" sx={{ alignSelf: 'left' }}>
                                                Inscripciones
                                            </Button>
                                        </ListItemButton>
                                        <ListItemButton>
                                            <Button variant="plain" color="neutral" component="a" href={URI_FRONT.solicitudesUri} size="sw" sx={{ alignSelf: 'left' }}>
                                                Solicitudes
                                            </Button>
                                        </ListItemButton>
                                        <ListItemButton>
                                            <Button variant="plain" color="neutral" component="a" href={URI_FRONT.gestionUri} size="sw" sx={{ alignSelf: 'left' }}>
                                                Gestion
                                            </Button>
                                        </ListItemButton>
                                    </>
                                }
                            </>
                            :
                            <>
                                <ListItemButton>
                                    <Button variant="plain" color="neutral" component="a" href={URI_FRONT.novedadesUri} size="sw" sx={{ alignSelf: 'left' }}>
                                        Novedades
                                    </Button>
                                </ListItemButton>
                                <ListItemButton>
                                    <Button variant="plain" color="neutral" component="a" href={URI_FRONT.preguntasFrecuentesUri} size="sw" sx={{ alignSelf: 'left' }}>
                                        Preguntas frecuentas
                                    </Button>
                                </ListItemButton>
                                <ListItemButton>
                                    <Button variant="plain" color="neutral" component="a" href={URI_FRONT.contactoUri} size="sw" sx={{ alignSelf: 'left' }}>
                                        Contacto
                                    </Button>
                                </ListItemButton>
                            </>
                        }
                    </List>

                    <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1.5, alignItems: 'center', }} >
                        <Input size="sm" variant="outlined" placeholder="Buscar…" startDecorator={<SearchRoundedIcon color="primary" />}
                            sx={{ alignSelf: 'center', display: { xs: 'none', sm: 'flex', }, }} />
                    </Box>
                </ListItem>
            </List>
        </>
    );
}
