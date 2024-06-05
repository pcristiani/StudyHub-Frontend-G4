import { URL_BACK } from '../util/constants'
import axios from 'axios';


///
/// Estudiantes sin validar
export const getEstudiantesPendientes = async (jwtLogin) => {
    const url = URL_BACK.getEstudiantesPendientes;

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
            data: true
        }

        const response = await axios.request(reqOptions);
        return response.ok;
    } catch (error) {
        console.error('Error al actualizar el estudiante:', error);
        throw error;
    }
}


///
// Inscripcion a carrera
export const inscripcionCarrera = async (idUsuario, idCarrera, jwtLogin) => {
    let url = URL_BACK.inscripcionCarrera;
    let headersList = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwtLogin}`,
    }

    let bodyContent = JSON.stringify({
        "idCarrera": idCarrera,
        "idEstudiante": idUsuario,
        "validado": false
    });

    let response = await fetch(url, {
        method: "POST",
        body: bodyContent,
        headers: headersList
    });

    let data = await response.text();
    console.log(data);
}
