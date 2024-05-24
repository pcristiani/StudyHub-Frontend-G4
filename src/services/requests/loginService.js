import { URL_BACK } from '../util/constants'
import axios from 'axios';
import { redirect } from 'react-router-dom';
import swal from 'sweetalert';
import { useState } from 'react';

// debugger;/
// Devuelve el token de autenticacion
export const getToken = async (cedula, password) => {
    try {
        let response = await axios.post(URL_BACK.loginTest, {
            "cedula": cedula,
            "password": password
        });

        if (response.status === 200) {
            //   let objUser = decodificaJwt(response.data);
            console.log("Usuario autenticado correctamente: ", response.data);
            return response.data;
        } else {
            swal("¡Advertencia!", 'Usuario y/o contraseña incorrecta', "error", {
                timer: 4000
            });
        }
    } catch (error) {
        swal("¡Advertencia!", 'Usuario y/o contraseña incorrecta', "error", {
            timer: 3000
        });
    }
}

// Cierra la sesion del usuario
export const cerrarSesion = async (jwtLogin) => {
    try {
        let response = await axios.post(URL_BACK.cerrarSesion, jwtLogin);

        if (response.status === 200) {
            console.log("Cerrar sesion: ", response.data);
            return response.data;
        } else {
            swal("¡Advertencia!", 'Un error inesperado ocurrio', "error", {
                timer: 4000
            });
        }
    } catch (error) {
        swal("¡Advertencia!", 'Un error inesperado ocurrio', "error", {
            timer: 3000
        });
    }
}
