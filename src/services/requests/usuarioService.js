import { URL_BACK } from '../util/constants'
import swal from 'sweetalert';
import axios from 'axios';

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
// Devuelve los datos de todos los usuarios
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


///
// Devuelve los datos de todos los usuarios
export const getDocentes = async (jwtLogin) => {
   try {
      const response = await fetch(`${URL_BACK.getDocentes}`, {
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
// Modifica los datos del usuario
export const modificarDatosUsuario = async (idUsuario, nombre, apellido, email, fechaNacimiento, rol, cedula, jwtLogin) => {
  // console.log("idUsuarioaaaa: ", idUsuario, nombre, apellido, email, fechaNacimiento, rol, cedula, jwtLogin);
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
            title: "¡Cambios validados!\n\n",
            text: "Los datos han sido actualizados correctamente.",
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


///
// Modifica los datos del usuario
export const modificarPerfilUsuario = async (idUsuario, nombre, apellido, email, fechaNacimiento, jwtLogin) => {

   try {
      const response = await fetch(`${URL_BACK.modificarPerfil}${idUsuario}`, {
         method: 'PUT',
         headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwtLogin}`,
         },
         body: JSON.stringify({
            "nombre": nombre,
            "apellido": apellido,
            "email": email,
            "fechaNacimiento": fechaNacimiento
         })
      });
      if (!response.ok) {
         swal("¡Advertencia!", 'Los datos ingresados no son correctos', "error", { timer: 3000 });
      } else {
         swal({
            title: "¡Cambios validados!\n\n",
            text: "Los datos han sido actualizados correctamente.",
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
   }
};



///
// Registrar usuario
export const registrarUsuario = async (nombre, apellido, cedula, password, email, fechaNacimiento, rol, jwtLogin) => {
   let body = { "nombre": nombre, "apellido": apellido, "email": email, "fechaNacimiento": fechaNacimiento, "cedula": cedula, "password": password, "rol": rol };

   let response = await fetch(URL_BACK.registerUsr, {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json',
         'Authorization': `Bearer ${jwtLogin}`,
      },
      body: JSON.stringify(body)
   })

   if (response.ok) {
   //   console.log("response: ", response);
   } else {
      swal("¡Advertencia!", 'Los datos ingresados son incorrectos', "error", {
         timer: 3000
      });
   }
};


///
// Registrar usuario
export const bajaUsuario = async (idUsuario, jwtLogin) => {
   try {
      const response = await fetch(`${URL_BACK.deleteUsuario}${idUsuario}`, {
         method: 'DELETE',
         headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwtLogin}`,
         },
      });

      if (response.ok) {
         console.log("Usuario eliminado con éxito:", response);
      } else {
         const errorData = await response.json();
         if (errorData.status === 403) {
            swal("¡Advertencia!", errorData.message || 'Usuario inactivo', "error", {
               timer: 3000
            });
         } else {
            swal("¡Advertencia!", errorData.message || 'Los datos ingresados son incorrectos', "error", {
               timer: 3000
            });
         }
      }
   } catch (error) {
      console.error("Error al eliminar el usuario:", error);
      swal("¡Error!", 'Hubo un problema con la solicitud. Por favor, inténtelo nuevamente más tarde.', "error", {
         timer: 3000
      });
   }
};



///
export const getResumenActivida = async (idUsuario, jwtLogin) => {
   try {
      let headersList = {
         'Content-Type': 'application/json',
         'Authorization': `Bearer ${jwtLogin}`,
      }

      let reqOptions = {
         url: URL_BACK.getResumenActividad + idUsuario,
         method: "GET",
         headers: headersList,
      };

      let response = await axios.request(reqOptions);
      return response;
   } catch (error) {
      return error.response;
   }
}