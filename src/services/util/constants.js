const PORT = {
  back: 8080,   // Puerto backend
  front: 3000,  // Puerto frontend
}

// const uriBaseBack = `https://studyhub-backend-g4-production.up.railway.app`
// const uriBaseFront = `https://frontstudyhub.vercel.app`

const uriBaseBack = `http://localhost:${PORT.back}`     // http://localhost:8080
const uriBaseFront = `http://localhost:${PORT.front}`   // http://localhost:3000

const URI_FRONT = {
  // Uri Estudiante
  homeUri: `/`,                                 // http://localhost:3000/
  planEstudiosUri: `/plan-estudios`,            // http://localhost:3000/plan-estudios
  inscripcionesUri: `/inscripciones`,           // http://localhost:3000/inscripciones
  solicitudesUri: `/solicitudes`,               // http://localhost:3000/solicitudes
  gestionUri: `/gestion`,                       // http://localhost:3000/gestion

  preferenciasUri: `/preferencias`,             // http://localhost:3000/preferencias
  editPerfilUri: `/edit-perfil`,                // http://localhost:3000/edit-perfil
  modificarPasswordUri: `/modificar-password`,  // http://localhost:3000/modificar-password

  // Uri Invitado
  novedadesUri: `/novedades`,                   // http://localhost:3000/novedades
  //pregFrecuentesUri: `/preg-frecuentes`,      // http://localhost:3000/preguntas-frecuentes
  contactoUri: `/demo`,                         // http://localhost:3000/contacto

  // Uri Auth
  loginUri: `/login`,                           // http://localhost:3000/login
  logoutUri: `/logout`,                         // http://localhost:3000/logout
  registrarseUri: `/registrarse`,               // http://localhost:3000/registrarse
  forgotPassUri: `/olvido-contrasenia?token=`,  // http://localhost:3000/olvido-contrasenia
  resetPassUri: `/resetPassword/?token=`,       // http://localhost:3000/resetPassword

  //Uri Administrador
  validarEstudiantesUri: `/validar-estudiantes`, // http://localhost:3000/validar-estudiantes
}

const URL_BACK = {
  loginTest: `${uriBaseBack}/iniciarSesion`,                                     // http://localhost:8080/iniciarSesion
  cerrarSesion: `${uriBaseBack}/cerrarSesion`,                                   // http://localhost:8080/cerrarSesion

  getUsuario: `${uriBaseBack}/api/usuario/getUsuario/`,                          // http://localhost:8080/api/usuario/getUsuario/{id}
  getUsuarios: `${uriBaseBack}/api/usuario/getUsuarios`,                         // http://localhost:8080/api/usuario/getUsuarios
  courseRelations: `${uriBaseBack}/course-relations`,                            // http://localhost:8080/course-relations
  forgotPassword: `${uriBaseBack}/forgotPassword`,                               // http://localhost:8080/forgotPassword
  recuperarPassword: `${uriBaseBack}/recuperarPassword`,                         // http://localhost:8080/recuperarPassword
  registerUsr: `${uriBaseBack}/registerUsuario`,                                 // http://localhost:8080/registerUser
  updateUsr: `${uriBaseBack}/api/usuario/updateUser/`,                           // http://localhost:8080/api/usuario/updateUser/{id}
  deleteUser: `${uriBaseBack}/api/usuario/deleteUser/`,                          // http://localhost:8080/api/usuario/deleteUser/{id}
  modificarUsuario: `${uriBaseBack}/api/usuario/modificarUsuario/`,              // http://localhost:8080/api/usuario/modificarUsuario/{id}

  estudiantesPendientes: `${uriBaseBack}/api/usuario/getEstudiantesPendientes`,  // http://localhost:8080/estudiantes-pendientes
  acceptEstudiante: `${uriBaseBack}/api/usuario/acceptEstudiante/`,              // http://localhost:8080/acceptEstudiante/{id}
  modificarDocente: `${uriBaseBack}/api/docente/modificarDocente/`,              // http://localhost:8080/modificarDocente/{id}
  modificarPassword: `${uriBaseBack}/api/usuario/modificarPassword/`,            // http://localhost:8080/modificarPassword/{id}
  altaCarrera: `${uriBaseBack}/api/carrera/altaCarrera`,                         // 'http://localhost:8080/api/carrera/altaCarrera'

  altaDocente: `${uriBaseBack}/api/docente/altaDocente`,                         // 'http://localhost:8080/api/docente/altaDocente'
  altaAsignatura: `${uriBaseBack}/api/asignatura/altaAsignatura`,                // 'http://localhost:8080/api/asignatura/altaAsignatura'
}

const PARAMETERS = {
  redirecturi: `redirectUri`,
  clientid: `clientId`,
  code: `code`,
  clientsecret: `emrYoruZKktTVfw5`,
  // accessToken: ``,
};

const TIPO_ROL = {
  ADMIN: `A`,
  ESTUDIANTE: `E`,
  COORDINADOR: `C`,
  DOCENTE: `D`,
  FUNCIONARIO: `F`,
  INVITADO: `I`,
};

const redirigir = (url) => {
  window.location.href = url;
};


export { TIPO_ROL, URI_FRONT, URL_BACK, PARAMETERS, redirigir, uriBaseFront };