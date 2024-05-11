import { URL_BACK } from '../util/constants'
import { decodeJwt } from '../util/conversionBase64'
import axios from 'axios';

// debugger;/
// Devuelve el token de autenticacion
export const loginTest = async (username, password) => {
    try {
        let response = await axios.post(URL_BACK.loginTest, {
            "username": username,
            "password": password
        });

        if (response.status === 200) {
            let objUser = decodeJwt(response.data);
            console.log("***Existe Usuario***");
            console.log("ID: ", objUser.id);
            return response.data;
        }
    } catch (error) {
        console.log('Usuario y/o contraseña incorrecta', error);
    }
}

// Valida las credenciales del usuario
export const validateCredentials = async (username, password) => {
    try {
        let response = await axios.post(URL_BACK.loginTest, {
            "username": username,
            "password": password
        });

        if (response.status === 200) {
            let objUser = decodeJwt(response.data);
            return objUser;
        }
    } catch (error) {
        console.log(error);
    }
}

