const PORT = {
  back: 8080,   // Puerto backend
  front: 3000,  // Puerto frontend
}


//const uriBaseBack = `https://studyhub-backend-g4-production.up.railway.app`
//const uriBaseFront = `https://frontstudyhub.vercel.app`

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

  // Uri Invitado
  novedadesUri: `/novedades`,                   // http://localhost:3000/novedades
  //pregFrecuentesUri: `/preg-frecuentes`,        // http://localhost:3000/preguntas-frecuentes
  contactoUri: `/demo`,                         // http://localhost:3000/contacto

  // Uri Auth
  loginUri: `/login`,                           // http://localhost:3000/login
  logoutUri: `/logout`,                         // http://localhost:3000/logout
  registrarseUri: `/registrarse`,               // http://localhost:3000/registrarse
  forgotPassUri: `/olvido-contrasenia?token=`,  // http://localhost:3000/olvido-contrasenia
  resetPassUri: `/resetPassword/?token=`,       // http://localhost:3000/resetPassword
}

const URL_BACK = {
  loginTest: `${uriBaseBack}/login/test`,                 // http://localhost:8080/login/test
  getUser: `${uriBaseBack}/api/users/getUser/`,           // http://localhost:8080/api/users/getUser/{id}
  getUsers: `${uriBaseBack}/getAllUsers`,                 // http://localhost:8080/getAllUsers
  courseRelations: `${uriBaseBack}/course-relations`,     // http://localhost:8080/course-relations
  forgotPassword: `${uriBaseBack}/forgotPassword`,        // http://localhost:8080/forgotPassword
  recuperarPassword: `${uriBaseBack}/recuperarPassword`,  // http://localhost:8080/recuperarPassword
  registerUsr: `${uriBaseBack}/registerUser`,             // http://localhost:8080/registerUser
  updateUsr: `${uriBaseBack}/api/users/updateUser/`,      // http://localhost:8080/api/users/updateUser/{id}
  deleteUser: `${uriBaseBack}/api/users/deleteUser/`,     // http://localhost:8080/api/users/deleteUser/{id}
}

const PARAMETERS = {
  redirecturi: `redirectUri`,
  clientid: `clientId`,
  code: `code`,
  clientsecret: `emrYoruZKktTVfw5`,
  accessToken: `44b4ff323b3509c5b897e8199c0655197797128fa71d81335f68b9a2a3286f30`,
};

const TIPO_ROL = {
  ADMIN: `Administrador`,
  ESTUDIANTE: `Estudiante`,
  DOCENTE: `Docente`,
  COORDINADOR: `Coordinador`,
  INVITADO: `Invitado`,
  FUNCIONARIO: `Funcionario`,
};

const redirigir = (url) => {
  window.location.href = url;
};

export { TIPO_ROL, URI_FRONT, URL_BACK, PARAMETERS, redirigir, uriBaseFront };