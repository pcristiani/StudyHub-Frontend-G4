import { URL_BACK } from '../util/constants'
import swal from 'sweetalert';

// Devuelve un objeto con los datos del usuario
export const getUsuario = async (idUsuario, jwtLogin) => {
   try {
      const response = await fetch(`${URL_BACK.getUsuario}${idUsuario}`, {
         method: 'GET',
         headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwtLogin}`,
         },
      });
      if (!response.ok) {
         throw new Error('Error al realizar el GET');
      }
      const data = await response.json();
      return data;
   } catch (error) {
      console.error('Error al realizar el GET:', error);
      throw error;
   }
};

///

// modifica los datos del usuario
export const modificarDatosUsuario = async (idUsuario, nombre, apellido, email, fechaNacimiento, rol, cedula, jwtLogin) => {
   try {
      const response = await fetch(`${URL_BACK.modificarUsuario}${idUsuario}`, {
         method: 'PUT',
         headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwtLogin}`,
         },
         body: JSON.stringify({
            "idUsuario": idUsuario,
            "nombre": nombre,
            "apellido": apellido,
            "email": email,
            "fechaNacimiento": fechaNacimiento,
            "rol": rol,
            "cedula": cedula,
            "activo": true,
            "validado": true
         })
      });
      if (!response.ok) {
         // throw new Error('Error al realizar el PUT');
         swal("¡Advertencia!", 'Los datos ingresados no son correctos', "error", { timer: 3000 });
      } else {
         swal({
            title: "Se modificaron los datos de perfil\n\n",
            icon: "success",
            dangerMode: false,
            position: "center",
            timer: 4000
         });
      }
   } catch (error) {
      swal("¡Advertencia!", 'Los datos ingresados no son correctos', "error", {
         timer: 3000
      });
      console.error('Error al realizar el PUT:', error);
   }
};

export const getUsuarios = async (jwtLogin) => {
   try {
      const response = await fetch(`${URL_BACK.getUsuarios}`, {
         method: 'GET',
         headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwtLogin}`,
         },
      });
      if (!response.ok) {
         throw new Error('Error al realizar el GET');
      }
      const data = await response.json();
      return data;
   } catch (error) {
      console.error('Error al realizar el GET:', error);
      throw error;
   }
};

// ///
// export const getUsuarios = async (idUsuario, jwtLogin) => {

//    const url = URL_BACK.getUsuarios;
//    const headers = {
//       'Content-Type': 'application/json',
//       'Authorization': `Bearer ${jwtLogin}`
//    }
//    const resp = await fetch(url, {
//       method: "GET",
//       headers: headers
//    });

//    const usuario = [];
//    let data = await resp.json();
//    data.map(info => {
//       if (info.id === idUsuario) {
//          usuario.push({
//             id: info.idUsuario,
//             cedula: info.cedula,
//             name: info.nombre,
//             apellido: info.apellido,
//             rol: 'A',
//          })
//       }
//    });
//    return usuario[0];
// }


const handlePost = async () => {
   try {
      const response = await fetch(`${URL_BACK.getUsuario}${'idUsuario'}`, {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify({ variable1: 'valor1', variable2: 'valor2' })
      });
      if (!response.ok) {
         throw new Error('Error al realizar el POST');
      }
      const data = await response.data();
      return data;
      // setResultadoPost(data);
   } catch (error) {
      console.error('Error al realizar el POST:', error);
   }
};



// export const getUsuario = async (idUsuario, jwtLogin) => {
//    let headersList = {
//       'Content-Type': 'application/json',
//       'Authorization': `Bearer ${jwtLogin}`,
//    }

//    let reqOptions = {
//       url: URL_BACK.getUsuario + idUsuario,
//       method: "GET",
//       headers: headersList,
//    }

//    let response = await axios.request(reqOptions);
//    console.log(response.data);

//    return response.data;
// }
