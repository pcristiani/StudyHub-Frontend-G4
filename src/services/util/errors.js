import swal from 'sweetalert';

const errors = async (mensaje, text, status) => {

    const response = {
        status: status,
        message: mensaje,
        text: text
    };

    if (response.status === 200) {
        swal({
            title: `${response.message}`,
            text: `${response.text}`,
            icon: "success",
            dangerMode: false,
            position: "center",
            timer: 4000
        });
    } else {

        let errorTitle, errorText = '';

        if (mensaje !== null) {
            errorTitle = '¡Advertencia!';
            errorText = mensaje;
        } else {
            switch (response.status) {
                case 400:
                    errorTitle = 'Solicitud Incorrecta (400)';
                    errorText = 'Sintaxis inválida, el servidor no pudo entender la solicitud.';
                    break;
                case 401:
                    errorTitle = 'No Autorizado (401)';
                    errorText = 'Requiere autenticación. Verifica tu token de autenticación.';
                    break;
                case 403:
                    errorTitle = 'Acceso Denegado (403)';
                    errorText = 'No tienes derechos de acceso al contenido.';
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
        }
        swal({
            title: `${errorTitle}`,
            text: `${errorText}`,
            icon: "error",
            dangerMode: true,
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