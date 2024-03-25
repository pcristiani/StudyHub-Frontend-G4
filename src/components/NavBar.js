import * as React from 'react';
import Logo from '../img/logo-min.png';
import '../assets/dist/css/bootstrap.min.css';
import '../css/style-navbar.css';
import "../assets/dist/js/bootstrap.bundle.min.js";

function NavBar() {
    return (
        <nav class="navbar navbar-expand-lg bg-body-tertiary border-bottom border-body" data-bs-theme="dark">
            <div className="container-fluid">
                <img className="logo-desktop" src={Logo} alt="nav ico" />
                <div className="navbar-brand" href="#">StudyHub</div>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarScroll">
                    <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll">

                        <li className="nav-item">
                            <a className="nav-link" href="/">Home</a>
                        </li>

                        <li className="nav-item">
                            <a className="nav-link" href="/mi-panel">Mi Panel</a>
                        </li>
                        {/* <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="/alumnos" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Alumnos
                            </a>
                            <ul className="dropdown-menu">
                                <li><a className="dropdown-item" href="/ingresar-alumno">Ingresar</a></li>
                                <li><a className="dropdown-item" href="/modificar-alumno">Modificar</a></li>
                                <li>
                                    <hr className="dropdown-divider" />
                                </li>
                                <li>
                                    <a className="dropdown-item" href="/buscar">Buscar</a>
                                </li>
                            </ul>
                        </li> */}
                        <li className="nav-item">
                            <a className="nav-link" aria-disabled="true" href="/cursos">Cursos</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" aria-disabled="true" href="/opciones">Opciones</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" aria-disabled="true" href="/ayuda">Ayuda</a>
                        </li>

                    </ul>
                    <form className="d-flex" role="search">
                        <input className="form-control me-2" type="search" placeholder="Buscar" aria-label="Search" />
                        <button className="btn btn-outline-success" type="submit">
                            Buscar
                        </button>
                    </form>
                </div>
            </div>
        </nav>
    );
}
export default NavBar;
