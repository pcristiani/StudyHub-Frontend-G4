import React, { useContext } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext';
import { PublicRoute } from './PublicRoute';

import HomePage from '../pages/HomePage';
import PlanEstudiosPage from "../pages/PlanEstudiosPage";
import InscripcionesPage from "../pages/InscripcionesPage";
import SolicitudesPage from '../pages/SolicitudesPage';
import GestionPage from '../pages/GestionPage';

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


export const AppRouter = () => {
    const { user } = useContext(AuthContext);

    return (
        // <CssVarsProvider disableTransitionOnChange>
        <BrowserRouter>
            <Layout.Header>
                <Header />
            </Layout.Header>

            <Routes>
                <Route path="/" element={<HomePage user={user.id} />} exact />
                <Route path="/plan-estudios" element={<PlanEstudiosPage user={user.id} />} exact />
                <Route path="/inscripciones" element={<InscripcionesPage user={user.id} />} exact />
                <Route path="/solicitudes" element={<SolicitudesPage user={user.id} />} exact />
                <Route path="/gestion" element={<GestionPage user={user.id} />} exact />

                <Route path="/olvido-contrasenia" element={<ForgotPassword user={user.id} />} exact />
                <Route path="/resetPassword" element={<RecuperarPassword user={user.id} />} exact />

                <Route path="/nuestro-equipo" element={<NuestroEquipo user={user.id} />} exact />
                <Route path="/edit-perfil" element={<EditarPerfil user={user.id} />} exact />
                {/* <Route path="/demo" element={<Demo user={user.id} />} exact /> */}

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
        </BrowserRouter>
    )
}
