/* eslint-disable no-throw-literal */
import { URL_BACK } from '../util/constants'
import axios from 'axios';


export const registroAsignaturaAPeriodo = async (idAsignatura, idPeriodo, idsDocentes, fechaHora, jwtLogin) => {
    try {
        let body = {
            "idAsignatura": idAsignatura,
            "idPeriodo": idPeriodo,
            "idsDocentes": idsDocentes,
            "fechaHora": fechaHora
        };
        let headersList = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwtLogin}`,
        }
        let reqOptions = {
            url: URL_BACK.registroAsignaturaAPeriodo,
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



///
export const getCursadasExamen = async (idExamen, jwtLogin) => {
    let url = `${URL_BACK.getCursadasExamen}${idExamen}`;
    let response = await fetch(url, {
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


///
export const getAsignaturasConExamenPendiente = async (idEstudiante, idCarrera, jwtLogin) => {
    let url = `${URL_BACK.getAsignaturasConExamenPendiente}${idEstudiante}?idCarrera=${idCarrera}`;
    let response = await fetch(url, {
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



///
// export const getExamenesAsignaturaPorAnio = async (idAsignatura, anio, jwtLogin) => {
//     let url = `${URL_BACK.getExamenesAsignaturaPorAnio}${idAsignatura}?anio=${anio}`;

//     let response = await fetch(url, {
//         method: 'GET',
//         headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${jwtLogin}`,
//         }
//     });

//     if (!response.ok) {
//         throw { status: response.status };
//     }
//     return await response.json();
// };
export const getExamenesAsignaturaPorAnio = async (idAsignatura, anio, jwtLogin) => {
      try {
        let headersList = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwtLogin}`,
        }
        let reqOptions = {
            url: `${URL_BACK.getExamenesAsignaturaPorAnio}${idAsignatura}?anio=${anio}`,
            method: "GET",
            headers: headersList,
        };
        let response = await axios.request(reqOptions);
        return response;
    } catch (error) {
        return error.response;
    }
}


///
export const cambiarResultadoExamen = async (idCursadaExamen, calificacion, jwtLogin) => {
    try {
        let headersList = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwtLogin}`,
        }
        let reqOptions = {
            url: `${URL_BACK.cambiarResultadoExamen}${idCursadaExamen}?calificacion=${calificacion}`,
            method: "POST",
            headers: headersList,
        }

        let response = await axios.request(reqOptions);
        //   console.log(response.data);
        return response;
    } catch (error) {
        return error.response;
    }
};



///
export const getExamenesPeriodo = async (idPeriodo, jwtLogin) => {
    try {
        let headersList = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwtLogin}`,
        }
        let reqOptions = {
            url: URL_BACK.getExamenesPeriodo + idPeriodo,
            method: "GET",
            headers: headersList,
        };
        let response = await axios.request(reqOptions);
        return response;
    } catch (error) {
        return error.response;
    }
}



///
export const getActaExamen = async (idExamen, jwtLogin) => {
    try {
        let headersList = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwtLogin}`,
        }
        let reqOptions = {
            url: URL_BACK.getActaExamen + idExamen,
            method: "GET",
            headers: headersList,
        };

        let response = await axios.request(reqOptions);
        return response;
    } catch (error) {
        return error.response;
    }
}