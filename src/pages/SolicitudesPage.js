/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { getUsuarios } from '../services/requests/usuarioService';

import Typography from '@mui/joy/Typography';
import { CssVarsProvider } from '@mui/joy/styles';
import Container from '@mui/joy/Container';
import Box from '@mui/joy/Box';
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { useEffect, useMemo, useState } from "react";

const SolicitudesPage = () => {
  const { user } = useContext(AuthContext); // Obtengo la informacion de logueo
  console.log("IdUser : ", user.id);

  // useEffect(() => {
  //   getUsuarios(user.id).then(result => {
  //     console.log("Datos Usuario: ", result);
  //   });
  // }, []);

  // useEffect(() => {
  //   getToken('11', '123').then(result => {
  //     console.log("JWT: ", result);
  //   });
  // }, []);



  return (

    <Particles
      id="tsparticles"
    // particlesLoaded={particlesLoaded}
    // options={options}
    />

  );
}

export default SolicitudesPage;
