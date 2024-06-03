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
import AltaCarrera from '../components/usuario/coordinador/AltaCarrera'
import AltaAsignatura from '../components/usuario/coordinador/AltaAsignatura'

import Login from '../components/login/Login';
import Register from '../components/login/Register';
import ForgotPassword from "../components/login/ForgotPassword";
import RecuperarPassword from "../components/login/RecuperarPassword";

import Footer from '../components/common/Footer';
import NuestroEquipo from "../components/common/NuestroEquipo";
import Header from '../components/common/Header';
import Layout from '../components/common/Layout';
// import Demo from '../pages/Demo';

import EditarPerfil from "../components/usuario/EditarPerfil";

import ValidarEstudiantes from "../components/usuario/funcionario/ValidarEstudiantes";
import DashboardAdmin from '../components/usuario/administrador/DashboardAdmin';
import ModificarPassword from '../components/login/ModificarPassword';
import AltaDocente from '../components/usuario/funcionario/AltaDocente';
import AltaFuncionarioCoordinador from '../components/usuario/administrador/AltaFuncionarioCoordinador';
import ContactoPage from '../pages/ContactoPage';
import ModificarFuncionarioCoordinador from '../components/usuario/administrador/ModificarFuncionarioCoordinador';
import ListadosBusquedas from '../components/usuario/administrador/ListadosBusquedas';
import { ResumenActividad } from '../components/usuario/administrador/ResumenActividad';
import InscripcionCarrera from '../components/usuario/estudiante/InscripcionCarrera';
import InscripcionAsignatura from '../components/usuario/estudiante/InscripcionAsignatura';
import ValidarInscripcionesCarrera from '../components/usuario/funcionario/ValidarInscripcionesCarrera';
import TablaInscripcionesCarrera from '../components/usuario/funcionario/TablaInscripcionesCarrera';
import AltaPeriodoExamen from '../components/usuario/funcionario/AltaPeriodoExamen';
import RegistrarPreviaturas from '../components/usuario/coordinador/RegistrarPreviaturas';
import RegistrarHorarioAsignatura from '../components/usuario/funcionario/RegistrarHorarioAsignatura';
import RegistrarAsignaturaPeriodoExamen from '../components/usuario/funcionario/RegistrarAsignaturaPeriodoExamen';

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
                    <Route path="/validar-inscripciones-carrera" element={<ValidarInscripcionesCarrera user={user.id} />} exact />

                    <Route path="/tabla-inscripciones-carrera" element={<TablaInscripcionesCarrera user={user.id} />} exact />
                    <Route path="/alta-periodo-examen" element={<AltaPeriodoExamen user={user.id} />} exact />
                    <Route path="/registrar-previaturas" element={<RegistrarPreviaturas user={user.id} />} exact />
                    <Route path="/registrar-horario-asignatura" element={<RegistrarHorarioAsignatura user={user.id} />} exact />
                    <Route path="/registrar-asignatura-periodo-examen" element={<RegistrarAsignaturaPeriodoExamen user={user.id} />} exact />



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
