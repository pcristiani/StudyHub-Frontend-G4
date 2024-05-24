import { URL_BACK } from '../util/constants'
import axios from 'axios';


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


///

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