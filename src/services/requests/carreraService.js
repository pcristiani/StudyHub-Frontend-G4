import { URL_BACK } from '../util/constants'
import axios from 'axios';
import swal from 'sweetalert';

///
// Función para obtener las carreras
export const getCarreras = async (jwtLogin) => {
    const url = URL_BACK.getCarreras;

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwtLogin}`
    }

    const resp = await fetch(url, {
        method: "GET",
        headers: headers
    });

    const data = await resp.json();
    return data.body;
}

///

export const asignarCoordinadorCarrera = async (idUsuario, idCarrera, jwtLogin) => {
    try {
        let headersList = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwtLogin}`,
        }
        let reqOptions = {
            url: URL_BACK.asignarCoordinadorCarrera + idUsuario,
            method: "PUT",
            headers: headersList,
            data: idCarrera
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