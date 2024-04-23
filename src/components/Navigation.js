import React, { useContext } from 'react';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemButton from '@mui/joy/ListItemButton';
import Button from '@mui/joy/Button';
import { AuthContext } from '../auth/AuthContext';
import Dropdown from '@mui/joy/Dropdown';
import Menu from '@mui/joy/Menu';
import MenuButton from '@mui/joy/MenuButton';
import { URI_FRONT, TIPO_ROL } from '../util/constants'

export default function Navigation() {
    const { user, dispatch } = useContext(AuthContext);

    return (
        <List size="sm" sx={{ '--ListItem-radius': '8px', '--List-gap': '4px' }}>
            <ListItem nested>
                {/* <ListSubheader sx={{ letterSpacing: '2px', fontWeight: '800' }}>
                    Navegar
                </ListSubheader> */}
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
                            }
                            {
                                (user.rol === TIPO_ROL.ESTUDIANTE) &&
                                <>
                                    <ListItemButton>
                                        <Button variant="plain" color="neutral" component="a" href={URI_FRONT.panelUri} size="sw" sx={{ alignSelf: 'left' }}>
                                            Mi Panel
                                        </Button>
                                    </ListItemButton>
                                    <ListItemButton>
                                        <Button variant="plain" color="neutral" component="a" href={URI_FRONT.cursosUri} size="sw" sx={{ alignSelf: 'left' }}>
                                            Cursos
                                        </Button>
                                    </ListItemButton>
                                    <ListItemButton>
                                        <Button variant="plain" color="neutral" component="a" href={URI_FRONT.inscripcionUri} size="sw" sx={{ alignSelf: 'left' }}>
                                            Inscripciones
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
            </ListItem>
        </List>
    );
}
