import React, { useContext, useState } from 'react';
import { useColorScheme } from '@mui/joy/styles';
import Nav from 'react-bootstrap/Nav';
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
import AccountCircleOutlined from '@mui/icons-material/AccountCircleOutlined';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import Person from '@mui/icons-material/Person';
import PropTypes from 'prop-types';
import Navigation from './Navigation';
import { useNavigate } from 'react-router-dom'
import Logo from '../../img/logo.png';
import Apk from '../../services/android/StudyHub.apk';
import LogoAvatar from '../../img/avatar/graduated_3135810.png';
import { URI_FRONT, redirigir, T_ROL } from '../../services/util/constants';
import AdbRoundedIcon from '@mui/icons-material/AdbRounded';
import { AuthContext } from '../../context/AuthContext';
import { types } from '../../context/types';
import { cerrarSesion } from '../../services/requests/loginService';
import { Key } from '@mui/icons-material';
import swal from 'sweetalert';


function ColorSchemeToggle() {
   const { mode, setMode } = useColorScheme();
   const [mounted, setMounted] = React.useState(false);
   const setMenuIndex = React.useState(null);
   React.useEffect(() => {
      setMounted(true);
   }, []);

   if (!mounted) {
      setMode('dark')
      return <IconButton size="sm" variant="solid" color="primary" />;
   }
   return (
      <Tooltip title="Cambiar tema" variant="outlined">
         <IconButton id="toggle-mode" size="sm" variant="outlined" color="neutral" sx={{ alignSelf: 'center' }}
            onClick={() => {
               if (mode === 'dark') {
                  setMode('light');
               } else {
                  setMode('dark');
               }
            }}>
            {mode === 'light' ? <DarkModeRoundedIcon /> : <LightModeRoundedIcon />}
         </IconButton>
      </Tooltip>
   );
}
const modifiers = [
   {
      name: 'offset',
      options: {
         offset: ({ placement }) => {
            if (placement.includes('end')) {
               return [8, 20];
            }
            return [-34, 10];
         },
      },
   },
];


function NavMenuButton({ children, menu, open, onOpen, onLeaveMenu, label, ...props }) {
   const isOnButton = React.useRef(false);
   const internalOpen = React.useRef(open);

   return (
      <Dropdown
         open={open}
         onOpenChange={(_, isOpen) => {
            if (isOpen) {
               onOpen?.();
            }
         }}        >
         <MenuButton
            {...props}
            slots={{ root: IconButton }}
            slotProps={{ root: { variant: 'outlined', color: 'neutral' } }}
            onMouseDown={() => { internalOpen.current = open; }}
            onClick={() => {
               if (!internalOpen.current) { onOpen(); }
            }}
            onMouseEnter={() => { onOpen(); isOnButton.current = true; }}
            onMouseLeave={() => { isOnButton.current = false; }}>
            {children}
         </MenuButton>
         {React.cloneElement(menu, {
            onMouseLeave: () => { onLeaveMenu(() => isOnButton.current); },
            modifiers,
         })}
      </Dropdown>
   );
}

NavMenuButton.propTypes = {
   children: PropTypes.node,
   label: PropTypes.string.isRequired,
   menu: PropTypes.element.isRequired,
   onLeaveMenu: PropTypes.func.isRequired,
   onOpen: PropTypes.func.isRequired,
   open: PropTypes.bool.isRequired,
};


///

