import React, { useContext } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext';
import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';

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
import InfoAsignaturas from '../components/busqueda/InfoAsignaturas';
import GenerarActaExamen from '../components/usuario/funcionario/GenerarActaExamen';
import GenerarActaFinDeCurso from '../components/usuario/funcionario/GenerarActaFinDeCurso.js';

export const AppRouter = () => {
    const { user } = useContext(AuthContext);
    return (
        <BrowserRouter>
            <Layout.Header><Header /></Layout.Header>

            <Layout.Main>
                <Routes>
                    <Route path="/plan-estudios" element={<PrivateRoute><PlanEstudiosPage user={user.id} /></PrivateRoute>} exact />
                    <Route path="/inscripciones" element={<PrivateRoute><InscripcionesPage user={user.id} /></PrivateRoute>} exact />
                    <Route path="/solicitudes" element={<PrivateRoute><SolicitudesPage user={user.id} /></PrivateRoute>} exact />
                    <Route path="/gestion" element={<PrivateRoute><GestionPage user={user.id} /></PrivateRoute>} />

                    <Route path="/edit-perfil" element={<PrivateRoute><EditarPerfil user={user.id} /></PrivateRoute>} exact />
                    <Route path="/info-usuario" element={<PrivateRoute><InfoUsuario user={user.id} /></PrivateRoute>} exact />

                    <Route path="/nueva-carrera" element={<PrivateRoute><AltaCarrera user={user.id} /></PrivateRoute>} exact />
                    <Route path="/nuevo-docente" element={<PrivateRoute><AltaDocente user={user.id} /></PrivateRoute>} exact />
                    <Route path="/nueva-asignatura" element={<PrivateRoute><AltaAsignatura user={user.id} /></PrivateRoute>} exact />

                    <Route path="/validar-estudiantes" element={<PrivateRoute><ValidarEstudiantes user={user.id} /></PrivateRoute>} exact />
                    <Route path="/dashboard-admin" element={<PrivateRoute><DashboardAdmin user={user.id} /></PrivateRoute>} exact />
                    <Route path="/modificar-password" element={<PrivateRoute><ModificarPassword user={user.id} /></PrivateRoute>} />
                    <Route path="/alta-funcionario-coordinador" element={<PrivateRoute><AltaFuncionarioCoordinador user={user.id} /></PrivateRoute>} exact />
                    <Route path="/modificar-funcionario-coordinador" element={<PrivateRoute><ModificarFuncionarioCoordinador user={user.id} /></PrivateRoute>} exact />
                    <Route path="/listados-busquedas" element={<PrivateRoute><ListadosBusquedas user={user.id} /></PrivateRoute>} exact />
                    <Route path="/resumen-actividad" element={<PrivateRoute><ResumenActividad user={user.id} /></PrivateRoute>} exact />

                    <Route path="/inscripcion-carrera" element={<PrivateRoute><InscripcionCarrera user={user.id} /></PrivateRoute>} exact />
                    <Route path="/inscripcion-asignatura" element={<PrivateRoute><InscripcionAsignatura /></PrivateRoute>} exact />
                    <Route path="/inscripcion-examen" element={<PrivateRoute><InscripcionExamen /></PrivateRoute>} exact />

                    <Route path="/validar-inscripciones-carrera" element={<PrivateRoute><ValidarInscripcionesCarrera user={user.id} /></PrivateRoute>} exact />
                    <Route path="/tabla-inscripciones-carrera" element={<PrivateRoute><TablaInscripcionesCarrera user={user.id} /></PrivateRoute>} exact />
                    <Route path="/alta-periodo-examen" element={<PrivateRoute><AltaPeriodoExamen user={user.id} /></PrivateRoute>} exact />

                    <Route path="/registrar-previaturas" element={<PrivateRoute><RegistrarPreviaturas user={user.id} /></PrivateRoute>} exact />
                    <Route path="/registrar-horario-asignatura" element={<PrivateRoute><RegistrarHorarioAsignatura user={user.id} /></PrivateRoute>} exact />
                    <Route path="/registrar-asignatura-periodo-examen" element={<PrivateRoute><RegistrarAsignaturaPeriodoExamen user={user.id} /></PrivateRoute>} exact />

                    <Route path='/incripcion-examen' element={<PrivateRoute><InscripcionExamen user={user.id} /></PrivateRoute>} exact />
                    <Route path='/calificaciones-fin-curso' element={<PrivateRoute><CalificacionesFinCurso user={user.id} /></PrivateRoute>} exact />
                    <Route path='/calificaciones-examen' element={<PrivateRoute><CalificacionesExamen user={user.id} /></PrivateRoute>} exact />
                    <Route path='/generar-acta-examen' element={<PrivateRoute><GenerarActaExamen user={user.id} /></PrivateRoute>} exact />
                    <Route path='/generar-acta-curso' element={<PrivateRoute><GenerarActaFinDeCurso user={user.id} /></PrivateRoute>} exact />

                    <Route path='/listado-carreras' element={<PrivateRoute><ListadoCarreras user={user.id} /></PrivateRoute>} exact />
                    <Route path='/listado-asignaturas' element={<PrivateRoute><ListadoAsignaturas user={user.id} /></PrivateRoute>} exact />
                    <Route path='/listado-asignaturas-aprobadas' element={<PrivateRoute><ListadoAsignaturasAprobadas user={user.id} /></PrivateRoute>} exact />
                    <Route path='/listado-asignaturas-no-aprobadas' element={<PrivateRoute><ListadoAsignaturasNoAprobadas user={user.id} /></PrivateRoute>} exact />
                    <Route path='/info-carrera' element={<PrivateRoute><InfoCarreras user={user.id} /></PrivateRoute>} exact />
                    <Route path='/info-asignatura' element={<PrivateRoute><InfoAsignaturas user={user.id} /></PrivateRoute>} exact />

                    <Route exact path='/login' element={<PublicRoute><Login /></PublicRoute>} />
                    <Route path='/registrarse' element={<PublicRoute><Register /></PublicRoute>} />
                    <Route path='/logout' element={<PublicRoute><Login /></PublicRoute>} />

                    <Route path="/olvido-contrasenia" element={<ForgotPassword user={user.id} />} exact />
                    <Route path="/resetPassword" element={<RecuperarPassword user={user.id} />} exact />

                    <Route path="/novedades" element={<Novedades user={user.id} />} exact />
                    <Route path="/" element={<HomePage user={user.id} />} exact />
                    <Route path="/not-found" element={<Page404 user={user.id} />} exact />
                    <Route path="/contacto" element={<ContactoPage user={user.id} />} exact />
                    <Route path="/nuestro-equipo" element={<NuestroEquipo user={user.id} />} exact />
                </Routes>
                
                <Footer />
            </Layout.Main >

        </BrowserRouter>
    )
}
