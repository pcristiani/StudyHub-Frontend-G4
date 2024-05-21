import { URL_BACK } from '../util/constants'
import { decodeJwt } from '../util/conversionBase64'
import axios from 'axios';

// debugger;/
// Devuelve el token de autenticacion
export const getToken = async (cedula, password) => {
    try {
        let response = await axios.post(URL_BACK.loginTest, {
            "cedula": cedula,
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
export const validateCredentials = async (cedula, password) => {
    try {
        console.log("28cedula: ", cedula, "Contraseña: ", password);
        let response = await axios.post(URL_BACK.loginTest, {
            "cedula": cedula,
            "password": password
        });

        console.log("31response: ", response);
        if (response.status === 200) {
            console.log("Usuario autenticado correctamente");
            let objUser = decodeJwt(response.data);
            return objUser;
        }
    } catch (error) {
        console.log(error);
    }
}

