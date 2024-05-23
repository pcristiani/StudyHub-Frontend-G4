import { URL_BACK } from '../util/constants'
import { PARAMETERS } from '../util/constants'
import axios from 'axios';


///
export const getUsuarios = async (idUsuario, jwtLogin) => {

    const url = URL_BACK.getUsuarios;
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwtLogin}`
    }
    const resp = await fetch(url, {
        method: "GET",
        headers: headers
    });

    const usuario = [];
    let data = await resp.json();
    data.map(info => {
        if (info.id === idUsuario) {
            usuario.push({
                id: info.idUsuario,
                cedula: info.cedula,
                name: info.nombre,
                apellido: info.apellido,
                rol: 'A',
            })
        }
    });
    return usuario[0];
}

///

/// Estudiantes sin validar
export const getEstudiantesPendientes = async (jwtLogin) => {
    const url = URL_BACK.estudiantesPendientes;

    let headersList = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwtLogin}`,
    }
    const response = await fetch(url, {
        method: "GET",
        headers: headersList
    });
    let result = await response.json();
    console.log('result: ', result);
    return result;
}

/// Validar estudiantes
export const acceptEstudiante = async (idUsuario, jwtLogin) => {
    try {
        let headersList = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwtLogin}`,
        }

        let reqOptions = {
            url: URL_BACK.acceptEstudiante + idUsuario,
            method: "PUT",
            headers: headersList,
        }

        const response = await axios.request(reqOptions);
        return response.ok;
    } catch (error) {
        console.error('Error al actualizar el estudiante:', error);
        throw error;
    }
}



///
