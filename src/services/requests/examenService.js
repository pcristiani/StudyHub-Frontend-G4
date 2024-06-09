/* eslint-disable no-throw-literal */
import { URL_BACK } from '../util/constants'


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