import * as React from 'react';
import { useColorScheme } from '@mui/joy/styles';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import IconButton from '@mui/joy/IconButton';
import Stack from '@mui/joy/Stack';
import Avatar from '@mui/joy/Avatar';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import Tooltip from '@mui/joy/Tooltip';
import Dropdown from '@mui/joy/Dropdown';
import Menu from '@mui/joy/Menu';
import MenuButton from '@mui/joy/MenuButton';
import MenuItem from '@mui/joy/MenuItem';
import ListDivider from '@mui/joy/ListDivider';
import Drawer from '@mui/joy/Drawer';
import ModalClose from '@mui/joy/ModalClose';
import DialogTitle from '@mui/joy/DialogTitle';
import { CssVarsProvider } from '@mui/joy/styles';

import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import AccountCircleOutlined from '@mui/icons-material/AccountCircleOutlined';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';

import Navigation from './Navigation';
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../auth/AuthContext';
import Nav from 'react-bootstrap/Nav';

import Logo from '../img/logo.png';
import { types } from '../auth/types';
// import '../css/bootstrap.min.css';
import '../css/style-navbar.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { URI_FRONT, TIPO_ROL } from '../util/constants'

function ColorSchemeToggle() {
    const { mode, setMode } = useColorScheme();
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        setMode('dark')
        return <IconButton size="sm" variant="outlined" color="primary" />;
    }
    return (
        <Tooltip title="Cambiar tema" variant="outlined">
            <IconButton id="toggle-mode" size="sm" variant="plain" color="neutral" sx={{ alignSelf: 'center' }}
                onClick={() => {
                    if (mode === 'light') {
                        setMode('dark');
                    } else {
                        setMode('light');
                    }
                }}>
                {mode === 'light' ? <DarkModeRoundedIcon /> : <LightModeRoundedIcon />}
            </IconButton>
        </Tooltip>
    );
}

