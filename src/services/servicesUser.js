/// trabajando en el servicio de usuario
import { PARAMETERS, URL_BACK } from '../util/constants'

async function getUser(username, password) {
    let response = await fetch(URL_BACK.getUser, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${PARAMETERS.tokenBearer}`,
        },
    }
    );
    console.log("responses OK: ", response.ok);
}