/* eslint-disable no-throw-literal */
import { URL_BACK } from '../util/constants'

// "idAsignatura": 0,
//     "idPeriodo": 0,
//         "idsDocentes": lisdoce,
//             "fechaHora": "2024-06-03T02:52:04.065Z"
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

