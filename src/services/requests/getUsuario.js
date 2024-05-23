import { URL_BACK, PARAMETERS } from '../util/constants'
import axios from "axios";

export const getUsuario = async (idUsuario, jwtLogin) => {
    let headersList = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwtLogin}`,
    }

    let reqOptions = {
        url: URL_BACK.getUsuario + idUsuario,
        method: "GET",
        headers: headersList,
    }

    let response = await axios.request(reqOptions);
    console.log(response.data);

    return response.data;
}