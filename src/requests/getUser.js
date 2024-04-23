import { URL_BACK, PARAMETERS } from '../util/constants'
import axios from "axios";

export const getUser = async (idUsuario) => {
    let headersList = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${PARAMETERS.accessToken} `,
    }

    let reqOptions = {
        url: `http://localhost:8080/api/users/getUser/1`,
        method: "GET",
        headers: headersList,
    }

    let response = await axios.request(reqOptions);
    console.log(response.data);

    return response.data;
}

// let idU = 1;
// async function getUser() {
//     console.log("URL: ", URL_BACK.getUser + idU);
//     let response = await fetch(URL_BACK.getUser, {
//         method: 'GET',
//         headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${ PARAMETERS.accessToken } `,
//         },
//     }
//     );

//     if (response.ok) {
//         return await response.text();
//     }
// }

