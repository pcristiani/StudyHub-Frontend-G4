import { URL_BACK } from '../util/constants'
import axios from 'axios';
import swal from 'sweetalert';

///
// Función para obtener las carreras
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

    const data = await resp.json();
    return data.body;
}

///

export const asignarCoordinadorCarrera = async (idUsuario, idCarrera, jwtLogin) => {
    console.log("IDUsuario: ", idUsuario, "IDCarrera: ", idCarrera.ida, "JWT: ", jwtLogin);
    try {
        let headersList = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwtLogin}`,
        }
        let reqOptions = {
            url: URL_BACK.asignarCoordinadorCarrera + idUsuario,
            method: "PUT",
            headers: headersList,
            data: idCarrera.ida
        }

        let response = await axios.request(reqOptions);
        if (response.status === 200) {
            console.log("Se cambio la passwords: ", response.data);
            return response.data;
        } else {
            swal("¡Advertencia!", 'Error al modificar la contraseña', "error", {
                timer: 4000
            });
        }
    } catch (error) {
        swal("¡Advertencia!", 'Error al modificar la contraseña', "error", {
            timer: 3000
        });
    }
}

///

// Carreras Inscripciones Pendientes
export const getCarrerasInscripcionesPendientes = async (jwtLogin) => {
    const url = URL_BACK.getCarrerasInscripcionesPendientes;

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwtLogin}`
    }

    const resp = await fetch(url, {
        method: "GET",
        headers: headers
    });

    const data = await resp.json();
    return data;
}

///
// Devuelve las carreras donde el estudiante esta inscripto
export const getCarrerasInscripto = async (idEstudiante, jwtLogin) => {
    try {
        const response = await fetch(`${URL_BACK.getCarrerasInscripto}${idEstudiante}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwtLogin}`,
            },
        });
        if (!response.ok) {
            throw new Error('Error al realizar el GET');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al realizar el GET:', error);
        throw error;
    }
};



///
export const getInscriptosPendientes = async (idCarrera, jwtLogin) => {
    const url = URL_BACK.getInscriptosPendientes;
    let headersList = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwtLogin}`
    }

    let response = await fetch(url + idCarrera, {
        method: "GET",
        headers: headersList
    });

    let data = await response.json();
    console.log("Data 109: ", data);
    return data;
}


/// Aceptar estudiante Carrera
export const acceptEstudianteCarrera = async (idEstudiante, idCarrera, jwtLogin) => {
    try {
        let headersList = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwtLogin}`,
        }

        let body = JSON.stringify({
            "idCarrera": idCarrera,
            "idEstudiante": idEstudiante,
            "validado": true
        });

        let reqOptions = {
            url: URL_BACK.acceptEstudianteCarrera,
            method: "PUT",
            headers: headersList,
            data: body
        }
        let response = await axios.request(reqOptions);
        if (response.status === 200) {

            swal({
                title: "¡Inscripción validada!\n\n",
                text: "Inscripción a carrera validada.",
                icon: "success",
                dangerMode: false,
                position: "center",
                timer: 3000
            });
            return response;
        }
    } catch (error) {
        swal("¡Advertencia!", 'Error al modificar la contraseña', "error", {
            timer: 3000
        });
    }
}

///

