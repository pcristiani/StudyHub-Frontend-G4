import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../auth/AuthContext';
import Container from 'react-bootstrap/Container';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

import Logo from '../img/logo-min.png';
import { types } from '../auth/types';
// import '../css/bootstrap.min.css';
import '../css/style-navbar.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { URI_PAGES } from '../util/constants'


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
                <Link className="nav-link" to='./'>
                    <img className="logo-desktop" src={Logo} alt="nav ico" />
                </Link>

                <Navbar.Brand href={URI_PAGES.homeUri} className="navbar-brand text-info">StudyHub</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '250px' }} navbarScroll>
                        <Nav.Link className="nav-link" href={URI_PAGES.homeUri}>Inicio</Nav.Link>
                        {
                            (user.logged) &&
                            <>
                                <li className="nav-item">
                                    <a className="nav-link" href={URI_PAGES.panelUri}>Mi Panel</a>
                                </li>

                                <li className="nav-item">
                                    <a className="nav-link" aria-disabled="true" href={URI_PAGES.cursosUri}>Cursos</a>
                                </li>

                                <li className="nav-item">
                                    <a className="nav-link" aria-disabled="true" href={URI_PAGES.inscripcionUri}>Inscripciones</a>
                                </li>
                            </>
                        }
                        <li className="nav-item">
                            <a className="nav-link" aria-disabled="true" href={URI_PAGES.ayudaUri} >Ayuda</a>
                        </li>
                    </Nav>

                    <div className="navInformation">
                        <ul className="navbar-nav ml-auto">
                            {(user.logged) ?
                                <>
                                    <NavDropdown title={user.name + ' ' + user.surname} id="navbarScrollingDropdown">
                                        <NavDropdown.Item href="#edit-perfil">Editar perfil</NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item href="./" onClick={handleLogout}>Cerrar sesion</NavDropdown.Item>
                                    </NavDropdown>
                                    {/* <li className="nav-item">
                                        <Link className="nav-link" to='./' onClick={handleLogout}>Logout</Link>
                                    </li> */}
                                </>
                                :
                                <>
                                    <li className="nav-item">
                                        <a className="nav-link" href='./login'>Login</a>
                                    </li>
                                </>
                            }
                        </ul>
                    </div>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBar;