export default function Header() {
    const [open, setOpen] = React.useState(false);
    const { user, dispatch } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch({ type: types.logout });
        navigate('/login', {
            replace: true
        });
    }

    return (
        <CssVarsProvider disableTransitionOnChange>

            <Box sx={{ display: 'flex', flexGrow: 1, justifyContent: 'space-between', }}>
                <Stack direction="row" justifyContent="center" alignItems="center" spacing={0} sx={{ display: { xs: 'none', sm: 'flex' } }}>
                    <IconButton size="md" sx={{ display: { xs: 'none', sm: 'flex' }, }}>
                        <img className="logo-navbar mx-1" src={Logo} alt="ico" />
                        <Nav.Link href={URI_FRONT.homeUri}>
                            <DialogTitle>StudyHub</DialogTitle>
                        </Nav.Link>
                    </IconButton>
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

                                    <Button variant="plain" color="neutral" component="a" href='./listados-busquedas' size="sm" sx={{ alignSelf: 'center' }}>
                                        Listados y busquedas
                                    </Button>
                                    <Button variant="plain" color="neutral" component="a" href='./resumen-actividad' size="sm" sx={{ alignSelf: 'center' }}>
                                        Resumen de actividad
                                    </Button>
                                </>
                            }
                            {
                                (user.rol === TIPO_ROL.ESTUDIANTE) &&
                                <>
                                    <Button variant="plain" color="neutral" component="a" href={URI_FRONT.panelUri} size="sm" sx={{ alignSelf: 'center' }}>
                                        Mi Panel
                                    </Button>
                                    <Button variant="plain" color="neutral" component="a" href={URI_FRONT.cursosUri} size="sm" sx={{ alignSelf: 'center' }}>
                                        Cursos
                                    </Button>
                                    <Button variant="plain" color="neutral" component="a" href={URI_FRONT.inscripcionUri} size="sm" sx={{ alignSelf: 'center' }}>
                                        Inscripciones
                                    </Button>
                                </>
                            }
                        </>
                        :
                        <>
                            <Button variant="plain" color="neutral" component="a" href={URI_FRONT.novedadesUri} size="sm" sx={{ alignSelf: 'center' }}>
                                Novedades
                            </Button>
                            <Button variant="plain" color="neutral" component="a" href={URI_FRONT.preguntasFrecuentesUri} size="sm" sx={{ alignSelf: 'center' }}>
                                Preguntas frecuentas
                            </Button>
                            <Button variant="plain" color="neutral" component="a" href={URI_FRONT.contactoUri} size="sm" sx={{ alignSelf: 'center' }}>
                                Contacto
                            </Button>
                        </>
                    }
                </Stack>

                <Box sx={{ display: { xs: 'inline-flex', sm: 'none' } }}>
                    <IconButton variant="plain" color="neutral" onClick={() => setOpen(true)}>
                        <MenuRoundedIcon />
                    </IconButton>
                    <Drawer sx={{ display: { xs: 'inline-flex', sm: 'none' } }} open={open} onClose={() => setOpen(false)}>
                        <ModalClose />
                        <DialogTitle>StudyHub</DialogTitle>
                        <Box sx={{ px: 1 }}>
                            <Navigation />
                        </Box>
                    </Drawer>
                </Box>

                <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1.5, alignItems: 'center', }} >
                    <Input size="sm" variant="outlined" placeholder="Buscar…" startDecorator={<SearchRoundedIcon color="primary" />}
                        sx={{ alignSelf: 'center', display: { xs: 'none', sm: 'flex', }, }} />

                    <ColorSchemeToggle />
                    {(user.logged) ?
                        <>
                            <Dropdown>
                                <MenuButton variant="plain" size="sm"
                                    sx={{ maxWidth: '32px', maxHeight: '32px', borderRadius: '9999999px' }}>
                                    <Avatar
                                        src="https://i.pravatar.cc/40?img=59"
                                        srcSet="https://i.pravatar.cc/80?img=59"
                                        sx={{ maxWidth: '32px', maxHeight: '32px' }}
                                    />
                                </MenuButton>
                                <Menu placement="bottom-end" size="sm" sx={{ zIndex: '99999', p: 1, gap: 1, '--ListItem-radius': 'var--joy-radius-sm)', }}>
                                    <MenuItem>
                                        <Box sx={{ display: 'flex', alignItems: 'center', }}>
                                            <Avatar
                                                src="https://i.pravatar.cc/40?img=59"
                                                srcSet="https://i.pravatar.cc/80?img=59"
                                                sx={{ borderRadius: '50%' }}
                                            />
                                            <Box sx={{ ml: 1.5 }}>
                                                <Typography level="title-sm" textColor="text.primary">
                                                    {user.name} {user.surname}
                                                </Typography>
                                                <Typography level="body-xs" textColor="text.tertiary">
                                                    {user.email}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </MenuItem>
                                    <ListDivider />

                                    <MenuItem href={URI_FRONT.editPerfilUri} component="a">
                                        <AccountCircleOutlined />
                                        Perfil
                                    </MenuItem>
                                    <MenuItem href={URI_FRONT.editPerfilUri} component="a">
                                        <SettingsRoundedIcon />
                                        Ajustes
                                    </MenuItem>
                                    <ListDivider />
                                    <MenuItem href={URI_FRONT.homeUri} onClick={handleLogout}>
                                        <LogoutRoundedIcon />
                                        Cerrar sesión
                                    </MenuItem>
                                </Menu>
                            </Dropdown>
                        </>
                        :
                        <>
                            <Stack direction="row" justifyContent="center" alignItems="center" spacing={0} sx={{ display: { xs: 'none', sm: 'flex' } }}>

                                <Button variant="plain" color="neutral" component="a" href={URI_FRONT.loginUri} size="sm">
                                    Iniciar sesión
                                </Button>
                                <Button variant="plain" color="neutral" component="a" href={URI_FRONT.signupUri} size="sm">
                                    Registrarse
                                </Button>
                            </Stack>
                        </>
                    }
                </Box>
            </Box>
        </CssVarsProvider>
    );
}
{/* <Nav.Link className="nav-link" href={URI_FRONT.homeUri}>Inicio</Nav.Link> */ }