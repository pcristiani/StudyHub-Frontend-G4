import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../auth/AuthContext';
import Container from 'react-bootstrap/Container';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Typography from '@mui/material/Typography';

import Logo from '../img/logo.png';
import { types } from '../auth/types';
// import '../css/bootstrap.min.css';
import '../css/style-navbar.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { URI_FRONT, TIPO_ROL } from '../util/constants'

function NavBar() {
    const { user, dispatch } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch({ type: types.logout });
        navigate('/login', {
            replace: true
        });
    }

    return (
        <Navbar expand="lg" className="bg-body-tertiary" data-bs-theme="dark">
            <Container fluid>
                <Link className="nav-link" to={URI_FRONT.homeUri}>
                    <img className="logo-desktop" src={Logo} alt="nav ico" />
                </Link>
                <Typography variant="body2" color="text.secondary" mt={0.2}>
                    <Link href={URI_FRONT.homeUri} className="text-studyhub">StudyHub</Link>
                </Typography>
                {/* <Navbar.Brand href={URI_FRONT.homeUri} className="navbar-brand2 text-info">StudyHub</Navbar.Brand> */}
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '250px' }} navbarScroll>
                        {(user.logged) && (user.rol) ?
                            <>
                                {/* <Nav.Link className="nav-link" href={URI_FRONT.homeUri}>Inicio</Nav.Link> */}
                                {(user.rol === TIPO_ROL.ADMIN) &&
                                    <>
                                        <NavDropdown className="nav-item" title="Usuarios" id="Dropdown">
                                            <NavDropdown.Item href="/alta-estudiante">Nuevo</NavDropdown.Item>
                                            <NavDropdown.Item href="/modificar-estudiante">Modificar</NavDropdown.Item>
                                            <NavDropdown.Item href="/baja-estudiante">Eliminar</NavDropdown.Item>
                                        </NavDropdown>

                                        <li className="nav-item">
                                            <Link className="nav-link" href='./listados-busquedas'>Listados y busquedas</Link>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href='./resumen-actividad' >Resumen de actividad</a>
                                        </li>
                                    </>
                                }
                                {
                                    (user.rol === TIPO_ROL.ESTUDIANTE) &&
                                    <>
                                        <li className="nav-item">
                                            <a className="nav-link" href={URI_FRONT.panelUri}>Mi Panel</a>
                                        </li>

                                        <li className="nav-item">
                                            <a className="nav-link" href={URI_FRONT.cursosUri}>Cursos</a>
                                        </li>

                                        <li className="nav-item">
                                            <a className="nav-link" href={URI_FRONT.inscripcionUri}>Inscripciones</a>
                                        </li>
                                    </>
                                }
                            </>
                            :
                            <>
                                <li className="nav-item">
                                    <a className="nav-link" href={URI_FRONT.novedadesUri}>Novedades</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href={URI_FRONT.preguntasFrecuentesUri}>Preguntas frecuentas</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href={URI_FRONT.contactoUri}>Contacto</a>
                                </li>
                            </>
                        }
                    </Nav>

                    <div className="navInformation">
                        <ul className="navbar-nav ml-auto">
                            {(user.logged) ?
                                <>
                                    <NavDropdown title={user.name + ' ' + user.surname} id="navbarScrollingDropdown">
                                        <NavDropdown.Item href={URI_FRONT.editPerfilUri}>Perfil</NavDropdown.Item>
                                        <NavDropdown.Item href={URI_FRONT.editPerfilUri}>Preferencias</NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item href={URI_FRONT.homeUri} onClick={handleLogout}>Cerrar sesión</NavDropdown.Item>
                                    </NavDropdown>
                                    {/* <li className="nav-item">
                                        <Link className="nav-link" to='./' onClick={handleLogout}>Logout</Link>
                                    </li> */}
                                </>
                                :
                                <li className="nav-item">
                                    <a className="nav-link" href={URI_FRONT.loginUri}>Iniciar sesión</a>
                                </li>
                            }
                        </ul>
                    </div>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBar;
