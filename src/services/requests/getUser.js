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
