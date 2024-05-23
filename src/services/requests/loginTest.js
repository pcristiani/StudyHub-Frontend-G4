import { URL_BACK } from '../util/constants'
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
            //   let objUser = decodificaJwt(response.data);
            console.log("Usuario autenticado correctamente: ", response.data);
            return response.data;
        }
    } catch (error) {
        console.log('Usuario y/o contraseña incorrecta', error);
    }
}


/// Modificar contraseña
export const modificarPassword = async (idUsuario, jwtLogin) => {
    const body='14'
    try {
        let headersList = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwtLogin}`,
        }

        let reqOptions = {
            url: URL_BACK.modificarPassword + idUsuario,
            method: "PUT",
            headers: headersList,
        }
        body: JSON.stringify(body)

        const response = await axios.request(reqOptions);
        return response.ok;
    } catch (error) {
        console.error('Error al modificar la contraseña', error);
        throw error;
    }
}