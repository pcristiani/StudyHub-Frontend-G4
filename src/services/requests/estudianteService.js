import { URL_BACK } from '../util/constants'
import axios from 'axios';
import swal from 'sweetalert';


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
    // try {

    let headersList = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwtLogin}`,
    }


    let bodyContent = JSON.stringify({
        "idCarrera": idCarrera,
        "idEstudiante": idUsuario,
        "validado": false
    });

    let response = await fetch("http://localhost:8080/api/carrera/inscripcionCarrera", {
        method: "POST",
        body: bodyContent,
        headers: headersList
    });

    let data = await response.text();
    console.log(data);
}
//         let response = await axios.post(URL_BACK.inscripcionCarrera, {
//             "idCarrera": idCarrera,
//             "idEstudiante": idUsuario,
//             "validado": false
//         }, headersList);

//         if (response.status === 200) {
//             console.log("Usuario autenticado correctamente: ", response.data);
//             return response.data;
//         } else {
//             swal("¡Advertencia!", 'Usuario y/o contraseña incorrecta', "error", {
//                 timer: 4000
//             });
//         }
//     } catch (error) {
//         swal("¡Advertencia!", 'Usuario y/o contraseña incorrecta', "error", {
//             timer: 3000
//         });
//     }
// }


// let bodyContent = JSON.stringify({
//     "idCarrera": 2,
//     "idEstudiante": 5,
//     "validado": false
// });

// let response = await fetch("http://localhost:8080/api/carrera/inscripcionCarrera", {
//     method: "POST",
//     body: bodyContent,
//     headers: headersList
// });

// let data = await response.text();
// console.log(data);