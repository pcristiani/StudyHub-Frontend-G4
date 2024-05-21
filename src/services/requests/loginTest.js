import { URL_BACK } from '../util/constants'
import { decodificaJwt } from '../util/conversionBase64'
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
            let objUser = decodificaJwt(response.data);
            console.log("***Existe Usuario***", response.data);
            return response.data;
        }
    } catch (error) {
        console.log('Usuario y/o contraseña incorrecta', error);
    }
}

// Valida las credenciales del usuario
export const validateCredentials = async (cedula, password) => {
    try {
        // console.log("28cedula: ", cedula, "Contraseña: ", password);
        let response = await axios.post(URL_BACK.loginTest, {
            "cedula": cedula,
            "password": password
        });

        if (response.status === 200) {
            // let objUser = decodificaJwt(response.data);
            console.log("Usuario autenticado correctamente", response.data);

            return response.data;
        }
    } catch (error) {
        console.log(error);
    }
}

