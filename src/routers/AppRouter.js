import React, { useContext } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext';
import { PublicRoute } from './PublicRoute';

import HomePage from '../pages/HomePage';
import PlanEstudiosPage from "../pages/PlanEstudiosPage";
import InscripcionesPage from "../pages/InscripcionesPage";
import SolicitudesPage from '../pages/SolicitudesPage';
import GestionPage from '../pages/GestionPage';
import Novedades from '../pages/Novedades';
import Page404 from '../pages/Page404';
import ContactoPage from '../pages/ContactoPage';

import Login from '../components/login/Login';
import Register from '../components/login/Register';
import ForgotPassword from "../components/login/ForgotPassword";
import RecuperarPassword from "../components/login/RecuperarPassword";
import ModificarPassword from '../components/login/ModificarPassword';

import Footer from '../components/common/Footer';
import NuestroEquipo from "../components/common/NuestroEquipo";
import Header from '../components/common/Header';
import Layout from '../components/common/Layout';
import EditarPerfil from "../components/common/EditarPerfil";
// import Demo from '../pages/Demo';

import AltaCarrera from '../components/usuario/coordinador/AltaCarrera'
import AltaAsignatura from '../components/usuario/coordinador/AltaAsignatura'
import RegistrarPreviaturas from '../components/usuario/coordinador/RegistrarPreviaturas';

import DashboardAdmin from '../components/usuario/administrador/DashboardAdmin';
import AltaFuncionarioCoordinador from '../components/usuario/administrador/AltaFuncionarioCoordinador';
import ModificarFuncionarioCoordinador from '../components/usuario/administrador/ModificarFuncionarioCoordinador';
import ListadosBusquedas from '../components/usuario/administrador/ListadosBusquedas';
import { ResumenActividad } from '../components/usuario/administrador/ResumenActividad';

import InscripcionCarrera from '../components/usuario/estudiante/InscripcionCarrera';
import InscripcionAsignatura from '../components/usuario/estudiante/InscripcionAsignatura';
import InscripcionExamen from '../components/usuario/estudiante/InscripcionExamen';

import AltaDocente from '../components/usuario/funcionario/AltaDocente';
import ValidarEstudiantes from "../components/usuario/funcionario/ValidarEstudiantes";
import ValidarInscripcionesCarrera from '../components/usuario/funcionario/ValidarInscripcionesCarrera';
import RegistrarAsignaturaPeriodoExamen from '../components/usuario/funcionario/RegistrarAsignaturaPeriodoExamen';
import TablaInscripcionesCarrera from '../components/usuario/funcionario/TablaInscripcionesCarrera';
import RegistrarHorarioAsignatura from '../components/usuario/funcionario/RegistrarHorarioAsignatura';
import CalificacionesFinCurso from '../components/usuario/funcionario/CalificacionesFinCurso';
import CalificacionesExamen from '../components/usuario/funcionario/CalificacionesExamen';
import AltaPeriodoExamen from '../components/usuario/funcionario/AltaPeriodoExamen';

import ListadoCarreras from '../components/busqueda/ListadoCarreras';
import ListadoAsignaturas from '../components/busqueda/ListadoAsignaturas.js';
import ListadoAsignaturasAprobadas from '../components/busqueda/ListadoAsignaturasAprobadas';
import ListadoAsignaturasNoAprobadas from '../components/busqueda/ListadoAsignaturasNoAprobadas';
import InfoUsuario from '../components/common/InfoUsuario.js';
import InfoCarreras from '../components/busqueda/InfoCarreras.js';



