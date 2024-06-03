/* eslint-disable no-throw-literal */
import { URL_BACK } from '../util/constants'

// Función para obtener las asignaturas
export const getAsignaturas = async (jwtLogin) => {
    const url = URL_BACK.getAsignaturas;

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
export const getAsignaturasDeCarrera = async (idCarrera, jwtLogin) => {
    const url = URL_BACK.getAsignaturasDeCarrera;

    let headersList = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwtLogin}`
    }

    let response = await fetch(url + idCarrera, {
        method: "GET",
        headers: headersList
    });

    const data = await response.json();
    return data;
}

export const getAsignaturasDeCarreraConExamen = async (idCarrera, jwtLogin) => {
    const url = URL_BACK.getAsignaturasDeCarreraConExamen;

    let headersList = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwtLogin}`
    }

    let response = await fetch(url + idCarrera, {
        method: "GET",
        headers: headersList
    });

    const data = await response.json();
    return data;
}


///
export const altaAsignatura = async (nombre, creditos, descripcion, departamento, previaturas, idCarrera, idDocente, jwtLogin) => {
    let body = {
        "nombre": nombre,
        "creditos": creditos,
        "descripcion": descripcion,
        "departamento": departamento,
        "tieneExamen": true,
        "activa": true,
        "previaturas": previaturas,
        "idCarrera": idCarrera,
        "idDocentes": idDocente
    };

    let response = await fetch(URL_BACK.altaAsignatura, {
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
export const getDocentesByAsignatura = async (idAsignatura, jwtLogin) => {
    const url = URL_BACK.getDocentesByAsignatura;

    let headersList = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwtLogin}`
    }

    let response = await fetch(url + idAsignatura, {
        method: "GET",
        headers: headersList
    });

    const data = await response.json();
    return data;
}


///
export const registroHorarios = async (idDocente, anio, horarioData, idAsignatura, jwtLogin) => {
    let body = {
        "idDocente": idDocente,
        "anio": anio,
        "dtHorarioDias": horarioData
    };

    let response = await fetch(URL_BACK.registroHorarios + idAsignatura, {
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
export const registroPreviaturas = async (idAsignatura, idPreviaturas, jwtLogin) => {

    let response = await fetch(URL_BACK.registrarPreviaturas + idAsignatura, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwtLogin}`,
        },
        data: 1
    });

    if (!response.ok) {
        throw { status: response.status };
    }
};



///

export const getCourseRelations = async (jwtLogin) => {
    const url = URL_BACK.courseRelations;

    let headersList = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwtLogin} `,
    }

    let response = await fetch(url, {
        method: "GET",
        headers: headersList
    });

    let result = await response.text();
    return result;
}