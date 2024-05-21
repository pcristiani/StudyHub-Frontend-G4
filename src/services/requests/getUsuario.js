import { URL_BACK, PARAMETERS } from '../util/constants'
import axios from "axios";

export const getUsuario = async (idUsuario) => {
    let headersList = {
        'Content-Type': 'application/json',
        'Authorization': `${PARAMETERS.accessToken} `,
    }

    let reqOptions = {
    url: `http://localhost:8080/api/usuario/getUsuario/5`,
        method: "GET",
        headers: headersList,
    }

    let response = await axios.request(reqOptions);
    console.log("saca");
    console.log(response.data);

    return response.data;
}
