import React, { useContext } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AuthContext } from '../auth/AuthContext';
import { PublicRoute } from './PublicRoute';

import Home from '../pages/Home';
import Cursos from '../pages/Cursos';
import Panel from "../pages/Panel";
import Inscripcion from "../pages/Inscripcion";

import Login from '../login/Login';
import Register from '../login/Register';

import Footer from '../components/Footer';
import NuestroEquipo from "../components/NuestroEquipo";
import EditarPerfil from "../components/usuario/EditarPerfil";

import ForgotPassword from "../login/ForgotPassword";
import RecuperarPassword from "../login/RecuperarPassword";
import Header from '../components/Header';
import Layout from '../components/Layout';


export const AppRouter = () => {
    const { user } = useContext(AuthContext);

    return (
        // <CssVarsProvider disableTransitionOnChange>
        <BrowserRouter>
            <Layout.Header>
                <Header />
            </Layout.Header>
            {/* <NavBar /> */}

            <Routes>
                <Route path="/" element={<Home user={user.id} />} exact />
                <Route path="/panel" element={<Panel user={user.id} />} exact />
                <Route path="/cursos" element={<Cursos user={user.id} />} exact />
                <Route path="/inscripciones" element={<Inscripcion user={user.id} />} exact />

                <Route path="/olvido-contrasenia" element={<ForgotPassword user={user.id} />} exact />
                <Route path="/resetPassword" element={<RecuperarPassword user={user.id} />} exact />

                <Route path="/nuestro-equipo" element={<NuestroEquipo user={user.id} />} exact />
                <Route path="/edit-perfil" element={<EditarPerfil user={user.id} />} exact />


                <Route path='/login' element={
                    <PublicRoute>
                        <Login />
                    </PublicRoute>
                } />

                <Route path='/registrarte' element={
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
