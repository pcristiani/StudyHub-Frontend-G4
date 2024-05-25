import React, { useState, useEffect } from 'react';
import { URL_BACK, PARAMETERS } from '../util/constants'
import swal from 'sweetalert';


export const getCarreras = async (jwtLogin) => {
    const url = URL_BACK.getCarreras;

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwtLogin}`
    }

    const resp = await fetch(url, {
        method: "GET",
        headers: headers
    });

    const data = await resp.json(); // Convertir la respuesta a JSON
    console.log("carreras",data.body); // Imprimir el cuerpo de la respuesta en la consola

    return data.body; // Devolver solo el cuerpo de la respuesta
}



const DatosCarreras = [
    { idCarrera: 1, name: `Carrera 1` },
    { idCarrera: 2, name: `Carrera 2` },
    { idCarrera: 3, name: `Carrera 3` },
    { idCarrera: 4, name: `Carrera 4` }
];


const DatosAsignaturas = [
    { idCarrera: 1, name: `Asignatura 1` },
    { idCarrera: 2, name: `Asignatura 2` },
    { idCarrera: 3, name: `Asignatura 3` },
    { idCarrera: 4, name: `Asignatura 4` }
];
export { DatosCarreras, DatosAsignaturas };
