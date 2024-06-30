import swal from 'sweetalert';
import { URI_FRONT, redirigir } from '../../services/util/constants';

const errors = async (mensaje, text, status, redirect) => {
    let errorTitle = '', errorText = '';

    const response = {
        message: mensaje,
        text: text,
        status: status
    };

    if (response.status === 200) {
        swal({
            title: `${response.message}`,
            text: `${response.text}`,
            icon: "success",
            dangerMode: false,
            position: "center",
            timer: 5000
        }).then(() => {
            if (redirect) {
                redirigir(URI_FRONT.homeUri);
            }
        });

    } else if (response.status === 400 || response.status === 498 || response.status === 403) {
        errorTitle = '¡Advertencia!';
        swal({
            title: `${errorTitle}`,
            text: `${response.text}`,
            icon: "error",
            dangerMode: false,
            position: "center",
            timer: 8000
        });

    } else {
        errorTitle = '¡Advertencia!';

        switch (response.status) {
            case 401:
                errorTitle = 'No Autorizado (401)';
                errorText = 'Requiere autenticación. Verifica tu token de autenticación.';
                break;
            case 404:
                errorTitle = 'Recurso no Encontrado (404)';
                errorText = 'El servidor no encuentra el recurso solicitado.';
                break;
            case 500:
                errorTitle = 'Error Interno del Servidor (500)';
                errorText = 'El servidor tiene un error inesperado. Inténtalo más tarde.';
                break;
            case 503:
                errorTitle = 'Servicio no Disponible (503)';
                errorText = 'El servidor está sobrecargado o inactivo. Inténtalo más tarde.';
                break;
            case 43:
                errorTitle = '¡Advertencia!';
                errorText = 'Usuario y/o contraseña incorrecta.';
                break;
            default:
                errorTitle = `¡Error HTTP! ${response.status}`;
                errorText = 'Ocurrió un error inesperado.';
        }

        swal({
            title: `${errorTitle}`,
            text: `${errorText}`,
            icon: "error",
            dangerMode: false,
            position: "center",
            timer: 4000
        });
    }
};


function isNull(valor) {
    if (valor === undefined) {
        console.log('Valor', valor);
        return false;
    }

    if (valor === null) {
        console.log('Valor', valor);
        return false;
    }

    return valor;
}


export { errors, isNull };


// let title = "¡Fecha de examen registrada!\n\n";
// errors(title, restul.data, restul.status);