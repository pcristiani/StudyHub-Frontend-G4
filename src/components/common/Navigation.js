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
                                            <MenuButton variant="plain" color="neutral" aria-pressed="false" component="a" size="sm">Administración de usuarios
                                                <Menu placement="bottom-start" size="sm" sx={{ zIndex: '99999', gap: 1, '--ListItem-radius': 'var--joy-radius-sm)', }}>
                                                    <Button variant="plain" color="neutral" component="a" href='/not-found' size="sm">
                                                        Alta coordinador y funcionario
                                                    </Button>
                                                    <Button variant="plain" color="neutral" component="a" href='/not-found' size="sm">
                                                        Modificar datos coordinador y funcionario
                                                    </Button>
                                                    <Button variant="plain" color="neutral" component="a" href='/not-found' size="sm">
                                                        Eliminar coordinador o funcionario
                                                    </Button>
                                                    <Button variant="plain" color="neutral" component="a" href='./resumen-actividad' size="sm" sx={{ alignSelf: 'center' }}>
                                                        Resumen de actividad 
                                                    </Button>
                                                    <Button variant="plain" color="neutral" component="a" href='/not-found' size="sm" sx={{ alignSelf: 'center' }}>
                                                        Asignar coordinador
                                                    </Button>
                                                </Menu>
                                            </MenuButton>
                                        </Dropdown>
                                        <Button variant="plain" color="neutral" component="a" href='./listados-busquedas' size="sm" sx={{ alignSelf: 'center' }}>
                                            Listados y búsquedas
                                        </Button>

                                    </>
                                }
                                {
                                    (user.rol === TIPO_ROL.ESTUDIANTE) &&
                                    <>
                                        <Button variant="plain" color="neutral" component="a" href={URI_FRONT.planEstudiosUri} size="sm" sx={{ alignSelf: 'center' }}>
                                            Plan de estudios
                                        </Button>
                                        <Dropdown>
                                            <MenuButton variant="plain" color="neutral" aria-pressed="false" component="a" size="sm">Inscripciones
                                                <Menu placement="bottom-start" size="sm" sx={{ zIndex: '99999', gap: 1, '--ListItem-radius': 'var--joy-radius-sm)', }}>
                                                    <Button variant="plain" color="neutral" component="a" href='./not-found' size="sm">
                                                        Carrera
                                                    </Button>
                                                    <Button variant="plain" color="neutral" component="a" href='/not-found' size="sm">
                                                        Asignatura
                                                    </Button>
                                                    <Button variant="plain" color="neutral" component="a" href='/not-found' size="sm">
                                                        Examen
                                                    </Button>
                                                </Menu>
                                            </MenuButton>
                                        </Dropdown>
                                        <Dropdown>
                                            <MenuButton variant="plain" color="neutral" aria-pressed="false" component="a" size="sm">Listados y búsquedas
                                                <Menu placement="bottom-start" size="sm" sx={{ zIndex: '99999', gap: 1, '--ListItem-radius': 'var--joy-radius-sm)', }}>
                                                    <Button variant="plain" color="neutral" component="a" href='/not-found' size="sm">
                                                        Asignaturas aprobadas
                                                    </Button>
                                                    <Button variant="plain" color="neutral" component="a" href='/not-found' size="sm">
                                                        Asignaturas pendientes de aprobación
                                                    </Button>
                                                </Menu>
                                            </MenuButton>
                                        </Dropdown>
                                        <Button variant="plain" color="neutral" component="a" href='' size="sm" sx={{ alignSelf: 'center' }}>
                                            Solicitar escolaridad
                                        </Button>
                                    </>
                                }
                                {
                                    (user.rol === TIPO_ROL.FUNCIONARIO) &&
                                    <>
                                        <Dropdown>
                                            <MenuButton variant="plain" color="neutral" aria-pressed="false" component="a" size="sm">Administración de usuarios
                                                <Menu placement="bottom-start" size="sm" sx={{ zIndex: '99999', gap: 1, '--ListItem-radius': 'var--joy-radius-sm)', }}>
                                                    <Button variant="plain" color="neutral" component="a" href='/not-found' size="sm">
                                                        Alta docente
                                                    </Button>
                                                    <Button variant="plain" color="neutral" component="a" href='/not-found' size="sm">
                                                        Validar usuario a estudiantes
                                                    </Button>
                                                    <Button variant="plain" color="neutral" component="a" href='/not-found' size="sm">
                                                        Validar inscripción a carrera
                                                    </Button>
                                                </Menu>
                                            </MenuButton>
                                        </Dropdown>
                                        <Dropdown>
                                            <MenuButton variant="plain" color="neutral" aria-pressed="false" component="a" size="sm">Registros
                                                <Menu placement="bottom-start" size="sm" sx={{ zIndex: '99999', gap: 1, '--ListItem-radius': 'var--joy-radius-sm)', }}>
                                                    <Button variant="plain" color="neutral" component="a" href='/not-found' size="sm">
                                                        Horario de asignatura
                                                    </Button>
                                                    <Button variant="plain" color="neutral" component="a" href='/not-found' size="sm">
                                                        Período de examen
                                                    </Button>
                                                    <Button variant="plain" color="neutral" component="a" href='/not-found' size="sm">
                                                        Asignatura a período de examen
                                                    </Button>
                                                </Menu>
                                            </MenuButton>
                                        </Dropdown>
                                        <Dropdown>
                                            <MenuButton variant="plain" color="neutral" aria-pressed="false" component="a" size="sm">Calificaciones
                                                <Menu placement="bottom-start" size="sm" sx={{ zIndex: '99999', gap: 1, '--ListItem-radius': 'var--joy-radius-sm)', }}>
                                                    <Button variant="plain" color="neutral" component="a" href='/not-found' size="sm">
                                                        Registro calificaciones fin de curso
                                                    </Button>
                                                    <Button variant="plain" color="neutral" component="a" href='/not-found' size="sm">
                                                        Registro calificaciones examen
                                                    </Button>
                                                    <Button variant="plain" color="neutral" component="a" href='/not-found' size="sm">
                                                        Generación de actas
                                                    </Button>
                                                </Menu>
                                            </MenuButton>
                                        </Dropdown>
                                        <Dropdown>
                                            <MenuButton variant="plain" color="neutral" aria-pressed="false" component="a" size="sm">Listados y búsquedas
                                                <Menu placement="bottom-start" size="sm" sx={{ zIndex: '99999', gap: 1, '--ListItem-radius': 'var--joy-radius-sm)', }}>
                                                    <Button variant="plain" color="neutral" component="a" href='/not-found' size="sm">
                                                        Carreras
                                                    </Button>
                                                    <Button variant="plain" color="neutral" component="a" href='/not-found' size="sm">
                                                        Asignaturas
                                                    </Button>
                                                </Menu>
                                            </MenuButton>
                                        </Dropdown>
                                    </>
                                }
                                {
                                    (user.rol === TIPO_ROL.COORDINADOR) &&
                                    <>
                                        <Dropdown>
                                            <MenuButton variant="plain" color="neutral" aria-pressed="false" component="a" size="sm">Gestión
                                                <Menu placement="bottom-start" size="sm" sx={{ zIndex: '99999', gap: 1, '--ListItem-radius': 'var--joy-radius-sm)', }}>
                                                    <Button variant="plain" color="neutral" component="a" href='/nueva-carrera' size="sm">
                                                        Alta carrera
                                                    </Button>
                                                    <Button variant="plain" color="neutral" component="a" href='' size="sm">
                                                        Alta asignatura
                                                    </Button>
                                                    <Button variant="plain" color="neutral" component="a" href='' size="sm">
                                                        Registrar previas
                                                    </Button>
                                                </Menu>
                                            </MenuButton>
                                        </Dropdown>
                                        <Dropdown>
                                            <MenuButton variant="plain" color="neutral" aria-pressed="false" component="a" size="sm">Listados y búsquedas
                                                <Menu placement="bottom-start" size="sm" sx={{ zIndex: '99999', gap: 1, '--ListItem-radius': 'var--joy-radius-sm)', }}>
                                                    <Button variant="plain" color="neutral" component="a" href='' size="sm">
                                                        Carreras
                                                    </Button>
                                                    <Button variant="plain" color="neutral" component="a" href='' size="sm">
                                                        Asignaturas
                                                    </Button>
                                                </Menu>
                                            </MenuButton>
                                        </Dropdown>
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
                                    {/* <Button variant="plain" color="neutral" component="a" href={URI_FRONT.preguntasFrecuentesUri} size="sw" sx={{ alignSelf: 'left' }}>
                                        Preguntas frecuentas
                                    </Button> */}
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
