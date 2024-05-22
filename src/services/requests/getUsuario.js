import { URL_BACK, PARAMETERS } from '../util/constants'
import axios from "axios";

export const getUsuario = async (idUsuario, jwtUser) => {
    let headersList = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwtUser}`,
    }

    let reqOptions = {
        url: URL_BACK.getUser + idUsuario,
        method: "GET",
        headers: headersList,
    }

    let response = await axios.request(reqOptions);
    console.log(response.data);

    return response.data;
}


// export const getValidarEstudiantes = async () => {
//     //const url = URL_BACK.getUsers;
//     const url = `http://localhost:8080/api/usuario/getUsuario`;

//     let headersList = {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${PARAMETERS.accessToken} `,
//     }
//     let response = await fetch(url, {
//         method: "GET",
//         headers: headersList
//     });
//     let result = await response.json();
//     console.log('result: ', result);
//     return result;
// }
