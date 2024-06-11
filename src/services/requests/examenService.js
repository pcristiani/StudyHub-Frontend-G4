/* eslint-disable no-throw-literal */
import { URL_BACK } from '../util/constants'
import axios from 'axios';


///
export const registroAsignaturaAPeriodo = async (idAsignatura, idPeriodo, idsDocentes, fechaHora, jwtLogin) => {
    let body = {
        "idAsignatura": idAsignatura,
        "idPeriodo": idPeriodo,
        "idsDocentes": idsDocentes,
        "fechaHora": fechaHora
    };

    let response = await fetch(URL_BACK.registroAsignaturaAPeriodo, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwtLogin}`,
        },
        body: JSON.stringify(body)
    });

    if (!response.ok) {
        throw { status: response.status };
    }
};


///

export const inscripcionExamen = async (idEstudiante, idExamen, jwtLogin) => {
    try {
        let body = {
            "idEstudiante": idEstudiante,
            "idExamen": idExamen
        };

        let headersList = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwtLogin}`,
        }
        let reqOptions = {
            url: URL_BACK.inscripcionExamen,
            method: "POST",
            headers: headersList,
            data: body
        }

        let response = await axios.request(reqOptions);
        return response;
    } catch (error) {
        return error.response;
    }
};



///

export const getExamenesAsignatura = async (idAsignatura, jwtLogin) => {
    let response = await fetch(URL_BACK.getExamenesAsignatura + idAsignatura, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwtLogin}`,
        }
    });

    if (!response.ok) {
        throw { status: response.status };
    }

    return await response.json();
};