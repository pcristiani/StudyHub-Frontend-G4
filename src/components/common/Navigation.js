import React, { useContext } from 'react';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemButton from '@mui/joy/ListItemButton';
import Button from '@mui/joy/Button';
import { AuthContext } from '../../context/AuthContext';
import Dropdown from '@mui/joy/Dropdown';
import Menu from '@mui/joy/Menu';
import MenuButton from '@mui/joy/MenuButton';
import { URI_FRONT, T_ROL } from '../../services/util/constants'
// import { URI_FRONT, T_ROL } from '../../services/util/constants';

import Box from '@mui/joy/Box';
import Logo from '../../img/logo-text.png';
import Input from '@mui/joy/Input';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';

import { types } from '../../context/types';
import { useNavigate } from 'react-router-dom'


export default function Navigation() {
	const { user, dispatch } = useContext(AuthContext);
	const navigate = useNavigate();
	const idA = 'a';
	const idM = 'm';
	const idL = 'l';

	const handleLogout = () => {
		dispatch({ type: types.logout });
		navigate('/login', {
			replace: true
		});
	}

	return (
		<>
			<List size="sm" sx={{ '--ListItem-radius': '8px', '--List-gap': '0px' }}>
				<ListItem nested>
					<List aria-labelledby="nav-list-browse">
						{(user.logged) && (user.rol) ?
							<>
								{(user.rol === T_ROL.ADMIN) &&
									<>
										<Dropdown>
											<ListItemButton>
												<img className="logo-navbar-mobile" src={Logo} alt="ico" />
											</ListItemButton>

											<ListItemButton>
												<MenuButton variant="plain" color="neutral" component="a" size="sw">
													Administración de usuarios
													<Menu placement="bottom-start" size="sm" sx={{ zIndex: '99999', gap: 0, '--ListItem-radius': 'var--joy-radius-sm)', }}>
														<ListItemButton>
															<Button variant="plain" color="neutral" component="a" href={`/alta-funcionario-coordinador`} size="sw" sx={{ alignSelf: 'left' }}>
																Alta de usuario
															</Button>
														</ListItemButton>

														<ListItemButton>
															<Button variant="plain" color="neutral" component="a" href={`/dashboard-admin?id=${idM}`} size="sw" sx={{ alignSelf: 'left' }}>
																Modificar/Baja usuarios
															</Button>
														</ListItemButton>
													</Menu>
												</MenuButton>
											</ListItemButton>

										</Dropdown>
										<ListItemButton>
											<Button variant="plain" color="neutral" component="a" href={`/dashboard-admin?id=${idA}`} size="sw" sx={{ alignSelf: 'left' }}>
												Asignar coordinador
											</Button>
										</ListItemButton>
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
									(user.rol === T_ROL.ESTUDIANTE) &&
									<>
										<ListItemButton>
											<img className="logo-navbar-mobile" src={Logo} alt="ico" />
										</ListItemButton>
										<Button variant="plain" color="neutral" component="a" href={URI_FRONT.planEstudiosUri} size="sw" sx={{ alignSelf: 'left' }}>
										</Button>
										<ListItemButton>
											<Button variant="plain" color="neutral" component="a" href={URI_FRONT.planEstudiosUri} size="sw" sx={{ alignSelf: 'left' }}>
												Plan de Estudios
											</Button>
										</ListItemButton>

										<Dropdown>
											<ListItemButton>
												<MenuButton variant="plain" size="sw" component="a" color="neutral" sx={{ alignSelf: 'left' }}>
													Inscripciones
													<Menu placement="bottom-start" size="sm" sx={{ zIndex: '99999', gap: 0, '--ListItem-radius': 'var--joy-radius-sm)', alignSelf: 'left' }}>
														<ListItemButton>
															<Button variant="plain" color="neutral" component="a" href='./inscripcion-carrera' size="sw" sx={{ alignSelf: 'left' }}>
																Carrera
															</Button>
														</ListItemButton>

														<ListItemButton>
															<Button variant="plain" color="neutral" component="a" href='/inscripcion-asignatura' size="sw" sx={{ alignSelf: 'left' }}>
																Asignatura
															</Button>
														</ListItemButton>

														<ListItemButton>
															<Button variant="plain" color="neutral" component="a" href='/not-found' size="sw" sx={{ alignSelf: 'left' }}>
																Examen
															</Button>
														</ListItemButton>
													</Menu>
												</MenuButton>
											</ListItemButton>
										</Dropdown>

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
								}{
									(user.rol === T_ROL.FUNCIONARIO) &&
									<>
										<ListItemButton>
											<img className="logo-navbar-mobile" src={Logo} alt="ico" />
											<Button variant="plain" color="neutral" component="a" href={URI_FRONT.planEstudiosUri} size="sw" sx={{ alignSelf: 'left' }}>
											</Button>
										</ListItemButton>
										<Dropdown>
											<ListItemButton>
												<MenuButton variant="plain" size="sw" component="a" color="neutral" sx={{ alignSelf: 'left' }}>
													Administración de usuarios
													<Menu placement="bottom-start" size="sm" sx={{ zIndex: '99999', gap: 0, '--ListItem-radius': 'var--joy-radius-sm)', alignSelf: 'left' }}>
														<ListItemButton>
															<Button variant="plain" color="neutral" component="a" href='/nuevo-docente' size="sw" sx={{ alignSelf: 'left' }}>
																Alta docente
															</Button>
														</ListItemButton>

														<ListItemButton>
															<Button variant="plain" color="neutral" component="a" href='/validar-estudiantes' size="sw" sx={{ alignSelf: 'left' }}>
																Validar estudiante
															</Button>
														</ListItemButton>

														<ListItemButton>
															<Button variant="plain" color="neutral" component="a" href='/validar-inscripciones-carrera' size="sw" sx={{ alignSelf: 'left' }}>
																Validar inscripciónes a carrera
															</Button>
														</ListItemButton>
													</Menu>
												</MenuButton>
											</ListItemButton>
										</Dropdown>
										<Dropdown>
											<ListItemButton>
												<MenuButton variant="plain" size="sw" component="a" color="neutral" sx={{ alignSelf: 'left' }}>
													Registros
													<Menu placement="bottom-start" size="sm" sx={{ zIndex: '99999', gap: 0, '--ListItem-radius': 'var--joy-radius-sm)', alignSelf: 'left' }}>
														<ListItemButton>
															<Button variant="plain" color="neutral" component="a" href={URI_FRONT.registrarHorarioAsignaturaUri} size="sw" sx={{ alignSelf: 'left' }}>
																Horario de asignatura
															</Button>
														</ListItemButton>

														<ListItemButton>
															<Button variant="plain" color="neutral" component="a" href='/alta-periodo-examen' size="sw" sx={{ alignSelf: 'left' }}>
																Período de examen
															</Button>
														</ListItemButton>

														<ListItemButton>
															<Button variant="plain" color="neutral" component="a" href={URI_FRONT.RegistrarAsignaturaPeriodoExamenUri} size="sw" sx={{ alignSelf: 'left' }}>
																Fecha de examen
															</Button>
														</ListItemButton>
													</Menu>
												</MenuButton>
											</ListItemButton>
										</Dropdown>
										<Dropdown>
											<ListItemButton>
												<MenuButton variant="plain" size="sw" component="a" color="neutral" sx={{ alignSelf: 'left' }}>
													Calificaciones
													<Menu placement="bottom-start" size="sm" sx={{ zIndex: '99999', gap: 0, '--ListItem-radius': 'var--joy-radius-sm)', alignSelf: 'left' }}>
														<ListItemButton>
															<Button variant="plain" color="neutral" component="a" href='/not-found' size="sw" sx={{ alignSelf: 'left' }}>
																Registro calificaciones fin de curso
															</Button>
														</ListItemButton>

														<ListItemButton>
															<Button variant="plain" color="neutral" component="a" href='/not-found' size="sw" sx={{ alignSelf: 'left' }}>
																Registro calificaciones examen
															</Button>
														</ListItemButton>

														<ListItemButton>
															<Button variant="plain" color="neutral" component="a" href='/not-found' size="sw" sx={{ alignSelf: 'left' }}>
																Generación de actas
															</Button>
														</ListItemButton>
													</Menu>
												</MenuButton>
											</ListItemButton>
										</Dropdown>
										<Dropdown>
											<ListItemButton>
												<MenuButton variant="plain" size="sw" component="a" color="neutral" sx={{ alignSelf: 'left' }}>
													Listados y búsquedas
													<Menu placement="bottom-start" size="sm" sx={{ zIndex: '99999', gap: 0, '--ListItem-radius': 'var--joy-radius-sm)', alignSelf: 'left' }}>
														<ListItemButton>
															<Button variant="plain" color="neutral" component="a" href='/not-found' size="sw" sx={{ alignSelf: 'left' }}>
																Carreras
															</Button>
														</ListItemButton>

														<ListItemButton>
															<Button variant="plain" color="neutral" component="a" href='/not-found' size="sw" sx={{ alignSelf: 'left' }}>
																Asignaturas
															</Button>
														</ListItemButton>
													</Menu>
												</MenuButton>
											</ListItemButton>
										</Dropdown>
									</>
								}
							</>
							:
							<>
								<ListItemButton>
									<img className="logo-navbar-mobile" src={Logo} alt="ico" />

									<Button variant="plain" color="neutral" component="a" href={URI_FRONT.planEstudiosUri} size="sw" sx={{ alignSelf: 'left' }}>
									</Button>
								</ListItemButton>
								<ListItemButton>
									<Button variant="plain" color="neutral" component="a" href={URI_FRONT.novedadesUri} size="sw" sx={{ alignSelf: 'left' }}>
										Novedades
									</Button>
								</ListItemButton>
								{/* <ListItemButton> */}
								{/* <Button variant="plain" color="neutral" component="a" href={URI_FRONT.preguntasFrecuentesUri} size="sw" sx={{ alignSelf: 'left' }}>
                                        Preguntas frecuentas
                                    </Button> 
								</ListItemButton>*/}
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
							sx={{ alignSelf: 'center', display: { xs: 'none', sm: 'none', }, }} />
					</Box>
				</ListItem>
			</List>
		</>
	);
}
