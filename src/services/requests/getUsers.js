import { URL_BACK } from '../util/constants'
import { PARAMETERS } from '../../services/util/constants'
import swal from 'sweetalert';
import { getToken } from './loginTest';
const axios = require('axios');


// ///
// export const getUsers = async (idUsuario, jwtUser) => {

//     // const url = URL_BACK.getUsers;
//     const url = `https://studyhub-backend-g4-production.up.railway.app/getAllUsers`;

//     const headers = {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${jwtUser} `,
//     }
//     const resp = await fetch(url, {
//         method: "GET",
//         headers: headers
//     });
//     // const resp = await fetch(url);
//     const data = await resp.json();
//     const usuario = [];
//     console.log('usuario: ');

//     data.map(info => {
//         if (info.id === idUsuario) {
//             usuario.push({
//                 id: info.idUsuario,
//                 cedula: info.cedula,
//                 name: info.nombre,
//                 apellido: info.apellido,
//                 rol: 'A',
//             })
//         }
//     });
//     console.log('usuario: ', usuario[0]);
//     return usuario[0];
// }


export const getUsers = async (idUsuario) => {

 const url = URL_BACK.getUsers;
   //  const url = `https://studyhub-backend-g4-production.up.railway.app/getAllUsers`;
    // axios.get('http://localhost:8080/api/usuario/getUsuarios', {
    //     headers: {
    //         'Authorization': `Bearer ${PARAMETERS.accessToken}`
    //     }
    // })
    //     .then((response) => {
    //         console.log("acaca");
    //         console.log(JSON.stringify(response.data));
    //     })
    //     .catch((error) => {
    //         console.log(error);
    //     });

    // const url = `http://localhost:8080/api/usuario/getUsuarios`;
    // const myHeaders = new Headers();
    // myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiJ9.eyJjaSI6IjExMSIsImlkIjo1LCJyb2wiOiJBIiwic3ViIjoiMTExIiwiaWF0IjoxNzE2MjU4MjE3LCJleHAiOjE3MTYyNTkxMTd9.-FKPAcNJuRaLHYYz2zPTZammpfBcWMxnpjJansFivug");
   
    fetch('http://localhost:8080/api/usuario/getUsuarios', {
        method: 'OPTIONS',
        headers: {
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJjaSI6IjExMSIsImlkIjo1LCJyb2wiOiJBIiwic3ViIjoiMTExIiwiaWF0IjoxNzE2MjYwNjk4LCJleHAiOjE3MTYyNjE1OTh9.VBzGbSL7JT4t_bUaqjJnx8t27aE7wDA4HqTTT_QRK8o' // Si se requiere un token de autenticación
        }
    })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error('Error:', error));
    
    // const headers = {
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer eyJhbGciOiJIUzI1NiJ9.eyJjaSI6IjExMSIsImlkIjo1LCJyb2wiOiJBIiwic3ViIjoiMTExIiwiaWF0IjoxNzE2MjU0OTIzLCJleHAiOjE3MTYyNTU4MjN9.GMT1hZmPC5VBdfZWOG7axJGALER0h3PLt0HkLHJBbE4`,
    // }
    // let resp = await fetch(url, {
    //     method: "GET",
    //     headers: headers
    // });
    // // const resp = await fetch(url);
    // let data = resp.json();
    // console.log('usuariodata: ', data);
    // const usuario = [];

    // data.map(info => {
    //     if (info.id === idUsuario) {
    //         usuario.push({
    //             id: info.idUsuario,
    //             cedula: info.cedula,
    //             name: info.nombre,
    //             apellido: info.apellido,
    //             rol: 'A',
    //         })
    //         console.log('usuario: ', usuario[0]);
    //     }
    // });
    // return usuario[0];
}



///

export const getValidarEstudiantes = async () => {
//const url = URL_BACK.getUsers;
    const url = `http://localhost:8080/api/usuario/getUsuarios`;

    let headersList = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${PARAMETERS.accessToken} `,
    }
    let response = await fetch(url, {
        method: "GET",
        headers: headersList
    });
    let result = await response.json();
    console.log('result: ', result);
    return result;
}



export const updateValidarEstudiante = async (idUsuario) => {
    const url = URL_BACK.acceptEstudiante + idUsuario;

    let headersList = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${PARAMETERS.accessToken} `,
    }
    let response = await fetch("http://localhost:8080/api/usuario/acceptEstudiante/" + `${idUsuario}`, {
        method: "PUT",
        headers: headersList,
        redirect: "follow"
    });
    let result = await response.text();


    if (result.ok) {
        console.log("response: ", result);
        swal({
            title: "Se crea usuario correctamente\n\n",
            text: "id: " + idUsuario,
            icon: "success",
            position: "center",
            timer: 3000
        });
    } else {
        swal("¡Advertencia!", 'Usuario y/o contraseña incorrecta', "error", {
            timer: 3000
        });
    }
}

// XdMiq4cRVtSl