export default function Header() {
   const [open, setOpen] = React.useState(false);
   const { user, dispatch } = useContext(AuthContext);
   const navigate = useNavigate();
   const [searchQuery, setSearchQuery] = useState('');

   const idA = 'a';
   const idM = 'm';
   const idL = 'l';

   async function cerrarSesionUsuario(jwtLogin) {
      const result = await cerrarSesion(jwtLogin);
      if (result !== null && result !== undefined) {
         swal("Cerrar Sesion", 'Has cerrado sesión correctamente', "success", {
            timer: 3000
         });
      } else {
         swal("¡Advertencia!", 'Un error inesperado ocurrio', "error", {
            timer: 3000
         });
      }
   }

   const handleSearch = () => {
      switch (searchQuery) {
         case 'login':
            redirigir(URI_FRONT.loginUri)
            break
         case 'novedades':
            redirigir(URI_FRONT.novedadesUri)
            break
         case 'contacto':
            redirigir(URI_FRONT.contactoUri)
            break
         case 'previas':
            redirigir(URI_FRONT.planEstudiosUri)
            break
         case 'carrera':
            redirigir(URI_FRONT.listadoCarrerasUri)
            break
         case 'asignatura':
            redirigir(URI_FRONT.listadoAsignaturasUri)
            break
         case 'examen':
            redirigir(URI_FRONT.inscripcionExamenUri)
            break
         case 'registrarse':
            redirigir(URI_FRONT.registrarseUri)
            break
         default:
            return URI_FRONT.homeUri;
      }
   }

   const handleLogout = () => {
      cerrarSesionUsuario(user.jwtLogin);
      dispatch({ type: types.logout });
      navigate('/login', {
         replace: true
      });
   }

   return (
      <CssVarsProvider disableTransitionOnChange>
         <Box sx={{ display: 'flex', flexGrow: 1, justifyContent: 'space-between', }}>
            {/* <Stack direction="row" width={'100%'} justifyContent="center" alignItems="center" spacing={0} sx={{ display: { xs: 'none', sm: 'flex', md: 'flex' } }}> */}
            <Stack direction="row" justifyContent="center" alignItems="center" spacing={0} sx={{ display: { xs: 'none', sm: 'flex' } }}>
               <Nav.Link href={URI_FRONT.homeUri}>
                  <IconButton size="md" sx={{ display: { xs: 'none', sm: 'flex' }, }}>
                     <img className="logo-navbar mx-1" src={Logo} alt="ico" />
                     <DialogTitle>StudyHub</DialogTitle>
                  </IconButton>
               </Nav.Link>
               <Button variant="plain" color="neutral" component="a" href={URI_FRONT.planEstudiosUri} size="sm" sx={{ alignSelf: 'center' }}>
                  Plan de estudios
               </Button>
               {(user.logged) && (user.rol) ?
                  <>
                     {(user.rol === T_ROL.ADMIN) &&
                        <>
                           <Dropdown>
                              <MenuButton variant="plain" color="neutral" aria-pressed="false" component="a">
                                 Administración de usuarios
                                 <Menu placement="bottom-start" size="sm" sx={{ zIndex: '99999', gap: 0, '--ListItem-radius': 'var--joy-radius-sm)', }}>
                                    <MenuItem variant="plain" color="neutral" component="a" href={`/alta-funcionario-coordinador`} size="sm">
                                       Alta de usuario
                                    </MenuItem>
                                    <MenuItem variant="plain" color="neutral" component="a" href='/nuevo-docente' size="sm">
                                       Alta docente
                                    </MenuItem>
                                    <MenuItem variant="plain" color="neutral" component="a" href={`/dashboard-admin?id=${idM}`} size="sm">
                                       Modificar/Baja usuarios
                                    </MenuItem>
                                 </Menu>
                              </MenuButton>
                           </Dropdown>
                           <Tooltip title="Asignar coordinador a carrera" variant="plain" color="neutral">
                              <Button variant="plain" color="neutral" component="a" href={`/dashboard-admin?id=${idA}`} size="sm">
                                 Asignar coordinador
                              </Button>
                           </Tooltip>
                           <Tooltip title="Listados y búsquedas de usuarios" variant="plain" color="neutral">
                              <Button variant="plain" color="neutral" component="a" href={`/dashboard-admin?id=${idL}`} size="sm">
                                 Listados y búsquedas
                              </Button>
                           </Tooltip>
                           <Tooltip title="Resumen de actividad de usuarios" variant="plain" color="neutral">
                              <Button variant="plain" color="neutral" component="a" href={`/dashboard-admin?id=${idL}`} size="sm">
                                 Resumen de actividad
                              </Button>
                           </Tooltip>
                        </>
                     }
                     {
                        (user.rol === T_ROL.ESTUDIANTE) &&
                        <>
                           <Dropdown>
                              <MenuButton variant="plain" color="neutral" aria-pressed="false" component="a">
                                 Inscripciones
                                 <Menu placement="bottom-start" size="sm" sx={{ zIndex: '99999', gap: 0, '--ListItem-radius': 'var--joy-radius-sm)', }}>
                                    <MenuItem variant="plain" color="neutral" component="a" href={URI_FRONT.inscripcionCarreraUri} size="sm">
                                       Carrera
                                    </MenuItem>
                                    <MenuItem variant="plain" color="neutral" component="a" href={URI_FRONT.inscripcionAsignaturaUri} size="sm">
                                       Asignatura
                                    </MenuItem>
                                    <MenuItem variant="plain" color="neutral" component="a" href={URI_FRONT.inscripcionExamenUri} size="sm">
                                       Examen
                                    </MenuItem>
                                 </Menu>
                              </MenuButton>
                           </Dropdown>
                           <Dropdown>
                              <MenuButton variant="plain" color="neutral" aria-pressed="false" component="a">
                                 Listados y búsquedas
                                 <Menu placement="bottom-start" size="sm" sx={{ zIndex: '99999', gap: 0, '--ListItem-radius': 'var--joy-radius-sm)', }}>
                                    <MenuItem variant="plain" color="neutral" component="a" href={URI_FRONT.listadoAsignaturasAprobadasUri} size="sm">
                                       Asignaturas aprobadas
                                    </MenuItem>
                                    <MenuItem variant="plain" color="neutral" component="a" href={URI_FRONT.listadoAsignaturasNoAprobadasUri} size="sm">
                                       Pendientes de Aprobación
                                    </MenuItem>
                                    <ListDivider />
                                    <MenuItem variant="plain" color="neutral" component="a" href={URI_FRONT.listadoCarrerasUri} size="sm" sx={{ alignSelf: 'left' }}>
                                       Buscar carreras
                                    </MenuItem>
                                 </Menu>
                              </MenuButton>
                           </Dropdown>
                           <Button variant="plain" color="neutral" component="a" href={URI_FRONT.gestionUri} size="sm" sx={{ alignSelf: 'center' }}>
                              Solicitar escolaridad
                           </Button>
                        </>
                     }
                     {
                        (user.rol === T_ROL.FUNCIONARIO) &&
                        <>
                           <Dropdown>
                              <MenuButton variant="plain" color="neutral" aria-pressed="false" component="a">
                                 Gestión de usuario
                                 <Menu placement="bottom-start" size="sm" sx={{ zIndex: '99999', gap: 0, '--ListItem-radius': 'var--joy-radius-sm)', }}>
                                    <MenuItem variant="plain" color="neutral" component="a" href='/nuevo-docente' size="sm">
                                       Alta de docente
                                    </MenuItem>
                                    <ListDivider />
                                    <MenuItem variant="plain" color="neutral" component="a" href='/validar-estudiantes' size="sm">
                                       Validar acceso estudiante
                                    </MenuItem>
                                    <MenuItem variant="plain" color="neutral" component="a" href='/validar-inscripciones-carrera' size="sm">
                                       Validar inscripción carrera
                                    </MenuItem>
                                 </Menu>
                              </MenuButton>
                           </Dropdown>
                           <Dropdown>
                              <MenuButton variant="plain" color="neutral" aria-pressed="false" component="a">
                                 Asignaturas
                                 <Menu placement="bottom-start" size="sm" sx={{ zIndex: '99999', '--ListItem-radius': 'var--joy-radius-sm)', }}>
                                    <MenuItem variant="plain" color="neutral" component="a" href={URI_FRONT.registrarHorarioAsignaturaUri} size="sm">
                                       Horario de asignatura
                                    </MenuItem>
                                    <MenuItem variant="plain" color="neutral" component="a" href={URI_FRONT.RegistrarAsignaturaPeriodoExamenUri} size="sm">
                                       Fecha de examen
                                    </MenuItem>
                                    <ListDivider />
                                    <MenuItem variant="plain" color="neutral" component="a" href={URI_FRONT.listadoCarrerasUri} size="sm" sx={{ alignSelf: 'left' }}>
                                       Buscar asignaturas
                                    </MenuItem>
                                 </Menu>
                              </MenuButton>
                           </Dropdown>
                           <Dropdown>
                              <MenuButton variant="plain" color="neutral" aria-pressed="false" component="a">
                                 Carreras
                                 <Menu placement="bottom-start" size="sm" sx={{ zIndex: '99999', '--ListItem-radius': 'var--joy-radius-sm)', }}>
                                    <MenuItem variant="plain" color="neutral" component="a" href='/alta-periodo-examen' size="sm" sx={{ alignSelf: 'left' }}>
                                       Alta período de examen
                                    </MenuItem>
                                    <ListDivider />
                                    <MenuItem variant="plain" color="neutral" component="a" href={URI_FRONT.listadoCarrerasUri} size="sm" sx={{ alignSelf: 'left' }}>
                                       Buscar carreras
                                    </MenuItem>
                                 </Menu>
                              </MenuButton>
                           </Dropdown>
                           <Dropdown>
                              <MenuButton variant="plain" color="neutral" aria-pressed="false" component="a">
                                 Calificaciones
                                 <Menu placement="bottom-start" size="sm" sx={{ zIndex: '99999', '--ListItem-radius': 'var--joy-radius-sm)', }}>
                                    <MenuItem variant="plain" color="neutral" component="a" href={URI_FRONT.calificacionesFinCursoUri} size="sm">
                                       Notas fin de curso
                                    </MenuItem>
                                    <MenuItem variant="plain" color="neutral" component="a" href={URI_FRONT.calificacionesExamenUri} size="sm" sx={{ alignSelf: 'left' }}>
                                       Notas de examen
                                    </MenuItem>
                                 </Menu>
                              </MenuButton>
                           </Dropdown>
                           <Dropdown>
                              <MenuButton variant="plain" color="neutral" aria-pressed="false" component="a">
                                 Actas de asignatura
                                 <Menu placement="bottom-start" size="sm" sx={{ zIndex: '99999', '--ListItem-radius': 'var--joy-radius-sm)', }}>
                                    <MenuItem variant="plain" color="neutral" component="a" href={URI_FRONT.generarActaCursoUri} size="sm" sx={{ alignSelf: 'left' }}>
                                       Acta fin de curso
                                    </MenuItem>
                                    <MenuItem variant="plain" color="neutral" component="a" href={URI_FRONT.generarActaExamenUri} size="sm" sx={{ alignSelf: 'left' }}>
                                       Acta de examen
                                    </MenuItem>
                                 </Menu>
                              </MenuButton>
                           </Dropdown>
                        </>
                     }
                     {
                        (user.rol === T_ROL.COORDINADOR) &&
                        <>
                           <Dropdown>
                              <MenuButton variant="plain" color="neutral" aria-pressed="false" component="a">
                                 Asignaturas
                                 <Menu placement="bottom-start" size="sm" sx={{ zIndex: '99999', '--ListItem-radius': 'var--joy-radius-sm)', }}>
                                    <MenuItem variant="plain" color="neutral" component="a" href='/nueva-asignatura' size="sm" sx={{ alignSelf: 'left' }}>
                                       Alta de asignatura
                                    </MenuItem>
                                    <MenuItem variant="plain" color="neutral" component="a" href='/registrar-previaturas' size="sm" sx={{ alignSelf: 'left' }}>
                                       Registrar previas
                                    </MenuItem>
                                    <ListDivider />
                                    <MenuItem variant="plain" color="neutral" component="a" href={URI_FRONT.listadoCarrerasUri} size="sm" sx={{ alignSelf: 'left' }}>
                                       Buscar asignaturas
                                    </MenuItem>
                                 </Menu>
                              </MenuButton>
                           </Dropdown>
                           <Dropdown>
                              <MenuButton variant="plain" color="neutral" aria-pressed="false" component="a" size="sm">
                                 Carreras
                                 <Menu placement="bottom-start" size="sm" sx={{ zIndex: '99999', '--ListItem-radius': 'var--joy-radius-sm)', }}>
                                    <MenuItem variant="plain" color="neutral" component="a" href='/nueva-carrera' size="sm" sx={{ alignSelf: 'left' }}>
                                       Alta de carrera
                                    </MenuItem>
                                    <ListDivider />
                                    <MenuItem variant="plain" color="neutral" component="a" href={URI_FRONT.listadoCarrerasUri} size="sm" sx={{ alignSelf: 'left' }}>
                                       Buscar carreras
                                    </MenuItem>
                                 </Menu>
                              </MenuButton>
                           </Dropdown>
                        </>
                     }
                  </>
                  :
                  <>
                     {/* <Button variant="plain" color="neutral" component="a" href={URI_FRONT.novedadesUri} size="sm" sx={{ alignSelf: 'center' }}>
                        Novedades
                     </Button> */}
                     <Button variant="plain" color="neutral" component="a" href={URI_FRONT.contactoUri} size="sm" sx={{ alignSelf: 'center' }}>
                        {/* <ListItem>
                           <NavMenuButton
                              label="Personal"
                              open={menuIndex === 2}
                              onOpen={() => setMenuIndex(2)}
                              menu={
                                 <Menu onClose={() => setMenuIndex(null)}>
                                 </Menu>
                              }>
                           </NavMenuButton>
                        </ListItem> */}
                        Contacto
                     </Button>
                  </>
               }
            </Stack>

            <Box sx={{ display: { xs: 'inline-flex', sm: 'none' } }}>
               <IconButton onClick={() => setOpen(true)}>
                  <MenuRoundedIcon />
                  <Stack direction="row" justifyContent="center" alignItems="center" textAlign="center" sx={{ display: { xs: 'inline-flex', sm: 'none' } }}>
                     <IconButton size="sm" justifyContent="center" alignItems="center" textAlign="center" sx={{ m: 0.2, display: { xs: 'inline-flex', sm: 'none' }, }}>
                        <DialogTitle>StudyHub</DialogTitle>
                     </IconButton>
                  </Stack>
               </IconButton>
               <Drawer sx={{ display: { xs: 'inline-flex', sm: 'none' } }} open={open} onClose={() => setOpen(false)}>
                  <ModalClose />
                  <Box sx={{ px: 0.5 }}>
                     <Navigation />
                  </Box>
               </Drawer>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'row', gap: 0.6, alignItems: 'center', }} size="sm" >
               <Input size="sm" variant="outlined" placeholder="Buscar…" startDecorator={<SearchRoundedIcon color="primary" />} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  sx={{ alignSelf: 'center', display: { xs: 'none', sm: 'flex', }, }} />
               <ColorSchemeToggle />
               {/* <MenuItem href='/' component="a" size="sw" >
               </MenuItem> */}

               {(user.logged) ?
                  <>
                     <Dropdown size="small">
                        <MenuButton size="small" sx={{ maxWidth: '34px', maxHeight: '34px', borderRadius: '9999999px', marginRight: 0.5, marginLeft: 1 }}>
                           <Avatar variant="plain" color="neutral" src={LogoAvatar} srcSet={LogoAvatar} sx={{ maxWidth: '34px', maxHeight: '34px' }} />
                        </MenuButton>
                        <Menu placement="bottom-end" size="small" sx={{ zIndex: '99999', p: 1, gap: 1, '--ListItem-radius': 'var--joy-radius-sm)', marginLeft: 1 }}>
                           <MenuItem size="small" href={URI_FRONT.editPerfilUri} component="a">
                              <Box sx={{ display: 'flex', alignItems: 'center', }}>
                                 <Avatar variant="plain" color="neutral" src={LogoAvatar} srcSet={LogoAvatar} sx={{ borderRadius: '50%' }} />
                                 <Box sx={{ ml: 1.5 }}>
                                    <Typography level="title-sm" textColor="text.primary">
                                       {user.nombre} {user.apellido}
                                    </Typography>
                                    <Typography level="body-xs" textColor="text.tertiary">
                                       {user.email}
                                    </Typography>
                                 </Box>
                              </Box>
                           </MenuItem>
                           <ListDivider />

                           <MenuItem href={URI_FRONT.editPerfilUri} level="title-sm" textColor="text.primary" component="a">
                              <AccountCircleOutlined sx={{ marginRight: 1, maxWidth: '20px', maxHeight: '20px' }} />
                              Perfil
                           </MenuItem>
                           <MenuItem href={Apk} level="title-sm" textColor="text.primary" component="a">
                              <AdbRoundedIcon sx={{ marginRight: 1, maxWidth: '20px', maxHeight: '20px' }} />
                              Android apk
                           </MenuItem>
                           <ListDivider />
                           <MenuItem href={URI_FRONT.modificarPasswordUri} level="title-sm" textColor="text.primary" component="a">
                              <Key sx={{ marginRight: 1, maxWidth: '20px', maxHeight: '20px' }} />
                              Cambiar contraseña
                           </MenuItem>
                           <MenuItem href={URI_FRONT.homeUri} level="title-sm" textColor="text.primary" onClick={handleLogout}>
                              <LogoutRoundedIcon sx={{ marginRight: 1, maxWidth: '20px', maxHeight: '20px' }} />
                              Cerrar sesión
                           </MenuItem>
                        </Menu>
                     </Dropdown>
                  </>
                  :
                  <>
                     <Stack direction="row" justifyContent="center" alignItems="center" spacing={0} sx={{ display: { xs: 'none', sm: 'flex' } }}>
                        <Button variant="outlined" color="neutral" component="a" href={URI_FRONT.loginUri} size="sm">
                           Iniciar sesión
                        </Button>
                     </Stack>

                     <Stack direction="row" justifyContent="center" alignItems="center" spacing={0} sx={{ display: { xs: 'flex', sm: 'none' } }}>
                        {/* <Button variant="outlined" color="neutral" component="a" href={URI_FRONT.loginUri} size="sm">
                        </Button> */}
                        <IconButton id="toggle-mode" size="sm" variant="outlined" color="primary" component="a" href={URI_FRONT.loginUri} sx={{ alignSelf: 'center' }}>
                           <Person />
                        </IconButton>
                     </Stack>
                  </>
               }
            </Box>

         </Box>
      </CssVarsProvider>
   );
}
