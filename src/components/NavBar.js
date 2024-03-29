import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Logo from '../img/logo-min.png';
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../auth/AuthContext';
import React, { useContext } from 'react'
import { types } from '../auth/types';
// import '../css/style-navbar.css';
import '../css/bootstrap.min.css';


function NavBar() {
    const { user, dispatch } = useContext(AuthContext);
    // user.name = 'Sebastián';

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
                <img className="logo-desktop" src={Logo} alt="nav ico" />

                <Navbar.Brand href="#" className="navbar-brand text-info">StudyHub</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '250px' }} navbarScroll>

                        <Nav.Link className="nav-link" href="/">Inicio</Nav.Link>
                        <li className="nav-item">
                            <a className="nav-link" href="/panel">Mi Panel</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" aria-disabled="true" href="/cursos">Cursos</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" aria-disabled="true" href="/inscripciones">Inscripciones</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" aria-disabled="true" href="/ayuda">Ayuda</a>
                        </li>
                        {/* <NavDropdown title="Link" id="navbarScrollingDropdown">
                            <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action5">user</NavDropdown.Item>
                        </NavDropdown> */}
                    </Nav>
                    {/* <Form className="d-flex">
                        <Form.Control type="search" placeholder="Buscar" className="me-2" aria-label="Search" />
                        <Button variant="outline-success">Buscar</Button></Form> */}
                    <div className="navInformation">
                        <ul className="navbar-nav ml-auto">
                            {(user.logged) ?
                                <>
                                    <span className="nav-item nav-link text-info">
                                        {user.name}
                                    </span>
                                    <li className="nav-item">
                                        <Link className="nav-link" to='./' onClick={handleLogout}>Logout</Link>
                                    </li>
                                </>
                                :
                                <>
                                    <li className="nav-item">
                                        <a className="nav-link" href='./login'>Login</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href='./registrarte'>Registrarse</a>
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