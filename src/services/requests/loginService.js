import { URL_BACK } from '../util/constants'
import swal from 'sweetalert';
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
            // console.log("Usuario autenticado correctamente: ", response.data);
            return response;
        }
    } catch (error) {
        return error.response;
    }
}

// Cierra la sesion del usuario
export const cerrarSesion = async (jwtLogin) => {
    try {
        let response = await axios.post(URL_BACK.cerrarSesion, jwtLogin);
        if (response.status === 200) {
            console.log(response.data);
            return response.data;
        }
    } catch (error) {
        swal("¡Advertencia!", 'Un error inesperado ocurrio', "error", {
            timer: 3000
        });
    }
}

///
// Modificar contraseña del usuario
export const modificarPassword = async (idUsuario, newPassword, jwtLogin) => {
    try {
        let headersList = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwtLogin}`,
        }
        let reqOptions = {
            url: URL_BACK.modificarPassword + idUsuario,
            method: "PUT",
            headers: headersList,
            data: newPassword
        }

        let response = await axios.request(reqOptions);
        if (response.status === 200) {
            console.log("Se cambio la passwords: ", response.data);
            return response.data;
        } else {
            swal("¡Advertencia!", 'Error al modificar la contraseña', "error", {
                timer: 4000
            });
        }
    } catch (error) {
        swal("¡Advertencia!", 'Error al modificar la contraseña', "error", {
            timer: 3000
        });
    }
}
