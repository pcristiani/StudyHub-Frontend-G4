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
        //    console.log(response.data);
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



export const registerUsr = async (nombre, apellido, email, fechaNacimiento, cedula, password, rol, jwtLogin) => {
    let body = { "nombre": nombre, "apellido": apellido, "email": email, "fechaNacimiento": fechaNacimiento, "cedula": cedula, "password": password, "rol": rol };
    try {

        // let response = await fetch(URL_BACK.registerUsr, {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'Authorization': `Bearer ${user.jwtLogin}`,
        //     },
        //     body: JSON.stringify(body)
        // })


        let headersList = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwtLogin}`,
        }
        let reqOptions = {
            url: URL_BACK.registerUsr,
            method: "POST",
            headers: headersList,
            data: body
        }

        let response = await axios.request(reqOptions);
        //  console.log(response);
        return response;
    } catch (error) {
        return error.response;
    }
}



// async function registerUsr(nombre, apellido, email, fechaNacimiento, cedula, password, rol) {
//     let body = { "nombre": nombre, "apellido": apellido, "email": email, "fechaNacimiento": fechaNacimiento, "cedula": cedula, "password": password, "rol": rol };
//     let response = await fetch(URL_BACK.registerUsr, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${user.jwtLogin}`,
//         },
//         body: JSON.stringify(body)
//     })

//     if (response.ok) {
//         console.log("response: ", response);
//         swal({
//             title: "Su usuario queda pendiente de validación\n\n",
//             text: "\nNombre: " + nombre + " " + apellido + "\nCedula: " + cedula,
//             icon: "success",
//             position: "center",
//             timer: 4000
//         });
//         history('/');
//     } else {
//         swal("¡Advertencia!", 'Los datos ingresados son incorrectos', "error", {
//             timer: 3000
//         });
//     }
// };