export const AppRouter = () => {
    const { user } = useContext(AuthContext);

    return (
        <BrowserRouter>
            <Layout.Header>
                <Header />
            </Layout.Header>
            <Layout.Main>

                <Routes>
                    <Route path="/" element={<Novedades />} exact />
                    <Route path="/plan-estudios" element={<PlanEstudiosPage user={user.id} />} exact />
                    <Route path="/inscripciones" element={<InscripcionesPage user={user.id} />} exact />
                    <Route path="/solicitudes" element={<SolicitudesPage user={user.id} />} exact />
                    <Route path="/gestion" element={<GestionPage user={user.id} />} exact />
                    <Route path="/novedades" element={<Novedades user={user.id} />} exact />

                    <Route path="/olvido-contrasenia" element={<ForgotPassword user={user.id} />} exact />
                    <Route path="/resetPassword" element={<RecuperarPassword user={user.id} />} exact />

                    <Route path="/nuestro-equipo" element={<NuestroEquipo user={user.id} />} exact />
                    <Route path="/edit-perfil" element={<EditarPerfil user={user.id} />} exact />
                    <Route path="/info-usuario" element={<InfoUsuario user={user.id} />} exact />

                    <Route path="/not-found" element={<Page404 user={user.id} />} exact />
                    <Route path="/nueva-carrera" element={<AltaCarrera user={user.id} />} exact />
                    <Route path="/nuevo-docente" element={<AltaDocente user={user.id} />} exact />
                    <Route path="/nueva-asignatura" element={<AltaAsignatura user={user.id} />} exact />

                    <Route path="/validar-estudiantes" element={<ValidarEstudiantes user={user.id} />} exact />
                    <Route path="/dashboard-admin" element={<DashboardAdmin user={user.id} />} exact />
                    <Route path="/modificar-password" element={<ModificarPassword user={user.id} />} />
                    <Route path="/alta-funcionario-coordinador" element={<AltaFuncionarioCoordinador user={user.id} />} exact />
                    <Route path="/modificar-funcionario-coordinador" element={<ModificarFuncionarioCoordinador user={user.id} />} exact />
                    <Route path="/listados-busquedas" element={<ListadosBusquedas user={user.id} />} exact />
                    <Route path="/resumen-actividad" element={<ResumenActividad user={user.id} />} exact />
                    <Route path="/contacto" element={<ContactoPage user={user.id} />} exact />

                    <Route path="/inscripcion-carrera" element={<InscripcionCarrera user={user.id} />} exact />
                    <Route path="/inscripcion-asignatura" element={<InscripcionAsignatura />} exact />
                    <Route path="/inscripcion-examen" element={<InscripcionExamen />} exact />

                    <Route path="/validar-inscripciones-carrera" element={<ValidarInscripcionesCarrera user={user.id} />} exact />
                    <Route path="/tabla-inscripciones-carrera" element={<TablaInscripcionesCarrera user={user.id} />} exact />
                    <Route path="/alta-periodo-examen" element={<AltaPeriodoExamen user={user.id} />} exact />

                    <Route path="/registrar-previaturas" element={<RegistrarPreviaturas user={user.id} />} exact />
                    <Route path="/registrar-horario-asignatura" element={<RegistrarHorarioAsignatura user={user.id} />} exact />
                    <Route path="/registrar-asignatura-periodo-examen" element={<RegistrarAsignaturaPeriodoExamen user={user.id} />} exact />

                    <Route path='/incripcion-examen' element={<InscripcionExamen user={user.id} />} exact />
                    <Route path='/calificaciones-fin-curso' element={<CalificacionesFinCurso user={user.id} />} exact />
                    <Route path='/calificaciones-examen' element={<CalificacionesExamen user={user.id} />} exact />

                    <Route path='/listado-carreras' element={<ListadoCarreras user={user.id} />} exact />
                    <Route path='/listado-asignaturas' element={<ListadoAsignaturas user={user.id} />} exact />
                    <Route path='/listado-asignaturas-aprobadas' element={<ListadoAsignaturasAprobadas user={user.id} />} exact />
                    <Route path='/listado-asignaturas-no-aprobadas' element={<ListadoAsignaturasNoAprobadas user={user.id} />} exact />
                    <Route path='/info-carrera' element={<InfoCarreras user={user.id} />} exact />



                    <Route path='/login' element={
                        <PublicRoute>
                            <Login />
                        </PublicRoute>
                    } />

                    <Route path='/registrarse' element={
                        <PublicRoute>
                            <Register />
                        </PublicRoute>
                    } />

                    <Route path='/logout' element={
                        <PublicRoute>
                            <Login />
                        </PublicRoute>
                    } />
                </Routes>

                <Footer />
            </Layout.Main >

        </BrowserRouter>
    )
}
