import { URL_BACK } from '../util/constants'
import { decodeJwt } from '../util/conversionBase64'
import axios from 'axios';

// debugger;/
// Devuelve el token de autenticacion
export const loginTest = async (username, password) => {
    try {
        let response = await axios.post(URL_BACK.loginTest, {
            "username": username,
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
export const validateCredentials = async (username, password) => {
    try {
        let response = await axios.post(URL_BACK.loginTest, {
            "username": username,
            "password": password
        });

        if (response.status === 200) {
            let objUser = decodeJwt(response.data);
            return objUser;
        }
    } catch (error) {
        console.log(error);
    }
}


// async function validateCredentials(username, password) {
//     try {
//         let response = await axios.post(URL_BACK.loginTest, {
//             "username": username,
//             "password": password
//         });

//         if (response.status === 200) {
//             let objUser = decodeJwt(response.data);
//             return objUser;
//         }
//     } catch (error) {
//         swal("¡Advertencia!", 'Usuario y/o contraseña incorrecta', "error", {
//             timer: 3000
//         });
//         console.log(error);
//     }
// }



// export const validateCredentials = async (username, password) => {
//     let response = await fetch(URL_BACK.loginTest, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${PARAMETERS.accessToken}`,
//         },
//         body: email
//     })

//     if (response.ok) {
//         swal({
//             title: "Email de recuperacion su correo electronico.\n\n",
//             icon: "success",
//             position: "center",
//             timer: 4000
//         });

//         redirigir(`http://localhost:3000/`);
//     } else {
//         swal("¡Advertencia!", 'Email invalido', "error", {
//             timer: 3000
//         });
//     }
// }