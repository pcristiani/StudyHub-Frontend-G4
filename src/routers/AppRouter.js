import React, { useContext } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from '../components/Login';
import { PublicRoute } from './PublicRoute';
import { AuthContext } from '../auth/AuthContext';
import Panel from '../pages/Panel';
import Home from '../pages/Home';

// import { Register } from '../components/Register';
import NavBar from "../components/NavBar";

export const AppRouter = () => {

    const { user } = useContext(AuthContext);

    return (
        <BrowserRouter>

            <NavBar />
            <Routes>

                <Route path="/" element={<Home user={user.id} />} exact />
                {/* <Route path="/" element={<Panel />} exact /> */}

                <Route path='/login' element={
                    <PublicRoute>
                        <Login />
                    </PublicRoute>
                } />

                {/* <Route path='/registrarte' element={
                    <PublicRoute>
                         <Register /> 
                    </PublicRoute>
                } /> */}
                {/* 
                <Route path='/logout' element={
                    <PublicRoute>
                        <Login />
                    </PublicRoute>
                } /> */}

            </Routes>
        </BrowserRouter>
    )
}
