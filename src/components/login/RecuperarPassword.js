import { redirigir } from '../../services/util/constants';

import '../../css/style-navbar.css';
import '../../css/style.css';
import { URI_FRONT } from '../../services/util/constants'


function ResetPassword() {
    const urlReset = URI_FRONT.resetPassUri;
    const urlRedirect = URI_FRONT.forgotPassUri;

    window.location.href = urlReset;

    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token'); // Obtener el valor del parámetro 'token' de la URL

    if (token) {
        console.log('Token obtenido:', token);
        setTimeout(() => {
            // redirigir(`http://localhost:3000/olvido-contrasenia?token=${token}`);
            redirigir(urlRedirect + `${token}`);
        }, 1);
    } else {
        console.log('No se encontró ningún token en la URL.');
    }

}

export default ResetPassword;