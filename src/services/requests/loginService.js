import { URL_BACK } from '../util/constants'
import axios from 'axios';
import swal from 'sweetalert';

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
        } else {
            swal("¡Advertencia!", 'Usuario y/o contraseña incorrecta', "error", {
                timer: 4000
            });
        }
    } catch (error) {
        console.error('Error al realizar el POST:', error);
        swal("¡Advertencia!", 'Usuario y/o contraseña incorrecta', "error", {
            timer: 3000
        });
    }
}

// Cierra la sesion del usuario
export const cerrarSesion = async (jwtLogin) => {
    try {
        let response = await axios.post(URL_BACK.cerrarSesion, jwtLogin);
        if (response.status === 200) {
            console.log("Cerrar sesion: ", response.data);
            return response.data;
        } else {
            swal("¡Advertencia!", 'Un error inesperado ocurrio', "error", {
                timer: 4000
            });
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
